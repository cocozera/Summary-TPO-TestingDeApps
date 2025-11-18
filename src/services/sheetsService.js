// Servicio para conectar con Google Sheets y armar el dashboard

// Lee las variables de entorno
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

// URL base para la API de Google Sheets
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values`
const DEFAULT_RUN_ID = 'RUN-001'

// ---------- Helpers básicos ----------

/**
 * Obtiene datos de una hoja específica
 * @param {string} range - Rango de celdas (ej: 'TC!A1:Z1000')
 * @returns {Promise<Array>} - Datos de la hoja
 */
export async function getSheetData(range) {
  if (!SHEET_ID || !API_KEY) {
    console.warn('⚠️ Google Sheets no configurado. Usando datos de ejemplo.')
    return []
  }

  try {
    const url = `${BASE_URL}/${range}?key=${API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.values || []
  } catch (error) {
    console.error('Error al conectar con Google Sheets:', error)
    return []
  }
}

const normalize = (value) =>
  typeof value === 'string' ? value.trim().toLowerCase() : (value ?? '').toString().trim().toLowerCase()

const parseNumber = (value) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    return parseFloat(value.replace('%', '').replace(',', '.')) || 0
  }
  return 0
}

const findColumnIndex = (headerRow, labelFragment) => {
  if (!headerRow) return -1
  const target = labelFragment.toLowerCase()
  return headerRow.findIndex((cell) => cell && cell.toLowerCase().includes(target))
}

// ---------- Parser principal desde TC / Run / Bugs ----------

/**
 * Construye el objeto de datos del dashboard a partir de las tres hojas
 * @param {{ tcRaw: Array, runRaw: Array, bugsRaw: Array, runId: string }} params
 */
export function buildDashboardData({ tcRaw, runRaw, bugsRaw, runId = DEFAULT_RUN_ID }) {
  if (!tcRaw?.length || !runRaw?.length) {
    console.warn('Faltan datos de TC o Run en el Google Sheet')
  }

  // --- TC: tests planificados ---
  const tcHeader = tcRaw[0] || []
  const tcRows = (tcRaw || []).slice(1).filter((row) => row && row[0])
  const testsPlanificados = tcRows.length

  // --- Run: resultados por ejecución ---
  const runHeader = runRaw[0] || []
  const idxRunId = findColumnIndex(runHeader, 'run id')
  const idxResultado = findColumnIndex(runHeader, 'resultado')
  const idxTester = findColumnIndex(runHeader, 'ejecutado por')

  const runRows = (runRaw || [])
    .slice(1)
    .filter((row) => row && (idxRunId === -1 || normalize(row[idxRunId]) === normalize(runId)))

  let pass = 0
  let failed = 0
  let pending = 0

  const testersMap = {}

  runRows.forEach((row) => {
    const resultRaw = idxResultado === -1 ? '' : row[idxResultado] || ''
    const result = normalize(resultRaw).toUpperCase()

    let key = 'PENDING'
    if (result.includes('PASS')) key = 'PASS'
    else if (result.includes('FAIL')) key = 'FAIL'

    if (key === 'PASS') pass++
    if (key === 'FAIL') failed++
    if (key === 'PENDING') pending++

    const testerName = idxTester === -1 ? 'Sin asignar' : row[idxTester] || 'Sin asignar'
    if (!testersMap[testerName]) {
      testersMap[testerName] = { name: testerName, pass: 0, failed: 0, pending: 0, total: 0 }
    }
    if (key === 'PASS') testersMap[testerName].pass++
    if (key === 'FAIL') testersMap[testerName].failed++
    if (key === 'PENDING') testersMap[testerName].pending++
    testersMap[testerName].total++
  })

  const testsEjecutados = runRows.filter((row) => {
    const resultRaw = idxResultado === -1 ? '' : row[idxResultado] || ''
    return normalize(resultRaw) !== ''
  }).length

  const cobertura =
    testsPlanificados > 0 ? Number(((testsEjecutados / testsPlanificados) * 100).toFixed(2)) : 0

  const totalConResultado = pass + failed + pending || 1
  const resultados = {
    pass,
    failed,
    pending,
    passPercent: Number(((pass / totalConResultado) * 100).toFixed(1)),
    failedPercent: Number(((failed / totalConResultado) * 100).toFixed(1)),
    pendingPercent: Number(((pending / totalConResultado) * 100).toFixed(1)),
  }

  // --- Bugs: defectos, mejoras, estados, severidad ---
  const bugsHeader = bugsRaw[0] || []
  const idxRunBug = findColumnIndex(bugsHeader, 'run id')
  const idxTipoBug = findColumnIndex(bugsHeader, 'tipo')
  const idxEstadoBug = findColumnIndex(bugsHeader, 'estado')
  const idxSeveridadBug = findColumnIndex(bugsHeader, 'severidad')

  const bugRows = (bugsRaw || [])
    .slice(1)
    .filter((row) => row && (idxRunBug === -1 || normalize(row[idxRunBug]) === normalize(runId)))

  let defectos = 0
  let mejoras = 0
  let bugsAbiertos = 0
  let bugsCerrados = 0
  let bugsCancelados = 0

  const bugsBySeverity = {
    alta: 0,
    media: 0,
    baja: 0,
    otro: 0,
  }

  bugRows.forEach((row) => {
    const tipo = idxTipoBug === -1 ? '' : normalize(row[idxTipoBug])
    if (tipo.includes('defect')) defectos++
    else if (tipo.includes('mejora')) mejoras++

    const estado = idxEstadoBug === -1 ? '' : normalize(row[idxEstadoBug])
    if (estado.includes('abierto')) bugsAbiertos++
    else if (estado.includes('cerrado')) bugsCerrados++
    else if (estado.includes('cancel')) bugsCancelados++

    const sev = idxSeveridadBug === -1 ? '' : normalize(row[idxSeveridadBug])
    if (sev.includes('alta')) bugsBySeverity.alta++
    else if (sev.includes('media')) bugsBySeverity.media++
    else if (sev.includes('baja')) bugsBySeverity.baja++
    else bugsBySeverity.otro++
  })

  const bugs = bugRows.length

  // --- Tendencia de ejecución (para gráficos de línea/área) ---
  const trendExecution = runRows.map((row, index) => {
    const executedSoFar = index + 1
    const cov =
      testsPlanificados > 0
        ? Number(((executedSoFar / testsPlanificados) * 100).toFixed(2))
        : 0
    return {
      paso: executedSoFar,
      ejecutados: executedSoFar,
      planificados: testsPlanificados,
      cobertura: cov,
    }
  })

  // --- KPIs por tester (tasas de éxito / fallo) ---
  const testerKpis = Object.values(testersMap).map((t) => {
    const ejecutados = t.total || t.pass + t.failed + t.pending
    const passRate =
      ejecutados > 0 ? Number(((t.pass / ejecutados) * 100).toFixed(1)) : 0
    const failRate =
      ejecutados > 0 ? Number(((t.failed / ejecutados) * 100).toFixed(1)) : 0

    return {
      ...t,
      ejecutados,
      passRate,
      failRate,
    }
  })

  const bugsByType = {
    defectos,
    mejoras,
  }

  return {
    runId,
    cobertura,
    testsPlanificados,
    testsEjecutados,
    bugs,
    defectos,
    mejoras,
    bugsAbiertos,
    bugsCerrados,
    bugsCancelados,
    resultados,
    testerData: Object.values(testersMap),
    // datos extra para futuros gráficos copados
    extra: {
      bugsBySeverity,
      bugsByType,
      totalTC: testsPlanificados,
      totalRuns: runRows.length,
      trendExecution,
      testerKpis,
    },
  }
}

/**
 * Obtiene todos los datos del testing desde Google Sheets (TC, Run, Bugs)
 * y arma el objeto listo para el dashboard.
 * @param {string} runId
 * @returns {Promise<Object|null>}
 */
export async function fetchTestingData(runId = DEFAULT_RUN_ID) {
  try {
    const [tcRaw, runRaw, bugsRaw] = await Promise.all([
      getSheetData('TC!A1:Z1000'),
      getSheetData('Run!A1:Z1000'),
      getSheetData('Bugs!A1:Z1000'),
    ])

    if ((!tcRaw || !tcRaw.length) && (!runRaw || !runRaw.length)) {
      console.warn('No se encontraron datos en las hojas TC / Run')
      return null
    }

    console.log('✅ Datos obtenidos de Google Sheets:', {
      tcRows: tcRaw?.length || 0,
      runRows: runRaw?.length || 0,
      bugsRows: bugsRaw?.length || 0,
    })

    // Lista de RUNs disponibles (a partir de la hoja Run)
    const runHeader = runRaw[0] || []
    const idxRunId = findColumnIndex(runHeader, 'run id')
    const availableRuns = Array.from(
      new Set(
        (runRaw || [])
          .slice(1)
          .map((row) => (idxRunId === -1 ? '' : row[idxRunId] || ''))
          .filter((v) => v && v.toString().trim() !== ''),
      ),
    )

    const dashboard = buildDashboardData({ tcRaw, runRaw, bugsRaw, runId })

    return {
      dashboard,
      availableRuns,
    }
  } catch (error) {
    console.error('Error al obtener datos de testing:', error)
    return null
  }
}

import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { fetchTestingData } from './services/sheetsService'

function App() {
  const [data, setData] = useState(null)
  const [allRunsData, setAllRunsData] = useState(null)
  const [availableRuns, setAvailableRuns] = useState([])
  const [selectedRun, setSelectedRun] = useState('RUN-001')
  const [activeTab, setActiveTab] = useState('single') // 'single' o 'all'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    async function loadData(showLoading = false) {
      if (showLoading) setLoading(true)
      setError(null)

      const result = await fetchTestingData(selectedRun)

      if (result && result.dashboard) {
        setData(result.dashboard)
        setAllRunsData(result.allRunsData || null)
        setAvailableRuns(result.availableRuns || [])
        console.log('✅ Datos cargados - Individual:', result.dashboard)
        console.log('✅ Datos cargados - Todas las RUNs:', result.allRunsData)
      } else {
        setError('No se pudieron cargar los datos desde Google Sheets.')
      }

      if (showLoading) setLoading(false)
      if (isInitialLoad) setIsInitialLoad(false)
    }

    // Solo muestra loading en la primera carga
    loadData(isInitialLoad)

    // Refresca cada 30 segundos desde Google Sheets para el RUN seleccionado
    const interval = setInterval(() => loadData(false), 30000)

    return () => clearInterval(interval)
  }, [selectedRun, isInitialLoad])

  const appStyle = {
    minHeight: '100vh',
    // Fondo celeste estilo slide, suave y moderno
    background: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 40%, #bfdbfe 100%)',
    padding: '16px 12px',
    fontFamily: "'Poppins', sans-serif",
  }

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
  }

  if (loading) {
    return (
      <div style={appStyle}>
        <div style={loadingStyle}>
          <div>🔄 Cargando datos...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={appStyle}>
        <div style={loadingStyle}>
          <div>⚠️ {error}</div>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  // Si estamos en "Todas las RUNs" pero no hay datos, usar los datos individuales como fallback
  const currentData = activeTab === 'all' ? (allRunsData || data) : data
  const currentRunName = activeTab === 'all' ? 'TODAS LAS RUNS' : (data.runId || selectedRun)

  // Debug: verificar que currentData existe
  if (!currentData) {
    console.error('❌ No hay datos para mostrar')
    return (
      <div style={appStyle}>
        <div style={loadingStyle}>
          <div>⚠️ No hay datos disponibles</div>
        </div>
      </div>
    )
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div style={appStyle}>
      <Tabs activeTab={activeTab} onChange={handleTabChange} />
      {activeTab === 'single' && (
        <RunSelector
          selectedRun={selectedRun}
          availableRuns={availableRuns}
          onChange={(run) => {
            setSelectedRun(run)
          }}
        />
      )}
      <Dashboard data={currentData} runName={currentRunName} />
    </div>
  )
}

function Tabs({ activeTab, onChange }) {
  const containerStyle = {
    position: 'fixed',
    top: '24px',
    right: '24px',
    zIndex: 1000,
    display: 'flex',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '4px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.25)',
    border: '1px solid #e5e7eb',
  }

  const tabStyle = (isActive) => ({
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: isActive ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' : 'transparent',
    color: isActive ? '#ffffff' : '#64748b',
  })

  return (
    <div style={containerStyle}>
      <div style={tabStyle(activeTab === 'single')} onClick={() => onChange('single')}>
        RUN Individual
      </div>
      <div style={tabStyle(activeTab === 'all')} onClick={() => onChange('all')}>
        Todas las RUNs
      </div>
    </div>
  )
}

function RunSelector({ selectedRun, availableRuns, onChange }) {
  const containerStyle = {
    position: 'fixed',
    top: '80px',
    right: '24px',
    zIndex: 1100,
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.25)',
    border: '1px solid #e5e7eb',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#64748b',
  }

  const selectStyle = {
    borderRadius: '10px',
    border: '2px solid #e2e8f0',
    padding: '10px 16px',
    fontSize: '15px',
    fontWeight: 700,
    color: '#0f172a',
    background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
    outline: 'none',
    cursor: 'pointer',
    minWidth: '140px',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.1)',
  }

  const runs = availableRuns && availableRuns.length > 0 ? availableRuns : [selectedRun]

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>RUN</span>
      <select
        style={selectStyle}
        value={selectedRun}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => {
          e.target.style.borderColor = '#2563eb'
          e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.2)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e2e8f0'
          e.target.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.1)'
        }}
      >
        {runs.map((run) => (
          <option key={run} value={run}>
            {run}
          </option>
        ))}
      </select>
    </div>
  )
}

export default App

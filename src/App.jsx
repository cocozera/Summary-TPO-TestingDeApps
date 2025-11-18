import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { fetchTestingData } from './services/sheetsService'

function App() {
  const [data, setData] = useState(null)
  const [availableRuns, setAvailableRuns] = useState([])
  const [selectedRun, setSelectedRun] = useState('RUN-001')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)

      const result = await fetchTestingData(selectedRun)

      if (result && result.dashboard) {
        setData(result.dashboard)
        setAvailableRuns(result.availableRuns || [])
      } else {
        setError('No se pudieron cargar los datos desde Google Sheets.')
      }

      setLoading(false)
    }

    loadData()

    // Refresca cada 30 segundos desde Google Sheets para el RUN seleccionado
    const interval = setInterval(loadData, 30000)

    return () => clearInterval(interval)
  }, [selectedRun])

  const appStyle = {
    minHeight: '100vh',
    // Fondo celeste estilo slide, suave y moderno
    background: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 40%, #bfdbfe 100%)',
    padding: '40px 20px',
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

  return (
    <div style={appStyle}>
      <RunSelector
        selectedRun={selectedRun}
        availableRuns={availableRuns}
        onChange={setSelectedRun}
      />
      <Dashboard data={data} runName={data.runId || selectedRun} />
    </div>
  )
}

function RunSelector({ selectedRun, availableRuns, onChange }) {
  const containerStyle = {
    position: 'fixed',
    top: '24px',
    left: '24px',
    zIndex: 1100,
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '999px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.25)',
    padding: '10px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid #e5e7eb',
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#64748b',
  }

  const selectStyle = {
    borderRadius: '999px',
    border: '1px solid #e2e8f0',
    padding: '6px 18px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#0f172a',
    background: '#eff6ff',
    outline: 'none',
    cursor: 'pointer',
  }

  const runs = availableRuns && availableRuns.length > 0 ? availableRuns : [selectedRun]

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>Run</span>
      <select
        style={selectStyle}
        value={selectedRun}
        onChange={(e) => onChange(e.target.value)}
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

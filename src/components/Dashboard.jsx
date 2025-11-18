import React from 'react'
import Header from './Header'
import StatsGrid from './StatsGrid'
import ChartsSection from './ChartsSection'
import TesterChart from './TesterChart'
import AdvancedCharts from './AdvancedCharts'

function Dashboard({ data, runName }) {
  const containerStyle = {
    maxWidth: '100%',
    margin: '0 auto',
    width: '100%',
  }

  const shellStyle = {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.25)',
    padding: '32px 36px 40px',
    border: '1px solid #e5e7eb',
    position: 'relative',
    minHeight: 'calc(100vh - 40px)',
  }

  const browserBarStyle = {
    height: '24px',
    borderRadius: '12px',
    background: '#111827',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    marginBottom: '32px',
    gap: '6px',
  }

  const circleStyle = color => ({
    width: '12px',
    height: '12px',
    borderRadius: '999px',
    background: color,
  })

  const barTitleStyle = {
    marginLeft: '8px',
    color: '#e5e7eb',
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  }

  return (
    <div style={containerStyle}>
      <div style={shellStyle}>
        <div style={browserBarStyle}>
          <div style={circleStyle('#f97373')}></div>
          <div style={circleStyle('#facc15')}></div>
          <div style={circleStyle('#4ade80')}></div>
          <div style={barTitleStyle}>Testing Dashboard - Grupo 5</div>
        </div>

        <Header runName={runName} cobertura={data.cobertura} />
        <StatsGrid data={data} />
        <AdvancedCharts data={data} />
        <ChartsSection data={data} />
        <TesterChart testerData={data.testerData} />
      </div>
    </div>
  )
}

export default Dashboard


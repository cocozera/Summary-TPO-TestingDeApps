import React from 'react'
import PieChartComponent from './PieChartComponent'
import BugsStatusCard from './BugsStatusCard'

function ChartsSection({ data }) {
  const sectionStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    marginBottom: '30px',
  }

  const responsiveStyle = {
    '@media (max-width: 968px)': {
      gridTemplateColumns: '1fr',
    }
  }

  return (
    <div style={sectionStyle}>
      <PieChartComponent data={data.resultados} />
      <BugsStatusCard data={data} />
    </div>
  )
}

export default ChartsSection


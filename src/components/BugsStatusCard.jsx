import React from 'react'

function BugsStatusCard({ data }) {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  }

  const titleStyle = {
    fontSize: '22px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '24px',
    textAlign: 'center',
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '20px',
  }

  const bugStats = [
    {
      label: 'Bugs Abiertos',
      value: data.bugsAbiertos,
      color: '#f56565',
      icon: '🔴',
    },
    {
      label: 'Bugs Cerrados',
      value: data.bugsCerrados,
      color: '#48bb78',
      icon: '🟢',
    },
    {
      label: 'Bugs Cancelados',
      value: data.bugsCancelados,
      color: '#a0aec0',
      icon: '⚪',
    },
  ]

  const qualityStats = [
    {
      label: 'Defectos',
      value: data.defectos,
      color: '#ed8936',
      icon: '⚠️',
    },
    {
      label: 'Mejoras',
      value: data.mejoras,
      color: '#4299e1',
      icon: '💡',
    },
  ]

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Estado de Bugs y Calidad</h3>
      
      <div style={gridStyle}>
        {bugStats.map((stat, index) => (
          <BugStatItem key={index} {...stat} />
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginTop: '30px',
        paddingTop: '30px',
        borderTop: '2px solid #e2e8f0',
      }}>
        {qualityStats.map((stat, index) => (
          <BugStatItem key={index} {...stat} large />
        ))}
      </div>

      <div style={{
        marginTop: '30px',
        padding: '25px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '10px',
        }}>
          Total de Bugs
        </div>
        <div style={{
          fontSize: '48px',
          fontWeight: '900',
          color: '#ffffff',
        }}>
          {data.bugs}
        </div>
      </div>
    </div>
  )
}

function BugStatItem({ label, value, color, icon, large }) {
  const itemStyle = {
    background: `${color}15`,
    borderRadius: '16px',
    padding: large ? '30px' : '20px',
    border: `2px solid ${color}40`,
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  }

  const iconStyle = {
    fontSize: large ? '36px' : '28px',
    marginBottom: '10px',
  }

  const labelStyle = {
    fontSize: large ? '14px' : '12px',
    fontWeight: '600',
    color: '#718096',
    marginBottom: '8px',
    textTransform: 'uppercase',
  }

  const valueStyle = {
    fontSize: large ? '42px' : '32px',
    fontWeight: '900',
    color: color,
  }

  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div 
      style={{
        ...itemStyle,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={iconStyle}>{icon}</div>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
    </div>
  )
}

export default BugsStatusCard


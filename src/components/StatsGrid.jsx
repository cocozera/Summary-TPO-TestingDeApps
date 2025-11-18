import React from 'react'

function StatsGrid({ data }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '36px',
  }

  const stats = [
    {
      label: 'Test Planificados',
      value: data.testsPlanificados,
      icon: '📋',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
    {
      label: 'Test Ejecutados',
      value: data.testsEjecutados,
      icon: '✅',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
    },
    {
      label: 'Bugs Totales',
      value: data.bugs,
      icon: '🐛',
      gradient: 'linear-gradient(135deg, #f97316 0%, #fb7185 100%)',
    },
    {
      label: 'Defectos',
      value: data.defectos,
      icon: '⚠️',
      gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
    },
    {
      label: 'Mejoras',
      value: data.mejoras,
      icon: '⭐',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #2dd4bf 100%)',
    },
    {
      label: 'Bugs Abiertos',
      value: data.bugsAbiertos,
      icon: '🔓',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f97373 100%)',
    },
  ]

  return (
    <div style={gridStyle}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

function StatCard({ label, value, icon, gradient }) {
  const cardStyle = {
    background: '#f9fafb',
    borderRadius: '20px',
    padding: '24px 20px 26px',
    boxShadow: '0 24px 50px rgba(15, 23, 42, 0.18)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  }

  const iconContainerStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '26px',
    marginBottom: '16px',
    boxShadow: '0 18px 30px rgba(148, 163, 184, 0.55)',
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '700',
    color: '#9ca3af',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const valueStyle = {
    fontSize: '36px',
    fontWeight: '900',
    color: '#4f46e5',
    lineHeight: '1',
  }

  const [isHovered, setIsHovered] = React.useState(false)

  const hoveredStyle = isHovered ? {
    transform: 'translateY(-6px) scale(1.01)',
    boxShadow: '0 30px 60px rgba(15, 23, 42, 0.3)',
  } : {}

  return (
    <div 
      style={{...cardStyle, ...hoveredStyle}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={iconContainerStyle}>{icon}</div>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{value}</div>
    </div>
  )
}

export default StatsGrid


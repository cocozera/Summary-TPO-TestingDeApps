import React from 'react'

function Header({ runName, cobertura }) {
  const headerStyle = {
    background: 'linear-gradient(135deg, #ffffff 0%, #f4f7ff 100%)',
    borderRadius: '24px',
    padding: '32px 40px 36px',
    marginBottom: '30px',
    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
    backdropFilter: 'blur(10px)',
  }

  const titleStyle = {
    fontSize: '48px',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 20px 0',
    textAlign: 'center',
    letterSpacing: '-1px',
  }

  const subtitleStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#4a5568',
    textAlign: 'center',
    margin: '0 0 30px 0',
  }

  const runInfoStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px',
    padding: '18px 26px',
    background: 'linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%)',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
  }

  const runLabelStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '5px',
  }

  const runValueStyle = {
    fontSize: '32px',
    fontWeight: '800',
    color: '#ffffff',
  }

  const coberturaContainerStyle = {
    textAlign: 'right',
  }

  const coberturaBarStyle = {
    width: '300px',
    height: '40px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    marginTop: '10px',
  }

  const coberturaFillStyle = {
    height: '100%',
    width: `${cobertura}%`,
    background: 'linear-gradient(90deg, #48bb78 0%, #38a169 100%)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '18px',
    color: '#ffffff',
    transition: 'width 1s ease-out',
  }

  return (
    <div style={headerStyle}>
      <h1 style={titleStyle}>ENTREGA FINAL TESTING</h1>
      <h2 style={subtitleStyle}>Grupo 5 - Resumen Ejecutivo</h2>
      
      <div style={runInfoStyle}>
        <div>
          <div style={runLabelStyle}>RUN ACTUAL</div>
          <div style={runValueStyle}>{runName}</div>
        </div>
        <div style={coberturaContainerStyle}>
          <div style={runLabelStyle}>COBERTURA DE TESTING</div>
          <div style={coberturaBarStyle}>
            <div style={coberturaFillStyle}>
              {cobertura}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header


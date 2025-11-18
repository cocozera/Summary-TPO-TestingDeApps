import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function TesterChart({ testerData }) {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    marginBottom: '0',
  }

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '24px',
    textAlign: 'center',
  }

  const testerCardsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginTop: '20px',
  }

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Test Cases Ejecutados por Tester</h3>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={testerData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#4a5568', fontWeight: '600' }}
          />
          <YAxis tick={{ fill: '#4a5568', fontWeight: '600' }} />
          <Tooltip 
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
              fontWeight: '600',
            }}
          />
          <Bar dataKey="pass" fill="#48bb78" radius={[8, 8, 0, 0]} name="Pass" />
          <Bar dataKey="failed" fill="#f56565" radius={[8, 8, 0, 0]} name="Failed" />
          <Bar dataKey="pending" fill="#ecc94b" radius={[8, 8, 0, 0]} name="Pending" />
        </BarChart>
      </ResponsiveContainer>

      <div style={testerCardsStyle}>
        {testerData.map((tester, index) => (
          <TesterCard key={index} tester={tester} />
        ))}
      </div>
    </div>
  )
}

function TesterCard({ tester }) {
  const gradients = [
    'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
    'linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)',
    'linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)',
  ]

  const gradient = gradients[Math.floor(Math.random() * gradients.length)]

  const cardStyle = {
    background: gradient,
    borderRadius: '16px',
    padding: '25px',
    color: 'white',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  }

  const nameStyle = {
    fontSize: '24px',
    fontWeight: '800',
    marginBottom: '15px',
    textAlign: 'center',
  }

  const statsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '2px solid rgba(255, 255, 255, 0.3)',
  }

  const statStyle = {
    textAlign: 'center',
  }

  const statLabelStyle = {
    fontSize: '11px',
    fontWeight: '600',
    opacity: '0.9',
    marginBottom: '5px',
    textTransform: 'uppercase',
  }

  const statValueStyle = {
    fontSize: '20px',
    fontWeight: '900',
  }

  const totalStyle = {
    fontSize: '48px',
    fontWeight: '900',
    textAlign: 'center',
    marginTop: '10px',
  }

  return (
    <div style={cardStyle}>
      <div style={nameStyle}>{tester.name}</div>
      <div style={totalStyle}>{tester.total}</div>
      <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: '600', opacity: '0.9' }}>
        Tests Ejecutados
      </div>
      <div style={statsStyle}>
        <div style={statStyle}>
          <div style={statLabelStyle}>Pass</div>
          <div style={statValueStyle}>{tester.pass}</div>
        </div>
        <div style={statStyle}>
          <div style={statLabelStyle}>Failed</div>
          <div style={statValueStyle}>{tester.failed}</div>
        </div>
        <div style={statStyle}>
          <div style={statLabelStyle}>Pending</div>
          <div style={statValueStyle}>{tester.pending}</div>
        </div>
      </div>
    </div>
  )
}

export default TesterChart


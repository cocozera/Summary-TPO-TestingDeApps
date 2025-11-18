import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

function PieChartComponent({ data }) {
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

  const chartData = [
    { name: 'Pass', value: data.pass, percent: data.passPercent },
    { name: 'Failed', value: data.failed, percent: data.failedPercent },
    { name: 'Pending', value: data.pending, percent: data.pendingPercent },
  ]

  const COLORS = ['#48bb78', '#f56565', '#ecc94b']

  const statsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px',
    paddingTop: '30px',
    borderTop: '2px solid #e2e8f0',
  }

  const statItemStyle = {
    textAlign: 'center',
  }

  const statLabelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#718096',
    marginBottom: '8px',
    textTransform: 'uppercase',
  }

  const statValueStyle = {
    fontSize: '32px',
    fontWeight: '900',
  }

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Resultados del Run</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${percent.toFixed(1)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div style={statsContainerStyle}>
        <div style={statItemStyle}>
          <div style={statLabelStyle}>Pass</div>
          <div style={{...statValueStyle, color: '#48bb78'}}>{data.pass}</div>
        </div>
        <div style={statItemStyle}>
          <div style={statLabelStyle}>Failed</div>
          <div style={{...statValueStyle, color: '#f56565'}}>{data.failed}</div>
        </div>
        <div style={statItemStyle}>
          <div style={statLabelStyle}>Pending</div>
          <div style={{...statValueStyle, color: '#ecc94b'}}>{data.pending}</div>
        </div>
      </div>
    </div>
  )
}

export default PieChartComponent


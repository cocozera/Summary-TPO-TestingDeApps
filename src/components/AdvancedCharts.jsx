import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts'

function AdvancedCharts({ data }) {
  const sectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '36px',
  }

  return (
    <div style={sectionStyle}>
      <CoverageDonut data={data} />
      <BugsSeverityChart data={data} />
      <BugsStatusChart data={data} />
      <TesterQualityChart data={data} />
    </div>
  )
}

function Card({ title, subtitle, children }) {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '20px',
    padding: '24px 24px 26px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.16)',
  }

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '6px',
  }

  const subtitleStyle = {
    fontSize: '13px',
    fontWeight: 500,
    color: '#94a3b8',
    marginBottom: '22px',
  }

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title}</div>
      {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
      {children}
    </div>
  )
}

function ExecutionTrendChart({ data }) {
  const trend = (data.extra && data.extra.trendExecution) || []

  if (!trend.length) {
    return null
  }

  return (
    <Card
      title="Evolución de la cobertura global"
      subtitle="Cobertura acumulada de todos los RUNs a medida que se ejecutan los casos"
    >
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={trend} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="covGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="paso"
            tick={{ fill: '#6b7280', fontWeight: 600 }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontWeight: 600 }}
            tickLine={false}
            unit="%"
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
            formatter={(value, name) =>
              name === 'cobertura' ? [`${value}%`, 'Cobertura'] : [value, name]
            }
          />
          <Area
            type="monotone"
            dataKey="cobertura"
            stroke="#4f46e5"
            fill="url(#covGradient)"
            strokeWidth={3}
            name="Cobertura"
          />
          <Line
            type="monotone"
            dataKey="cobertura"
            stroke="#1d4ed8"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

function TesterQualityChart({ data }) {
  const testerKpis = (data.extra && data.extra.testerKpis) || []

  if (!testerKpis.length) {
    return null
  }

  const chartData = testerKpis.map((t) => ({
    name: t.name,
    passRate: t.passRate,
    failRate: t.failRate,
  }))

  return (
    <Card
      title="Calidad por tester"
      subtitle="Tasa de éxito vs fallos por tester"
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            tick={{ fill: '#6b7280', fontWeight: 600 }}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#6b7280', fontWeight: 600 }}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
            formatter={(value, name) =>
              name === 'passRate'
                ? [`${value}%`, 'Pass rate']
                : [`${value}%`, 'Fail rate']
            }
          />
          <Legend />
          <Bar
            dataKey="passRate"
            stackId="a"
            fill="#22c55e"
            radius={[8, 8, 0, 0]}
            name="Pass rate"
          />
          <Bar
            dataKey="failRate"
            stackId="a"
            fill="#ef4444"
            radius={[0, 8, 8, 0]}
            name="Fail rate"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

function CoverageDonut({ data }) {
  // Usar cobertura global: todos los ejecutados (de todos los RUNs) vs planificados
  const testsEjecutadosGlobal = Math.round((data.cobertura * data.testsPlanificados) / 100)
  const notExecuted = Math.max(data.testsPlanificados - testsEjecutadosGlobal, 0)

  const coverageData = [
    { name: 'Ejecutado', value: testsEjecutadosGlobal },
    { name: 'No ejecutado', value: notExecuted },
  ]

  const COLORS = ['#22c55e', '#e5e7eb']

  const centerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    pointerEvents: 'none',
  }

  const valueStyle = {
    fontSize: '28px',
    fontWeight: 900,
    color: '#0f172a',
  }

  const labelStyle = {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#94a3b8',
    marginTop: '4px',
  }

  return (
    <Card title="Cobertura de ejecución" subtitle="Tests ejecutados vs planificados">
      <div style={{ position: 'relative', width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={coverageData}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {coverageData.map((entry, index) => (
                <Cell key={`cov-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div style={centerStyle}>
          <div style={valueStyle}>{data.cobertura}%</div>
          <div style={labelStyle}>Cobertura</div>
        </div>
      </div>
    </Card>
  )
}

function BugsSeverityChart({ data }) {
  const sev = (data.extra && data.extra.bugsBySeverity) || {
    alta: 0,
    media: 0,
    baja: 0,
    otro: 0,
  }

  const severityData = [
    { name: 'Alta', value: sev.alta, color: '#ef4444' },
    { name: 'Media', value: sev.media, color: '#f97316' },
    { name: 'Baja', value: sev.baja, color: '#22c55e' },
    { name: 'Otro', value: sev.otro, color: '#94a3b8' },
  ]

  return (
    <Card title="Severidad de Bugs" subtitle="Impacto sobre la calidad">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={severityData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6b7280', fontWeight: 600 }}
          />
          <YAxis tick={{ fill: '#6b7280', fontWeight: 600 }} />
          <Tooltip
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {severityData.map((entry, index) => (
              <Cell key={`sev-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

function BugsStatusChart({ data }) {
  const statusData = [
    { name: 'Abiertos', value: data.bugsAbiertos, color: '#ef4444' },
    { name: 'Cerrados', value: data.bugsCerrados, color: '#22c55e' },
    { name: 'Cancelados', value: data.bugsCancelados, color: '#6b7280' },
  ]

  return (
    <Card title="Estado de Bugs" subtitle="Progreso del ciclo de vida">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={statusData}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6b7280', fontWeight: 600 }}
          />
          <YAxis tick={{ fill: '#6b7280', fontWeight: 600 }} />
          <Tooltip
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {statusData.map((entry, index) => (
              <Cell key={`st-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default AdvancedCharts



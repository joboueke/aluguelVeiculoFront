import { useNavigate } from 'react-router';
import { vehicles, reservations, billings, maintenances } from '../../data/mock';
import { ReservationBadge, BillingBadge, MaintenanceBadge } from '../../components/Badge';

const fmtCurrency = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const recentActivities = [
  { id: 'R-025', label: 'Nova reserva', detail: 'Ana Carolina Ferreira', type: 'reservation', status: 'confirmed' as const },
  { id: 'M-008', label: 'Toyota Corolla — Em manutenção', detail: 'ABC-1234 · Preventiva', type: 'maintenance', status: 'in_progress' as const },
  { id: 'C-019', label: 'Cobrança pendente', detail: 'Bruno Alves Souza · R$ 495,00', type: 'billing', status: 'pending' as const },
  { id: 'R-006', label: 'Reserva confirmada', detail: 'Carla Mendes Lima', type: 'reservation', status: 'confirmed' as const },
  { id: 'M-004', label: 'Jeep Compass — Manutenção agendada', detail: 'STU-6789 · Preventiva', type: 'maintenance', status: 'scheduled' as const },
  { id: 'C-021', label: 'Pagamento recebido', detail: 'Diego Rodrigues Costa · R$ 720,00', type: 'billing', status: 'paid' as const },
];

const activityIcons: Record<string, React.ReactNode> = {
  reservation: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  maintenance: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  billing: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="2"/><path d="M12 6v2m0 8v2M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
};

const activityColors: Record<string, string> = {
  reservation: '#EDE9FE',
  maintenance: '#FEF3C7',
  billing: '#DCFCE7',
};
const activityIconColors: Record<string, string> = {
  reservation: '#6D28D9',
  maintenance: '#B45309',
  billing: '#15803D',
};

export default function Dashboard() {
  const navigate = useNavigate();

  const kpis = [
    {
      label: 'Frota',
      value: vehicles.length,
      sub: `${vehicles.filter(v => v.status === 'available').length} disponíveis`,
      icon: '🚗',
      iconBg: '#E0F2FE',
      color: '#0369A1',
      action: () => navigate('/admin/vehicles'),
    },
    {
      label: 'Reservas',
      value: reservations.filter(r => r.status === 'confirmed' || r.status === 'in_progress').length,
      sub: 'reservas ativas',
      icon: '📋',
      iconBg: '#EDE9FE',
      color: '#6D28D9',
      action: () => navigate('/admin/reservations'),
    },
    {
      label: 'Cobranças',
      value: billings.filter(b => b.status === 'pending').length,
      sub: `${fmtCurrency(billings.filter(b => b.status === 'pending').reduce((s, b) => s + b.total, 0))} pendente`,
      icon: '💰',
      iconBg: '#FEF3C7',
      color: '#B45309',
      action: () => navigate('/admin/billing'),
    },
    {
      label: 'Manutenções',
      value: vehicles.filter(v => v.status === 'maintenance').length,
      sub: 'veículos em manutenção',
      icon: '🔧',
      iconBg: '#FEE2E2',
      color: '#DC2626',
      action: () => navigate('/admin/maintenance'),
    },
  ];

  return (
    <div style={{ padding: '36px 36px 64px' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 4 }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: '#64748B' }}>Visão geral da operação da locadora</p>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 36 }} className="kpi-grid">
        {kpis.map(kpi => (
          <div
            key={kpi.label}
            className="stat-card"
            onClick={kpi.action}
            style={{ cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.10)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = ''; (e.currentTarget as HTMLDivElement).style.transform = ''; }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: kpi.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{kpi.icon}</div>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ color: '#CBD5E1', marginTop: 4 }}><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 38, fontWeight: 800, color: kpi.color, lineHeight: 1, marginBottom: 6 }}>{kpi.value}</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#1F2937', marginBottom: 3 }}>{kpi.label}</div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Atividades recentes */}
      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 700, color: '#1F2937', marginBottom: 2 }}>Atividades recentes</h2>
            <p style={{ fontSize: 13, color: '#94A3B8' }}>Últimas movimentações do sistema</p>
          </div>
          <span style={{ fontSize: 12, color: '#64748B', background: '#F1F5F9', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>Hoje</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {recentActivities.map((act, i) => (
            <div
              key={act.id}
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: i < recentActivities.length - 1 ? '1px solid #F1F5F9' : 'none', cursor: 'pointer', transition: 'background 0.1s', borderRadius: 8 }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#FAFBFC'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
            >
              {/* Icon */}
              <div style={{ width: 38, height: 38, borderRadius: 10, background: activityColors[act.type], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: activityIconColors[act.type] }}>
                {activityIcons[act.type]}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 13, color: '#0EA5E9' }}>{act.id}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>—</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{act.label}</span>
                </div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>{act.detail}</div>
              </div>

              {/* Badge */}
              <div style={{ flexShrink: 0 }}>
                {act.type === 'reservation' && <ReservationBadge status={act.status as any} />}
                {act.type === 'maintenance' && <MaintenanceBadge status={act.status as any} />}
                {act.type === 'billing' && <BillingBadge status={act.status as any} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .kpi-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

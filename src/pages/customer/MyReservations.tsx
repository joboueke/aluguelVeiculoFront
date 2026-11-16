import { useState } from 'react';
import { reservations } from '../../data/mock';
import type { ReservationStatus } from '../../data/mock';
import { ReservationBadge } from '../../components/Badge';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';

const tabs: { label: string; value: ReservationStatus | 'all' }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendentes', value: 'pending' },
  { label: 'Confirmadas', value: 'confirmed' },
  { label: 'Em andamento', value: 'in_progress' },
  { label: 'Finalizadas', value: 'finished' },
  { label: 'Canceladas', value: 'cancelled' },
];

const timelineSteps = [
  { key: 'pending', label: 'Reserva criada' },
  { key: 'confirmed', label: 'Confirmada' },
  { key: 'in_progress', label: 'Veículo retirado' },
  { key: 'finished', label: 'Veículo devolvido' },
  { key: 'finished_done', label: 'Finalizada' },
];

const statusOrder: Record<ReservationStatus, number> = { pending: 0, confirmed: 1, in_progress: 2, finished: 4, cancelled: -1 };

export default function MyReservations() {
  const [tab, setTab] = useState<ReservationStatus | 'all'>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState<string[]>([]);
  const [reservationList, setReservationList] = useState(reservations.filter(r => r.customerId === 'c1'));

  const fmtCurrency = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const fmtDate = (d: string) => d.split(' ')[0].split('-').reverse().join('/');

  const filtered = reservationList.filter(r => tab === 'all' || r.status === tab || (tab === 'cancelled' && cancelled.includes(r.id)));

  const selectedRes = reservationList.find(r => r.id === selected);

  function handleCancel() {
    if (!cancelId) return;
    setCancelled(c => [...c, cancelId]);
    setReservationList(list => list.map(r => r.id === cancelId ? { ...r, status: 'cancelled' as ReservationStatus } : r));
    setCancelId(null);
    if (selected === cancelId) setSelected(null);
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)', padding: '40px 24px 64px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: '#1F2937', marginBottom: 8 }}>Minhas Reservas</h1>
        <p style={{ fontSize: 14, color: '#64748B', marginBottom: 32 }}>Acompanhe e gerencie suas reservas de veículos</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, overflowX: 'auto', paddingBottom: 4, borderBottom: '1px solid #E2E8F0' }}>
          {tabs.map(t => (
            <button key={t.value} onClick={() => setTab(t.value)} style={{ padding: '8px 16px', borderRadius: '8px 8px 0 0', border: 'none', background: tab === t.value ? '#1E3A5F' : 'transparent', color: tab === t.value ? '#fff' : '#64748B', fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s' }}>
              {t.label}
              <span style={{ marginLeft: 6, padding: '1px 6px', borderRadius: 10, background: tab === t.value ? 'rgba(255,255,255,0.2)' : '#F1F5F9', color: tab === t.value ? '#fff' : '#94A3B8', fontSize: 11, fontWeight: 700 }}>
                {reservationList.filter(r => t.value === 'all' ? true : r.status === t.value).length}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon="📋" title="Nenhuma reserva encontrada" description="Você não possui reservas nesta categoria." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map(res => (
              <div key={res.id} className="card" style={{ padding: 20, transition: 'box-shadow 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = ''}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 80, height: 60, borderRadius: 8, overflow: 'hidden', background: '#E2E8F0', flexShrink: 0 }}>
                    <img src={res.vehicle.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 15, color: '#0EA5E9' }}>{res.id}</span>
                      <ReservationBadge status={res.status} />
                    </div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 16, color: '#1F2937', marginBottom: 4 }}>{res.vehicle.brand} {res.vehicle.model}</h3>
                    <p style={{ fontSize: 13, color: '#64748B' }}>{fmtDate(res.pickupDate)} → {fmtDate(res.returnDate)} · {res.days} dias</p>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: 120 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 18, color: '#1E3A5F', marginBottom: 12 }}>{fmtCurrency(res.estimatedValue)}</div>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                      <button className="btn-secondary" onClick={() => setSelected(res.id)} style={{ padding: '6px 14px', fontSize: 12 }}>Ver detalhes</button>
                      {(res.status === 'pending' || res.status === 'confirmed') && (
                        <button className="btn-danger" onClick={() => setCancelId(res.id)} style={{ padding: '6px 14px', fontSize: 12 }}>Cancelar</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selectedRes && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} onClick={() => setSelected(null)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 460, background: '#fff', height: '100vh', overflow: 'auto', padding: 32, boxShadow: '-8px 0 32px rgba(0,0,0,0.12)' }} className="slide-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 20, fontWeight: 800, color: '#1F2937' }}>Detalhes da Reserva</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B', padding: 4 }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, padding: 16, background: '#F8FAFC', borderRadius: 10 }}>
              <img src={selectedRes.vehicle.image} alt="" style={{ width: 72, height: 52, borderRadius: 8, objectFit: 'cover' }} />
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 16, color: '#1F2937' }}>{selectedRes.vehicle.brand} {selectedRes.vehicle.model}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{selectedRes.vehicle.category} · {selectedRes.vehicle.year}</div>
                <div style={{ marginTop: 4 }}><ReservationBadge status={selectedRes.status} /></div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                { label: 'Reserva', value: selectedRes.id },
                { label: 'Valor estimado', value: fmtCurrency(selectedRes.estimatedValue) },
                { label: 'Retirada', value: fmtDate(selectedRes.pickupDate) },
                { label: 'Devolução', value: fmtDate(selectedRes.returnDate) },
                { label: 'Dias', value: `${selectedRes.days} dias` },
                { label: 'Diária', value: fmtCurrency(selectedRes.vehicle.dailyRate) },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: 12, background: '#F8FAFC', borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <h3 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 14, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Linha do tempo</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timelineSteps.map((step, i) => {
                const currentOrder = statusOrder[selectedRes.status];
                const stepOrder = i;
                const isDone = selectedRes.status !== 'cancelled' && currentOrder >= stepOrder;
                const isCurrent = selectedRes.status !== 'cancelled' && currentOrder === stepOrder;
                return (
                  <div key={step.key} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: isDone ? '#0EA5E9' : '#E2E8F0', border: isCurrent ? '3px solid #0EA5E9' : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                        {isDone && <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      {i < timelineSteps.length - 1 && <div style={{ width: 2, height: 28, background: isDone ? '#BAE6FD' : '#E2E8F0', margin: '2px 0' }} />}
                    </div>
                    <div style={{ paddingTop: 4, paddingBottom: 24 }}>
                      <div style={{ fontSize: 13, fontWeight: isDone ? 600 : 400, color: isDone ? '#1F2937' : '#94A3B8' }}>{step.label}</div>
                    </div>
                  </div>
                );
              })}
              {selectedRes.status === 'cancelled' && (
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                  <div style={{ paddingTop: 4 }}><div style={{ fontSize: 13, fontWeight: 600, color: '#DC2626' }}>Cancelada</div></div>
                </div>
              )}
            </div>

            {(selectedRes.status === 'pending' || selectedRes.status === 'confirmed') && (
              <button className="btn-danger" onClick={() => setCancelId(selectedRes.id)} style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                Cancelar reserva
              </button>
            )}
          </div>
        </div>
      )}

      <Modal
        open={!!cancelId}
        title="Cancelar reserva"
        message="Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita."
        confirmLabel="Sim, cancelar"
        variant="danger"
        onConfirm={handleCancel}
        onCancel={() => setCancelId(null)}
      />
    </div>
  );
}

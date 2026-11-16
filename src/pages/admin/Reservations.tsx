import { useState } from 'react';
import { reservations as initialReservations } from '../../data/mock';
import type { ReservationStatus } from '../../data/mock';
import { ReservationBadge } from '../../components/Badge';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';

const fmtCurrency = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const fmtDate = (d: string) => d.split(' ')[0].split('-').reverse().join('/');

const stats = [
  { label: 'Reservas hoje', value: 3, color: '#1E3A5F' },
  { label: 'Confirmadas', value: 2, color: '#0369A1' },
  { label: 'Em andamento', value: 1, color: '#6D28D9' },
  { label: 'Aguardando devolução', value: 1, color: '#F59E0B' },
];

export default function Reservations() {
  const [list, setList] = useState(initialReservations);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'all'>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{ type: string; id: string } | null>(null);
  const [pickupForm, setPickupForm] = useState({ mileage: '', datetime: '' });

  const filtered = list.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (search && !`${r.customer.name} ${r.vehicle.brand} ${r.vehicle.model} ${r.id}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectedRes = list.find(r => r.id === selected);

  function changeStatus(id: string, newStatus: ReservationStatus) {
    setList(l => l.map(r => r.id === id ? { ...r, status: newStatus } : r));
  }

  function handleAction() {
    if (!actionModal) return;
    const { type, id } = actionModal;
    if (type === 'confirm') changeStatus(id, 'confirmed');
    else if (type === 'pickup') changeStatus(id, 'in_progress');
    else if (type === 'return') changeStatus(id, 'finished');
    else if (type === 'cancel') changeStatus(id, 'cancelled');
    setActionModal(null);
  }

  const ActionButton = ({ label, onClick, color = '#374151', bg = '#fff', border = '#E2E8F0' }: { label: string; onClick: () => void; color?: string; bg?: string; border?: string }) => (
    <button onClick={onClick} style={{ padding: '5px 10px', border: `1px solid ${border}`, background: bg, borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, color, fontFamily: "'Plus Jakarta Sans'" }}>{label}</button>
  );

  const modalMessages: Record<string, string> = {
    confirm: 'Confirmar esta reserva para o cliente?',
    pickup: `Registrar retirada do veículo? Km: ${pickupForm.mileage || '---'}`,
    return: 'Registrar devolução do veículo?',
    cancel: 'Cancelar esta reserva? Esta ação não pode ser desfeita.',
  };

  return (
    <div style={{ padding: '32px 32px 64px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 4 }}>Gestão de Reservas</h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>Gerencie todas as reservas de veículos</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }} className="res-stats">
        {stats.map(s => (
          <div key={s.label} className="stat-card" style={{ padding: 20 }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 30, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <input className="form-input" placeholder="Buscar por cliente, veículo ou ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 38 }} />
          </div>
          <select className="form-input" value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)} style={{ appearance: 'none', cursor: 'pointer', width: 'auto' }}>
            <option value="all">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="confirmed">Confirmada</option>
            <option value="in_progress">Em andamento</option>
            <option value="finished">Finalizada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <EmptyState icon="📋" title="Nenhuma reserva encontrada" description="Tente ajustar os filtros de busca." />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['ID', 'Cliente', 'Veículo', 'Retirada', 'Devolução', 'Valor', 'Status', 'Ações'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: '#64748B', textAlign: 'left', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} className="table-row" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={() => setSelected(r.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 13, color: '#0EA5E9' }}>{r.id}</button>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>{r.customer.name}</div>
                      <div style={{ fontSize: 11, color: '#94A3B8' }}>{r.customer.email}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>{r.vehicle.brand} {r.vehicle.model}</div>
                      <div style={{ fontSize: 11, color: '#94A3B8' }}>{r.vehicle.plate}</div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151', whiteSpace: 'nowrap' }}>{fmtDate(r.pickupDate)}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151', whiteSpace: 'nowrap' }}>{fmtDate(r.returnDate)}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: '#1E3A5F', whiteSpace: 'nowrap' }}>{fmtCurrency(r.estimatedValue)}</td>
                    <td style={{ padding: '14px 16px' }}><ReservationBadge status={r.status} /></td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        <ActionButton label="Detalhes" onClick={() => setSelected(r.id)} />
                        {r.status === 'pending' && <ActionButton label="Confirmar" onClick={() => setActionModal({ type: 'confirm', id: r.id })} color="#0369A1" border="#BAE6FD" bg="#EFF6FF" />}
                        {r.status === 'confirmed' && <ActionButton label="Registrar retirada" onClick={() => setActionModal({ type: 'pickup', id: r.id })} color="#6D28D9" border="#DDD6FE" bg="#EDE9FE" />}
                        {r.status === 'in_progress' && <ActionButton label="Registrar devolução" onClick={() => setActionModal({ type: 'return', id: r.id })} color="#15803D" border="#BBF7D0" bg="#F0FDF4" />}
                        {(r.status === 'pending' || r.status === 'confirmed') && <ActionButton label="Cancelar" onClick={() => setActionModal({ type: 'cancel', id: r.id })} color="#DC2626" border="#FEE2E2" bg="#FFF5F5" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selectedRes && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} onClick={() => setSelected(null)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 480, background: '#fff', height: '100vh', overflow: 'auto', padding: 32, boxShadow: '-8px 0 32px rgba(0,0,0,0.12)' }} className="slide-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 20, fontWeight: 800, color: '#1F2937' }}>Reserva {selectedRes.id}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div style={{ marginBottom: 16 }}><ReservationBadge status={selectedRes.status} /></div>

            <section style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Veículo</h3>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 14, background: '#F8FAFC', borderRadius: 10 }}>
                <img src={selectedRes.vehicle.image} alt="" style={{ width: 72, height: 50, borderRadius: 8, objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#1F2937' }}>{selectedRes.vehicle.brand} {selectedRes.vehicle.model}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{selectedRes.vehicle.plate} · {selectedRes.vehicle.category}</div>
                </div>
              </div>
            </section>

            <section style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Cliente</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[['Nome', selectedRes.customer.name], ['E-mail', selectedRes.customer.email], ['Telefone', selectedRes.customer.phone], ['CPF', selectedRes.customer.cpf]].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#64748B' }}>{l}</span>
                    <span style={{ fontWeight: 600, color: '#1F2937' }}>{v}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Período e valor</h3>
              <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 10, padding: 16 }}>
                {[['Retirada', fmtDate(selectedRes.pickupDate)], ['Devolução', fmtDate(selectedRes.returnDate)], ['Dias', `${selectedRes.days} dias`], ['Diária', fmtCurrency(selectedRes.vehicle.dailyRate)]].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                    <span style={{ color: '#64748B' }}>{l}</span>
                    <span style={{ fontWeight: 600, color: '#1F2937' }}>{v}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: '#BAE6FD', margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800 }}>
                  <span style={{ color: '#0369A1' }}>Total estimado</span>
                  <span style={{ color: '#0369A1' }}>{fmtCurrency(selectedRes.estimatedValue)}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {actionModal?.type === 'pickup' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setActionModal(null)} />
          <div className="card fade-in" style={{ position: 'relative', padding: 32, maxWidth: 400, width: '100%' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 18, fontWeight: 800, color: '#1F2937', marginBottom: 20 }}>Registrar Retirada</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <div><label className="form-label">Quilometragem atual (km)</label><input type="number" className="form-input" value={pickupForm.mileage} onChange={e => setPickupForm(f => ({ ...f, mileage: e.target.value }))} placeholder="Ex: 25000" /></div>
              <div><label className="form-label">Data/hora da retirada</label><input type="datetime-local" className="form-input" value={pickupForm.datetime} onChange={e => setPickupForm(f => ({ ...f, datetime: e.target.value }))} /></div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setActionModal(null)}>Cancelar</button>
              <button className="btn-primary" onClick={handleAction}>Confirmar retirada</button>
            </div>
          </div>
        </div>
      )}

      {actionModal && actionModal.type !== 'pickup' && (
        <Modal
          open
          title={actionModal.type === 'confirm' ? 'Confirmar reserva' : actionModal.type === 'return' ? 'Registrar devolução' : 'Cancelar reserva'}
          message={modalMessages[actionModal.type]}
          confirmLabel={actionModal.type === 'cancel' ? 'Sim, cancelar' : 'Confirmar'}
          variant={actionModal.type === 'cancel' ? 'danger' : 'primary'}
          onConfirm={handleAction}
          onCancel={() => setActionModal(null)}
        />
      )}

      <style>{`
        @media (max-width: 640px) { .res-stats { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  );
}

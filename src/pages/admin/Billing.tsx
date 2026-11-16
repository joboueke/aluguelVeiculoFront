import { useState } from 'react';
import { billings } from '../../data/mock';
import type { BillingStatus } from '../../data/mock';
import { BillingBadge } from '../../components/Badge';
import EmptyState from '../../components/EmptyState';

const fmtCurrency = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const paymentMethods = ['PIX', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro'];

export default function Billing() {
  const [list, setList] = useState(billings);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BillingStatus | 'all'>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [payModal, setPayModal] = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState('PIX');

  const filtered = list.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search && !`${b.customer.name} ${b.id} ${b.reservationId}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectedBill = list.find(b => b.id === selected);

  const totalPending = list.filter(b => b.status === 'pending').reduce((s, b) => s + b.total, 0);
  const totalReceived = list.filter(b => b.status === 'paid').reduce((s, b) => s + b.total, 0);
  const countPending = list.filter(b => b.status === 'pending').length;
  const countPaid = list.filter(b => b.status === 'paid').length;

  const stats = [
    { label: 'Relatório Anual', value: fmtCurrency(totalPending), color: '#B45309', bg: '#FEF3C7' },
    { label: 'Relatório Mensal', value: fmtCurrency(totalReceived), color: '#15803D', bg: '#DCFCE7' },
    { label: 'Cobranças pendentes', value: String(countPending), color: '#B45309', bg: '#FEF3C7' },
    { label: 'Cobranças pagas', value: String(countPaid), color: '#15803D', bg: '#DCFCE7' },
  ];

  function handlePay() {
    if (!payModal) return;
    setList(l => l.map(b => b.id === payModal ? { ...b, status: 'paid' as BillingStatus, paymentMethod: payMethod } : b));
    setPayModal(null);
  }

  return (
    <div style={{ padding: '32px 32px 64px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 4 }}>Gestão de Cobranças</h1>
        <p style={{ fontSize: 14, color: '#64748B' }}>Controle financeiro das locações</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }} className="billing-stats">
        {stats.map(s => (
          <div key={s.label} className="stat-card" style={{ padding: 20 }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 22, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <input className="form-input" placeholder="Buscar por cliente ou ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 38 }} />
          </div>
          <select className="form-input" value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)} style={{ appearance: 'none', cursor: 'pointer', width: 'auto' }}>
            <option value="all">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="paid">Paga</option>
            <option value="cancelled">Cancelada</option>
            <option value="failed">Falhou</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <EmptyState icon="💰" title="Nenhuma cobrança encontrada" description="Tente ajustar os filtros." />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['ID', 'Reserva', 'Cliente', 'Valor base', 'Taxas', 'Desconto', 'Total', 'Status', 'Ações'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: '#64748B', textAlign: 'left', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b.id} className="table-row" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={() => setSelected(b.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 13, color: '#0EA5E9' }}>{b.id}</button>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: '#374151' }}>{b.reservationId}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>{b.customer.name}</div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{fmtCurrency(b.dailyValue)}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: b.lateFee + b.additionalFees > 0 ? '#DC2626' : '#374151' }}>
                      {fmtCurrency(b.lateFee + b.additionalFees)}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: b.discounts > 0 ? '#16A34A' : '#374151' }}>
                      {b.discounts > 0 ? `-${fmtCurrency(b.discounts)}` : '-'}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 800, color: '#1E3A5F' }}>{fmtCurrency(b.total)}</td>
                    <td style={{ padding: '14px 16px' }}><BillingBadge status={b.status} /></td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => setSelected(b.id)} style={{ padding: '5px 10px', border: '1px solid #E2E8F0', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 500, color: '#374151' }}>Detalhes</button>
                        {b.status === 'pending' && (
                          <button onClick={() => setPayModal(b.id)} style={{ padding: '5px 10px', border: '1px solid #BBF7D0', background: '#F0FDF4', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#15803D' }}>Registrar pagamento</button>
                        )}
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
      {selectedBill && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} onClick={() => setSelected(null)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 460, background: '#fff', height: '100vh', overflow: 'auto', padding: 32, boxShadow: '-8px 0 32px rgba(0,0,0,0.12)' }} className="slide-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 20, fontWeight: 800, color: '#1F2937' }}>Cobrança {selectedBill.id}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div style={{ marginBottom: 20 }}><BillingBadge status={selectedBill.status} /></div>
            {selectedBill.paymentMethod && (
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>Pago via <strong style={{ color: '#1F2937' }}>{selectedBill.paymentMethod}</strong></div>
            )}

            <section style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Cliente</h3>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1F2937', marginBottom: 2 }}>{selectedBill.customer.name}</div>
              <div style={{ fontSize: 13, color: '#64748B' }}>{selectedBill.customer.email}</div>
            </section>

            <section>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Composição da cobrança</h3>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                {[
                  { label: `Diárias (${selectedBill.reservation.days} dias)`, value: selectedBill.dailyValue, color: '#1F2937' },
                  { label: 'Multa por atraso', value: selectedBill.lateFee, color: selectedBill.lateFee > 0 ? '#DC2626' : '#94A3B8' },
                  { label: 'Danos', value: selectedBill.damages, color: selectedBill.damages > 0 ? '#DC2626' : '#94A3B8' },
                  { label: 'Taxas adicionais', value: selectedBill.additionalFees, color: selectedBill.additionalFees > 0 ? '#DC2626' : '#94A3B8' },
                  { label: 'Descontos', value: -selectedBill.discounts, color: selectedBill.discounts > 0 ? '#16A34A' : '#94A3B8' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #F1F5F9', fontSize: 13 }}>
                    <span style={{ color: '#374151' }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: item.color }}>{item.value !== 0 ? fmtCurrency(Math.abs(item.value)) : '-'}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: '#F8FAFC' }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 15, color: '#1E3A5F' }}>TOTAL</span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 15, color: '#1E3A5F' }}>{fmtCurrency(selectedBill.total)}</span>
                </div>
              </div>
            </section>

            {selectedBill.status === 'pending' && (
              <button className="btn-primary" onClick={() => { setPayModal(selectedBill.id); setSelected(null); }} style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}>
                Registrar pagamento
              </button>
            )}
          </div>
        </div>
      )}

      {/* Payment modal */}
      {payModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setPayModal(null)} />
          <div className="card fade-in" style={{ position: 'relative', padding: 32, maxWidth: 400, width: '100%' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 18, fontWeight: 800, color: '#1F2937', marginBottom: 20 }}>Registrar Pagamento</h3>
            <div style={{ marginBottom: 24 }}>
              <label className="form-label">Forma de pagamento</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {paymentMethods.map(m => (
                  <button key={m} onClick={() => setPayMethod(m)} style={{ padding: '10px 14px', border: `2px solid ${payMethod === m ? '#0EA5E9' : '#E2E8F0'}`, background: payMethod === m ? '#EFF6FF' : '#fff', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: payMethod === m ? '#0369A1' : '#374151', textAlign: 'center', transition: 'all 0.15s' }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 8, padding: 14, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800, color: '#0369A1' }}>
                <span>Total a receber</span>
                <span>{fmtCurrency(list.find(b => b.id === payModal)?.total ?? 0)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setPayModal(null)}>Cancelar</button>
              <button className="btn-primary" onClick={handlePay}>Confirmar pagamento</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) { .billing-stats { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  );
}

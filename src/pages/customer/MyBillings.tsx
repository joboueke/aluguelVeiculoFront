import { useState } from 'react';
import { billings } from '../../data/mock';
import type { BillingStatus } from '../../data/mock';
import { BillingBadge } from '../../components/Badge';
import EmptyState from '../../components/EmptyState';

const fmtCurrency = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const fmtDate = (d: string) => d.split('-').reverse().join('/');

const tabs: { label: string; value: BillingStatus | 'all' }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendentes', value: 'pending' },
  { label: 'Pagas', value: 'paid' },
  { label: 'Canceladas', value: 'cancelled' },
];

const myBillings = billings.filter(b => b.customer.id === 'c1');

export default function MyBillings() {
  const [tab, setTab] = useState<BillingStatus | 'all'>('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = myBillings.filter(b => tab === 'all' || b.status === tab);
  const selectedBill = myBillings.find(b => b.id === selected);

  const totalPaid = myBillings.filter(b => b.status === 'paid').reduce((s, b) => s + b.total, 0);
  const totalPending = myBillings.filter(b => b.status === 'pending').reduce((s, b) => s + b.total, 0);

  return (
    <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)', padding: '40px 24px 64px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: '#1F2937', marginBottom: 4 }}>Minhas Cobranças</h1>
        <p style={{ fontSize: 14, color: '#64748B', marginBottom: 32 }}>Histórico financeiro das suas locações</p>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }} className="billing-summary">
          {/* <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Total pago</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 24, fontWeight: 800, color: '#16A34A' }}>{fmtCurrency(totalPaid)}</div>
          </div> */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Em aberto</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 24, fontWeight: 800, color: '#F59E0B' }}>{fmtCurrency(totalPending)}</div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Total de cobranças</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 24, fontWeight: 800, color: '#1E3A5F' }}>{myBillings.length}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid #E2E8F0' }}>
          {tabs.map(t => (
            <button key={t.value} onClick={() => setTab(t.value)} style={{ padding: '8px 18px', borderRadius: '8px 8px 0 0', border: 'none', background: tab === t.value ? '#1E3A5F' : 'transparent', color: tab === t.value ? '#fff' : '#64748B', fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }}>
              {t.label}
              <span style={{ marginLeft: 6, padding: '1px 6px', borderRadius: 10, background: tab === t.value ? 'rgba(255,255,255,0.2)' : '#F1F5F9', color: tab === t.value ? '#fff' : '#94A3B8', fontSize: 11, fontWeight: 700 }}>
                {myBillings.filter(b => t.value === 'all' || b.status === t.value).length}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon="💰" title="Nenhuma cobrança encontrada" description="Você não possui cobranças nesta categoria." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map(b => (
              <div key={b.id} className="card" style={{ padding: 20, transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = ''}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: b.status === 'paid' ? '#DCFCE7' : b.status === 'pending' ? '#FEF3C7' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {b.status === 'paid' ? '✓' : b.status === 'pending' ? '⏳' : '✗'}
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 14, color: '#0EA5E9' }}>{b.id}</span>
                      <span style={{ fontSize: 12, color: '#64748B' }}>→ Reserva {b.reservationId}</span>
                      <BillingBadge status={b.status} />
                    </div>
                    <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
                      {b.reservation.vehicle.brand} {b.reservation.vehicle.model} · {b.reservation.days} dias · Criada em {fmtDate(b.createdAt)}
                    </p>
                    {b.paymentMethod && (
                      <p style={{ fontSize: 12, color: '#94A3B8', margin: '3px 0 0' }}>Pago via {b.paymentMethod}</p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 20, color: '#1E3A5F', marginBottom: 10 }}>{fmtCurrency(b.total)}</div>
                    <button className="btn-secondary" onClick={() => setSelected(b.id)} style={{ padding: '6px 14px', fontSize: 12 }}>Ver detalhes</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selectedBill && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} onClick={() => setSelected(null)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 440, background: '#fff', height: '100vh', overflow: 'auto', padding: 32, boxShadow: '-8px 0 32px rgba(0,0,0,0.12)' }} className="slide-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 20, fontWeight: 800, color: '#1F2937' }}>Cobrança {selectedBill.id}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>

            <div style={{ marginBottom: 20 }}><BillingBadge status={selectedBill.status} /></div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 14, background: '#F8FAFC', borderRadius: 10, marginBottom: 24 }}>
              <img src={selectedBill.reservation.vehicle.image} alt="" style={{ width: 72, height: 50, borderRadius: 8, objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1F2937' }}>{selectedBill.reservation.vehicle.brand} {selectedBill.reservation.vehicle.model}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>Reserva {selectedBill.reservationId} · {selectedBill.reservation.days} dias</div>
              </div>
            </div>

            <h3 style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Composição</h3>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
              {[
                { label: `Diárias (${selectedBill.reservation.days}×)`, value: selectedBill.dailyValue, color: '#1F2937' },
                { label: 'Multa por atraso', value: selectedBill.lateFee, color: selectedBill.lateFee > 0 ? '#DC2626' : '#94A3B8' },
                { label: 'Danos', value: selectedBill.damages, color: selectedBill.damages > 0 ? '#DC2626' : '#94A3B8' },
                { label: 'Taxas adicionais', value: selectedBill.additionalFees, color: selectedBill.additionalFees > 0 ? '#DC2626' : '#94A3B8' },
                { label: 'Descontos', value: -selectedBill.discounts, color: selectedBill.discounts > 0 ? '#16A34A' : '#94A3B8' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid #F1F5F9', fontSize: 13 }}>
                  <span style={{ color: '#374151' }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: item.color }}>{item.value !== 0 ? fmtCurrency(Math.abs(item.value)) : '—'}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 16px', background: '#F8FAFC' }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 15, color: '#1E3A5F' }}>TOTAL</span>
                <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 15, color: '#1E3A5F' }}>{fmtCurrency(selectedBill.total)}</span>
              </div>
            </div>

            {selectedBill.paymentMethod && (
              <div style={{ background: '#DCFCE7', border: '1px solid #BBF7D0', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>✓</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#15803D' }}>Pagamento confirmado</div>
                  <div style={{ fontSize: 12, color: '#16A34A' }}>Via {selectedBill.paymentMethod}</div>
                </div>
              </div>
            )}

            {selectedBill.status === 'pending' && (
              <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>⏳</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#B45309' }}>Aguardando pagamento</div>
                  <div style={{ fontSize: 12, color: '#92400E' }}>Entre em contato para regularizar</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 600px) { .billing-summary { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

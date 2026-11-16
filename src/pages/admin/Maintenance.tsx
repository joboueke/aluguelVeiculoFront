import { useState, useRef, useEffect } from 'react';
import { maintenances as initialData, vehicles } from '../../data/mock';
import type { Maintenance, MaintenanceStatus, MaintenanceType } from '../../data/mock';
import { MaintenanceBadge, MaintenanceTypeBadge } from '../../components/Badge';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';

const fmtCurrency = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const fmtDate = (d: string) => d.split('-').reverse().join('/');

interface ServiceItem {
  description: string;
  cost: number;
  extraCost: number;
  unexpected: boolean;
}

const enrichedData: (Maintenance & { services2: ServiceItem[]; responsible: string; completedAt?: string })[] = [
  {
    ...initialData[0],
    responsible: 'Carlos Menezes',
    services2: [
      { description: 'Troca de pastilhas de freio dianteiras', cost: 400, extraCost: 0, unexpected: false },
      { description: 'Sangria do sistema de freio', cost: 250, extraCost: 200, unexpected: true },
      { description: 'Verificação do disco', cost: 200, extraCost: 0, unexpected: false },
    ],
  },
  {
    ...initialData[1],
    responsible: 'Fernanda Oliveira',
    services2: [
      { description: 'Troca de óleo', cost: 150, extraCost: 0, unexpected: false },
      { description: 'Troca de filtro de óleo', cost: 80, extraCost: 0, unexpected: false },
      { description: 'Troca de filtro de ar', cost: 90, extraCost: 0, unexpected: false },
    ],
  },
  {
    ...initialData[2],
    responsible: 'Carlos Menezes',
    completedAt: '2025-08-05',
    services2: [
      { description: 'Inspeção de emissões', cost: 120, extraCost: 0, unexpected: false },
      { description: 'Verificação de segurança', cost: 80, extraCost: 0, unexpected: false },
    ],
  },
  {
    ...initialData[3],
    responsible: 'Fernanda Oliveira',
    services2: [
      { description: 'Troca de correia dentada', cost: 700, extraCost: 0, unexpected: false },
      { description: 'Troca de tensor e correia auxiliar', cost: 300, extraCost: 0, unexpected: false },
      { description: 'Revisão completa do motor', cost: 200, extraCost: 0, unexpected: false },
    ],
  },
];

const serviceTypes = ['Troca de óleo', 'Troca de filtros', 'Troca de pastilhas', 'Revisão geral', 'Alinhamento e balanceamento', 'Troca de correia', 'Inspeção veicular', 'Elétrica geral', 'Ar condicionado', 'Suspensão'];

const emptyForm = {
  vehicleId: vehicles[0].id,
  type: 'preventive' as MaintenanceType,
  serviceType: serviceTypes[0],
  description: '',
  mileage: '',
  startDate: '',
  estimatedEnd: '',
  cost: '0',
  status: 'scheduled' as MaintenanceStatus,
};

// 3-dot actions menu
function ActionsMenu({ item, onView, onEdit, onComplete, onCancel }: { item: Maintenance; onView: () => void; onEdit: () => void; onComplete: () => void; onCancel: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isDone = item.status === 'completed' || item.status === 'cancelled';

  const menuItems = [
    { label: 'Ver detalhes', onClick: () => { onView(); setOpen(false); }, color: '#374151' },
    ...(!isDone ? [
      { label: 'Editar', onClick: () => { onEdit(); setOpen(false); }, color: '#374151' },
      { label: 'Concluir', onClick: () => { onComplete(); setOpen(false); }, color: '#15803D' },
      { label: 'Cancelar', onClick: () => { onCancel(); setOpen(false); }, color: '#DC2626' },
    ] : []),
  ];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', transition: 'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
        onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
      </button>

      {open && (
        <div className="fade-in" style={{ position: 'absolute', right: 0, top: 36, minWidth: 168, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 50 }}>
          {menuItems.map((m, i) => (
            <button
              key={i}
              onClick={m.onClick}
              style={{ display: 'block', width: '100%', padding: '10px 14px', border: 'none', background: 'transparent', fontSize: 13, fontWeight: 500, color: m.color, cursor: 'pointer', textAlign: 'left', borderBottom: i < menuItems.length - 1 ? '1px solid #F1F5F9' : 'none', transition: 'background 0.1s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MaintenancePage() {
  const [list, setList] = useState(enrichedData);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<MaintenanceType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<MaintenanceStatus | 'all'>('all');
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [actionModal, setActionModal] = useState<{ type: 'complete' | 'cancel'; id: string } | null>(null);

  const selectedItem = list.find(m => m.id === selected);

  const filtered = list.filter(m => {
    if (typeFilter !== 'all' && m.type !== typeFilter) return false;
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (search && !`${m.vehicle.brand} ${m.vehicle.model} ${m.vehicle.plate}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (periodStart && m.startDate < periodStart) return false;
    if (periodEnd && m.startDate > periodEnd) return false;
    return true;
  });

  const stats = [
    { label: 'Agendadas', value: list.filter(m => m.status === 'scheduled').length, color: '#B45309', bg: '#FEF3C7' },
    { label: 'Em andamento', value: list.filter(m => m.status === 'in_progress').length, color: '#0369A1', bg: '#E0F2FE' },
    { label: 'Concluídas', value: list.filter(m => m.status === 'completed').length, color: '#15803D', bg: '#DCFCE7' },
    { label: 'Total', value: list.length, color: '#1E3A5F', bg: '#EFF6FF' },
  ];

  function openAdd() { setForm({ ...emptyForm }); setEditId(null); setShowForm(true); }
  function openEdit(m: typeof enrichedData[0]) {
    setForm({ vehicleId: m.vehicleId, type: m.type, serviceType: serviceTypes[0], description: m.description, mileage: String(m.mileage), startDate: m.startDate, estimatedEnd: m.estimatedEnd, cost: String(m.cost), status: m.status });
    setEditId(m.id);
    setShowForm(true);
  }

  function handleSave() {
    const vehicle = vehicles.find(v => v.id === form.vehicleId) ?? vehicles[0];
    if (editId) {
      setList(l => l.map(m => m.id === editId ? { ...m, ...form, mileage: Number(form.mileage), cost: Number(form.cost), vehicle } : m));
    } else {
      const newM = {
        id: `M-0${Date.now() % 100}`,
        vehicleId: form.vehicleId,
        vehicle,
        type: form.type,
        description: form.description || form.serviceType,
        mileage: Number(form.mileage),
        startDate: form.startDate,
        estimatedEnd: form.estimatedEnd,
        status: form.status,
        cost: Number(form.cost),
        services: [form.serviceType],
        services2: [],
        responsible: 'Carlos Menezes',
      };
      setList(l => [newM, ...l]);
    }
    setShowForm(false);
  }

  function handleAction() {
    if (!actionModal) return;
    const newStatus: MaintenanceStatus = actionModal.type === 'complete' ? 'completed' : 'cancelled';
    setList(l => l.map(m => m.id === actionModal.id ? { ...m, status: newStatus, ...(actionModal.type === 'complete' ? { completedAt: new Date().toISOString().split('T')[0] } : {}) } : m));
    setActionModal(null);
    if (selected === actionModal.id) setSelected(null);
  }

  const F = ({ label, field, type = 'text', options }: { label: string; field: keyof typeof form; type?: string; options?: { label: string; value: string }[] }) => (
    <div>
      <label className="form-label">{label}</label>
      {options ? (
        <select className="form-input" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} style={{ appearance: 'none', cursor: 'pointer' }}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea className="form-input" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} rows={3} placeholder="Troca de óleo, filtros e revisão geral do veículo." style={{ resize: 'vertical' }} />
      ) : (
        <input type={type} className="form-input" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
      )}
    </div>
  );

  return (
    <div style={{ padding: '32px 32px 64px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 4 }}>Gestão de Manutenções</h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>Acompanhe e gerencie as manutenções da frota</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Nova manutenção</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }} className="maint-stats">
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
          <div style={{ flex: '1 1 200px', position: 'relative' }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <input className="form-input" placeholder="Buscar por veículo ou placa..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 38 }} />
          </div>
          <select className="form-input" value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)} style={{ appearance: 'none', cursor: 'pointer', flex: '0 0 auto' }}>
            <option value="all">Tipo: todos</option>
            <option value="preventive">Preventiva</option>
            <option value="corrective">Corretiva</option>
            <option value="inspection">Inspeção</option>
          </select>
          <select className="form-input" value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)} style={{ appearance: 'none', cursor: 'pointer', flex: '0 0 auto' }}>
            <option value="all">Status: todos</option>
            <option value="scheduled">Agendada</option>
            <option value="in_progress">Em andamento</option>
            <option value="completed">Concluída</option>
            <option value="cancelled">Cancelada</option>
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 auto' }}>
            <input type="date" className="form-input" value={periodStart} onChange={e => setPeriodStart(e.target.value)} style={{ width: 150 }} />
            <span style={{ color: '#94A3B8', fontSize: 13 }}>até</span>
            <input type="date" className="form-input" value={periodEnd} onChange={e => setPeriodEnd(e.target.value)} style={{ width: 150 }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <EmptyState icon="🔧" title="Nenhuma manutenção encontrada" description="Tente ajustar os filtros." action={<button className="btn-primary" onClick={openAdd}>+ Nova manutenção</button>} />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['Código', 'Veículo', 'Placa', 'Tipo', 'Quilometragem', 'Início', 'Previsão', 'Status', 'Custo', 'Ações'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: '#64748B', textAlign: 'left', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => (
                  <tr key={m.id} className="table-row" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={() => setSelected(m.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 13, color: '#0EA5E9' }}>{m.id}</button>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: '#1F2937', whiteSpace: 'nowrap' }}>{m.vehicle.brand} {m.vehicle.model}</td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600, background: '#F1F5F9', padding: '3px 8px', borderRadius: 4 }}>{m.vehicle.plate}</span></td>
                    <td style={{ padding: '14px 16px' }}><MaintenanceTypeBadge type={m.type} /></td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151', whiteSpace: 'nowrap' }}>{m.mileage.toLocaleString('pt-BR')} km</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151', whiteSpace: 'nowrap' }}>{fmtDate(m.startDate)}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151', whiteSpace: 'nowrap' }}>{fmtDate(m.estimatedEnd)}</td>
                    <td style={{ padding: '14px 16px' }}><MaintenanceBadge status={m.status} /></td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: m.cost > 0 ? '#1E3A5F' : '#94A3B8', whiteSpace: 'nowrap' }}>{m.cost > 0 ? fmtCurrency(m.cost) : '—'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <ActionsMenu
                        item={m}
                        onView={() => setSelected(m.id)}
                        onEdit={() => openEdit(m)}
                        onComplete={() => setActionModal({ type: 'complete', id: m.id })}
                        onCancel={() => setActionModal({ type: 'cancel', id: m.id })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selectedItem && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} onClick={() => setSelected(null)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 520, background: '#fff', height: '100vh', overflow: 'auto', padding: 32, boxShadow: '-8px 0 32px rgba(0,0,0,0.12)' }} className="slide-in">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, marginBottom: 4 }}>Manutenção</div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 22, fontWeight: 800, color: '#1F2937' }}>{selectedItem.id}</h2>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', cursor: 'pointer', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>

            {/* Status badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              <MaintenanceBadge status={selectedItem.status} />
              <MaintenanceTypeBadge type={selectedItem.type} />
            </div>

            {/* Vehicle */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 16, background: '#F8FAFC', borderRadius: 12, marginBottom: 24 }}>
              <img src={selectedItem.vehicle.image} alt="" style={{ width: 80, height: 56, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#1F2937', fontFamily: "'Plus Jakarta Sans'" }}>{selectedItem.vehicle.brand} {selectedItem.vehicle.model}</div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Placa: <strong>{selectedItem.vehicle.plate}</strong></div>
              </div>
            </div>

            {/* Details grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                ['Quilometragem', `${selectedItem.mileage.toLocaleString('pt-BR')} km`],
                ['Custo total', fmtCurrency(selectedItem.cost)],
                ['Data de início', fmtDate(selectedItem.startDate)],
                ['Previsão de término', fmtDate(selectedItem.estimatedEnd)],
                ...(selectedItem.completedAt ? [['Data de conclusão', fmtDate(selectedItem.completedAt)]] : []),
                ['Responsável', selectedItem.responsible],
              ].map(([l, v]) => (
                <div key={l} style={{ padding: 12, background: '#F8FAFC', borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{l}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Descrição</div>
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0, padding: '12px 14px', background: '#F8FAFC', borderRadius: 8 }}>{selectedItem.description}</p>
            </div>

            {/* Services realizados */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Serviços realizados</div>
              {selectedItem.services2.length === 0 ? (
                <p style={{ fontSize: 13, color: '#94A3B8', fontStyle: 'italic' }}>Nenhum serviço registrado.</p>
              ) : (
                <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                  {selectedItem.services2.map((s, i) => {
                    const total = s.cost + s.extraCost;
                    return (
                      <div key={i} style={{ padding: '14px 16px', borderBottom: i < selectedItem.services2.length - 1 ? '1px solid #F1F5F9' : 'none', background: s.unexpected ? '#FFFBEB' : '#fff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#1F2937', marginBottom: s.unexpected ? 6 : 0 }}>{s.description}</div>
                            {s.unexpected && (
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: '#B45309', background: '#FEF3C7', padding: '3px 8px', borderRadius: 6 }}>
                                <svg width="11" height="11" fill="none" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>
                                Imprevisto identificado durante a manutenção
                              </div>
                            )}
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1E3A5F' }}>{fmtCurrency(s.cost)}</div>
                            {s.extraCost > 0 && <div style={{ fontSize: 11, color: '#DC2626', fontWeight: 600 }}>+{fmtCurrency(s.extraCost)} adicional</div>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* Total */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: '#1E3A5F' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 14, color: '#fff' }}>Custo total</span>
                    <span style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 14, color: '#0EA5E9' }}>{fmtCurrency(selectedItem.services2.reduce((s, sv) => s + sv.cost + sv.extraCost, 0))}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions for in_progress */}
            {selectedItem.status === 'in_progress' && (
              <div style={{ display: 'flex', gap: 10, borderTop: '1px solid #E2E8F0', paddingTop: 20 }}>
                <button className="btn-secondary" onClick={() => { openEdit(selectedItem); setSelected(null); }} style={{ flex: 1, justifyContent: 'center' }}>Editar</button>
                <button className="btn-primary" onClick={() => { setActionModal({ type: 'complete', id: selectedItem.id }); setSelected(null); }} style={{ flex: 1, justifyContent: 'center' }}>Concluir manutenção</button>
                <button className="btn-danger" onClick={() => { setActionModal({ type: 'cancel', id: selectedItem.id }); setSelected(null); }} style={{ padding: '10px 16px' }}>Cancelar</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowForm(false)} />
          <div className="card fade-in" style={{ position: 'relative', width: '100%', maxWidth: 560, maxHeight: '90vh', overflow: 'auto', padding: 32 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 20, fontWeight: 800, color: '#1F2937', marginBottom: 24 }}>
              {editId ? 'Editar manutenção' : 'Registrar manutenção'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Veículo</label>
                <select className="form-input" value={form.vehicleId} onChange={e => setForm(f => ({ ...f, vehicleId: e.target.value }))} style={{ appearance: 'none', cursor: 'pointer' }}>
                  {vehicles.map(v => <option key={v.id} value={v.id}>{v.brand} {v.model} — {v.plate}</option>)}
                </select>
              </div>
              <F label="Tipo de manutenção" field="type" options={[
                { label: 'Preventiva', value: 'preventive' },
                { label: 'Corretiva', value: 'corrective' },
                { label: 'Inspeção', value: 'inspection' },
              ]} />
              <div>
                <label className="form-label">Tipo de serviço</label>
                <select className="form-input" value={form.serviceType} onChange={e => setForm(f => ({ ...f, serviceType: e.target.value }))} style={{ appearance: 'none', cursor: 'pointer' }}>
                  {serviceTypes.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <F label="Quilometragem (km)" field="mileage" type="number" />
              <F label="Custo estimado (R$)" field="cost" type="number" />
              <F label="Data de início" field="startDate" type="date" />
              <F label="Previsão de término" field="estimatedEnd" type="date" />
              <div style={{ gridColumn: 'span 2' }}>
                <F label="Descrição" field="description" type="textarea" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 28 }}>
              <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancelar</button>
              <button className="btn-primary" onClick={handleSave}>{editId ? 'Salvar alterações' : 'Registrar manutenção'}</button>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={!!actionModal}
        title={actionModal?.type === 'complete' ? 'Concluir manutenção' : 'Cancelar manutenção'}
        message={actionModal?.type === 'complete' ? 'Confirmar a conclusão desta manutenção?' : 'Tem certeza que deseja cancelar esta manutenção? Esta ação não pode ser desfeita.'}
        confirmLabel={actionModal?.type === 'complete' ? 'Concluir' : 'Sim, cancelar'}
        variant={actionModal?.type === 'cancel' ? 'danger' : 'primary'}
        onConfirm={handleAction}
        onCancel={() => setActionModal(null)}
      />

      <style>{`
        @media (max-width: 640px) { .maint-stats { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  );
}

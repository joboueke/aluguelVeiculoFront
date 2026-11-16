import { useState } from 'react';
import { vehicles as initialVehicles } from '../../data/mock';
import type { Vehicle, VehicleStatus } from '../../data/mock';
import { VehicleBadge } from '../../components/Badge';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';
import Pagination from '../../components/Pagination';

const fmtCurrency = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const categories = ['Todos', 'Sedan', 'SUV', 'Hatch', 'Pickup'];
const statuses: { label: string; value: VehicleStatus | 'all' }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Disponível', value: 'available' },
  { label: 'Reservado', value: 'reserved' },
  { label: 'Alugado', value: 'rented' },
  { label: 'Manutenção', value: 'maintenance' },
  { label: 'Inativo', value: 'inactive' },
];

const emptyForm = { plate: '', brand: '', model: '', category: 'Sedan', year: '', modelYear: '', color: '', mileage: '', dailyRate: '', status: 'available' as VehicleStatus };

export default function Vehicles() {
  const [list, setList] = useState(initialVehicles);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [status, setStatus] = useState<VehicleStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [inactivateId, setInactivateId] = useState<string | null>(null);

  const perPage = 6;

  const filtered = list.filter(v => {
    if (search && !`${v.brand} ${v.model} ${v.plate}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'Todos' && v.category !== category) return false;
    if (status !== 'all' && v.status !== status) return false;
    return true;
  });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const stats = [
    { label: 'Total', value: list.length, color: '#1E3A5F' },
    { label: 'Disponíveis', value: list.filter(v => v.status === 'available').length, color: '#16A34A' },
    { label: 'Alugados', value: list.filter(v => v.status === 'rented').length, color: '#0EA5E9' },
    { label: 'Manutenção', value: list.filter(v => v.status === 'maintenance').length, color: '#DC2626' },
  ];

  function openAdd() { setForm({ ...emptyForm }); setEditId(null); setShowModal(true); }
  function openEdit(v: Vehicle) {
    setForm({ plate: v.plate, brand: v.brand, model: v.model, category: v.category, year: String(v.year), modelYear: String(v.modelYear), color: v.color, mileage: String(v.mileage), dailyRate: String(v.dailyRate), status: v.status });
    setEditId(v.id);
    setShowModal(true);
  }

  function handleSave() {
    if (editId) {
      setList(l => l.map(v => v.id === editId ? { ...v, ...form, year: Number(form.year), modelYear: Number(form.modelYear), mileage: Number(form.mileage), dailyRate: Number(form.dailyRate) } : v));
    } else {
      const newV: Vehicle = { id: `v${Date.now()}`, ...form, year: Number(form.year), modelYear: Number(form.modelYear), mileage: Number(form.mileage), dailyRate: Number(form.dailyRate), transmission: 'automatic', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&auto=format' };
      setList(l => [newV, ...l]);
    }
    setShowModal(false);
  }

  function handleInactivate() {
    if (!inactivateId) return;
    setList(l => l.map(v => v.id === inactivateId ? { ...v, status: 'inactive' as VehicleStatus } : v));
    setInactivateId(null);
  }

  const F = ({ label, field, type = 'text', options }: { label: string; field: keyof typeof form; type?: string; options?: string[] }) => (
    <div>
      <label className="form-label">{label}</label>
      {options ? (
        <select className="form-input" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} style={{ appearance: 'none', cursor: 'pointer' }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
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
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 4 }}>Gestão de Veículos</h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>Gerencie a frota de veículos disponíveis</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Cadastrar veículo</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }} className="vehicle-stats">
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
            <input className="form-input" placeholder="Buscar por marca, modelo ou placa..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ paddingLeft: 38 }} />
          </div>
          <select className="form-input" value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} style={{ appearance: 'none', cursor: 'pointer', width: 'auto' }}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="form-input" value={status} onChange={e => { setStatus(e.target.value as typeof status); setPage(1); }} style={{ appearance: 'none', cursor: 'pointer', width: 'auto' }}>
            {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        {paginated.length === 0 ? (
          <EmptyState icon="🚗" title="Nenhum veículo encontrado" description="Tente ajustar os filtros de busca." />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['Veículo', 'Placa', 'Categoria', 'Ano', 'Km', 'Diária', 'Status', 'Ações'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: '#64748B', textAlign: 'left', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((v, i) => (
                  <tr key={v.id} className="table-row" style={{ borderBottom: i < paginated.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={v.image} alt="" style={{ width: 48, height: 34, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: '#1F2937' }}>{v.brand} {v.model}</div>
                          <div style={{ fontSize: 12, color: '#94A3B8' }}>{v.color}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: '#374151', background: '#F1F5F9', padding: '3px 8px', borderRadius: 4 }}>{v.plate}</span></td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{v.category}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{v.year}/{v.modelYear}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{v.mileage.toLocaleString('pt-BR')} km</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: '#1E3A5F' }}>{fmtCurrency(v.dailyRate)}</td>
                    <td style={{ padding: '14px 16px' }}><VehicleBadge status={v.status} /></td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => openEdit(v)} style={{ padding: '5px 10px', border: '1px solid #E2E8F0', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 500, color: '#374151' }}>Editar</button>
                        {v.status !== 'inactive' && (
                          <button onClick={() => setInactivateId(v.id)} style={{ padding: '5px 10px', border: '1px solid #FEE2E2', background: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 500, color: '#DC2626' }}>Inativar</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ padding: '0 16px' }}>
          <Pagination page={page} total={filtered.length} perPage={perPage} onChange={setPage} />
        </div>
      </div>

      {/* Vehicle form modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)' }} onClick={() => setShowModal(false)} />
          <div className="card fade-in" style={{ position: 'relative', width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'auto', padding: 32 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 20, fontWeight: 800, color: '#1F2937', marginBottom: 24 }}>
              {editId ? 'Editar veículo' : 'Cadastrar veículo'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <F label="Placa" field="plate" />
              <F label="Cor" field="color" />
              <F label="Marca" field="brand" />
              <F label="Modelo" field="model" />
              <F label="Categoria" field="category" options={['Sedan', 'SUV', 'Hatch', 'Pickup']} />
              <F label="Status" field="status" options={['Disponível', 'Inativo']} />
              <F label="Ano de fabricação" field="year" type="number" />
              <F label="Ano do modelo" field="modelYear" type="number" />
              <F label="Quilometragem (km)" field="mileage" type="number" />
              <F label="Valor da diária (R$)" field="dailyRate" type="number" />
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 28 }}>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={handleSave}>{editId ? 'Salvar alterações' : 'Cadastrar'}</button>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={!!inactivateId}
        title="Inativar veículo"
        message="Tem certeza que deseja inativar este veículo? Ele ficará indisponível para novas reservas."
        confirmLabel="Inativar"
        variant="danger"
        onConfirm={handleInactivate}
        onCancel={() => setInactivateId(null)}
      />

      <style>{`
        @media (max-width: 640px) { .vehicle-stats { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  );
}

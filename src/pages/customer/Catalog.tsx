import { useState } from 'react';
import { useNavigate } from 'react-router';
import { vehicles } from '../../data/mock';
import { VehicleBadge } from '../../components/Badge';
import EmptyState from '../../components/EmptyState';

const categories = ['Todos', 'Sedan', 'SUV', 'Hatch', 'Pickup'];
const brands = ['Todas', 'Toyota', 'Honda', 'Volkswagen', 'Fiat', 'Chevrolet', 'Hyundai', 'Jeep'];

export default function Catalog() {
  const navigate = useNavigate();
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [category, setCategory] = useState('Todos');
  const [brand, setBrand] = useState('Todas');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState('default');
  const [searched, setSearched] = useState(true);

  const filtered = vehicles.filter(v => {
    if (category !== 'Todos' && v.category !== category) return false;
    if (brand !== 'Todas' && v.brand !== brand) return false;
    if (minPrice && v.dailyRate < Number(minPrice)) return false;
    if (maxPrice && v.dailyRate > Number(maxPrice)) return false;
    if (onlyAvailable && v.status !== 'available') return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'price_asc') return a.dailyRate - b.dailyRate;
    if (sort === 'price_desc') return b.dailyRate - a.dailyRate;
    if (sort === 'newest') return b.year - a.year;
    return 0;
  });

  const fmtCurrency = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      {/* Hero search */}
      <div style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #254870 100%)', padding: '56px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 8, textAlign: 'center' }}>Encontre o veículo ideal para sua viagem</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', textAlign: 'center', marginBottom: 36 }}>Escolha entre nossa frota de veículos modernos e bem conservados</p>

          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, alignItems: 'end' }}>
              <div>
                <label className="form-label">Data de retirada</label>
                <input type="date" className="form-input" value={pickupDate} onChange={e => setPickupDate(e.target.value)} />
              </div>
              <div>
                <label className="form-label">Data de devolução</label>
                <input type="date" className="form-input" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
              </div>
              <div>
                <label className="form-label">Categoria</label>
                <select className="form-input" value={category} onChange={e => setCategory(e.target.value)} style={{ appearance: 'none', cursor: 'pointer' }}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Marca</label>
                <select className="form-input" value={brand} onChange={e => setBrand(e.target.value)} style={{ appearance: 'none', cursor: 'pointer' }}>
                  {brands.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Preço máx. / dia</label>
                <input type="number" className="form-input" placeholder="R$ 500" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', paddingTop: 20 }}>
                  <input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)} style={{ width: 16, height: 16, accentColor: '#0EA5E9' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Apenas disponíveis</span>
                </label>
                <button className="btn-primary" onClick={() => setSearched(true)} style={{ width: '100%', justifyContent: 'center', padding: '11px' }}>
                  Buscar veículos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700, color: '#1F2937', marginBottom: 2 }}>
              {filtered.length} {filtered.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}
            </h2>
            {(category !== 'Todos' || brand !== 'Todas') && (
              <p style={{ fontSize: 13, color: '#64748B' }}>
                {category !== 'Todos' && `Categoria: ${category}`}
                {category !== 'Todos' && brand !== 'Todas' && ' · '}
                {brand !== 'Todas' && `Marca: ${brand}`}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>Ordenar por:</span>
            <select className="form-input" value={sort} onChange={e => setSort(e.target.value)} style={{ appearance: 'none', cursor: 'pointer', width: 'auto', paddingRight: 32 }}>
              <option value="default">Relevância</option>
              <option value="price_asc">Menor preço</option>
              <option value="price_desc">Maior preço</option>
              <option value="newest">Mais recentes</option>
            </select>
          </div>
        </div>

        {searched && filtered.length === 0 ? (
          <EmptyState
            icon="🚗"
            title="Nenhum veículo encontrado"
            description="Não encontramos veículos com os filtros selecionados. Tente ajustar os critérios de busca."
            action={<button className="btn-primary" onClick={() => { setCategory('Todos'); setBrand('Todas'); setMaxPrice(''); setOnlyAvailable(false); }}>Limpar filtros</button>}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map(vehicle => (
              <div key={vehicle.id} className="card fade-in" style={{ overflow: 'hidden', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = ''; (e.currentTarget as HTMLDivElement).style.transform = ''; }}
              >
                <div style={{ position: 'relative', height: 200, background: '#E2E8F0', overflow: 'hidden' }}>
                  <img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <VehicleBadge status={vehicle.status} />
                  </div>
                  <div style={{ position: 'absolute', top: 12, left: 12, background: '#1E3A5F', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, fontFamily: "'Plus Jakarta Sans'" }}>
                    {vehicle.category}
                  </div>
                </div>
                <div style={{ padding: '20px 20px 16px' }}>
                  <div style={{ marginBottom: 12 }}>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, color: '#1F2937', marginBottom: 2 }}>{vehicle.brand} {vehicle.model}</h3>
                    <p style={{ fontSize: 13, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>{vehicle.category}</span>
                      <span style={{ color: '#CBD5E1' }}>•</span>
                      <span style={{ textTransform: 'capitalize' }}>{vehicle.transmission === 'automatic' ? 'Automático' : 'Manual'}</span>
                      <span style={{ color: '#CBD5E1' }}>•</span>
                      <span>{vehicle.year}</span>
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: '#1E3A5F' }}>{fmtCurrency(vehicle.dailyRate)}</span>
                    <span style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>/ dia</span>
                  </div>

                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 14, marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#94A3B8' }}>{vehicle.mileage.toLocaleString('pt-BR')} km</span>
                    <button
                      className="btn-primary"
                      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                      style={{ padding: '8px 16px', fontSize: 13 }}
                    >
                      Ver detalhes →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

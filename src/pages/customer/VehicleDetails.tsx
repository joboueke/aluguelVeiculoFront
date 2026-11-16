import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { vehicles } from '../../data/mock';
import { VehicleBadge } from '../../components/Badge';

function diffDays(a: string, b: string) {
  if (!a || !b) return 0;
  return Math.max(0, Math.ceil((new Date(b).getTime() - new Date(a).getTime()) / 86400000));
}

const imgs = [
  'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&h=600&fit=crop&auto=format',
];

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find(v => v.id === id) ?? vehicles[0];

  const [activeImg, setActiveImg] = useState(0);
  const [pickup, setPickup] = useState('');
  const [returnD, setReturnD] = useState('');
  const [pickupErr, setPickupErr] = useState('');
  const [returnErr, setReturnErr] = useState('');

  const days = diffDays(pickup, returnD);
  const total = days * vehicle.dailyRate;
  const isAvailable = vehicle.status === 'available';

  const fmtCurrency = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const galleryImgs = [vehicle.image, ...imgs.slice(1, 4)];

  function handleReserve() {
    let hasErr = false;
    if (!pickup) { setPickupErr('Selecione a data de retirada.'); hasErr = true; } else setPickupErr('');
    if (!returnD) { setReturnErr('Selecione a data de devolução.'); hasErr = true; }
    else if (days <= 0) { setReturnErr('A devolução deve ser após a retirada.'); hasErr = true; }
    else setReturnErr('');
    if (hasErr) return;
    navigate('/new-reservation', { state: { vehicleId: vehicle.id, pickup, returnD, days, total } });
  }

  const specs = [
    { label: 'Marca', value: vehicle.brand },
    { label: 'Modelo', value: vehicle.model },
    { label: 'Ano', value: `${vehicle.year}/${vehicle.modelYear}` },
    { label: 'Cor', value: vehicle.color },
    { label: 'Categoria', value: vehicle.category },
    { label: 'Transmissão', value: vehicle.transmission === 'automatic' ? 'Automático' : 'Manual' },
    { label: 'Quilometragem', value: `${vehicle.mileage.toLocaleString('pt-BR')} km` },
    { label: 'Placa', value: vehicle.plate },
  ];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '32px 0 64px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, fontSize: 13, color: '#64748B' }}>
          <Link to="/vehicles" style={{ color: '#0EA5E9', textDecoration: 'none', fontWeight: 500 }}>Veículos</Link>
          <span>›</span>
          <span>{vehicle.brand} {vehicle.model}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }} className="details-grid">
          {/* Left */}
          <div>
            {/* Gallery */}
            <div className="card" style={{ overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ height: 400, background: '#E2E8F0', position: 'relative', overflow: 'hidden' }}>
                <img src={galleryImgs[activeImg]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 16, left: 16 }}>
                  <VehicleBadge status={vehicle.status} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, padding: '12px 16px' }}>
                {galleryImgs.map((img, i) => (
                  <div key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 52, borderRadius: 6, overflow: 'hidden', cursor: 'pointer', border: i === activeImg ? '2px solid #0EA5E9' : '2px solid transparent', flexShrink: 0, transition: 'border-color 0.15s' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: '#1F2937', marginBottom: 4 }}>{vehicle.brand} {vehicle.model}</h1>
                  <p style={{ fontSize: 14, color: '#64748B' }}>{vehicle.category} · {vehicle.year} · {vehicle.color}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: '#1E3A5F' }}>{fmtCurrency(vehicle.dailyRate)}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>por dia</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                {specs.map((spec, i) => (
                  <div key={i} style={{ padding: '14px 18px', borderBottom: i < specs.length - 2 ? '1px solid #E2E8F0' : 'none', borderRight: i % 2 === 0 ? '1px solid #E2E8F0' : 'none', background: i % 4 < 2 ? '#fff' : '#FAFBFC' }}>
                    <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{spec.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — booking card */}
          <div style={{ position: 'sticky', top: 80 }}>
            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#1F2937', marginBottom: 20 }}>Fazer Reserva</h2>

              {isAvailable ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                    <div>
                      <label className="form-label">Data de retirada</label>
                      <input type="date" className={`form-input${pickupErr ? ' error' : ''}`} value={pickup} onChange={e => setPickup(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                      {pickupErr && <p style={{ fontSize: 12, color: '#DC2626', marginTop: 4 }}>{pickupErr}</p>}
                    </div>
                    <div>
                      <label className="form-label">Data de devolução</label>
                      <input type="date" className={`form-input${returnErr ? ' error' : ''}`} value={returnD} onChange={e => setReturnD(e.target.value)} min={pickup || new Date().toISOString().split('T')[0]} />
                      {returnErr && <p style={{ fontSize: 12, color: '#DC2626', marginTop: 4 }}>{returnErr}</p>}
                    </div>
                  </div>

                  {days > 0 && (
                    <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 10, padding: 16, marginBottom: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#374151' }}>
                        <span>{fmtCurrency(vehicle.dailyRate)} × {days} {days === 1 ? 'dia' : 'dias'}</span>
                        <span style={{ fontWeight: 600 }}>{fmtCurrency(total)}</span>
                      </div>
                      <div style={{ height: 1, background: '#BAE6FD', margin: '10px 0' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: '#0369A1' }}>
                        <span>Valor estimado</span>
                        <span>{fmtCurrency(total)}</span>
                      </div>
                    </div>
                  )}

                  <button className="btn-primary" onClick={handleReserve} style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15 }}>
                    Reservar veículo
                  </button>
                  <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center', marginTop: 12 }}>Sem cobrança imediata · Cancele gratuitamente</p>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🚫</div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: '#1F2937', marginBottom: 8 }}>Veículo indisponível</h3>
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>Este veículo não está disponível no momento. Confira outros veículos similares ou tente novamente mais tarde.</p>
                  <Link to="/vehicles" style={{ display: 'inline-block', marginTop: 20 }}>
                    <button className="btn-secondary" style={{ fontSize: 13 }}>Ver outros veículos</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .details-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

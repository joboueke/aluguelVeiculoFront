import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { vehicles, currentCustomer } from '../../data/mock';

export default function NewReservation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const vehicleId = state?.vehicleId ?? 'v1';
  const pickup = state?.pickup ?? '2025-09-18';
  const returnD = state?.returnD ?? '2025-09-22';
  const days = state?.days ?? 4;
  const vehicle = vehicles.find(v => v.id === vehicleId) ?? vehicles[0];
  const total = days * vehicle.dailyRate;
  const fmtCurrency = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const fmtDate = (d: string) => d ? new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) : '-';

  function handleConfirm() {
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1400);
  }

  if (success) return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="card fade-in" style={{ padding: 48, maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36 }}>✓</div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 8 }}>Reserva confirmada!</h2>
        <p style={{ fontSize: 15, color: '#64748B', marginBottom: 8 }}>Número da reserva</p>
        <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 10, padding: '12px 20px', marginBottom: 28, display: 'inline-block' }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: '#0369A1', letterSpacing: 2 }}>R-{String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}</span>
        </div>
        <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, marginBottom: 32 }}>
          Sua reserva para o <strong>{vehicle.brand} {vehicle.model}</strong> foi registrada com sucesso. Em breve você receberá a confirmação por e-mail.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/my-reservations" style={{ flex: 1, textDecoration: 'none' }}>
            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Minhas reservas</button>
          </Link>
          <Link to="/vehicles" style={{ flex: 1, textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Início</button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)', padding: '40px 24px 64px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 13, color: '#64748B' }}>
          <Link to="/vehicles" style={{ color: '#0EA5E9', textDecoration: 'none', fontWeight: 500 }}>Veículos</Link>
          <span>›</span>
          <Link to={`/vehicles/${vehicleId}`} style={{ color: '#0EA5E9', textDecoration: 'none', fontWeight: 500 }}>{vehicle.brand} {vehicle.model}</Link>
          <span>›</span>
          <span>Nova Reserva</span>
        </div>

        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 28 }}>Confirmar Reserva</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }} className="reservation-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Vehicle summary */}
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Veículo</h2>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 100, height: 72, borderRadius: 10, overflow: 'hidden', background: '#E2E8F0', flexShrink: 0 }}>
                  <img src={vehicle.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 800, color: '#1F2937', marginBottom: 2 }}>{vehicle.brand} {vehicle.model}</h3>
                  <p style={{ fontSize: 13, color: '#64748B' }}>{vehicle.category} · {vehicle.transmission === 'automatic' ? 'Automático' : 'Manual'} · {vehicle.year}</p>
                  <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Placa: {vehicle.plate}</p>
                </div>
              </div>
            </div>

            {/* Period */}
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Período</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Retirada</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#1F2937', lineHeight: 1.4 }}>{fmtDate(pickup)}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>09:00</div>
                </div>
                <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Devolução</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, color: '#1F2937', lineHeight: 1.4 }}>{fmtDate(returnD)}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>09:00</div>
                </div>
              </div>
              <div style={{ marginTop: 12, padding: '10px 16px', background: '#EFF6FF', borderRadius: 8, textAlign: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1D4ED8' }}>{days} {days === 1 ? 'dia' : 'dias'} de locação</span>
              </div>
            </div>

            {/* Customer */}
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Dados do Cliente</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Nome', value: currentCustomer.name },
                  { label: 'E-mail', value: currentCustomer.email },
                  { label: 'Telefone', value: currentCustomer.phone },
                  { label: 'CPF', value: currentCustomer.cpf },
                  { label: 'CNH', value: currentCustomer.cnhNumber },
                  { label: 'Validade CNH', value: new Date(currentCustomer.cnhExpiry).toLocaleDateString('pt-BR') },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#1F2937' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agreement */}
            <div className="card" style={{ padding: 24 }}>
              <label style={{ display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#0EA5E9', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
                  Confirmo que os dados da reserva estão corretos e concordo com os{' '}
                  <span style={{ color: '#0EA5E9', fontWeight: 600, cursor: 'pointer' }}>termos de locação</span>{' '}
                  da RentCar.
                </span>
              </label>
            </div>
          </div>

          {/* Right — summary */}
          <div style={{ position: 'sticky', top: 80 }}>
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: '#1F2937', marginBottom: 20 }}>Resumo do Pagamento</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#374151' }}>
                  <span>Diária</span>
                  <span style={{ fontWeight: 500 }}>{fmtCurrency(vehicle.dailyRate)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#374151' }}>
                  <span>Quantidade de dias</span>
                  <span style={{ fontWeight: 500 }}>{days}</span>
                </div>
                <div style={{ height: 1, background: '#E2E8F0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, color: '#1E3A5F', fontFamily: "'Plus Jakarta Sans'" }}>
                  <span>Total estimado</span>
                  <span>{fmtCurrency(total)}</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 20, lineHeight: 1.5 }}>O valor exato pode variar de acordo com a quilometragem percorrida e eventuais taxas adicionais.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  className="btn-primary"
                  onClick={handleConfirm}
                  disabled={!agreed || loading}
                  style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15, opacity: agreed ? 1 : 0.5 }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                      Processando...
                    </span>
                  ) : 'Confirmar reserva'}
                </button>
                <button className="btn-secondary" onClick={() => navigate(-1)} style={{ width: '100%', justifyContent: 'center' }}>← Voltar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .reservation-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

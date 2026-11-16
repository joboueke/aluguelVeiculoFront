import { useState } from 'react';

const initial = {
  name: 'Ana Carolina Ferreira',
  email: 'ana.ferreira@email.com',
  phone: '(11) 99234-5678',
  cpf: '123.456.789-00',
  birthDate: '1995-04-12',
  cnhNumber: '98765432100',
  cnhExpiry: '2027-04-12',
  address: 'Rua das Flores, 142, Apto 31',
  city: 'São Paulo',
  state: 'SP',
  zip: '01310-100',
};

function mask(value: string, pattern: string) {
  let i = 0;
  const v = value.replace(/\D/g, '');
  return pattern.replace(/#/g, () => v[i++] || '').replace(/[#-]+$/, '');
}

type Tab = 'personal' | 'security' | 'preferences';

export default function Profile() {
  const [tab, setTab] = useState<Tab>('personal');
  const [form, setForm] = useState({ ...initial });
  const [saved, setSaved] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState('');
  const [notifications, setNotifications] = useState({ email: true, sms: false, reservationStatus: true, billing: true, promotions: false });

  function set(field: keyof typeof form, value: string) {
    setSaved(false);
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleSavePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError('');
    if (!passwords.current) { setPwError('Informe a senha atual.'); return; }
    if (passwords.next.length < 8) { setPwError('A nova senha deve ter ao menos 8 caracteres.'); return; }
    if (passwords.next !== passwords.confirm) { setPwError('As senhas não coincidem.'); return; }
    setPwSaved(true);
    setPasswords({ current: '', next: '', confirm: '' });
    setTimeout(() => setPwSaved(false), 3000);
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'personal', label: 'Dados pessoais', icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { key: 'security', label: 'Segurança', icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { key: 'preferences', label: 'Preferências', icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/></svg> },
  ];

  const Field = ({ label, value, field, type = 'text', maskFn, readOnly }: { label: string; value: string; field: keyof typeof form; type?: string; maskFn?: (v: string) => string; readOnly?: boolean }) => (
    <div>
      <label className="form-label">{label}</label>
      <input type={type} className="form-input" value={value} readOnly={readOnly} onChange={readOnly ? undefined : e => set(field, maskFn ? maskFn(e.target.value) : e.target.value)} style={readOnly ? { background: '#F8FAFC', color: '#94A3B8', cursor: 'not-allowed' } : {}} />
    </div>
  );

  return (
    <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 64px)', padding: '40px 24px 64px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* Profile header */}
        <div className="card" style={{ padding: 28, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #0EA5E9 0%, #1E3A5F 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 28, color: '#fff', flexShrink: 0 }}>AC</div>
            <button style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%', background: '#0EA5E9', border: '2px solid #fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 800, color: '#1F2937', marginBottom: 3 }}>{form.name}</h1>
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 8 }}>{form.email}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, background: '#EFF6FF', color: '#0369A1', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>Cliente desde 2024</span>
              <span style={{ fontSize: 12, background: '#DCFCE7', color: '#15803D', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>✓ CNH válida</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, textAlign: 'center' }}>
            {[['3', 'Reservas'], ['2', 'Concluídas'], ['R$ 1.840', 'Total pago']].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 20, color: '#1E3A5F' }}>{val}</div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid #E2E8F0' }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 18px', borderRadius: '8px 8px 0 0', border: 'none', background: tab === t.key ? '#1E3A5F' : 'transparent', color: tab === t.key ? '#fff' : '#64748B', fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Personal data */}
        {tab === 'personal' && (
          <form onSubmit={handleSaveProfile} className="fade-in">
            <div className="card" style={{ padding: 28, marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 14, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Informações pessoais</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="profile-grid">
                <div style={{ gridColumn: 'span 2' }} className="profile-span">
                  <Field label="Nome completo" field="name" value={form.name} />
                </div>
                <Field label="CPF" field="cpf" value={form.cpf} readOnly />
                <Field label="Data de nascimento" field="birthDate" value={form.birthDate} type="date" />
                <Field label="E-mail" field="email" value={form.email} type="email" />
                <Field label="Telefone" field="phone" value={form.phone} maskFn={v => mask(v, '(##) #####-####')} />
              </div>
            </div>

            <div className="card" style={{ padding: 28, marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 14, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Habilitação (CNH)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="profile-grid">
                <Field label="Número da CNH" field="cnhNumber" value={form.cnhNumber} />
                <Field label="Validade da CNH" field="cnhExpiry" value={form.cnhExpiry} type="date" />
              </div>
            </div>

            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 14, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Endereço</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="profile-grid">
                <div style={{ gridColumn: 'span 2' }} className="profile-span">
                  <Field label="Logradouro e número" field="address" value={form.address} />
                </div>
                <Field label="Cidade" field="city" value={form.city} />
                <Field label="Estado" field="state" value={form.state} />
                <Field label="CEP" field="zip" value={form.zip} maskFn={v => mask(v, '#####-###')} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'flex-end' }}>
              {saved && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16A34A', fontSize: 14, fontWeight: 600 }} className="fade-in">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Salvo com sucesso!
                </div>
              )}
              <button type="submit" className="btn-primary" style={{ padding: '11px 28px' }}>Salvar alterações</button>
            </div>
          </form>
        )}

        {/* Security */}
        {tab === 'security' && (
          <div className="fade-in">
            <form onSubmit={handleSavePassword}>
              <div className="card" style={{ padding: 28, marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 14, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Alterar senha</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
                  <div>
                    <label className="form-label">Senha atual</label>
                    <input type="password" className="form-input" value={passwords.current} onChange={e => { setPasswords(p => ({ ...p, current: e.target.value })); setPwError(''); setPwSaved(false); }} placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="form-label">Nova senha</label>
                    <input type="password" className="form-input" value={passwords.next} onChange={e => { setPasswords(p => ({ ...p, next: e.target.value })); setPwError(''); }} placeholder="Mínimo 8 caracteres" />
                    {passwords.next && (
                      <div style={{ marginTop: 8, display: 'flex', gap: 6, alignItems: 'center' }}>
                        {[4, 6, 8, 10].map((min, i) => (
                          <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: passwords.next.length >= min ? (passwords.next.length >= 10 ? '#16A34A' : passwords.next.length >= 8 ? '#F59E0B' : '#DC2626') : '#E2E8F0', transition: 'background 0.2s' }} />
                        ))}
                        <span style={{ fontSize: 11, color: '#64748B', marginLeft: 4 }}>
                          {passwords.next.length >= 10 ? 'Forte' : passwords.next.length >= 8 ? 'Média' : 'Fraca'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Confirmar nova senha</label>
                    <input type="password" className="form-input" value={passwords.confirm} onChange={e => { setPasswords(p => ({ ...p, confirm: e.target.value })); setPwError(''); }} placeholder="Repita a nova senha" />
                  </div>
                  {pwError && <p style={{ fontSize: 13, color: '#DC2626', margin: 0 }}>{pwError}</p>}
                  {pwSaved && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16A34A', fontSize: 13, fontWeight: 600 }} className="fade-in">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Senha alterada com sucesso!
                    </div>
                  )}
                  <div>
                    <button type="submit" className="btn-primary" style={{ padding: '11px 28px' }}>Alterar senha</button>
                  </div>
                </div>
              </div>
            </form>

            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 14, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Sessões ativas</h2>
              {[
                { device: 'Chrome · macOS', location: 'São Paulo, SP', time: 'Agora', current: true },
                { device: 'Safari · iPhone 14', location: 'São Paulo, SP', time: 'Há 2 horas', current: false },
                { device: 'Firefox · Windows 11', location: 'Campinas, SP', time: 'Há 3 dias', current: false },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: s.current ? '#EFF6FF' : '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {s.device.includes('iPhone') ? '📱' : '💻'}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', display: 'flex', alignItems: 'center', gap: 8 }}>
                        {s.device}
                        {s.current && <span style={{ fontSize: 11, background: '#DCFCE7', color: '#15803D', fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>Atual</span>}
                      </div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>{s.location} · {s.time}</div>
                    </div>
                  </div>
                  {!s.current && (
                    <button style={{ fontSize: 12, fontWeight: 600, color: '#DC2626', background: 'transparent', border: '1px solid #FEE2E2', padding: '5px 12px', borderRadius: 6, cursor: 'pointer' }}>Encerrar</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preferences */}
        {tab === 'preferences' && (
          <div className="fade-in">
            <div className="card" style={{ padding: 28, marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 14, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Notificações</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {([
                  { key: 'email', label: 'E-mail', desc: 'Receber notificações por e-mail' },
                  { key: 'sms', label: 'SMS', desc: 'Receber mensagens de texto no celular' },
                  { key: 'reservationStatus', label: 'Status de reserva', desc: 'Atualização sobre confirmações, retiradas e devoluções' },
                  { key: 'billing', label: 'Cobranças', desc: 'Avisos de pagamento e vencimento' },
                  { key: 'promotions', label: 'Promoções', desc: 'Ofertas e descontos especiais da RentCar' },
                ] as { key: keyof typeof notifications; label: string; desc: string }[]).map((item, i, arr) => (
                  <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1F2937', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>{item.desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))}
                      style={{ width: 44, height: 24, borderRadius: 12, background: notifications[item.key] ? '#0EA5E9' : '#E2E8F0', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}
                    >
                      <span style={{ position: 'absolute', top: 2, left: notifications[item.key] ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s', display: 'block' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 14, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Preferências de locação</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="profile-grid">
                <div>
                  <label className="form-label">Categoria preferida</label>
                  <select className="form-input" defaultValue="SUV" style={{ appearance: 'none', cursor: 'pointer' }}>
                    {['Sedan', 'SUV', 'Hatch', 'Pickup'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Transmissão preferida</label>
                  <select className="form-input" defaultValue="Automático" style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option>Automático</option>
                    <option>Manual</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-primary" style={{ padding: '11px 28px' }}>Salvar preferências</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .profile-grid { grid-template-columns: 1fr !important; }
          .profile-span { grid-column: span 1 !important; }
        }
      `}</style>
    </div>
  );
}

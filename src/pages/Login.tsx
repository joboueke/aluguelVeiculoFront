import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

// Demo credentials — type determines redirect
const DEMO_USERS = [
  { email: 'cliente@rentcar.com',      password: '123456', type: 1, name: 'Ana Carolina' },
  { email: 'funcionario@rentcar.com',  password: '123456', type: 2, name: 'Carlos Menezes' },
  { email: 'admin@rentcar.com',        password: '123456', type: 3, name: 'Administrador' },
];

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.email) e.email = 'O e-mail é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Informe um e-mail válido.';
    if (!form.password) e.password = 'A senha é obrigatória.';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const match = DEMO_USERS.find(u => u.email === form.email && u.password === form.password);
      if (!match) {
        // Any unrecognised email → treat as cliente
        navigate('/vehicles');
        return;
      }
      if (match.type === 1) navigate('/vehicles');
      else navigate('/admin/dashboard');
    }, 900);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#F8FAFC' }}>
      {/* Left decorative panel */}
      <div style={{ background: '#1E3A5F', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 56px', position: 'relative', overflow: 'hidden' }} className="login-left">
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(14,165,233,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -120, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(14,165,233,0.06)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 }}>
            <div style={{ width: 40, height: 40, background: '#0EA5E9', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><rect x="9" y="11" width="14" height="10" rx="2" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="21" r="1" fill="#fff"/><circle cx="20" cy="21" r="1" fill="#fff"/></svg>
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 26, color: '#fff', letterSpacing: '-0.5px' }}>RentCar</span>
          </div>

          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>Mobilidade simples.<br />Confiança garantida.</h2>
          <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.7, marginBottom: 48 }}>Alugue o veículo ideal para cada momento com segurança, agilidade e sem burocracia.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              'Mais de 200 veículos disponíveis',
              'Reserva em menos de 2 minutos',
              'Suporte 24 horas por dia',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(14,165,233,0.2)', color: '#0EA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>✓</div>
                <span style={{ fontSize: 14, color: '#CBD5E1', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px' }}>
        <div style={{ width: '100%', maxWidth: 400 }} className="fade-in">
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: '#1F2937', marginBottom: 6 }}>Bem-vindo de volta</h1>
            <p style={{ fontSize: 14, color: '#64748B' }}>Entre para acessar sua conta</p>
          </div>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Email */}
            <div>
              <label className="form-label">E-mail <span style={{ color: '#DC2626' }}>*</span></label>
              <input
                type="email"
                className={`form-input${errors.email ? ' error' : ''}`}
                placeholder="seu@email.com"
                value={form.email}
                onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(x => { const n = {...x}; delete n.email; return n; }); }}
              />
              {errors.email && <p style={{ fontSize: 12, color: '#DC2626', marginTop: 4 }}>{errors.email}</p>}
            </div>

            {/* Password with toggle */}
            <div>
              <label className="form-label">Senha <span style={{ color: '#DC2626' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  className={`form-input${errors.password ? ' error' : ''}`}
                  placeholder="••••••••"
                  value={form.password}
                  style={{ paddingRight: 44 }}
                  onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors(x => { const n = {...x}; delete n.password; return n; }); }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', padding: 4 }}
                  tabIndex={-1}
                  aria-label={showPw ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPw ? (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  ) : (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  )}
                </button>
              </div>
              {errors.password && <p style={{ fontSize: 12, color: '#DC2626', marginTop: 4 }}>{errors.password}</p>}
            </div>

            {/* Remember + forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} style={{ width: 16, height: 16, accentColor: '#0EA5E9' }} />
                <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>Lembrar de mim</span>
              </label>
              <Link to="/forgot-password" style={{ fontSize: 13, color: '#0EA5E9', fontWeight: 600, textDecoration: 'none' }}>Esqueci minha senha</Link>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15, marginTop: 4 }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  Entrando...
                </span>
              ) : 'Entrar'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 13, color: '#64748B' }}>
              Não possui uma conta?{' '}
              <Link to="/register" style={{ color: '#0EA5E9', fontWeight: 600, textDecoration: 'none' }}>Cadastre-se</Link>
            </p>

            {/* Demo hint */}
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 8, padding: '12px 14px' }}>
              <p style={{ fontSize: 12, color: '#0369A1', margin: 0, lineHeight: 1.6 }}>
                <strong>Demo:</strong><br />
                Cliente → <code>cliente@rentcar.com</code><br />
                Funcionário → <code>funcionario@rentcar.com</code><br />
                Admin → <code>admin@rentcar.com</code><br />
                Senha: <code>123456</code>
              </p>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-left { display: none !important; }
          div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

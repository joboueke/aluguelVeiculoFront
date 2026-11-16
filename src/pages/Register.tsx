import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

function mask(value: string, pattern: string) {
  let i = 0;
  const v = value.replace(/\D/g, '');
  return pattern.replace(/#/g, () => v[i++] || '').replace(/[#-]+$/, '');
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', cpf: '', birthDate: '', email: '', phone: '', cnhNumber: '', cnhExpiry: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nome obrigatório.';
    if (!form.cpf || form.cpf.replace(/\D/g, '').length < 11) e.cpf = 'CPF inválido.';
    if (!form.birthDate) e.birthDate = 'Data de nascimento obrigatória.';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'E-mail inválido.';
    if (!form.phone || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Telefone inválido.';
    if (!form.cnhNumber || form.cnhNumber.length < 9) e.cnhNumber = 'Número da CNH inválido.';
    if (!form.cnhExpiry) e.cnhExpiry = 'Validade da CNH obrigatória.';
    if (!form.password || form.password.length < 8) e.password = 'Senha deve ter ao menos 8 caracteres.';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'As senhas não coincidem.';
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1200);
  }

  const Field = ({ label, field, type = 'text', placeholder, maskFn }: { label: string; field: keyof typeof form; type?: string; placeholder?: string; maskFn?: (v: string) => string }) => (
    <div>
      <label className="form-label">{label} <span style={{ color: '#DC2626' }}>*</span></label>
      <input
        type={type}
        className={`form-input${errors[field] ? ' error' : ''}`}
        placeholder={placeholder}
        value={form[field]}
        onChange={e => set(field, maskFn ? maskFn(e.target.value) : e.target.value)}
      />
      {errors[field] && <p style={{ fontSize: 12, color: '#DC2626', marginTop: 4 }}>{errors[field]}</p>}
    </div>
  );

  if (success) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: 24 }}>
      <div className="card fade-in" style={{ padding: 48, maxWidth: 440, width: '100%', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 32 }}>✓</div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: '#1F2937', marginBottom: 12 }}>Conta criada!</h2>
        <p style={{ fontSize: 14, color: '#64748B', marginBottom: 32, lineHeight: 1.6 }}>Sua conta foi criada com sucesso. Faça login para começar a explorar nossos veículos.</p>
        <button className="btn-primary" onClick={() => navigate('/login')} style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>Ir para o Login</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 680 }} className="fade-in">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, background: '#1E3A5F', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round"/><rect x="9" y="11" width="14" height="10" rx="2" stroke="#0EA5E9" strokeWidth="2"/><circle cx="12" cy="21" r="1" fill="#0EA5E9"/><circle cx="20" cy="21" r="1" fill="#0EA5E9"/></svg>
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 22, color: '#1E3A5F' }}>RentCar</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 8 }}>Criar conta</h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>Preencha seus dados para começar a alugar</p>
        </div>

        <div className="card" style={{ padding: 36 }}>
          <form onSubmit={handleSubmit} noValidate>
            {/* Section 1: Personal */}
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Dados Pessoais</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
                <div style={{ gridColumn: 'span 2' }} className="span-full">
                  <Field label="Nome completo" field="name" placeholder="João da Silva" />
                </div>
                <Field label="CPF" field="cpf" placeholder="000.000.000-00" maskFn={v => mask(v, '###.###.###-##')} />
                <Field label="Data de nascimento" field="birthDate" type="date" />
              </div>
            </div>

            {/* Section 2: Contact */}
            <div style={{ marginBottom: 28, paddingTop: 24, borderTop: '1px solid #E2E8F0' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Contato</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
                <Field label="E-mail" field="email" type="email" placeholder="joao@email.com" />
                <Field label="Telefone" field="phone" placeholder="(11) 99999-9999" maskFn={v => mask(v, '(##) #####-####')} />
              </div>
            </div>

            {/* Section 3: CNH */}
            <div style={{ marginBottom: 28, paddingTop: 24, borderTop: '1px solid #E2E8F0' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Habilitação</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
                <Field label="Número da CNH" field="cnhNumber" placeholder="00000000000" />
                <Field label="Validade da CNH" field="cnhExpiry" type="date" />
              </div>
            </div>

            {/* Section 4: Password */}
            <div style={{ paddingTop: 24, borderTop: '1px solid #E2E8F0', marginBottom: 28 }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>Senha de Acesso</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
                <Field label="Senha" field="password" type="password" placeholder="Mínimo 8 caracteres" />
                <Field label="Confirmar senha" field="confirmPassword" type="password" placeholder="Repita a senha" />
              </div>
              {form.password && (
                <div style={{ marginTop: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
                  {[4, 6, 8, 10].map((min, i) => (
                    <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: form.password.length >= min ? (form.password.length >= 10 ? '#16A34A' : form.password.length >= 8 ? '#F59E0B' : '#DC2626') : '#E2E8F0', transition: 'background 0.2s' }} />
                  ))}
                  <span style={{ fontSize: 11, color: '#64748B', marginLeft: 4 }}>
                    {form.password.length >= 10 ? 'Forte' : form.password.length >= 8 ? 'Média' : 'Fraca'}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 15 }}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                    Criando conta...
                  </span>
                ) : 'Criar conta'}
              </button>
              <p style={{ textAlign: 'center', fontSize: 13, color: '#64748B' }}>
                Já possui conta?{' '}
                <Link to="/login" style={{ color: '#0EA5E9', fontWeight: 600, textDecoration: 'none' }}>Fazer login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .span-full { grid-column: span 1 !important; }
        }
      `}</style>
    </div>
  );
}

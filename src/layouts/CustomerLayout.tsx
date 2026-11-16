import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';

const dropdownLinks = [
  { to: '/my-reservations', label: 'Minhas Reservas', icon: (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  )},
  { to: '/my-billings', label: 'Minhas Cobranças', icon: (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="2"/><path d="M12 6v2m0 8v2M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  )},
  { to: '/profile', label: 'Perfil', icon: (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  )},
];

export default function CustomerLayout() {
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dropRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
      <header style={{ background: '#1E3A5F', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/vehicles" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: '#0EA5E9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><rect x="9" y="11" width="14" height="10" rx="2" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="21" r="1" fill="#fff"/><circle cx="20" cy="21" r="1" fill="#fff"/></svg>
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.3px' }}>RentCar</span>
          </Link>

          {/* Desktop: user dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="hidden-mobile">
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDropOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '7px 14px', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => !dropOpen && (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #0EA5E9, #1E3A5F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 12, color: '#fff', flexShrink: 0 }}>AC</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0' }}>Ana Carolina</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ color: '#64748B', transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {dropOpen && (
                <div className="fade-in" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 220, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 200 }}>
                  {/* Account info header */}
                  <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>Ana Carolina Ferreira</div>
                    <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>ana.ferreira@email.com</div>
                  </div>

                  {/* Links */}
                  <div style={{ padding: '6px 8px' }}>
                    {dropdownLinks.map(link => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setDropOpen(false)}
                        style={({ isActive }) => ({
                          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8,
                          fontSize: 13, fontWeight: 500, textDecoration: 'none',
                          color: isActive ? '#0EA5E9' : '#374151',
                          background: isActive ? '#F0F9FF' : 'transparent',
                          transition: 'all 0.12s',
                        })}
                        onMouseEnter={e => { if (!(e.currentTarget as HTMLAnchorElement).classList.contains('active')) (e.currentTarget as HTMLAnchorElement).style.background = '#F8FAFC'; }}
                        onMouseLeave={e => { if (!(e.currentTarget as HTMLAnchorElement).classList.contains('active')) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                      >
                        <span style={{ opacity: 0.6 }}>{link.icon}</span>
                        {link.label}
                      </NavLink>
                    ))}
                  </div>

                  {/* Logout */}
                  <div style={{ padding: '6px 8px 8px', borderTop: '1px solid #F1F5F9' }}>
                    <button
                      onClick={() => { setDropOpen(false); navigate('/login'); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 10px', borderRadius: 8, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 500, color: '#DC2626', cursor: 'pointer', textAlign: 'left', transition: 'background 0.12s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#FFF5F5')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" style={{ opacity: 0.7 }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }} className="show-mobile">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: '#1E3A5F', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 24px 20px' }}>
            <div style={{ padding: '12px 0 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0' }}>Ana Carolina Ferreira</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>ana.ferreira@email.com</div>
            </div>
            {dropdownLinks.map(l => (
              <NavLink key={l.to} to={l.to} onClick={() => setMobileOpen(false)} style={({ isActive }) => ({ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', fontSize: 14, fontWeight: 500, textDecoration: 'none', color: isActive ? '#0EA5E9' : '#94A3B8', borderBottom: '1px solid rgba(255,255,255,0.06)' })}>
                {l.label}
              </NavLink>
            ))}
            <button onClick={() => navigate('/login')} style={{ marginTop: 12, background: 'transparent', border: 'none', color: '#FCA5A5', fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: 0 }}>Sair</button>
          </div>
        )}
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer style={{ background: '#1E3A5F', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>© 2025 RentCar. Todos os direitos reservados.</p>
      </footer>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </div>
  );
}

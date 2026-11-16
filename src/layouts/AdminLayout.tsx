import { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/></svg>
  )},
  { to: '/admin/vehicles', label: 'Frota', icon: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><rect x="9" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="21" r="1" fill="currentColor"/><circle cx="20" cy="21" r="1" fill="currentColor"/></svg>
  )},
  { to: '/admin/reservations', label: 'Reservas', icon: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  )},
  { to: '/admin/billing', label: 'Cobranças', icon: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="2"/><path d="M12 6v2m0 8v2M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  )},
  { to: '/admin/maintenance', label: 'Manutenções', icon: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )},
];

function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '6px 12px', cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
        onMouseLeave={e => !open && (e.currentTarget.style.background = 'transparent')}
      >
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #0EA5E9, #1E3A5F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 12, color: '#fff', flexShrink: 0 }}>AD</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0', lineHeight: 1.2 }}>Administrador</div>
          <div style={{ fontSize: 11, color: '#64748B', lineHeight: 1.2 }}>Administrador</div>
        </div>
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ color: '#64748B', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="fade-in" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 200, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 300 }}>
          <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>Administrador</div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>admin@rentcar.com</div>
          </div>
          <div style={{ padding: '6px 8px' }}>
            <button
              onClick={() => { setOpen(false); navigate('/profile'); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 10px', borderRadius: 8, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer', textAlign: 'left' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" style={{ opacity: 0.6 }}><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              Minha conta
            </button>
          </div>
          <div style={{ padding: '4px 8px 8px', borderTop: '1px solid #F1F5F9' }}>
            <button
              onClick={() => { setOpen(false); navigate('/login'); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 10px', borderRadius: 8, border: 'none', background: 'transparent', fontSize: 13, fontWeight: 500, color: '#DC2626', cursor: 'pointer', textAlign: 'left' }}
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
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside style={{ width: 220, background: '#1E3A5F', display: 'flex', flexDirection: 'column', padding: '28px 14px', minHeight: '100%' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 32px' }}>
        <div style={{ width: 32, height: 32, background: '#0EA5E9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><rect x="9" y="11" width="14" height="10" rx="2" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="21" r="1" fill="#fff"/><circle cx="20" cy="21" r="1" fill="#fff"/></svg>
        </div>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18, color: '#fff' }}>RentCar</span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Top navbar */}
      <header style={{ background: '#1E3A5F', borderBottom: '1px solid rgba(255,255,255,0.08)', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Mobile menu btn */}
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 4, display: 'none' }} className="admin-menu-btn">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <span style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 15, fontWeight: 700, color: '#94A3B8' }}>Painel Administrativo</span>
        </div>
        <UserDropdown />
      </header>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Desktop sidebar */}
        <div style={{ flexShrink: 0 }} className="admin-sidebar">
          <Sidebar />
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)' }} onClick={() => setSidebarOpen(false)} />
            <div style={{ position: 'relative', zIndex: 201 }}>
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        <main style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar { display: block !important; }
          .admin-menu-btn { display: none !important; }
        }
        @media (max-width: 1023px) {
          .admin-sidebar { display: none !important; }
          .admin-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon = '🔍', title, description, action }: EmptyStateProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.6 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 18, fontWeight: 700, color: '#1F2937', marginBottom: 8 }}>{title}</h3>
      {description && <p style={{ fontSize: 14, color: '#64748B', maxWidth: 360, lineHeight: 1.6, marginBottom: action ? 24 : 0 }}>{description}</p>}
      {action}
    </div>
  );
}

interface PaginationProps {
  page: number;
  total: number;
  perPage: number;
  onChange: (p: number) => void;
}

export default function Pagination({ page, total, perPage, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
      <span style={{ fontSize: 13, color: '#64748B' }}>
        {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} de {total} registros
      </span>
      <div style={{ display: 'flex', gap: 6 }}>
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #E2E8F0', background: page === 1 ? '#F8FAFC' : '#fff', color: page === 1 ? '#CBD5E1' : '#374151', cursor: page === 1 ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 500 }}
        >
          ← Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => onChange(p)}
            style={{ padding: '6px 12px', borderRadius: 6, border: p === page ? 'none' : '1px solid #E2E8F0', background: p === page ? '#0EA5E9' : '#fff', color: p === page ? '#fff' : '#374151', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #E2E8F0', background: page === totalPages ? '#F8FAFC' : '#fff', color: page === totalPages ? '#CBD5E1' : '#374151', cursor: page === totalPages ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 500 }}
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}

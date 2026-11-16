import type { VehicleStatus, ReservationStatus, BillingStatus, MaintenanceStatus } from '../data/mock';

const vehicleStatusConfig: Record<VehicleStatus, { label: string; color: string; bg: string; dot: string }> = {
  available:   { label: 'Disponível',   color: '#15803D', bg: '#DCFCE7', dot: '#16A34A' },
  reserved:    { label: 'Reservado',    color: '#B45309', bg: '#FEF3C7', dot: '#F59E0B' },
  rented:      { label: 'Alugado',      color: '#0369A1', bg: '#E0F2FE', dot: '#0EA5E9' },
  maintenance: { label: 'Manutenção',   color: '#B91C1C', bg: '#FEE2E2', dot: '#DC2626' },
  inactive:    { label: 'Inativo',      color: '#475569', bg: '#F1F5F9', dot: '#64748B' },
};

const reservationStatusConfig: Record<ReservationStatus, { label: string; color: string; bg: string }> = {
  pending:     { label: 'Pendente',      color: '#B45309', bg: '#FEF3C7' },
  confirmed:   { label: 'Confirmada',    color: '#0369A1', bg: '#E0F2FE' },
  in_progress: { label: 'Em andamento',  color: '#6D28D9', bg: '#EDE9FE' },
  finished:    { label: 'Finalizada',    color: '#15803D', bg: '#DCFCE7' },
  cancelled:   { label: 'Cancelada',     color: '#B91C1C', bg: '#FEE2E2' },
};

const billingStatusConfig: Record<BillingStatus, { label: string; color: string; bg: string }> = {
  pending:   { label: 'Pendente',   color: '#B45309', bg: '#FEF3C7' },
  paid:      { label: 'Paga',       color: '#15803D', bg: '#DCFCE7' },
  cancelled: { label: 'Cancelada',  color: '#475569', bg: '#F1F5F9' },
  failed:    { label: 'Falhou',     color: '#B91C1C', bg: '#FEE2E2' },
};

const maintenanceStatusConfig: Record<MaintenanceStatus, { label: string; color: string; bg: string }> = {
  scheduled:   { label: 'Agendada',     color: '#0369A1', bg: '#E0F2FE' },
  in_progress: { label: 'Em andamento', color: '#6D28D9', bg: '#EDE9FE' },
  completed:   { label: 'Concluída',    color: '#15803D', bg: '#DCFCE7' },
  cancelled:   { label: 'Cancelada',    color: '#475569', bg: '#F1F5F9' },
};

interface VehicleBadgeProps { status: VehicleStatus; }
export function VehicleBadge({ status }: VehicleBadgeProps) {
  const c = vehicleStatusConfig[status];
  return (
    <span style={{ color: c.color, background: c.bg, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, display: 'inline-block' }} />
      {c.label}
    </span>
  );
}

interface ReservationBadgeProps { status: ReservationStatus; }
export function ReservationBadge({ status }: ReservationBadgeProps) {
  const c = reservationStatusConfig[status];
  return (
    <span style={{ color: c.color, background: c.bg, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'inline-block' }}>
      {c.label}
    </span>
  );
}

interface BillingBadgeProps { status: BillingStatus; }
export function BillingBadge({ status }: BillingBadgeProps) {
  const c = billingStatusConfig[status];
  return (
    <span style={{ color: c.color, background: c.bg, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'inline-block' }}>
      {c.label}
    </span>
  );
}

interface MaintenanceBadgeProps { status: MaintenanceStatus; }
export function MaintenanceBadge({ status }: MaintenanceBadgeProps) {
  const c = maintenanceStatusConfig[status];
  return (
    <span style={{ color: c.color, background: c.bg, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'inline-block' }}>
      {c.label}
    </span>
  );
}

interface MaintenanceTypeBadgeProps { type: 'preventive' | 'corrective' | 'inspection'; }
export function MaintenanceTypeBadge({ type }: MaintenanceTypeBadgeProps) {
  const map = {
    preventive:  { label: 'Preventiva', color: '#0369A1', bg: '#E0F2FE' },
    corrective:  { label: 'Corretiva',  color: '#B91C1C', bg: '#FEE2E2' },
    inspection:  { label: 'Inspeção',   color: '#6D28D9', bg: '#EDE9FE' },
  };
  const c = map[type];
  return (
    <span style={{ color: c.color, background: c.bg, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'inline-block' }}>
      {c.label}
    </span>
  );
}

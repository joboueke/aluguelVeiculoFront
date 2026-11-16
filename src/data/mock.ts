export type VehicleStatus = 'available' | 'reserved' | 'rented' | 'maintenance' | 'inactive';
export type ReservationStatus = 'pending' | 'confirmed' | 'in_progress' | 'finished' | 'cancelled';
export type BillingStatus = 'pending' | 'paid' | 'cancelled' | 'failed';
export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type MaintenanceType = 'preventive' | 'corrective' | 'inspection';

export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  category: string;
  year: number;
  modelYear: number;
  color: string;
  mileage: number;
  dailyRate: number;
  status: VehicleStatus;
  transmission: 'automatic' | 'manual';
  image: string;
}

export interface Reservation {
  id: string;
  vehicleId: string;
  vehicle: Vehicle;
  customerId: string;
  customer: Customer;
  pickupDate: string;
  returnDate: string;
  days: number;
  estimatedValue: number;
  status: ReservationStatus;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  cnhNumber: string;
  cnhExpiry: string;
}

export interface Billing {
  id: string;
  reservationId: string;
  reservation: Reservation;
  customer: Customer;
  dailyValue: number;
  lateFee: number;
  damages: number;
  additionalFees: number;
  discounts: number;
  total: number;
  status: BillingStatus;
  paymentMethod?: string;
  createdAt: string;
}

export interface Maintenance {
  id: string;
  vehicleId: string;
  vehicle: Vehicle;
  type: MaintenanceType;
  description: string;
  mileage: number;
  startDate: string;
  estimatedEnd: string;
  status: MaintenanceStatus;
  cost: number;
  services: string[];
}

export const vehicles: Vehicle[] = [
  { id: 'v1', plate: 'ABC-1234', brand: 'Toyota', model: 'Corolla', category: 'Sedan', year: 2025, modelYear: 2025, color: 'Branco', mileage: 12400, dailyRate: 180, status: 'available', transmission: 'automatic', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop&auto=format' },
  { id: 'v2', plate: 'DEF-5678', brand: 'Honda', model: 'Civic', category: 'Sedan', year: 2024, modelYear: 2024, color: 'Prata', mileage: 28100, dailyRate: 165, status: 'rented', transmission: 'automatic', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop&auto=format' },
  { id: 'v3', plate: 'GHI-9012', brand: 'Volkswagen', model: 'T-Cross', category: 'SUV', year: 2024, modelYear: 2024, color: 'Preto', mileage: 9800, dailyRate: 220, status: 'available', transmission: 'automatic', image: 'https://images.unsplash.com/photo-1568844293986-ca9c5c3f8e7a?w=600&h=400&fit=crop&auto=format' },
  { id: 'v4', plate: 'JKL-3456', brand: 'Fiat', model: 'Pulse', category: 'SUV', year: 2025, modelYear: 2025, color: 'Vermelho', mileage: 5200, dailyRate: 195, status: 'reserved', transmission: 'automatic', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop&auto=format' },
  { id: 'v5', plate: 'MNO-7890', brand: 'Chevrolet', model: 'Onix', category: 'Hatch', year: 2024, modelYear: 2024, color: 'Cinza', mileage: 45000, dailyRate: 120, status: 'available', transmission: 'manual', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&auto=format' },
  { id: 'v6', plate: 'PQR-2345', brand: 'Hyundai', model: 'HB20', category: 'Hatch', year: 2023, modelYear: 2023, color: 'Azul', mileage: 38700, dailyRate: 110, status: 'maintenance', transmission: 'manual', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&auto=format' },
  { id: 'v7', plate: 'STU-6789', brand: 'Jeep', model: 'Compass', category: 'SUV', year: 2025, modelYear: 2025, color: 'Branco', mileage: 3100, dailyRate: 280, status: 'available', transmission: 'automatic', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop&auto=format' },
  { id: 'v8', plate: 'VWX-0123', brand: 'Toyota', model: 'Hilux', category: 'Pickup', year: 2024, modelYear: 2024, color: 'Preto', mileage: 22000, dailyRate: 350, status: 'available', transmission: 'automatic', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format' },
];

export const currentCustomer: Customer = {
  id: 'c1',
  name: 'Ana Carolina Ferreira',
  email: 'ana.ferreira@email.com',
  phone: '(11) 99234-5678',
  cpf: '123.456.789-00',
  birthDate: '1995-04-12',
  cnhNumber: '98765432100',
  cnhExpiry: '2027-04-12',
};

export const customers: Customer[] = [
  currentCustomer,
  { id: 'c2', name: 'Bruno Alves Souza', email: 'bruno.souza@email.com', phone: '(21) 98765-4321', cpf: '987.654.321-00', birthDate: '1988-08-20', cnhNumber: '12345678900', cnhExpiry: '2026-08-20' },
  { id: 'c3', name: 'Carla Mendes Lima', email: 'carla.lima@email.com', phone: '(31) 97654-3210', cpf: '456.789.123-00', birthDate: '1992-11-05', cnhNumber: '56789012300', cnhExpiry: '2028-11-05' },
  { id: 'c4', name: 'Diego Rodrigues Costa', email: 'diego.costa@email.com', phone: '(41) 96543-2109', cpf: '789.123.456-00', birthDate: '1985-02-28', cnhNumber: '34567890100', cnhExpiry: '2025-02-28' },
];

export const reservations: Reservation[] = [
  { id: 'R-001', vehicleId: 'v1', vehicle: vehicles[0], customerId: 'c1', customer: customers[0], pickupDate: '2025-09-18 09:00', returnDate: '2025-09-22 09:00', days: 4, estimatedValue: 720, status: 'confirmed', createdAt: '2025-09-14' },
  { id: 'R-002', vehicleId: 'v3', vehicle: vehicles[2], customerId: 'c1', customer: customers[0], pickupDate: '2025-08-10 10:00', returnDate: '2025-08-15 10:00', days: 5, estimatedValue: 1100, status: 'finished', createdAt: '2025-08-05' },
  { id: 'R-003', vehicleId: 'v5', vehicle: vehicles[4], customerId: 'c1', customer: customers[0], pickupDate: '2025-07-01 08:00', returnDate: '2025-07-03 08:00', days: 2, estimatedValue: 240, status: 'cancelled', createdAt: '2025-06-28' },
  { id: 'R-004', vehicleId: 'v2', vehicle: vehicles[1], customerId: 'c2', customer: customers[1], pickupDate: '2025-09-14 11:00', returnDate: '2025-09-17 11:00', days: 3, estimatedValue: 495, status: 'in_progress', createdAt: '2025-09-10' },
  { id: 'R-005', vehicleId: 'v7', vehicle: vehicles[6], customerId: 'c3', customer: customers[2], pickupDate: '2025-09-20 08:00', returnDate: '2025-09-25 08:00', days: 5, estimatedValue: 1400, status: 'pending', createdAt: '2025-09-14' },
  { id: 'R-006', vehicleId: 'v4', vehicle: vehicles[3], customerId: 'c4', customer: customers[3], pickupDate: '2025-09-16 14:00', returnDate: '2025-09-18 14:00', days: 2, estimatedValue: 390, status: 'confirmed', createdAt: '2025-09-12' },
];

export const billings: Billing[] = [
  { id: 'B-001', reservationId: 'R-001', reservation: reservations[0], customer: customers[0], dailyValue: 720, lateFee: 0, damages: 0, additionalFees: 0, discounts: 0, total: 720, status: 'pending', createdAt: '2025-09-14' },
  { id: 'B-002', reservationId: 'R-002', reservation: reservations[1], customer: customers[0], dailyValue: 1100, lateFee: 180, damages: 0, additionalFees: 50, discounts: 30, total: 1300, status: 'paid', paymentMethod: 'PIX', createdAt: '2025-08-15' },
  { id: 'B-003', reservationId: 'R-003', reservation: reservations[2], customer: customers[0], dailyValue: 240, lateFee: 0, damages: 0, additionalFees: 0, discounts: 0, total: 0, status: 'cancelled', createdAt: '2025-07-01' },
  { id: 'B-004', reservationId: 'R-004', reservation: reservations[3], customer: customers[1], dailyValue: 495, lateFee: 0, damages: 0, additionalFees: 0, discounts: 0, total: 495, status: 'pending', createdAt: '2025-09-14' },
  { id: 'B-005', reservationId: 'R-005', reservation: reservations[4], customer: customers[2], dailyValue: 1400, lateFee: 0, damages: 0, additionalFees: 0, discounts: 100, total: 1300, status: 'pending', createdAt: '2025-09-14' },
];

export const maintenances: Maintenance[] = [
  { id: 'M-001', vehicleId: 'v6', vehicle: vehicles[5], type: 'corrective', description: 'Reparo no sistema de freios e troca de pastilhas dianteiras', mileage: 38700, startDate: '2025-09-12', estimatedEnd: '2025-09-16', status: 'in_progress', cost: 850, services: ['Troca de pastilhas', 'Sangria do sistema de freio', 'Verificação do disco'] },
  { id: 'M-002', vehicleId: 'v1', vehicle: vehicles[0], type: 'preventive', description: 'Revisão dos 10.000 km — troca de óleo e filtros', mileage: 10000, startDate: '2025-09-20', estimatedEnd: '2025-09-20', status: 'scheduled', cost: 420, services: ['Troca de óleo', 'Troca de filtro de óleo', 'Troca de filtro de ar'] },
  { id: 'M-003', vehicleId: 'v3', vehicle: vehicles[2], type: 'inspection', description: 'Inspeção veicular anual obrigatória', mileage: 9800, startDate: '2025-08-05', estimatedEnd: '2025-08-05', status: 'completed', cost: 200, services: ['Inspeção de emissões', 'Verificação de segurança'] },
  { id: 'M-004', vehicleId: 'v8', vehicle: vehicles[7], type: 'preventive', description: 'Troca de correia dentada e revisão geral', mileage: 20000, startDate: '2025-09-25', estimatedEnd: '2025-09-27', status: 'scheduled', cost: 1200, services: ['Troca de correia', 'Troca de tensor', 'Revisão completa'] },
];

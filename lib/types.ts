export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: "Laki-laki" | "Perempuan";
  address: string;
  bloodType: string;
  allergies: string;
  notes: string;
  registeredAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  schedule: string;
  status: "Aktif" | "Cuti";
  avatar: string;
}

export interface Treatment {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  treatmentId: string;
  treatmentName: string;
  date: string;
  time: string;
  status: "Menunggu" | "Diproses" | "Selesai" | "Dibatalkan";
  notes: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  supplier: string;
  expiryDate: string;
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  treatmentName: string;
  amount: number;
  paid: number;
  status: "Lunas" | "Sebagian" | "Belum Bayar";
  date: string;
  method: string;
}

export interface ClinicData {
  patients: Patient[];
  doctors: Doctor[];
  treatments: Treatment[];
  appointments: Appointment[];
  inventory: InventoryItem[];
  invoices: Invoice[];
}

export type EntityKey = keyof ClinicData;

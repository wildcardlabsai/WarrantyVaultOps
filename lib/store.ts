import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type Role = 'admin' | 'dealer' | 'customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  dealerId?: string; // If role is dealer or customer
}

export interface Dealer {
  id: string;
  name: string;
  fcaNumber: string;
  logoUrl?: string;
  subscriptionStatus: 'active' | 'past_due' | 'canceled';
  createdAt: string;
}

export interface Customer {
  id: string;
  dealerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Warranty {
  id: string;
  dealerId: string;
  customerId: string;
  vehicleReg: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  mileage: number;
  durationMonths: number;
  claimLimit: number;
  startDate: string;
  endDate: string;
  cost: number;
  status: 'active' | 'expired' | 'cancelled';
  createdAt: string;
}

export interface ClaimMessage {
  id: string;
  senderId: string;
  senderRole: Role;
  content: string;
  createdAt: string;
}

export interface Claim {
  id: string;
  warrantyId: string;
  dealerId: string;
  customerId: string;
  description: string;
  amountRequested: number;
  status: 'pending' | 'approved' | 'rejected' | 'info_requested';
  notes: string;
  messages: ClaimMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  dealerId: string;
  amount: number;
  type: 'subscription' | 'warranty_fee';
  status: 'paid' | 'pending';
  createdAt: string;
}

interface AppState {
  currentUser: User | null;
  users: User[];
  dealers: Dealer[];
  customers: Customer[];
  warranties: Warranty[];
  claims: Claim[];
  invoices: Invoice[];

  // Actions
  login: (email: string, role: Role) => void;
  logout: () => void;
  
  // Dealer Actions
  addWarranty: (warranty: Omit<Warranty, 'id' | 'createdAt' | 'status'>) => string;
  updateWarrantyStatus: (id: string, status: Warranty['status']) => void;
  deleteWarranty: (id: string) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => string;
  updateClaimStatus: (id: string, status: Claim['status'], notes?: string) => void;
  addClaimMessage: (claimId: string, message: Omit<ClaimMessage, 'id' | 'createdAt'>) => void;
  updateDealer: (id: string, data: Partial<Dealer>) => void;
  
  // Customer Actions
  submitClaim: (claim: Omit<Claim, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'notes' | 'messages'>) => void;

  // Admin Actions
  addDealer: (dealer: Omit<Dealer, 'id' | 'createdAt'>, adminUser: Omit<User, 'id' | 'dealerId'>) => void;
}

// Initial Seed Data
const seedDealers: Dealer[] = [
  { id: 'd1', name: 'Premium Motors UK', fcaNumber: 'FCA123456', subscriptionStatus: 'active', createdAt: new Date().toISOString() }
];

const seedUsers: User[] = [
  { id: 'u1', email: 'admin@warrantyvault.com', name: 'System Admin', role: 'admin' },
  { id: 'u2', email: 'dealer@premium.com', name: 'John Dealer', role: 'dealer', dealerId: 'd1' },
  { id: 'u3', email: 'customer@example.com', name: 'Alice Smith', role: 'customer', dealerId: 'd1' },
];

const seedCustomers: Customer[] = [
  { id: 'c1', dealerId: 'd1', name: 'Alice Smith', email: 'customer@example.com', phone: '07700900000', address: '123 Fake St, London', createdAt: new Date().toISOString() }
];

const seedWarranties: Warranty[] = [
  {
    id: 'w1',
    dealerId: 'd1',
    customerId: 'c1',
    vehicleReg: 'AB12 CDE',
    make: 'Audi',
    model: 'A3',
    year: 2019,
    fuelType: 'Petrol',
    mileage: 45000,
    durationMonths: 12,
    claimLimit: 1000,
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    cost: 350,
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

const seedClaims: Claim[] = [
  {
    id: 'cl1',
    warrantyId: 'w1',
    dealerId: 'd1',
    customerId: 'c1',
    description: 'Alternator failure',
    amountRequested: 450,
    status: 'pending',
    notes: '',
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: seedUsers,
      dealers: seedDealers,
      customers: seedCustomers,
      warranties: seedWarranties,
      claims: seedClaims,
      invoices: [],

      login: (email, role) => {
        const user = get().users.find(u => u.email === email && u.role === role);
        if (user) {
          set({ currentUser: user });
        } else {
          // Auto-create for demo purposes if not found, except admin
          if (role !== 'admin') {
            const newUser: User = {
              id: uuidv4(),
              email,
              name: email.split('@')[0],
              role,
              dealerId: role === 'dealer' ? 'd1' : (role === 'customer' ? 'd1' : undefined)
            };
            set({ users: [...get().users, newUser], currentUser: newUser });
          }
        }
      },

      logout: () => set({ currentUser: null }),

      addWarranty: (warrantyData) => {
        const newWarranty: Warranty = {
          ...warrantyData,
          id: uuidv4(),
          status: 'active',
          createdAt: new Date().toISOString()
        };
        const newInvoice: Invoice = {
          id: uuidv4(),
          dealerId: warrantyData.dealerId,
          amount: 15,
          type: 'warranty_fee',
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        set({ 
          warranties: [...get().warranties, newWarranty],
          invoices: [...get().invoices, newInvoice]
        });
        return newWarranty.id;
      },

      updateWarrantyStatus: (id, status) => {
        set({
          warranties: get().warranties.map(w => w.id === id ? { ...w, status } : w)
        });
      },

      deleteWarranty: (id) => {
        set({
          warranties: get().warranties.filter(w => w.id !== id)
        });
      },

      addCustomer: (customerData) => {
        const newCustomer: Customer = {
          ...customerData,
          id: uuidv4(),
          createdAt: new Date().toISOString()
        };
        // Also create a user account for them
        const newUser: User = {
          id: uuidv4(),
          email: customerData.email,
          name: customerData.name,
          role: 'customer',
          dealerId: customerData.dealerId
        };
        set({ 
          customers: [...get().customers, newCustomer],
          users: [...get().users, newUser]
        });
        return newCustomer.id;
      },

      updateClaimStatus: (id, status, notes) => {
        set({
          claims: get().claims.map(c => c.id === id ? { 
            ...c, 
            status, 
            notes: notes !== undefined ? notes : c.notes,
            updatedAt: new Date().toISOString()
          } : c)
        });
      },

      addClaimMessage: (claimId, messageData) => {
        const newMessage: ClaimMessage = {
          ...messageData,
          id: uuidv4(),
          createdAt: new Date().toISOString()
        };
        set({
          claims: get().claims.map(c => c.id === claimId ? {
            ...c,
            messages: [...(c.messages || []), newMessage],
            updatedAt: new Date().toISOString()
          } : c)
        });
      },

      updateDealer: (id, data) => {
        set({
          dealers: get().dealers.map(d => d.id === id ? { ...d, ...data } : d)
        });
      },

      submitClaim: (claimData) => {
        const newClaim: Claim = {
          ...claimData,
          id: uuidv4(),
          status: 'pending',
          notes: '',
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set({ claims: [...get().claims, newClaim] });
      },

      addDealer: (dealerData, adminUser) => {
        const newDealer: Dealer = {
          ...dealerData,
          id: uuidv4(),
          createdAt: new Date().toISOString()
        };
        const newUser: User = {
          ...adminUser,
          id: uuidv4(),
          dealerId: newDealer.id
        };
        set({
          dealers: [...get().dealers, newDealer],
          users: [...get().users, newUser]
        });
      }
    }),
    {
      name: 'warranty-vault-storage',
    }
  )
);

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore, Warranty, Customer, Dealer } from '@/lib/store';
import { ArrowLeft, Search, Loader2, CheckCircle2, Download } from 'lucide-react';
import Link from 'next/link';
import CertificateTemplate from '@/components/CertificateTemplate';
import { generatePDF } from '@/lib/pdf';

export default function NewWarrantyPage() {
  const router = useRouter();
  const { currentUser, addWarranty, addCustomer, warranties, customers, dealers } = useStore();
  
  const [step, setStep] = useState(1);
  const [isLookingUpReg, setIsLookingUpReg] = useState(false);
  const [isLookingUpAddress, setIsLookingUpAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Success state
  const [createdWarrantyId, setCreatedWarrantyId] = useState<string | null>(null);
  const [createdCustomerId, setCreatedCustomerId] = useState<string | null>(null);

  // Form State
  const [vehicleReg, setVehicleReg] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState({ make: '', model: '', year: 0, fuelType: '' });
  
  const [customerDetails, setCustomerDetails] = useState({ name: '', email: '', phone: '', postcode: '', address: '' });
  const [warrantyDetails, setWarrantyDetails] = useState({ mileage: '', durationMonths: '12', claimLimit: '1000', cost: '' });

  if (!currentUser) return null;

  const simulateDVLALookup = async () => {
    if (!vehicleReg) return;
    setIsLookingUpReg(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setVehicleDetails({
      make: 'BMW',
      model: '3 Series 320d M Sport',
      year: 2020,
      fuelType: 'Diesel'
    });
    setIsLookingUpReg(false);
  };

  const simulateAddressLookup = async () => {
    if (!customerDetails.postcode) return;
    setIsLookingUpAddress(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCustomerDetails(prev => ({
      ...prev,
      address: `1 High Street, London, ${prev.postcode.toUpperCase()}`
    }));
    setIsLookingUpAddress(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Create Customer
    const customerId = addCustomer({
      dealerId: currentUser.dealerId!,
      name: customerDetails.name,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: customerDetails.address,
    });

    // 2. Create Warranty
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + parseInt(warrantyDetails.durationMonths));

    const warrantyId = addWarranty({
      dealerId: currentUser.dealerId!,
      customerId,
      vehicleReg: vehicleReg.toUpperCase(),
      make: vehicleDetails.make,
      model: vehicleDetails.model,
      year: vehicleDetails.year,
      fuelType: vehicleDetails.fuelType,
      mileage: parseInt(warrantyDetails.mileage),
      durationMonths: parseInt(warrantyDetails.durationMonths),
      claimLimit: parseInt(warrantyDetails.claimLimit),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      cost: parseFloat(warrantyDetails.cost),
    });

    setCreatedWarrantyId(warrantyId);
    setCreatedCustomerId(customerId);
    setIsSubmitting(false);
    setStep(4); // Move to success step
  };

  const handleDownloadPDF = async () => {
    if (!createdWarrantyId) return;
    setIsGenerating(true);
    try {
      await generatePDF(`certificate-${createdWarrantyId}`, `Warranty_Certificate_${vehicleReg}.pdf`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href="/dealer/warranties" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Warranties
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create New Warranty</h1>
        <p className="text-slate-400 text-sm mt-1">Issue a new self-funded warranty certificate.</p>
      </div>

      <div className="flex items-center mb-8">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'} font-medium text-sm`}>1</div>
        <div className={`flex-1 h-1 mx-2 rounded ${step >= 2 ? 'bg-sky-500' : 'bg-slate-800'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'} font-medium text-sm`}>2</div>
        <div className={`flex-1 h-1 mx-2 rounded ${step >= 3 ? 'bg-sky-500' : 'bg-slate-800'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'} font-medium text-sm`}>3</div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        {step === 4 && (
          <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Warranty Created Successfully!</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              The warranty for {vehicleReg} has been issued to {customerDetails.name}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                Download Certificate
              </button>
              <button 
                onClick={() => router.push('/dealer/warranties')}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-lg font-semibold border-b border-slate-800 pb-2">Vehicle Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Registration Number</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={vehicleReg}
                  onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none uppercase font-mono text-lg tracking-wider"
                  placeholder="AB12 CDE"
                />
                <button 
                  type="button"
                  onClick={simulateDVLALookup}
                  disabled={!vehicleReg || isLookingUpReg}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isLookingUpReg ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Lookup
                </button>
              </div>
            </div>

            {vehicleDetails.make && (
              <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Make</p>
                  <p className="font-medium">{vehicleDetails.make}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Model</p>
                  <p className="font-medium">{vehicleDetails.model}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Year</p>
                  <p className="font-medium">{vehicleDetails.year}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Fuel</p>
                  <p className="font-medium">{vehicleDetails.fuelType}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Current Mileage</label>
              <input 
                type="number" 
                value={warrantyDetails.mileage}
                onChange={(e) => setWarrantyDetails({...warrantyDetails, mileage: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                placeholder="e.g. 45000"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                onClick={() => setStep(2)}
                disabled={!vehicleDetails.make || !warrantyDetails.mileage}
                className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-lg font-semibold border-b border-slate-800 pb-2">Customer Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Postcode</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={customerDetails.postcode}
                  onChange={(e) => setCustomerDetails({...customerDetails, postcode: e.target.value.toUpperCase()})}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none uppercase"
                  placeholder="SW1A 1AA"
                />
                <button 
                  type="button"
                  onClick={simulateAddressLookup}
                  disabled={!customerDetails.postcode || isLookingUpAddress}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isLookingUpAddress ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Find Address
                </button>
              </div>
            </div>

            {customerDetails.address && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Address</label>
                <textarea 
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none h-24 resize-none"
                />
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <button 
                onClick={() => setStep(1)}
                className="text-slate-400 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                disabled={!customerDetails.name || !customerDetails.email || !customerDetails.address}
                className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-lg font-semibold border-b border-slate-800 pb-2">Warranty Terms</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Duration</label>
                <select 
                  value={warrantyDetails.durationMonths}
                  onChange={(e) => setWarrantyDetails({...warrantyDetails, durationMonths: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Claim Limit (£)</label>
                <select 
                  value={warrantyDetails.claimLimit}
                  onChange={(e) => setWarrantyDetails({...warrantyDetails, claimLimit: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="500">£500</option>
                  <option value="1000">£1,000</option>
                  <option value="1500">£1,500</option>
                  <option value="2000">£2,000</option>
                  <option value="2500">£2,500</option>
                  <option value="3000">£3,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Cost to Customer (£)</label>
                <input 
                  type="number" 
                  value={warrantyDetails.cost}
                  onChange={(e) => setWarrantyDetails({...warrantyDetails, cost: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="e.g. 350"
                  required
                />
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mt-6">
              <h3 className="font-medium mb-4">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="font-medium">{vehicleReg} - {vehicleDetails.make} {vehicleDetails.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="font-medium">{customerDetails.name} ({customerDetails.email})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-medium">{warrantyDetails.durationMonths} Months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Claim Limit:</span>
                  <span className="font-medium">£{parseInt(warrantyDetails.claimLimit).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 mt-2">
                  <span className="text-slate-400">Platform Admin Fee:</span>
                  <span className="font-medium text-amber-400">£15.00</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button 
                type="button"
                onClick={() => setStep(2)}
                className="text-slate-400 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={isSubmitting || !warrantyDetails.cost}
                className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Issue Warranty
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Hidden template for PDF generation */}
      {createdWarrantyId && createdCustomerId && (
        <CertificateTemplate 
          warranty={warranties.find(w => w.id === createdWarrantyId)!}
          customer={customers.find(c => c.id === createdCustomerId)!}
          dealer={dealers.find(d => d.id === currentUser.dealerId)!}
        />
      )}
    </div>
  );
}

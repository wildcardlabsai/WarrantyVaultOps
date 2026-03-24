import { Warranty, Customer, Dealer } from '@/lib/store';
import { format } from 'date-fns';

interface CertificateTemplateProps {
  warranty: Warranty;
  customer: Customer;
  dealer: Dealer;
}

export default function CertificateTemplate({ warranty, customer, dealer }: CertificateTemplateProps) {
  return (
    <div id={`certificate-${warranty.id}`} className="bg-white text-black p-12 w-[800px] h-[1131px] fixed -left-[9999px] top-0 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-200 pb-8 mb-8 relative z-10">
        <div>
          {dealer.logoUrl ? (
            <img src={dealer.logoUrl} alt={dealer.name} className="h-16 object-contain mb-4" />
          ) : (
            <div className="h-16 flex items-center">
              <h1 className="text-3xl font-bold text-slate-800">{dealer.name}</h1>
            </div>
          )}
          <p className="text-slate-500 text-sm">FCA Registration: {dealer.fcaNumber}</p>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-serif text-slate-800 mb-2">Warranty Certificate</h2>
          <p className="text-slate-500 font-mono">Ref: {warranty.id.split('-')[0].toUpperCase()}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-12 relative z-10">
        {/* Left Column */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Customer Details</h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="font-medium text-lg mb-1">{customer.name}</p>
              <p className="text-slate-600">{customer.address}</p>
              <p className="text-slate-600 mt-2">{customer.email}</p>
              <p className="text-slate-600">{customer.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Vehicle Details</h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-400 text-black font-bold px-4 py-1 rounded shadow-sm text-lg tracking-widest">
                  {warranty.vehicleReg}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Make/Model</span>
                  <span className="font-medium">{warranty.make} {warranty.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Year</span>
                  <span className="font-medium">{warranty.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mileage</span>
                  <span className="font-medium">{warranty.mileage.toLocaleString()} miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fuel Type</span>
                  <span className="font-medium">{warranty.fuelType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Coverage Details</h3>
            <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sky-600 text-sm font-medium">Claim Limit</p>
                    <p className="font-bold text-sky-900 text-xl">£{warranty.claimLimit?.toLocaleString() || '1,000'}</p>
                  </div>
                  <div>
                    <p className="text-sky-600 text-sm font-medium">Duration</p>
                    <p className="font-bold text-sky-900 text-xl">{warranty.durationMonths} Months</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sky-200">
                  <div>
                    <p className="text-sky-600 text-sm font-medium">Start Date</p>
                    <p className="font-medium text-sky-900">{format(new Date(warranty.startDate), 'dd MMM yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-sky-600 text-sm font-medium">End Date</p>
                    <p className="font-medium text-sky-900">{format(new Date(warranty.endDate), 'dd MMM yyyy')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Important Information</h3>
            <div className="text-sm text-slate-600 space-y-2">
              <p>This certificate confirms that the vehicle detailed above is covered by our comprehensive warranty program for the duration specified.</p>
              <p>In the event of a claim, please log in to your customer portal or contact the dealership directly quoting your vehicle registration and warranty reference number.</p>
              <p>Regular servicing in accordance with the manufacturer&apos;s schedule is required to maintain this warranty.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-12 left-12 right-12 border-t-2 border-slate-200 pt-8 flex justify-between items-end">
        <div>
          <p className="text-xs text-slate-400">Generated on {format(new Date(), 'dd MMM yyyy HH:mm')}</p>
          <p className="text-xs text-slate-400 mt-1">Document ID: {warranty.id}</p>
        </div>
        <div className="text-right">
          <div className="w-48 h-16 border-b border-slate-300 mb-2"></div>
          <p className="text-sm font-medium text-slate-600">Authorized Signature</p>
        </div>
      </div>
    </div>
  );
}

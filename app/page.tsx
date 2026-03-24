import Link from 'next/link';
import { ShieldCheck, Car, FileText, BarChart3, ArrowRight, CheckCircle2, Zap, Users, Wallet, ChevronRight } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-sky-500/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <img src="https://i.postimg.cc/HxJvHy7N/warrantylogo.png" alt="WarrantyVault Logo" className="h-8 w-auto" />
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link href="/login" className="text-sm font-medium bg-sky-500 hover:bg-sky-400 text-white px-5 py-2.5 rounded-full transition-all hover:shadow-[0_0_20px_-5px_rgba(14,165,233,0.5)]">
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 relative">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 blur-[120px] rounded-full mix-blend-screen"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-sky-400 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Zap className="w-4 h-4" />
              <span>The modern operating system for car dealerships</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              Run Your Own <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
                Warranty Company
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              Stop giving away 60% of your warranty revenue to third-party providers. 
              Manage, issue, and control your own warranties. Keep 100% of the premium.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-50 text-slate-950 hover:bg-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105">
                Start 14-Day Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-semibold transition-all">
                View Interactive Demo
              </Link>
            </motion.div>
          </div>

          {/* Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-24 relative mx-auto max-w-5xl perspective-1000"
          >
            <div className="rounded-2xl border border-slate-800/50 bg-slate-900/50 p-2 backdrop-blur-md shadow-2xl shadow-sky-900/20 transform rotate-x-2 hover:rotate-x-0 transition-transform duration-500">
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] relative flex items-stretch">
                <img 
                  src="https://i.postimg.cc/tCZsGCTV/wvdash.png" 
                  alt="WarrantyVault Dashboard Preview" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Dealerships", value: "500+" },
              { label: "Warranties Issued", value: "50k+" },
              { label: "Dealer Profit Retained", value: "£12M+" },
              { label: "Platform Uptime", value: "99.9%" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-6"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Powerful Features</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Everything you need to manage warranties</h2>
            <p className="text-lg text-slate-400">Stop paying 60% of your warranty revenue to third parties. Take control with our complete, white-labeled toolkit.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-800 hover:border-sky-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl group-hover:bg-sky-500/10 transition-colors"></div>
              <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-6 border border-sky-500/20">
                <Car className="w-7 h-7 text-sky-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Instant Creation & DVLA Lookup</h3>
              <p className="text-slate-400 leading-relaxed max-w-md">Enter a registration number and we&apos;ll auto-fill the vehicle details via our direct DVLA integration. Create a comprehensive, legally-binding warranty in under 30 seconds.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-800 hover:border-indigo-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
                <Wallet className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Keep 100% Profit</h3>
              <p className="text-slate-400 leading-relaxed">Instead of paying £300 to a warranty company, keep the premium in your own bank account. Only pay out when genuine claims occur.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-800 hover:border-purple-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                <FileText className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Branded Documents</h3>
              <p className="text-slate-400 leading-relaxed">Automatically generate professional PDF certificates and terms & conditions featuring your dealership&apos;s logo and details.</p>
            </motion.div>

            {/* Feature 4 - Large */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-800 hover:border-sky-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl group-hover:bg-sky-500/10 transition-colors"></div>
              <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-6 border border-sky-500/20">
                <Users className="w-7 h-7 text-sky-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Dedicated Customer Portal</h3>
              <p className="text-slate-400 leading-relaxed max-w-md">Give your customers a modern, self-serve portal where they can view their warranty details, download certificates, and submit claims directly to you with photos and descriptions.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-slate-900/50 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">How WarrantyVault Works</h2>
            <p className="text-lg text-slate-400">A simple, transparent process that puts you back in control of your dealership&apos;s aftersales.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-sky-500/0 via-sky-500/20 to-sky-500/0"></div>

            {[
              { step: "01", title: "Sell the Car", desc: "Sell a vehicle and offer your own in-house warranty instead of a third-party product." },
              { step: "02", title: "Create Warranty", desc: "Enter the reg into WarrantyVault. We generate the branded PDF certificate instantly." },
              { step: "03", title: "Keep the Cash", desc: "The customer pays you £300+. You keep 100% of it in your bank account." },
              { step: "04", title: "Manage Claims", desc: "If a claim occurs, manage it through our portal. Approve or deny based on your terms." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-slate-950 border-4 border-slate-900 flex items-center justify-center mb-6 shadow-xl">
                  <span className="text-2xl font-bold text-sky-400">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Why switch to self-funded warranties?</h2>
              <p className="text-lg text-slate-400 mb-8">Traditional warranty companies take the lion&apos;s share of your premium. With WarrantyVault, you keep the profit and control the customer experience.</p>
              
              <div className="space-y-6">
                {[
                  { title: "Increase Profit Margins", desc: "Keep 100% of the premium instead of just a 40% commission." },
                  { title: "Better Customer Experience", desc: "No more third-party call centers denying claims on technicalities." },
                  { title: "Build Your Brand", desc: "Customers see your logo on their warranty, not a third party's." },
                  { title: "Cash Flow Advantage", desc: "Hold the premium in your bank account, earning interest until a claim occurs." }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center shrink-0 border border-sky-500/20">
                      <CheckCircle2 className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{benefit.title}</h4>
                      <p className="text-slate-400">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 rounded-3xl blur-3xl"></div>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative z-10 shadow-2xl">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-800">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Traditional Warranty</div>
                    <div className="text-3xl font-bold text-slate-500">£120 <span className="text-sm font-normal">profit</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-sky-400 mb-1">WarrantyVault</div>
                    <div className="text-4xl font-bold text-white">£300 <span className="text-sm font-normal text-slate-400">profit</span></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Customer Pays</span>
                    <span className="text-white">£300</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-slate-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm pt-4">
                    <span className="text-slate-400">You Keep (Traditional)</span>
                    <span className="text-slate-500">£120</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-slate-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm pt-4">
                    <span className="text-sky-400 font-medium">You Keep (WarrantyVault)</span>
                    <span className="text-sky-400 font-bold">£300</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-sky-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800/50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950/0 to-slate-950/0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6"
            >
              <Users className="w-4 h-4" />
              <span>Trusted by Dealers</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Don&apos;t just take our word for it</h2>
            <p className="text-lg text-slate-400">See how independent dealerships are transforming their aftersales profitability.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "We used to pay over £40,000 a year to our warranty provider. Now we keep all of that in the business. The platform is incredibly easy to use.",
                author: "James Wilson",
                role: "Director, Prestige Motors",
                image: "https://i.pravatar.cc/150?u=james"
              },
              {
                quote: "The DVLA lookup saves us so much time. We can issue a fully branded, professional warranty certificate in under a minute while the customer is sitting with us.",
                author: "Sarah Jenkins",
                role: "Sales Manager, Elite Autos",
                image: "https://i.pravatar.cc/150?u=sarah"
              },
              {
                quote: "Our customers love the dedicated portal. It makes us look like a much larger operation and handles all the claims admin automatically.",
                author: "David Chen",
                role: "Owner, DC Performance",
                image: "https://i.pravatar.cc/150?u=david"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl relative"
              >
                <div className="text-4xl text-sky-500/20 absolute top-6 left-6 font-serif">&quot;</div>
                <p className="text-slate-300 relative z-10 mb-8 leading-relaxed pt-4">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full border border-slate-700" />
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-400">Only pay for what you use. No hidden fees, no long-term contracts, cancel anytime.</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700 shadow-2xl shadow-sky-900/20 overflow-hidden"
          >
            <div className="p-10 border-b border-slate-800 text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-indigo-500"></div>
              <h3 className="text-2xl font-semibold mb-2 text-white">Dealer Platform</h3>
              <div className="flex items-end justify-center gap-1 mb-4 mt-6">
                <span className="text-6xl font-bold text-white">£50</span>
                <span className="text-slate-400 mb-2 font-medium">/month</span>
              </div>
              <p className="text-sky-400 text-sm font-medium bg-sky-500/10 inline-block px-4 py-1.5 rounded-full">Plus £15 admin fee per warranty created</p>
            </div>
            <div className="p-10 bg-slate-950/50">
              <ul className="space-y-5 mb-10">
                {[
                  'Unlimited staff users', 
                  'White-labeled customer portal', 
                  'Unlimited DVLA lookups', 
                  'Custom branded PDF certificates', 
                  'End-to-end claims management',
                  'Financial reporting & analytics'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login" className="block w-full text-center bg-sky-500 hover:bg-sky-400 text-white px-6 py-4 rounded-xl font-bold transition-all hover:shadow-[0_0_20px_-5px_rgba(14,165,233,0.5)] hover:scale-[1.02]">
                Start 14-Day Free Trial
              </Link>
              <p className="text-center text-xs text-slate-500 mt-4">No credit card required for trial.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-sky-600"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 to-transparent opacity-50"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to take back control?</h2>
          <p className="text-xl text-sky-100 mb-10 max-w-2xl mx-auto">Join hundreds of forward-thinking dealerships who have stopped giving away their warranty profits.</p>
          <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-white text-sky-900 hover:bg-slate-50 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl">
            Create Your Account <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="https://i.postimg.cc/HxJvHy7N/warrantylogo.png" alt="WarrantyVault Logo" className="h-6 w-auto grayscale opacity-50 hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-slate-500 text-sm">Built by Wildcard Labs. © {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

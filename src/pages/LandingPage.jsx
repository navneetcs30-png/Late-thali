import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import {
  Utensils,
  QrCode,
  Clock,
  Bell,
  BarChart3,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ChefHat,
  CalendarCheck,
  Zap,
  Leaf
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF5] dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col selection:bg-emerald-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-200/40 via-green-100/30 to-amber-100/20 dark:from-emerald-950/30 dark:via-gray-900/40 dark:to-emerald-900/20 blur-3xl -z-10 rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Next-Gen College Mess Digitalization</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.12]">
                Your Meal, On Time – <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-green-500">
                  Every Time.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Say goodbye to long waiting queues and uncertain meal availability. Book your thali, get your digital token, and track your food in real time with <strong className="font-semibold text-emerald-800 dark:text-emerald-400">ThaliTime</strong>.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base shadow-soft-lg hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold text-base border border-gray-200 dark:border-gray-700 shadow-sm transition"
                >
                  <span>Explore Features</span>
                </a>
              </div>

              {/* Fast stats pills */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-800 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-400">85%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Queue Time Cut</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-400">0%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Overbooking Error</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-emerald-800 dark:text-emerald-400">100%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Live Queue Sync</div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Preview Card */}
            <div id="preview" className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-soft-lg border border-gray-100 dark:border-gray-800 p-6 space-y-5">
                {/* Header of preview card */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                      TT
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Active Student Token</h4>
                      <p className="text-[11px] text-gray-500">Kaveri Boys Hostel • Counter 1</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Confirmed
                  </span>
                </div>

                {/* Digital Ticket Preview */}
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-5 rounded-2xl shadow-inner relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[10px] font-bold text-emerald-300 tracking-widest uppercase">
                        Digital Meal Token
                      </div>
                      <div className="text-3xl font-black tracking-tight text-white mt-0.5">TT-1024</div>
                    </div>
                    <div className="bg-emerald-800/80 p-2 rounded-xl text-center">
                      <div className="text-[10px] uppercase font-semibold text-emerald-200">Meal</div>
                      <div className="text-sm font-bold text-white">Dinner</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-800/80 flex justify-between items-end text-xs">
                    <div>
                      <div className="text-[10px] text-emerald-300 font-medium">Pickup Window</div>
                      <div className="font-bold text-white text-sm">7:10 PM – 7:20 PM</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-300 font-medium">Food Item</div>
                      <div className="font-semibold text-emerald-100">Paneer Butter Masala Thali</div>
                    </div>
                  </div>
                </div>

                {/* Real-time Queue Progress Box */}
                <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-emerald-900 dark:text-emerald-200">Now Serving:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-gray-800 px-2.5 py-0.5 rounded-md shadow-sm border border-emerald-200 dark:border-emerald-800">
                      TT-1018
                    </span>
                  </div>

                  {/* Progress Indicator */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
                      <span>People Ahead: <strong className="text-emerald-700 dark:text-emerald-400">5</strong></span>
                      <span>Est. Wait: <strong className="text-emerald-700 dark:text-emerald-400">10 mins</strong></span>
                    </div>
                    <div className="w-full bg-emerald-200/60 dark:bg-emerald-900/60 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-emerald-600 h-2.5 rounded-full w-2/3 transition-all duration-500"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-1 border-t border-emerald-100 dark:border-emerald-900/40">
                    <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Live Mess Counter Sync
                    </span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">Counter 1</span>
                  </div>
                </div>

                {/* Meal availability pill preview */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Tonight's Special Availability:</span>
                  <span className="px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 font-bold text-[11px]">
                    Available (112 Left)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-white dark:bg-gray-900/60 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2">
              End-to-End Capabilities
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Built for Modern College Campuses
            </h3>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
              Eliminate congestion, optimize kitchen production, and give every student transparent meal scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CalendarCheck className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
                title: 'Online Meal Booking',
                desc: 'Select your preferred thali combo, meal type, and dietary preference in seconds from any smartphone or laptop.'
              },
              {
                icon: <QrCode className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
                title: 'Digital Token Generation',
                desc: 'Receive unique tokens with digital barcodes that guarantee your booked portion and prevent double-claiming.'
              },
              {
                icon: <Clock className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
                title: 'Live Queue Tracking',
                desc: 'Know exactly who is being served, how many students are ahead, and your estimated wait time in minutes.'
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
                title: 'Scheduled Pickup Slots',
                desc: 'Choose 10-minute arrival slots. Smart peak-hour distribution prevents crowds from jamming the mess counter.'
              },
              {
                icon: <Bell className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
                title: 'Meal-Ready Notifications',
                desc: 'Get instant in-app alerts when your food is plated and ready for pickup at your designated counter.'
              },
              {
                icon: <ChefHat className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
                title: 'Smart Food Management',
                desc: 'Mess administrators accurately forecast prep volumes, prevent food wastage, and manage live inventory seamlessly.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#FAFAF5] dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/60 shadow-sm hover:shadow-soft transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-[#FAFAF5] dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2">
              Smooth 4-Step Process
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              How ThaliTime Works
            </h3>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
              From hungry student to hot plate in under five minutes at the counter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Login',
                desc: 'Sign in securely using your student college email and registration credentials.'
              },
              {
                step: '02',
                title: 'Select Meal & Slot',
                desc: 'Choose breakfast, lunch, or dinner, view live menu stock, and pick a 10-minute pickup slot.'
              },
              {
                step: '03',
                title: 'Get Your Token',
                desc: 'Receive your unique digital token (TT-XXXX) and guaranteed meal portion reservation.'
              },
              {
                step: '04',
                title: 'Track & Collect',
                desc: 'Monitor queue progress from your room, walk down when ready, and collect your hot thali!'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card"
              >
                <div className="text-4xl font-black text-emerald-800/20 dark:text-emerald-400/20 mb-3">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 sm:py-24 bg-white dark:bg-gray-900/60 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Designed for Both Students & Mess Staff
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Benefits Card */}
            <div className="p-8 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-emerald-950 dark:text-emerald-200">For Students</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">Save valuable study and relaxation time</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  'Less waiting time: No more standing in 30-minute crowded physical queues.',
                  'Convenient meal booking: Reserve breakfast, lunch, or dinner in advance from anywhere.',
                  'Better time management: Plan meal collection around lecture schedules and exams.',
                  'Transparent queue status: Track exactly which token is being served on your phone.'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admin Benefits Card */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">For Mess Administrators</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Efficient kitchen operations and analytics</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  'Better meal planning: Precise booking counts eliminate guesswork during food prep.',
                  'Reduced food wastage: Smart demand predictions prevent surplus cooking and spoilage.',
                  'Organized pickup management: 10-minute staggered slots smooth out rush-hour peaks.',
                  'Efficient staff coordination: Real-time counter assignment and live token transitions.'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-tr from-emerald-900 to-emerald-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Transform Your Mess Experience?
          </h3>
          <p className="text-emerald-200 text-base max-w-2xl mx-auto">
            Experience frictionless hostel dining today. Get your digital token and never wait in a line again.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-gray-100 text-emerald-900 font-bold text-base shadow-lg transition active:scale-95"
            >
              Sign Up as Student
            </Link>
            <Link
              to="/admin-login"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-semibold text-base border border-emerald-700 transition"
            >
              Mess Admin Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 py-10 border-t border-gray-100 dark:border-gray-900 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              T
            </div>
            <span className="font-bold text-gray-900 dark:text-white">ThaliTime</span>
            <span>– Smart Mess Meal Management System</span>
          </div>
          <div>Tagline: "Your Meal, On Time – Every Time."</div>
          <div>© {new Date().getFullYear()} College Mess Automation Initiative. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

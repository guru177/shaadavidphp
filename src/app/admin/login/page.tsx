"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('ഉപയോക്തൃനാമം അല്ലെങ്കിൽ രഹസ്യവാക്ക് തെറ്റാണ്.');
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError('ലോഗിൻ ചെയ്യുന്നതിൽ പിശക് സംഭവിച്ചു.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1622] flex items-center justify-center p-0 relative overflow-hidden font-sans">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about.webp"
          alt="Admin Background"
          fill
          className="object-cover opacity-60 brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0c1622] via-[#0c1622]/40 to-transparent"></div>
      </div>

      {/* Floating Elements for depth */}
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-blue-500/10 rounded-full blur-[150px]"></div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden m-4">

        {/* Left Side: Elegant Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-white/5 border-r border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center mb-12 shadow-2xl">
              <Image src="/icon.webp" alt="Logo" width={32} height={32} />
            </div>
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Secure <br />
              <span className="text-white/40">Administration</span>
            </h2>
            <p className="text-white/60 text-xl leading-relaxed font-malayalam max-w-sm">
              ഷാ ഡേവിഡ് എഡ്യൂക്കേഷൻ പ്ലാറ്റ്‌ഫോമിന്റെ നിയന്ത്രണങ്ങൾ ഇവിടെ നിന്ന് കൈകാര്യം ചെയ്യാം.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-white/40">
            <ShieldCheck size={24} className="text-emerald-500" />
            <span className="text-sm font-medium tracking-widest uppercase">Verified Access Protocol</span>
          </div>

          {/* Decorative blurred circle inside */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center">
          <div className="mb-10 lg:hidden text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
            <p className="text-white/40 font-malayalam">തുടരുന്നതിന് നിങ്ങളുടെ അക്കൗണ്ടിലേക്ക് ലോഗിൻ ചെയ്യുക</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Account Identifier</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white/60 transition-colors" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white/10 transition-all placeholder:text-white/10"
                  placeholder="Username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Access Credential</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white/60 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:bg-white/10 transition-all placeholder:text-white/10"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm font-malayalam"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-[#0c1622] font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#e0e0e0] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none group shadow-xl shadow-white/5"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span className="text-lg">Authorize Session</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-white/20 text-[10px] tracking-widest uppercase">Encryption Status: AES-256 Enabled</p>
          </div>
        </div>
      </div>
    </div>
  );
}

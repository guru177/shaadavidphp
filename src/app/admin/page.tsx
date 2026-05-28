import { auth, signOut } from '@/auth';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  FileText, 
  Settings, 
  LogOut, 
  Plus,
  TrendingUp,
  Users,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c1622] text-white flex flex-col fixed h-full z-20">
        <div className="p-8 border-b border-white/5">
          <h1 className="text-xl font-bold tracking-tight">Admin <span className="text-white/40">Panel</span></h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white">
            <LayoutDashboard size={20} />
            <span className="font-medium">Overview</span>
          </Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-white/5 rounded-xl transition-all">
            <ImageIcon size={20} />
            <span className="font-medium">Gallery</span>
          </Link>
          <Link href="/admin/blogs" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-white/5 rounded-xl transition-all">
            <FileText size={20} />
            <span className="font-medium">Blogs</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-white/60 hover:bg-white/5 rounded-xl transition-all">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <form action={async () => {
            'use server';
            await signOut();
          }}>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium">
              <LogOut size={20} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 lg:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#0c1622]">Dashboard <span className="text-[#0c1622]/40">Overview</span></h2>
            <p className="text-gray-500 mt-1 font-malayalam">സ്വാഗതം, {session?.user?.name || 'അഡ്മിൻ'}</p>
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-[#0c1622] text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
              <Plus size={20} />
              Add New
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <ImageIcon size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Media</p>
              <h3 className="text-3xl font-bold text-[#0c1622]">26</h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <FileText size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Blog Posts</p>
              <h3 className="text-3xl font-bold text-[#0c1622]">12</h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
              <Eye size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Views</p>
              <h3 className="text-3xl font-bold text-[#0c1622]">1.2k</h3>
            </div>
          </div>
        </div>

        {/* Recent Activity Section (Placeholder) */}
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#0c1622]">Recent Media</h3>
            <Link href="/admin/gallery" className="text-blue-600 font-bold text-sm hover:underline">View All</Link>
          </div>
          <div className="p-8">
            <p className="text-gray-400 italic">No recent activity to show.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

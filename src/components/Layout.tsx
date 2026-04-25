import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Settings as SettingsIcon, 
  CreditCard, 
  Bell, 
  LogOut,
  Menu,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { View } from '../App';

import { UserData } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onViewChange: (view: View) => void;
  user: UserData;
}

export function Layout({ children, currentView, onViewChange, user }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard },
    { id: 'profile', label: 'โปรไฟล์', icon: User },
    { id: 'settings', label: 'ตั้งค่า', icon: SettingsIcon },
    { id: 'billing', label: 'การเรียกเก็บเงิน', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden lg:flex flex-col w-64 bg-slate-50 border-r border-slate-200">
        <div className="p-8">
          <h1 className="text-2xl font-extrabold text-primary font-heading tracking-tight">MemberPortal</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 font-semibold' 
                  : 'text-on-surface-variant hover:bg-slate-100'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {currentView === item.id && <motion.div layoutId="activeInd" className="ml-auto"><ChevronRight size={16} /></motion.div>}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-200">
          <div className="flex items-center gap-3 p-2 bg-white rounded-xl shadow-sm border border-slate-100">
            <img 
              src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full bg-primary-container object-cover"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user.fullName}</p>
              <p className="text-xs text-on-surface-variant">สมาชิกโปร</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-on-surface-variant" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="font-heading text-lg font-bold capitalize">
              {navItems.find(n => n.id === currentView)?.label || currentView}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 ring-4 ring-slate-50">
              <img src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`} alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <main className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>

        <footer className="mt-auto border-t border-slate-200 py-8 px-8 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-on-surface-variant">
          <p>© 2024 MemberPortal SaaS. สงวนลิขสิทธิ์ทั้งหมด</p>
          <div className="flex gap-6">
            <button className="hover:text-primary underline underline-offset-4">นโยบายความเป็นส่วนตัว</button>
            <button className="hover:text-primary underline underline-offset-4">คำถามที่พบบ่อย</button>
            <button className="hover:text-primary underline underline-offset-4">ติดต่อเรา</button>
          </div>
        </footer>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[70] lg:hidden shadow-2xl flex flex-col"
            >
               <div className="p-6 flex justify-between items-center">
                  <h1 className="text-xl font-bold text-primary tracking-tight">MemberPortal</h1>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><LogOut size={20} /></button>
               </div>
               <nav className="flex-1 px-4 py-4 space-y-2">
                 {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onViewChange(item.id as View);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${
                        currentView === item.id 
                          ? 'bg-primary text-white font-bold' 
                          : 'text-on-surface-variant hover:bg-slate-100'
                      }`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  ))}
               </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

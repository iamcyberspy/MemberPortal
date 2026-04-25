import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  History, 
  UserPlus, 
  Wallet,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { UserData } from '../types';
import { View } from '../App';

interface DashboardProps {
  user: UserData;
  onNavigate: (view: View) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [interactions, setInteractions] = useState([
    { title: 'จำนวนการเข้าใช้งานพุ่งสูงขึ้น', desc: 'การวิเคราะห์บันทึกว่าการเข้าสู่ระบบเพิ่มขึ้น 20% ในวันนี้', icon: History, time: '2 นาทีที่แล้ว' },
    { title: 'การอนุมัติสมาชิกใหม่', desc: 'Sarah Jenkins เข้าร่วมระดับพรีเมียม', icon: UserPlus, time: '15 นาทีที่แล้ว' },
    { title: 'รอบการชำระเงินเสร็จสิ้น', desc: 'ดำเนินการต่ออายุการสมัครสมาชิกรายเดือนสำเร็จ', icon: Wallet, time: '1 ชั่วโมงที่แล้ว' },
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Simulate new data arrival
      const newItem = {
        title: 'ระบบอัปเกรดสำเร็จ',
        desc: 'ฟีเจอร์ใหม่ได้รับการติดตั้งในบัญชีของคุณแล้ว',
        icon: ShieldCheck,
        time: 'เมื่อสักครู่'
      };
      setInteractions(prev => [newItem, ...prev.slice(0, 2)]);
    }, 1000);
  };

  const stats = [
    { label: 'กิจกรรม', value: '1,284', trend: '+12%', icon: Users, color: 'blue' },
    { label: 'ประสิทธิภาพ', value: '84.2%', trend: 'Stable', icon: TrendingUp, color: 'purple' },
    { label: 'สถานะระบบ', value: 'เหมาะสม', trend: 'Optimal', icon: ShieldCheck, color: 'green' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-on-surface">ยินดีต้อนรับกลับมา, คุณ {user.fullName.split(' ')[0]}!</h1>
          <p className="text-on-surface-variant mt-2">นี่คือสิ่งที่เกิดขึ้นกับพอร์ทัลสมาชิกของคุณในวันนี้</p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-outline rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          {isRefreshing ? 'กำลังโหลด...' : 'รีเฟรชข้อมูล'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="card group hover:shadow-level-2 transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-xl ${
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                stat.color === 'purple' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'
              }`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                stat.trend === '+12%' ? 'bg-green-100 text-green-700' : 
                stat.trend === 'Optimal' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-extrabold mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-heading">การโต้ตอบล่าสุด</h3>
            <button className="text-primary text-sm font-bold hover:underline" onClick={() => onNavigate('dashboard')}>ดูทั้งหมด</button>
          </div>
          
          <div className="card !p-0 overflow-hidden divide-y divide-slate-100">
            {interactions.map((item, i) => (
              <div key={i} className="p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                  <item.icon size={20} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-sm truncate">{item.title}</p>
                  <p className="text-xs text-on-surface-variant line-clamp-1">{item.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">{item.time}</p>
                  <ArrowUpRight size={16} className="ml-auto text-slate-300 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl group">
             <img 
               src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               alt="Promo"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
               <h4 className="text-white font-bold text-lg">สิทธิประโยชน์ระดับโปร</h4>
               <p className="text-slate-300 text-sm mb-4">ขณะนี้คุณใช้คุณสมบัติสมาชิกระดับโปรไปแล้ว 45%</p>
               <button 
                onClick={() => onNavigate('billing')}
                className="bg-white text-on-surface py-2 rounded-lg text-sm font-bold w-full hover:bg-primary hover:text-white transition-all"
               >
                 อัปเกรดพื้นที่เก็บข้อมูล
               </button>
             </div>
          </div>

          <div className="card bg-surface-muted border-none">
            <h4 className="font-bold text-lg mb-2">ช่วยเหลือด่วน</h4>
            <p className="text-sm text-on-surface-variant mb-4">ต้องการความช่วยเหลือเกี่ยวกับแดชบอร์ดสมาชิกของคุณหรือไม่?</p>
            <button 
              onClick={() => onNavigate('settings')}
              className="flex items-center gap-2 text-primary font-bold text-sm group"
            >
              <span>เปิดศูนย์ช่วยเหลือ</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

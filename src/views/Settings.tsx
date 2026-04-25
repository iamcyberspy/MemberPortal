import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, Info, Trash2, Check } from 'lucide-react';
import { UserData } from '../types';
import { motion } from 'motion/react';

interface SettingsProps {
  user: UserData;
  onUpdate: (user: UserData) => void;
}

export function Settings({ user, onUpdate }: SettingsProps) {
  const [formData, setFormData] = useState<UserData>(user);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passFeedback, setPassFeedback] = useState({ type: '', message: '' });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateGeneral = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'กรุณากรอกชื่อ-นามสกุล';
    if (!formData.email.includes('@')) newErrors.email = 'กรุณากรอกอีเมลที่ถูกต้อง';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateGeneral()) return;

    setIsSaving(true);
    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setPassFeedback({ type: 'error', message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPassFeedback({ type: 'error', message: 'รหัสผ่านใหม่ไม่ตรงกัน' });
      return;
    }
    if (passwords.next.length < 12) {
      setPassFeedback({ type: 'error', message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 12 ตัวอักษร' });
      return;
    }

    setIsChangingPass(true);
    setPassFeedback({ type: '', message: '' });

    setTimeout(() => {
      setIsChangingPass(false);
      setPassFeedback({ type: 'success', message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
      setPasswords({ current: '', next: '', confirm: '' });
      setTimeout(() => setPassFeedback({ type: '', message: '' }), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePassInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
    if (passFeedback.message) setPassFeedback({ type: '', message: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-extrabold font-heading text-on-surface">การกำหนดค่าบัญชี</h1>
        <p className="text-on-surface-variant mt-2">จัดการข้อมูลส่วนตัว ความปลอดภัย และการแจ้งเตือน</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* General Settings */}
        <form onSubmit={handleSubmit} className="lg:col-span-12 xl:col-span-7 bg-white rounded-2xl p-8 shadow-[var(--shadow-level-1)] border border-slate-100 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-heading">ตั้งค่าทั่วไป</h3>
            <SettingsIcon size={20} className="text-slate-400" />
          </div>
          <div className="space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">ชื่อ-นามสกุล</label>
                  <input 
                    name="fullName" 
                    className={`input-field ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                    value={formData.fullName} 
                    onChange={handleChange} 
                  />
                  {errors.fullName && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">อีเมล</label>
                  <input 
                    name="email" 
                    className={`input-field ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                  {errors.email && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.email}</p>}
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">เขตเวลา</label>
                <select name="timezone" className="w-full h-11 px-4 rounded-lg border border-outline bg-surface-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" value={formData.timezone} onChange={handleChange}>
                  <option>Pacific Standard Time (PST)</option>
                  <option>Eastern Standard Time (EST)</option>
                  <option>Greenwich Mean Time (GMT)</option>
                </select>
             </div>
          </div>
          <div className="mt-8 flex justify-end items-center gap-4">
            {showSuccess && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-xs font-bold flex items-center gap-1">
                <Check size={14} /> อัปเดตแล้ว
              </motion.span>
            )}
            <button type="submit" className="btn-primary disabled:opacity-50" disabled={isSaving}>
              {isSaving ? 'กำลังอัปเดต...' : 'อัปเดตข้อมูล'}
            </button>
          </div>
        </form>

        {/* Notifications */}
        <div className="lg:col-span-12 xl:col-span-5 bg-white rounded-2xl p-8 shadow-[var(--shadow-level-1)] border border-slate-100 h-full">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold font-heading">การแจ้งเตือน</h3>
              <Bell size={20} className="text-slate-400" />
           </div>
           <div className="space-y-2">
             {[
               { id: 'email', title: 'การแจ้งเตือนทางอีเมล', desc: 'รับรายงานสรุปประจำสัปดาห์', initial: true },
               { id: 'push', title: 'การแจ้งเตือนแบบพุช', desc: 'การติดตามกิจกรรมแบบเรียลไทม์', initial: false },
               { id: 'security', title: 'การแจ้งเตือนความปลอดภัย', desc: 'คำเตือนการเข้าสู่ระบบใหม่', initial: true },
             ].map((item) => (
               <div key={item.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-xs text-on-surface-variant">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.initial} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
               </div>
             ))}
           </div>
        </div>

        {/* Password Security */}
        <div className="lg:col-span-12 bg-white rounded-2xl p-8 shadow-[var(--shadow-level-1)] border border-slate-100">
           <form onSubmit={handlePasswordChange}>
             <div className="flex justify-between items-start mb-8 text-center sm:text-left">
                <div>
                  <h3 className="text-xl font-bold font-heading">เปลี่ยนรหัสผ่าน</h3>
                  <p className="text-on-surface-variant text-sm">ตรวจสอบให้แน่ใจว่าบัญชีของคุณใช้รหัสผ่านที่ยาวและสุ่มเพื่อความปลอดภัย</p>
                </div>
                <div className="hidden sm:block p-3 bg-amber-50 text-amber-600 rounded-2xl">
                  <Lock size={24} />
                </div>
             </div>

             {passFeedback.message && (
               <motion.div 
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`mb-6 p-4 rounded-xl text-sm font-bold border ${
                   passFeedback.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                 }`}
               >
                 {passFeedback.message}
               </motion.div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">รหัสผ่านปัจจุบัน</label>
                  <input 
                    name="current"
                    className="input-field" 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwords.current}
                    onChange={handlePassInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">รหัสผ่านใหม่</label>
                  <input 
                    name="next"
                    className="input-field" 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwords.next}
                    onChange={handlePassInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">ยืนยันรหัสผ่านใหม่</label>
                  <input 
                    name="confirm"
                    className="input-field" 
                    type="password" 
                    placeholder="••••••••" 
                    value={passwords.confirm}
                    onChange={handlePassInputChange}
                  />
                </div>
             </div>

             <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-blue-50/50 rounded-2xl border border-blue-100 gap-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Info size={18} className="text-blue-500" />
                  <span className="text-xs font-medium">รหัสผ่านต้องมีความยาวอย่างน้อย 12 ตัวอักษร</span>
                </div>
                <button 
                  type="submit"
                  disabled={isChangingPass}
                  className="btn-primary w-full sm:w-auto bg-on-surface hover:bg-slate-800 disabled:opacity-50"
                >
                  {isChangingPass ? 'กำลังอัปเดต...' : 'อัปเดตรหัสผ่าน'}
                </button>
             </div>
           </form>
        </div>

        {/* Danger Zone */}
        <div className="lg:col-span-12 p-8 bg-red-50/50 rounded-2xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="space-y-1 text-center md:text-left">
              <h4 className="font-bold text-red-700">ปิดใช้งานบัญชี</h4>
              <p className="text-sm text-red-600/80">เมื่อคุณปิดใช้งานบัญชีของคุณแล้ว จะไม่สามารถย้อนกลับได้ โปรดแน่ใจก่อนดำเนินการ</p>
           </div>
           <button className="flex items-center justify-center gap-2 px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200">
             <Trash2 size={18} />
             <span>ลบสมาชิกภาพ</span>
           </button>
        </div>
      </div>
    </div>
  );
}

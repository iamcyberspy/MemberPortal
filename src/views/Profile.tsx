import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, Edit2, Mail, Phone, MapPin, ShieldCheck, Check, Image as ImageIcon, Trash2, RefreshCw } from 'lucide-react';
import { UserData } from '../types';

interface ProfileProps {
  user: UserData;
  onUpdate: (user: UserData) => void;
}

export function Profile({ user, onUpdate }: ProfileProps) {
  const [formData, setFormData] = useState<UserData>(user);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'กรุณากรอกชื่อ-นามสกุล';
    if (!formData.username.trim()) newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
    if (!formData.email.includes('@')) newErrors.email = 'กรุณากรอกอีเมลที่ถูกต้อง';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedUser = { ...user, avatarUrl: base64String };
        onUpdate(updatedUser);
        setFormData(prev => ({ ...prev, avatarUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCustomAvatar = () => {
    const updatedUser = { ...user, avatarUrl: undefined };
    onUpdate(updatedUser);
    setFormData(prev => ({ ...prev, avatarUrl: undefined }));
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold font-heading text-on-surface">โปรไฟล์ของคุณ</h1>
        <p className="text-on-surface-variant mt-2">จัดการข้อมูลส่วนตัวและภาพลักษณ์ของคุณในพอร์ทัล</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Visual stuff */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card flex flex-col items-center text-center p-8"
          >
            <div className="relative group">
              <div className="w-32 h-32 rounded-full ring-4 ring-primary/20 overflow-hidden shadow-inner bg-slate-100 flex items-center justify-center">
                <img 
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />

              <div className="absolute bottom-0 right-0 flex gap-1 translate-y-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                  title="อัปโหลดรูปภาพ"
                >
                  <Camera size={16} />
                </button>
                {user.avatarUrl ? (
                  <button 
                    onClick={removeCustomAvatar}
                    className="bg-red-500 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                    title="ลบรูปภาพ"
                  >
                    <Trash2 size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={() => onUpdate({ ...user, avatarSeed: Math.random().toString(36) })}
                    className="bg-slate-700 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                    title="สุ่มอวตารใหม่"
                  >
                    <RefreshCw size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <h3 className="text-2xl font-extrabold mt-4">{user.fullName}</h3>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">เป็นสมาชิกตั้งแต่ 2022</p>
            
            <div className="w-full h-px bg-slate-100 my-6" />
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-surface-muted p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">สถานะ</p>
                <p className="text-primary font-bold">ใช้งานอยู่</p>
              </div>
              <div className="bg-surface-muted p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">ระดับ</p>
                <p className="text-amber-600 font-bold">ทอง</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-primary rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="flex justify-between items-start mb-10 relative">
              <ShieldCheck size={24} className="opacity-80" />
              <span className="font-heading font-extrabold text-xl tracking-tighter">MEMBER_PORTAL</span>
            </div>
            
            <div className="relative">
              <p className="text-[10px] font-bold text-white/60 uppercase mb-1">หมายเลขสมาชิก</p>
              <p className="text-lg font-mono tracking-[0.2em] font-medium">4421 • 8890 • 1122</p>
            </div>

            <div className="flex justify-between items-end mt-8 relative">
              <div>
                <p className="text-[10px] font-bold text-white/60 uppercase">วันหมดอายุ</p>
                <p className="font-bold">12 / 2026</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30" />
            </div>
          </div>
        </div>

        {/* Right Col: Form */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
              <h3 className="text-xl font-bold font-heading">ข้อมูลส่วนตัว</h3>
              <div className="flex items-center gap-2">
                {showSuccess && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-xs font-bold flex items-center gap-1">
                    <Check size={14} /> บันทึกสำเร็จ
                  </motion.span>
                )}
                <button className="flex items-center gap-2 text-primary font-bold py-2 px-4 hover:bg-primary/5 rounded-lg transition-colors">
                  <Edit2 size={16} />
                  <span>แก้ไขโปรไฟล์</span>
                </button>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">ชื่อ-นามสกุล</label>
                  <input 
                    name="fullName" 
                    className={`input-field ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                    value={formData.fullName} 
                    onChange={handleChange} 
                  />
                  {errors.fullName && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">ชื่อผู้ใช้สาธารณะ</label>
                  <input 
                    name="username" 
                    className={`input-field ${errors.username ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                    value={formData.username} 
                    onChange={handleChange} 
                  />
                  {errors.username && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.username}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant">อีเมล</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-3.5 text-on-surface-variant/50" />
                  <input 
                    name="email" 
                    type="email" 
                    className={`input-field pl-11 ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`} 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </div>
                {errors.email && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">เบอร์โทรศัพท์</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-3.5 text-on-surface-variant/50" />
                    <input name="phone" className="input-field pl-11" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant">ที่ตั้ง</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-3.5 text-on-surface-variant/50" />
                    <input name="location" className="input-field pl-11" value={formData.location} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant">ประวัติโดยย่อ</label>
                <textarea 
                  name="bio"
                  className="w-full p-4 rounded-lg border border-outline bg-surface-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none h-32"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-50">
                <button type="submit" className="btn-primary disabled:opacity-50 min-w-[140px]" disabled={isSaving}>
                  {isSaving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setFormData(user)}>ยกเลิก</button>
              </div>
            </form>
          </motion.div>

          <div className="mt-8 card flex items-center justify-between border-primary/10 bg-primary/[0.02]">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-2xl">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold">การยืนยันตัวตนผ่านสองขั้นตอน</h4>
                <p className="text-sm text-on-surface-variant">ปกป้องบัญชีของคุณด้วยขั้นตอนความปลอดภัยพิเศษ</p>
              </div>
            </div>
            <button className="text-primary font-bold py-2 px-4 hover:underline">เปิดใช้งาน</button>
          </div>
        </div>
      </div>
    </div>
  );
}

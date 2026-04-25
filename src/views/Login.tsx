import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, Key, ArrowRight, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (!email.includes('@')) return 'กรุณากรอกอีเมลที่ถูกต้อง';
    if (password.length < 6) return 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
    return '';
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      onLogin();
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary-container/20 rounded-full blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 rotate-3">
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold font-heading text-on-surface tracking-tight">MemberPortal</h1>
            <p className="text-on-surface-variant font-medium mt-2">Professional tranquility for your workflow</p>
          </div>
        </div>

        <div className="card !p-10 !rounded-2xl">
          <header className="mb-8">
            <h2 className="text-2xl font-bold font-heading">ยินดีต้อนรับกลับมา</h2>
            <p className="text-on-surface-variant text-sm mt-1">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>
          </header>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-bold"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block ml-1">อีเมล</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-3.5 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="alex@example.com" 
                  className={`input-field pl-11 !h-12 ${error && !email.includes('@') ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if(error) setError(''); }}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">รหัสผ่าน</label>
                <button type="button" className="text-[10px] font-bold text-primary uppercase hover:underline">ลืมรหัสผ่าน?</button>
              </div>
              <div className="relative">
                <Key size={18} className="absolute left-4 top-3.5 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className={`input-field pl-11 !h-12 ${error && password.length < 6 ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if(error) setError(''); }}
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-outline text-primary focus:ring-primary h-4 w-4" />
              <label htmlFor="remember" className="text-sm text-on-surface-variant cursor-pointer select-none">จดจำฉันไว้ 30 วัน</label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary !h-12 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              <span>{isSubmitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</span>
              {!isSubmitting && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-on-surface-variant">ยังไม่มีบัญชีใช่ไหม? <button className="text-primary font-bold hover:underline">เริ่มทดลองใช้งานฟรี</button></p>
          </div>
        </div>

        <div className="flex justify-center gap-6 text-xs text-slate-400 font-medium">
          <button className="hover:text-primary transition-colors">นโยบายความเป็นส่วนตัว</button>
          <button className="hover:text-primary transition-colors">เงื่อนไขการใช้งาน</button>
          <button className="hover:text-primary transition-colors">สถานะระบบ</button>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from 'motion/react';
import { 
  CreditCard, 
  Download, 
  Plus, 
  CheckCircle2, 
  History, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

export function Billing() {
  const invoices = [
    { id: '#INV-2024-001', date: '1 เม.ย. 2024', amount: '฿990.00', status: 'ชำระแล้ว' },
    { id: '#INV-2024-002', date: '1 มี.ค. 2024', amount: '฿990.00', status: 'ชำระแล้ว' },
    { id: '#INV-2024-003', date: '1 ก.พ. 2024', amount: '฿990.00', status: 'ชำระแล้ว' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-extrabold font-heading text-on-surface">การเรียกเก็บเงิน</h1>
        <p className="text-on-surface-variant mt-2">จัดการการสมัครสมาชิก แผนการใช้งาน และประวัติการชำระเงินของคุณ</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Current Plan Card */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          <div className="card border-primary/20 bg-primary/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest">แพ็กเกจปัจจุบัน</p>
                <h3 className="text-2xl font-black font-heading mt-1">Pro Member (รายเดือน)</h3>
                <p className="text-sm text-on-surface-variant mt-1 flex items-center gap-1">
                  <Calendar size={14} />
                  รอบการเรียกเก็บเงินถัดไปในวันที่ 1 พฤษภาคม 2024
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">฿990.00<span className="text-sm font-medium text-on-surface-variant">/เดือน</span></p>
                <button className="text-xs font-bold text-primary hover:underline mt-1 flex items-center gap-1 ml-auto">
                  เปลี่ยนแพ็กเกจ <ExternalLink size={12} />
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary" />
                <span>พื้นที่เก็บข้อมูลไม่จำกัด</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <CheckCircle2 size={16} className="text-primary" />
                <span>การสนับสนุนลูกค้าระดับสูง</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-heading">วิธีการชำระเงิน</h3>
              <button className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">
                <Plus size={16} />
                <span>เพิ่มบัตร</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-white shrink-0">
                    <span className="font-bold text-[10px] italic">VISA</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">•••• •••• •••• 4242</p>
                    <p className="text-xs text-on-surface-variant">Visa Premium (Exp 12/26)</p>
                  </div>
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase">บัตรหลัก</span>
                </div>
                <button className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">แก้ไข</button>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-slate-200 flex items-center gap-3 text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                <div className="w-12 h-8 bg-slate-50 border border-slate-200 rounded flex items-center justify-center">
                  <CreditCard size={16} />
                </div>
                <p className="text-sm font-medium">ผูกบัญชี PayPal หรือวิธีการดูแลอื่น ๆ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="card flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold font-heading">ประวัติการเรียกเก็บเงิน</h3>
              <History size={20} className="text-slate-400" />
            </div>

            <div className="space-y-1 flex-1">
              {invoices.map((inv, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white shadow-sm ring-4 ring-transparent group-hover:ring-slate-50 transition-all">
                      <Download size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{inv.id}</p>
                      <p className="text-xs text-on-surface-variant">{inv.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{inv.amount}</p>
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{inv.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 text-center text-sm font-bold text-on-surface-variant border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              ดูใบแจ้งหนี้ทั้งหมด
            </button>
          </div>

          {/* Quick Support Banner */}
          <div className="p-6 bg-slate-900 rounded-2xl text-white relative overflow-hidden group shadow-xl">
             <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-500">
               <ShieldCheck size={120} />
             </div>
             <div className="relative">
               <div className="flex items-center gap-2 mb-2">
                 <AlertCircle size={14} className="text-primary" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-primary">ความปลอดภัยสูง</span>
               </div>
               <h4 className="font-bold text-lg">การชำระเงินที่ปลอดภัย</h4>
               <p className="text-xs text-slate-400 mt-2 leading-relaxed">ข้อมูลบัตรเครดิตของคุณถูกเข้ารหัสด้วยมาตรฐาน AES-256 เราไม่เก็บรหัส CVV ของคุณไว้ในระบบ</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

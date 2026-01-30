import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Smartphone, Globe, Monitor, ShoppingCart, Mail, Zap, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DiscordIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="currentColor" 
    strokeWidth="0" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.5382-9.674-3.533-13.6632a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
  </svg>
);

const Commission = ({ isAlterMode, toggleAlterMode }) => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('IDR'); // 'IDR' or 'USD'

  const content = {
    IDR: {
      title: "Commission Website & Aplikasi",
      intro: "Halo! Saya menyediakan jasa pemrograman untuk membantu Anda membangun kehadiran digital, mulai dari portofolio pribadi hingga sistem toko online yang kompleks.",
      pricingTitle: "💰 Daftar Harga (Estimasi Dasar)",
      pricingNote: "Harga bersifat dinamis, tergantung pada tingkat kerumitan fitur dan deadline pengerjaan.",
      items: {
        simple: {
          title: "Simple Portfolio / Landing Page",
          desc: "Cocok untuk: CV Digital, tugas, atau landing page sederhana (1-2 halaman).",
          type: "Sifat: Statis (tanpa database/sistem login)."
        },
        professional: {
          title: "Professional Website",
          desc: "Cocok untuk: Profil perusahaan atau blog dinamis.",
          type: "Sifat: Dilengkapi Dashboard Admin (bisa edit konten sendiri)."
        },
        ecommerce: {
          title: "E-Commerce (Toko Online)",
          desc: "Fitur: Katalog produk, Keranjang, & Integrasi Pembayaran Otomatis (Payment Gateway).",
          type: ""
        },
        app: {
          title: "Aplikasi Desktop & Mobile (Android)",
          desc: "Contoh: Sistem Kasir, Inventaris, atau Aplikasi Android kustom.",
          type: ""
        }
      },
      tosTitle: "📝 Terms of Service (TOS)",
      tos: [
        { label: "Sistem Pembayaran:", text: "DP minimal 50% di awal sebagai tanda jadi. Pelunasan dilakukan setelah demo produk selesai dan sebelum penyerahan akses penuh/source code." },
        { label: "Penentuan Harga:", text: "Harga final disepakati di awal berdasarkan daftar fitur. Penambahan fitur baru di tengah pengerjaan akan dikenakan biaya tambahan." },
        { label: "Domain & Hosting:", text: "Harga jasa belum termasuk biaya sewa domain dan hosting/server tahunan (biaya dibayar ke penyedia layanan, saya bantu prosesnya)." },
        { label: "Revisi:", text: "Gratis 3x revisi minor. Revisi mayor yang mengubah struktur logika awal akan dikenakan biaya tambahan." },
        { label: "Garansi:", text: "Perbaikan bug gratis selama 30 hari setelah serah terima proyek." },
        { label: "Hak Cipta:", text: "Produk menjadi hak milik pelanggan sepenuhnya setelah pelunasan. Saya tetap berhak mencantumkan hasil kerja di portofolio pribadi saya." }
      ],
      reqTitle: "📋 Data Kebutuhan Project (Wajib Diisi)",
      reqIntro: "Agar saya bisa memberikan estimasi harga yang akurat, mohon siapkan data berikut saat menghubungi saya:",
      reqFields: [
        { label: "Nama & Jenis Project:", desc: "(Contoh: Web Portofolio Fotografer)" },
        { label: "Deskripsi Singkat:", desc: "(Aplikasi ini digunakan untuk apa dan siapa penggunanya?)" },
        { label: "Daftar Fitur Wajib:", desc: "(Contoh: Harus ada form kontak, bisa upload foto, bisa bayar pakai QRIS)" },
        { label: "Referensi Desain:", desc: "(Link website yang Anda sukai atau kirim sketsa kasar)" },
        { label: "Aset:", desc: "(Apakah sudah ada Logo, tulisan konten, dan gambar pendukung?)" },
        { label: "Deadline:", desc: "(Kapan project ini harus selesai?)" }
      ],
      hostingTitle: "Hosting & Domain:",
      hostingList: [
        "Apakah pelanggan sudah punya domain/hosting sendiri?",
        "Jika belum, apakah ingin menggunakan layanan gratis (Vercel/Netlify) atau berbayar?"
      ],
      consultTitle: "Konsultasi & Pemesanan",
      backButton: "Kembali ke Portofolio"
    },
    USD: {
      title: "Website & App Commission",
      intro: "Hello! I provide programming services to help you build your digital presence, from personal portfolios to complex online store systems.",
      pricingTitle: "💰 Pricing List (Base Estimate)",
      pricingNote: "Prices are dynamic, depending on feature complexity and deadline.",
      items: {
        simple: {
          title: "Simple Portfolio / Landing Page",
          desc: "Suitable for: Digital CV, assignments, or simple landing pages (1-2 pages).",
          type: "Type: Static (no database/login system)."
        },
        professional: {
          title: "Professional Website",
          desc: "Suitable for: Company profiles or dynamic blogs.",
          type: "Type: Equipped with Admin Dashboard (can edit content yourself)."
        },
        ecommerce: {
          title: "E-Commerce (Online Store)",
          desc: "Features: Product catalog, Cart, & Automated Payment Gateway Integration.",
          type: ""
        },
        app: {
          title: "Desktop & Mobile Apps (Android)",
          desc: "Examples: POS Systems, Inventory, or Custom Android Apps.",
          type: ""
        }
      },
      tosTitle: "📝 Terms of Service (TOS)",
      tos: [
        { label: "Payment System:", text: "Minimum 50% Down Payment upfront. Full payment upon completion of product demo and before full access/source code handover." },
        { label: "Pricing:", text: "Final price agreed upfront based on feature list. New features added mid-project will incur additional costs." },
        { label: "Domain & Hosting:", text: "Service price excludes annual domain and hosting/server fees (paid to service provider, I can assist)." },
        { label: "Revisions:", text: "Free 3x minor revisions. Major revisions changing initial logic structure will incur additional costs." },
        { label: "Warranty:", text: "Free bug fixes for 30 days after project handover." },
        { label: "Copyright:", text: "Product becomes fully owned by the customer after payment. I retain the right to feature the work in my personal portfolio." }
      ],
      reqTitle: "📋 Project Requirements Data (Mandatory)",
      reqIntro: "To provide an accurate price estimate, please prepare the following data when contacting me:",
      reqFields: [
        { label: "Project Name & Type:", desc: "(Example: Photographer Portfolio Web)" },
        { label: "Brief Description:", desc: "(What is this app for and who are the users?)" },
        { label: "Mandatory Features:", desc: "(Example: Contact form, photo upload, payment integration)" },
        { label: "Design Reference:", desc: "(Link to websites you like or rough sketches)" },
        { label: "Assets:", desc: "(Do you have Logo, content text, and supporting images?)" },
        { label: "Deadline:", desc: "(When must this project be finished?)" }
      ],
      hostingTitle: "Hosting & Domain:",
      hostingList: [
        "Does the customer already have a domain/hosting?",
        "If not, would you like to use free services (Vercel/Netlify) or paid ones?"
      ],
      consultTitle: "Consultation & Ordering",
      backButton: "Back to Portfolio"
    }
  };

  const pricing = {
    simple: { idr: "Rp400.000", usd: "$30" },
    professional: { idr: "Rp1.500.000", usd: "$100" },
    ecommerce: { idr: "Rp3.000.000", usd: "$200" },
    app: { idr: "Rp2.000.000", usd: "$150" }
  };

  const currentPrice = (key) => currency === 'IDR' ? pricing[key].idr : pricing[key].usd;
  const t = content[currency];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen py-20 px-6 transition-colors duration-500 ${isAlterMode ? 'bg-black text-portfolio-green' : 'bg-[#1a1a1a] text-gray-100'}`}
    >
      {/* Mode Toggle Button */}
      <button
        onClick={toggleAlterMode}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 shadow-xl cursor-pointer
          ${isAlterMode 
            ? 'bg-portfolio-orange text-portfolio-green shadow-[0_0_20px_rgba(255,215,0,0.5)]' 
            : 'bg-portfolio-orange text-portfolio-dark hover:bg-white hover:text-portfolio-dark'}
        `}
      >
        <Zap size={20} className={isAlterMode ? "fill-current" : ""} />
      </button>

      <div className="container mx-auto max-w-4xl">
        
        {/* Header & Back Button */}
        <div className="mb-12">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-6 text-portfolio-orange font-bold hover:underline"
          >
            <ArrowLeft size={20} /> {t.backButton}
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 transition-colors duration-300">{t.title}</h1>
              <p className="text-xl opacity-80">Handitya</p>
            </div>
            
            {/* Currency Toggle */}
            <div className="bg-portfolio-dark/10 p-1 rounded-lg flex">
              <button 
                onClick={() => setCurrency('IDR')}
                className={`px-4 py-2 rounded-md font-bold transition-all duration-300 ${currency === 'IDR' ? 'bg-portfolio-orange text-portfolio-dark shadow-md' : 'text-opacity-50 hover:bg-black/5'}`}
              >
                IDR
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-md font-bold transition-all duration-300 ${currency === 'USD' ? 'bg-portfolio-orange text-portfolio-dark shadow-md' : 'text-opacity-50 hover:bg-black/5'}`}
              >
                USD
              </button>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed opacity-80 max-w-2xl transition-opacity duration-300">
            {t.intro}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold mb-2 transition-colors duration-300">{t.pricingTitle}</h2>
          <p className="mb-8 opacity-70 italic transition-opacity duration-300">{t.pricingNote}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Simple */}
            <motion.div whileHover={{ y: -5 }} className={`border p-6 rounded-2xl shadow-lg transition-colors duration-300 ${isAlterMode ? 'bg-white/5 border-portfolio-green/20' : 'bg-white/5 border-white/10'}`}>
              <div className="w-12 h-12 bg-portfolio-orange rounded-full flex items-center justify-center mb-4 text-portfolio-dark">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.items.simple.title}</h3>
              <p className="text-3xl font-bold text-portfolio-orange mb-4">Start from: {currentPrice('simple')}</p>
              <ul className="space-y-2 text-sm opacity-80">
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> {t.items.simple.desc}</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> {t.items.simple.type}</li>
              </ul>
            </motion.div>

            {/* Professional */}
            <motion.div whileHover={{ y: -5 }} className={`border p-6 rounded-2xl shadow-lg relative overflow-hidden transition-colors duration-300 ${isAlterMode ? 'bg-white/5 border-portfolio-green/20' : 'bg-white/5 border-white/10'}`}>
               <div className="absolute top-0 right-0 bg-portfolio-orange text-portfolio-dark text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <div className="w-12 h-12 bg-portfolio-orange rounded-full flex items-center justify-center mb-4 text-portfolio-dark">
                <Monitor size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.items.professional.title}</h3>
              <p className="text-3xl font-bold text-portfolio-orange mb-4">Start from: {currentPrice('professional')}</p>
              <ul className="space-y-2 text-sm opacity-80">
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> {t.items.professional.desc}</li>
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> {t.items.professional.type}</li>
              </ul>
            </motion.div>

            {/* E-Commerce */}
            <motion.div whileHover={{ y: -5 }} className={`border p-6 rounded-2xl shadow-lg transition-colors duration-300 ${isAlterMode ? 'bg-white/5 border-portfolio-green/20' : 'bg-white/5 border-white/10'}`}>
              <div className="w-12 h-12 bg-portfolio-orange rounded-full flex items-center justify-center mb-4 text-portfolio-dark">
                <ShoppingCart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.items.ecommerce.title}</h3>
              <p className="text-3xl font-bold text-portfolio-orange mb-4">Start from: {currentPrice('ecommerce')}</p>
              <ul className="space-y-2 text-sm opacity-80">
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> {t.items.ecommerce.desc}</li>
              </ul>
            </motion.div>

            {/* App */}
            <motion.div whileHover={{ y: -5 }} className={`border p-6 rounded-2xl shadow-lg transition-colors duration-300 ${isAlterMode ? 'bg-white/5 border-portfolio-green/20' : 'bg-white/5 border-white/10'}`}>
              <div className="w-12 h-12 bg-portfolio-orange rounded-full flex items-center justify-center mb-4 text-portfolio-dark">
                <Smartphone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.items.app.title}</h3>
              <p className="text-3xl font-bold text-portfolio-orange mb-4">Start from: {currentPrice('app')}</p>
              <ul className="space-y-2 text-sm opacity-80">
                <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> {t.items.app.desc}</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* TOS Section */}
        <div className={`mb-16 p-8 rounded-2xl border-l-4 border-portfolio-orange transition-colors duration-300 ${isAlterMode ? 'bg-black/20' : 'bg-white/5'}`}>
          <h2 className="text-2xl font-serif font-bold mb-6 transition-colors duration-300">{t.tosTitle}</h2>
          <ul className="space-y-4 opacity-90">
            {t.tos.map((item, index) => (
              <li key={index}><strong>{item.label}</strong> {item.text}</li>
            ))}
          </ul>
        </div>

        {/* Project Data Form */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6 transition-colors duration-300">{t.reqTitle}</h2>
          <p className="mb-6 opacity-70 transition-opacity duration-300">{t.reqIntro}</p>
          
          <div className={`p-6 rounded-xl border space-y-4 font-mono text-sm transition-colors duration-300 ${isAlterMode ? 'bg-white/5 border-portfolio-green/20' : 'bg-white/5 border-white/10'}`}>
             {t.reqFields.map((field, index) => (
               <p key={index}><span className="text-portfolio-orange">{field.label}</span> {field.desc}</p>
             ))}
             <div className="pt-4 border-t border-gray-500/20 mt-4">
                <p className="font-bold mb-2 text-portfolio-orange">{t.hostingTitle}</p>
                <ul className="list-disc list-inside ml-4 opacity-80">
                  {t.hostingList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
             </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-portfolio-orange text-portfolio-dark p-10 rounded-[3rem] shadow-xl">
          <h2 className="text-3xl font-serif font-bold mb-8 transition-colors duration-300">{t.consultTitle}</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 text-lg font-bold">
            <a 
              href="https://wa.me/6283108527143" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
            >
              <Smartphone size={24} /> WhatsApp
            </a>
            <a 
              href="mailto:hanhandityagw@gmail.com" 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
            >
              <Mail size={24} /> Email
            </a>
            <div className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 rounded-full hover:bg-white/40 transition-colors cursor-pointer" onClick={() => { navigator.clipboard.writeText("han_garda"); alert("Discord Username Copied: han_garda"); }}>
              <DiscordIcon size={24} /> Discord: han_garda
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Commission;
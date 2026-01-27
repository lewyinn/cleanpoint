'use client';
import { useState } from "react"
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MoveUpRight, ChevronDown } from 'lucide-react';

const steps = [
  {
    title: "Ambil Foto",
    desc: "Dokumentasikan masalah lingkungan yang Anda temui, seperti tumpukan sampah, saluran air tersumbat, atau fasilitas umum rusak menggunakan kamera smartphone Anda."
  },
  {
    title: "Tandai Lokasi",
    desc: "Tentukan lokasi masalah secara akurat dengan bantuan GPS agar tim kami dapat menemukan dan menangani laporan dengan cepat."
  },
  {
    title: "Kirim Laporan",
    desc: "Lengkapi laporan Anda dengan informasi yang dibutuhkan lalu kirim. Setiap laporan langsung masuk ke sistem kami."
  },
  {
    title: "Pantau Proses",
    desc: "Pantau status laporan secara real-time dan dapatkan notifikasi setiap ada pembaruan dari tim CleanPoint."
  }
]

export default function Home() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-44 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 border border-black rounded-full text-sm text-black">
              Bersama Jaga Lingkungan Kita
            </span>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Laporkan Masalah{' '}
              <span className="bg-emerald-700 text-white px-3 py-1 rounded-lg inline-block">
                Lingkungan
              </span>
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Sekitarmu Dengan Mudah.
            </h2>
          </div>

          {/* Description */}
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Jaga lingkungan jadi lebih baik dengan melaporkan masalah di sekitarmu, seperti tumpukan sampah, lampu jalan rusak, limbah tidak terolah, dan klaim laporan dalam hitungan menit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="pl-4 pr-2 md:pl-6 py-3 bg-emerald-700 text-white rounded-full hover:bg-emerald-800 transition-colors font-medium flex items-center justify-center space-x-2">
              <span>Laporkan Sekarang</span>
              <span className='bg-white text-black px-2 py-2 rounded-full'><MoveUpRight size={18} /></span>
            </button>
            <button className="px-6 md:px-8 py-3 border-2 border-emerald-700 text-emerald-700 rounded-full hover:bg-emerald-50 transition-colors font-medium">
              How It Works
            </button>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="cara-kerja" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 items-start">

            {/* Left */}
            <div>
              {/* Badge */}
              <span className="inline-block mb-6 px-4 py-2 border border-black rounded-full text-sm font-medium text-black">
                How It Works
              </span>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 leading-tight">
                Bagaimana Cara Melaporkan
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mt-2">
                di CleanPoint ?
              </h3>
            </div>

            {/* Right */}
            <div className="text-gray-600 text-sm md:text-base lg:pt-16">
              <p>
                Laporkan masalah lingkungan di sekitar Anda dengan mudah dan cepat.
                Siapa pun dapat berkontribusi menjaga kebersihan dan kesehatan
                lingkungan hanya dalam beberapa langkah sederhana.
              </p>
            </div>

          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all overflow-hidden
                  ${isOpen ? "bg-emerald-50 border-emerald-300" : "bg-gray-50 border-gray-200"}`}>
                  {/* Header */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left group">
                    <h3 className="text-lg md:text-2xl font-bold text-emerald-700">
                      {step.title}
                    </h3>

                    <ChevronDown
                      className={`w-6 h-6 text-emerald-700 transition-transform duration-300
                      ${isOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>

                  {/* Content */}
                  <div
                    className={`transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                  `}>
                    <div className="px-6 md:px-8 pb-6 max-w-4xl text-gray-700">
                      {step.desc}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Real Section */}
      <section id="impact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="px-4 py-2 border border-black rounded-full text-sm text-black">
              Impact Real
            </span>
          </div>

          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700 mb-4">
              Dampak Nyata untuk
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Lingkungan Lebih Baik
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              Setiap hasil laporan di platform ini bukan hanya angka, namun langkah nyata menuju lingkungan yang lebih bersih dan sehat. Bersama, kita menciptakan dampak positif yang terlihat dan terasa langsung di kehidupan sehari-hari.
            </p>
          </div>

          {/* Impact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">3,200+ Laporan Terselesaikan</h3>
              <p className="text-gray-600 text-sm">
                Ribuan laporan telah diselesaikan dengan bantuan masyarakat lingkungan dengan dukungan nyata untuk kualitas hidup lebih baik
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">100+ Ton Sampah Dibersihkan</h3>
              <p className="text-gray-600 text-sm">
                Ratusan ton sampah telah diangkat dengan hasil nyata untuk menghindari banjir dan terciptanya lingkungan yang lebih bersih untuk semua
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">50+ Wilayah Kini Lebih Bersih</h3>
              <p className="text-gray-600 text-sm">
                Puluhan wilayah kini merasakan dampak nyata dari kerja sama warga dan pemerintah untuk menciptakan lingkungan yang lebih sehat
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Ribuan Warga Berpartisipasi</h3>
              <p className="text-gray-600 text-sm">
                Ribuan warga dengan beragam latar belakang ikut melakukan kontribusi untuk menciptakan lingkungan yang lebih baik untuk generasi mendatang
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 items-start">

            {/* Left */}
            <div>
              {/* Badge */}
              <span className="inline-block mb-6 px-4 py-2 border border-black rounded-full text-sm font-medium text-black">
                Benefits
              </span>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700 leading-tight">
                Kenapa Harus Melapor di
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mt-2">
                Sini?
              </h3>
            </div>

            {/* Right */}
            <div className="text-gray-600 text-sm md:text-base lg:pt-16">
              <p>
                CleanPoint memberikan kemudahan dan transparansi penuh bagi 
                masyarakat untuk melaporkan dan menyelesaikan masalah lingkungan dengan cepat. 
                Mari bersama ciptakan lingkungan yang lebih baik dengan cara yang lebih efektif dan transparan.
              </p>
            </div>

          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <div className="bg-gray-50 shadow-sm hover:shadow-md transition-shadow border-gray-700 rounded-2xl p-6 hover:bg-emerald-50 group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Cepat Dilaporkan</h3>
              <p className="text-gray-600 text-sm">
                Laporkan masalah lingkungan dengan cepat dan langsung dari smartphone Anda. Dalam hitungan menit, masalah akan dilaporkan ke pihak yang berwenang untuk segera ditindaklanjuti.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gray-50 shadow-sm hover:shadow-md transition-shadow border-gray-700 rounded-2xl p-6 hover:bg-emerald-50 group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Transparan</h3>
              <p className="text-gray-600 text-sm">
                Pantau perkembangan laporan Anda secara real-time. Anda akan mengetahui setiap tahap proses penyelesaian masalah yang dilaporkan dengan jelas dan transparan.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gray-50 shadow-sm hover:shadow-md transition-shadow border-gray-700 rounded-2xl p-6 hover:bg-emerald-50 group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Dampak Nyata</h3>
              <p className="text-gray-600 text-sm">
                Setiap laporan yang Anda buat memberikan kontribusi nyata untuk menciptakan lingkungan yang lebih bersih, sehat, dan nyaman untuk semua warga.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gray-50 shadow-sm hover:shadow-md transition-shadow border-gray-700 rounded-2xl p-6 hover:bg-emerald-50 group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Kolektif & Mudah</h3>
              <p className="text-gray-600 text-sm">
                Berkolaborasi dengan ribuan warga lainnya untuk menciptakan perubahan nyata. Interface yang mudah digunakan membuat siapapun dapat berkontribusi dengan mudah tanpa hambatan teknologi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
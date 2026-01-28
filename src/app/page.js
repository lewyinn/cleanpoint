'use client';
import { useState } from "react"
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MoveUpRight, ChevronDown, ArrowUpRight } from 'lucide-react';
import Card1 from '../../public/assets/hero/Card-1.png';
import Card2 from '../../public/assets/hero/Card-2.png';
import Card3 from '../../public/assets/hero/Card-3.png';
import Card4 from '../../public/assets/hero/Card-4.png';
import Card5 from '../../public/assets/hero/Card-5.png';
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

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
      <section id="home" className="pt-24 md:pt-44 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 border border-black rounded-full text-sm text-black">
              Bersama Jaga Lingkungan Kita
            </span>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4">
              Laporkan Masalah{' '}
              <span className="bg-[#007E5B] text-white px-3 py-1 rounded-lg inline-block">
                Lingkungan
              </span>
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900">
              Sekitarmu Dengan Mudah.
            </h2>
          </div>

          {/* Description */}
          <p className="text-center text-gray-600 max-w-4xl mx-auto mb-8 text-base md:text-xl leading-relaxed">
            Jaga lingkungan jadi lebih baik dengan melaporkan masalah di sekitarmu, seperti tumpukan sampah, lampu jalan rusak, limbah tidak terolah, dan klaim laporan dalam hitungan menit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/lapor"
              className="group pl-4 pr-2 md:pl-6 py-3 bg-[#007E5B] text-white rounded-full border border-transparent font-medium flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-white hover:border-[#007E5B] hover:text-[#007E5B]">
              <span className="text-base md:text-xl">
                Laporkan Sekarang
              </span>

              <span className="bg-white text-black px-2 py-2 rounded-full transition-all duration-300 group-hover:bg-[#007E5B] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-1 ">
                <MoveUpRight size={18} />
              </span>
            </Link>

            <ScrollLink to="works" smooth spy offset={-80} duration={600}
              className="flex justify-center items-center text-base md:text-xl px-6 md:px-8 py-3 border-2 border-[#007E5B] text-[#007E5B] rounded-full font-medium transition-all duration-300 hover:bg-[#007E5B] hover:text-white hover:shadow-md cursor-pointer">
              How It Works
            </ScrollLink>
          </div>

          {/* Grid Cards Section */}
          <div className="max-w-7xl mx-auto">
            {/* Mobile View - Simplified Cards */}
            <div className="md:hidden">
              <div className="flex flex-col gap-6">
                {/* Mobile Card 1 - Statistic */}
                <div className="bg-[#007E5B] rounded-2xl p-6 shadow-sm">
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-2">90%</h3>
                    <p className="text-white text-lg">
                      Laporan Sampah Tertangani Dalam 48 Jam
                    </p>
                  </div>
                </div>

                {/* Mobile Card 2 - Statistic */}
                <div className="relative rounded-2xl p-6 h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${Card2.src})` }}
                  />
                  <div className="relative z-10 flex flex-col justify-end h-full">
                    <h3 className="text-4xl font-bold text-white mb-2">3.200+</h3>
                    <p className="text-white text-lg">
                      Laporan Lingkungan Sudah Ditangani.
                    </p>
                  </div>
                </div>

                {/* Mobile Card 3 - Call to Action */}
                <div className="bg-[#007904] rounded-2xl p-6">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Bergabunglah Bersama Ribuan Warga Peduli Lingkungan.
                    </h3>
                    <Link href='/lapor' className="pl-3 pr-2 py-2 bg-white text-[#007904] rounded-full hover:bg-[#007904] hover:text-white hover:border-white border-2 transition-colors font-medium flex items-center justify-center space-x-2 group">
                      <span className="text-sm">Laporkan Sekarang</span>
                      <span className='bg-[#007904] text-white group-hover:bg-white group-hover:text-[#007904] px-2 py-2 rounded-full'>
                        <MoveUpRight size={18} />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Mobile Card 4 - Inspirational Quote */}
                <div className="relative rounded-2xl p-6 h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${Card3.src})` }}
                  />
                  <div className="relative z-10 flex flex-col justify-end h-full">
                    <p className="text-white text-lg">
                      Dari satu laporan, hadir perubahan besar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop View - Full Grid */}
            <div className="hidden md:grid md:grid-cols-5 gap-6 items-end">

              {/* Grid Cols - 1 */}
              <div className="flex flex-col gap-2">
                <div
                  className="p-6 h-72 rounded-2xl overflow-hidden relative"
                  style={{ backgroundImage: `url(${Card1.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
                  <div className="relative z-10 flex flex-col justify-end h-full">
                    <p className="text-white text-base md:text-2xl font-bold">
                      Jadilah Alasan Lingkungan Kita Tetap Bersih.
                    </p>
                  </div>
                </div>

                <div className="bg-[#007E5B] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-2">90%</h3>
                    <p className="text-white text-base md:text-2xl">
                      Laporan Sampah Tertangani Dalam 48 Jam
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid Cols - 2 */}
              <div className="flex flex-col gap-2">
                <div
                  className="p-6 h-96 rounded-2xl overflow-hidden relative"
                  style={{ backgroundImage: `url(${Card2.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
                  <div className="relative z-10 flex flex-col justify-end h-full">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">3.200+</h3>
                    <p className="text-white text-base md:text-2xl">
                      Laporan Lingkungan Sudah Ditangani.
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid Cols - 3 */}
              <div className="flex flex-col gap-2">
                <div className="bg-[#007904] rounded-2xl p-6">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-base md:text-xl font-semibold text-white mb-2">
                      Bergabunglah Bersama Ribuan Warga Peduli Lingkungan.
                    </h3>
                    <Link href='/lapor' className="pl-2 pr-1 md:pl-4 py-2 bg-white text-[#007904] rounded-full hover:bg-[#007904] hover:text-white hover:border-white border-2 transition-colors font-medium flex items-center justify-center space-x-2 group">
                      <span className="text-sm">Laporkan Sekarang</span>
                      <span className='bg-[#007904] text-white group-hover:bg-white group-hover:text-[#007904] px-2 py-2 rounded-full'>
                        <MoveUpRight size={18} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Grid Cols - 4 */}
              <div className="flex flex-col gap-2">
                <div
                  className="p-6 h-96 rounded-2xl overflow-hidden relative"
                  style={{ backgroundImage: `url(${Card3.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
                  <div className="relative z-10 flex flex-col justify-end h-full">
                    <p className="text-white text-base md:text-2xl">
                      Dari satu laporan, hadir perubahan besar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid Cols - 5 */}
              <div className="flex flex-col gap-2">
                <div
                  className="p-6 h-72 rounded-2xl overflow-hidden relative"
                  style={{ backgroundImage: `url(${Card5.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
                  <div className="relative z-10 flex flex-col justify-center h-full">
                    <p className="text-white text-base md:text-[21px]">
                      CleanPoint — Bersama Selesaikan Masalah Lingkungan.
                    </p>
                  </div>
                </div>

                <div
                  className="p-6 h-48 rounded-2xl overflow-hidden relative"
                  style={{ backgroundImage: `url(${Card4.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
                  <div className="relative z-10 text-center">
                    <p className="text-white text-base md:text-2xl">
                      Bersihkan Lingkungan dari sekarang.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="works" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start">

            {/* Left */}
            <div>
              {/* Badge */}
              <span className="inline-block mb-6 px-4 py-2 border border-black rounded-full text-sm font-medium text-black">
                How It Works
              </span>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-[#007E5B] leading-tight">
                Bagaimana Cara Melaporkan
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mt-2">
                di CleanPoint ?
              </h3>
            </div>

            {/* Right */}
            <div className="text-gray-600 text-base md:text-lg lg:pt-16">
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
                    <h3 className="text-lg md:text-2xl font-bold text-[#007E5B]">
                      {step.title}
                    </h3>

                    <ChevronDown
                      className={`w-6 h-6 text-[#007E5B] transition-transform duration-300
                      ${isOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>

                  {/* Content */}
                  <div
                    className={`transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                  `}>
                    <div className="px-6 md:px-8 pb-6 max-w-4xl text-gray-700 text-base md:text-lg">
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
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#007E5B] mb-4">
              Dampak Nyata untuk
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Lingkungan Lebih Baik
            </h3>
            <p className="text-gray-600 max-w-4xl mx-auto text-base md:text-lg">
              Setiap hasil laporan di platform ini bukan hanya angka, namun langkah nyata menuju lingkungan yang lebih bersih dan sehat. Bersama, kita menciptakan dampak positif yang terlihat dan terasa langsung di kehidupan sehari-hari.
            </p>
          </div>

          {/* Impact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-[#007E5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg md:text-2xl mb-2 text-gray-900">3,200+ Laporan Terselesaikan</h3>
              <p className="text-gray-600 text-base md:text-lg">
                Ribuan laporan telah diselesaikan dengan bantuan masyarakat lingkungan dengan dukungan nyata untuk kualitas hidup lebih baik
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-[#007E5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg md:text-2xl mb-2 text-gray-900">100+ Ton Sampah Dibersihkan</h3>
              <p className="text-gray-600 text-base md:text-lg">
                Ratusan ton sampah telah diangkat dengan hasil nyata untuk menghindari banjir dan terciptanya lingkungan yang lebih bersih untuk semua
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-[#007E5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg md:text-2xl mb-2 text-gray-900">50+ Wilayah Kini Lebih Bersih</h3>
              <p className="text-gray-600 text-base md:text-lg">
                Puluhan wilayah kini merasakan dampak nyata dari kerja sama warga dan pemerintah untuk menciptakan lingkungan yang lebih sehat
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-[#007E5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg md:text-2xl mb-2 text-gray-900">Ribuan Warga Berpartisipasi</h3>
              <p className="text-gray-600 text-base md:text-lg">
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#007E5B] leading-tight">
                Kenapa Harus Melapor di
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mt-2">
                Sini?
              </h3>
            </div>

            {/* Right */}
            <div className="text-gray-600 text-base md:text-lg lg:pt-16">
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
                <svg className="w-7 h-7 text-[#007E5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-900">Cepat Dilaporkan</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Laporkan masalah lingkungan dengan cepat dan langsung dari smartphone Anda. Dalam hitungan menit, masalah akan dilaporkan ke pihak yang berwenang untuk segera ditindaklanjuti.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gray-50 shadow-sm hover:shadow-md transition-shadow border-gray-700 rounded-2xl p-6 hover:bg-emerald-50 group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-7 h-7 text-[#007E5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-900">Transparan</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Pantau perkembangan laporan Anda secara real-time. Anda akan mengetahui setiap tahap proses penyelesaian masalah yang dilaporkan dengan jelas dan transparan.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gray-50 shadow-sm hover:shadow-md transition-shadow border-gray-700 rounded-2xl p-6 hover:bg-emerald-50 group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-7 h-7 text-[#007E5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-900">Dampak Nyata</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Setiap laporan yang Anda buat memberikan kontribusi nyata untuk menciptakan lingkungan yang lebih bersih, sehat, dan nyaman untuk semua warga.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gray-50 shadow-sm hover:shadow-md transition-shadow border-gray-700 rounded-2xl p-6 hover:bg-emerald-50 group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-7 h-7 text-[#007E5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-900">Kolektif & Mudah</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Berkolaborasi dengan ribuan warga lainnya untuk menciptakan perubahan nyata. Interface yang mudah digunakan membuat siapapun dapat berkontribusi dengan mudah tanpa hambatan teknologi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-[#007E5B] px-6 py-10 md:px-12">
            {/* Decorative waves */}
            <div className="pointer-events-none absolute inset-0">
              <svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 1440 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 60C120 20 240 20 360 40C480 60 600 100 720 100C840 100 960 60 1080 40C1200 20 1320 20 1440 40V120H0V60Z"
                  fill="#34d399"
                  fillOpacity="0.35"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                Siap Membuat Lingkungan Lebih Bersih?
              </h2>

              <p className="mt-3 max-w-4xl text-sm text-emerald-50 md:text-lg">
                Laporkan masalah lingkungan di sekitar Anda dengan mudah dan bantu
                petugas menangani lebih cepat. Anda juga bisa memantau dan mengecek
                laporan yang sudah dikirim agar tetap transparan dan terupdate.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href='/lapor' className="text-base md:text-lg inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[#007E5B] shadow hover:bg-emerald-600 hover:text-white transition group cursor-pointer">
                  Laporkan Sekarang
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 group-hover:bg-white text-white group-hover:text-emerald-500">
                    <ArrowUpRight size={28} />
                  </span>
                </Link>

                <Link href='/laporan' className="flex justify-center items-center rounded-full border border-white/80 px-5 py-2.5 text-base md:text-lg text-white hover:bg-white hover:text-[#007E5B] transition cursor-pointer">
                  Cek Laporan Anda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* ================= HEADER (JANGAN DIUBAH) ================= */}
            <section
                id="home"
                className="pt-24 md:pt-44 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-white"
            >
                <div className="max-w-7xl mx-auto">
                    <section className="flex flex-col bg-white">
                        {/* Kembali */}
                        <div className="flex items-start mb-8">
                            <Link href="/" className="btn-primary flex items-center gap-2">
                                <ArrowLeft size={18} />
                                Kembali ke Halaman Utama
                            </Link>
                        </div>

                        {/* Badge */}
                        <div className="flex justify-center mb-6">
                            <span className="px-4 py-2 border border-black rounded-full text-sm text-black">
                                Cari & Pantau Laporan Anda
                            </span>
                        </div>

                        {/* Main Heading */}
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-center mb-2 max-w-5xl">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#007E5B] mb-4">
                                    Lihat Progres Penanganan Masalah{' '}
                                    <span className="bg-[#007E5B] text-white px-3 py-1 rounded-lg inline-block">
                                        Lingkungan
                                    </span>
                                </h1>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-8 text-base md:text-xl leading-relaxed">
                            Gunakan fitur pencarian ini untuk memantau laporan yang telah Anda
                            kirim atau melihat laporan warga lainnya. Dengan sistem yang
                            transparan, Anda dapat mengetahui status terbaru dari setiap
                            laporan lingkungan secara real-time.
                        </p>
                    </section>
                </div>
            </section>

            {/* ================= SEARCH ================= */}
            <section className="px-4 sm:px-6 lg:px-8 mb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white border rounded-2xl p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Cari judul laporan atau lokasi"
                                className="input"
                            />
                            <input
                                type="text"
                                placeholder="Masukkan kota atau kecamatan"
                                className="input"
                            />
                            <button className="btn-primary rounded-full px-8">
                                Cari
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CONTENT ================= */}
            <section className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* FILTER */}
                    <aside className="lg:col-span-1 bg-white border rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="font-semibold text-lg text-[#007E5B]">Jenis Masalah</h3>
                            <button className="text-sm text-[#007E5B] hover:underline">
                                Reset
                            </button>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700">
                            {[
                                'Semua',
                                'Sampah',
                                'Pencemaran',
                                'Drainase',
                                'Jalan Rusak',
                                'Pohon Tumbang',
                            ].map((item) => (
                                <label
                                    key={item}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="accent-[#007E5B]"
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>

                        <div className="mt-8">
                            <h4 className="font-semibold mb-3 text-[#007E5B]">Status Laporan</h4>
                            <div className="space-y-3 text-sm text-gray-700">
                                {['Menunggu', 'Diproses', 'Selesai'].map((status) => (
                                    <label key={status} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="accent-[#007E5B]"
                                        />
                                        {status}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* LIST LAPORAN */}
                    <section className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-[#007E5B]">Laporan Terbaru</h3>
                            <select className="border rounded-lg px-3 py-2 text-sm text-gray-700">
                                <option>Terbaru</option>
                                <option>Terlama</option>
                                <option>Status Selesai</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white border rounded-2xl p-6 hover:shadow-md transition cursor-pointer">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-semibold text-lg text-emerald-800">
                                            Sampah Menumpuk di Sungai
                                        </h4>
                                        <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-700">
                                            Diproses
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4">
                                        Terdapat tumpukan sampah rumah tangga yang menghambat
                                        aliran sungai dan menyebabkan bau tidak sedap.
                                    </p>

                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>📍 Kecamatan Sukamaju</span>
                                        <span>2 hari lalu</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default page

"use client";

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [reports, setReports] = useState([]) // Pastikan default adalah array
    const [query, setQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedStatuses, setSelectedStatuses] = useState([])
    const [sort, setSort] = useState("newest")

    const toggleArrayValue = (arr, value) =>
        arr.includes(value)
            ? arr.filter((v) => v !== value)
            : [...arr, value]

    const getStatusStyle = (status) => {
        switch(status) {
            case "Selesai" :
                return "bg-green-100 text-green-700 border-green-200";
            case "Diproses" :
                return "bg-blue-100 text-blue-700 border-blue-200";
            case "Ditinjau" :
                return "bg-yellow-100 text-yellow-700 border-yellow-200";
            default :
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    }

    useEffect(() => {
        fetch("/api/reports")
            .then(res => res.json())
            .then(data => {
                setReports(Array.isArray(data) ? data : [])
            })
            .catch(err => console.error("Fetch error:", err))
    }, [])

    const filteredReports = reports.filter((r) => {
        const matchQuery =
            r.title?.toLowerCase().includes(query.toLowerCase()) ||
            r.location?.address?.toLowerCase().includes(query.toLowerCase())

        const matchCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(r.category)

        const matchStatus =
            selectedStatuses.length === 0 ||
            selectedStatuses.includes(r.status)

        return matchQuery && matchCategory && matchStatus
    })

    // ================= SORT =================
    const sortedReports = [...filteredReports].sort((a, b) => {
        if (sort === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt)
        }
        if (sort === "oldest") {
            return new Date(a.createdAt) - new Date(b.createdAt)
        }
        if (sort === "done") {
            return a.status === "Selesai" ? -1 : 1
        }
        return 0
    })

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* HEADER - Tetap Sama */}
            <section id="home" className="pt-24 md:pt-44 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-white"> 
                <div className="max-w-7xl mx-auto"> 
                    <section className="flex flex-col bg-white"> 
                        <div className="flex items-start mb-8"> 
                            <Link href="/" className="btn-primary flex items-center gap-2"> 
                                <ArrowLeft size={18} /> Kembali ke Halaman Utama 
                            </Link> 
                        </div> 
                        <div className="flex justify-center mb-6"> 
                            <span className="px-4 py-2 border border-black rounded-full text-sm text-black"> 
                                Cari & Pantau Laporan Anda 
                            </span> 
                        </div> 
                        <div className="flex flex-col justify-center items-center"> 
                            <div className="text-center mb-2 max-w-5xl"> 
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#007E5B] mb-4"> 
                                    Lihat Progres Penanganan Masalah{' '} 
                                    <span className="bg-[#007E5B] text-white px-3 py-1 rounded-lg inline-block"> Lingkungan </span> 
                                </h1> 
                            </div> 
                        </div> 
                        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-8 text-base md:text-xl leading-relaxed"> 
                            Gunakan fitur pencarian ini untuk memantau laporan yang telah Anda kirim atau melihat laporan warga lainnya.
                        </p> 
                    </section> 
                </div> 
            </section>

            {/* SEARCH */}
            <section className="px-4 mb-10">
                <div className="max-w-7xl mx-auto">
                    <input
                        type="text"
                        placeholder="Cari judul laporan atau alamat"
                        className="input w-full"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </section>

            {/* CONTENT */}
            <section className="px-4 pb-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* ASIDE / FILTER */}
                    <aside className="lg:col-span-1 border rounded-2xl p-6 h-fit">
                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold text-lg text-[#007E5B]">Filter</h3>
                            <button onClick={() => { setSelectedCategories([]); setSelectedStatuses([]); }} className="text-sm text-[#007E5B] hover:underline">Reset</button>
                        </div>

                        <div className="mb-6 text-neutral-500">
                            <h4 className="font-semibold mb-3">Jenis Masalah</h4>
                            {['Sampah', 'Pencemaran', 'Drainase'].map((item) => (
                                <label key={item} className="flex items-center gap-3 mb-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 accent-[#007E5B]" checked={selectedCategories.includes(item)} onChange={() => setSelectedCategories((prev) => toggleArrayValue(prev, item))} />
                                    {item}
                                </label>
                            ))}
                        </div>

                        <div className='text-neutral-500'>
                            <h4 className="font-semibold mb-3">Status Laporan</h4>
                            {['Ditinjau', 'Diproses', 'Selesai'].map((status) => (
                                <label key={status} className="flex items-center gap-3 mb-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4accent-[#007E5B]" checked={selectedStatuses.includes(status)} onChange={() => setSelectedStatuses((prev) => toggleArrayValue(prev, status))} />
                                    {status}
                                </label>
                            ))}
                        </div>
                    </aside>

                    {/* LIST */}
                    <section className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-lg text-[#007E5B]">Daftar Laporan</h3>
                            <select className="border rounded-lg px-3 py-2 text-sm" onChange={(e) => setSort(e.target.value)}>
                                <option value="newest">Terbaru</option>
                                <option value="oldest">Terlama</option>
                                <option value="done">Status Selesai</option>
                            </select>
                        </div>

                        {sortedReports.length === 0 && <p className="text-gray-500">Tidak ada laporan yang sesuai.</p>}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {sortedReports.map((r) => (
                                <Link href={`/laporan/${r._id}`} key={r._id} className="border rounded-2xl p-6 hover:shadow-md transition">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-gray-800">{r.title}</h3>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusStyle(r.status)}`}>
                                            {r.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{r.description}</p>
                                    <div className="text-xs text-gray-500 flex justify-between">
                                        <span>{r.location?.address || "-"}</span>
                                        <span>{new Date(r.createdAt).toLocaleDateString("id-ID")}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </section>
            <Footer />
        </main>
    )
}

export default Page
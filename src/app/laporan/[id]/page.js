"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailLaporanPage() {
    const { id } = useParams();
    const [report, setReport] = useState(null);

    useEffect(() => {
        if (!id) return;

        fetch(`/api/reports/${id}`)
            .then((res) => res.json())
            .then(setReport);
    }, [id]);

    if (!report) return null;

    return (
        <main className="min-h-screen bg-white text-[#111827]">
            <Navbar />

            {/* ===== HEADER ===== */}
            <section className="pt-24 md:pt-40 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Kembali */}
                    <div className="flex items-start mb-8">
                        <Link href="/" className="btn-primary flex items-center gap-2">
                            <ArrowLeft size={18} />
                            Kembali ke Halaman Utama
                        </Link>
                    </div>

                    {/* Kategori */}
                    <span className="inline-block mb-4 px-4 py-1.5 text-sm rounded-full bg-[#E6F4EF] text-[#007E5B]">
                        {report.category}
                    </span>

                    {/* Judul */}
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        {report.title}
                    </h1>

                    {/* Deskripsi */}
                    <p className="text-[#6B7280] text-base md:text-lg max-w-3xl mx-auto">
                        {report.description}
                    </p>
                </div>
            </section>

            {/* ===== CONTENT ===== */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT */}
                    <div className="space-y-6">

                        {/* Info */}
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6">
                            <h3 className="font-semibold text-lg mb-5">
                                Informasi Laporan
                            </h3>

                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-[#6B7280]">Pelapor</p>
                                    <p className="font-medium">
                                        {report?.reporter?.name ?? "-"}
                                    </p>

                                </div>

                                <div>
                                    <p className="text-[#6B7280] mb-1">Status</p>
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-[#FFF7ED] text-[#9A3412]">
                                        <span className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                                        {report.status || "Menunggu Ditinjau"}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-[#6B7280]">Tanggal Laporan</p>
                                    <p>
                                        {report.createdAt
                                            ? new Date(report.createdAt).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6">
                            <h3 className="font-semibold text-lg mb-4">
                                Lokasi Kejadian
                            </h3>
                            <p className="flex gap-2 text-sm text-[#374151]">
                                <MapPin size={18} className="text-[#007E5B]" />
                                {report.location?.address || "Lokasi tidak tersedia"}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Image */}
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl overflow-hidden">
                            <img
                                src={report.imageUrl?.startsWith("/uploads")
                                    ? report.imageUrl
                                    : "https://images.unsplash.com/photo-1598632640487-8680aa1c7f48"}
                                alt="Dokumentasi Laporan"
                                className="w-full h-[320px] object-cover"
                            />
                            <div className="px-4 py-3 text-sm text-[#6B7280]">
                                Dokumentasi kondisi lapangan saat laporan dibuat
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl overflow-hidden">
                            <iframe
                                src={`https://www.google.com/maps?q=${encodeURIComponent(
                                    report.location?.address || "Indonesia"
                                )}&output=embed`}
                                className="w-full h-[300px]"
                                loading="lazy"
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* BACK */}
            <section className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/laporan"
                        className="inline-flex items-center gap-2 text-sm border border-[#E5E7EB] rounded-full px-6 py-3 hover:bg-[#F9FAFB] transition"
                    >
                        <ArrowLeft size={18} />
                        Kembali ke Daftar Laporan
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

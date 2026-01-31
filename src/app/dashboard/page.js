'use client';
import { useSidebar } from '@/context/SidebarContext';
import { 
    Menu, User, LogOut, FileText, Clock, RefreshCw, CheckCircle2, 
    TrendingUp, Calendar
} from 'lucide-react';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts'; // Import library grafik
import Link from 'next/link';

export default function DashboardPage() {
    const { setSidebarOpen } = useSidebar();
    const { data: session } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch('/api/reports');
                const data = await res.json();
                setReports(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Gagal memuat data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    // 1. Logika Statistik (Tetap)
    const statsData = {
        total: reports.length,
        ditinjau: reports.filter(r => r.status === 'Ditinjau').length,
        diproses: reports.filter(r => r.status === 'Diproses').length,
        selesai: reports.filter(r => r.status === 'Selesai').length,
    };

    // 2. Logika Grafik (Mengolah data laporan 7 hari terakhir)
    const chartData = useMemo(() => {
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        return last7Days.map(date => ({
            name: new Date(date).toLocaleDateString('id-ID', { weekday: 'short' }),
            jumlah: reports.filter(r => r.createdAt?.split('T')[0] === date).length
        }));
    }, [reports]);

    const stats = [
        { title: "Total Laporan", value: statsData.total, icon: FileText, color: "bg-blue-600" },
        { title: "Ditinjau", value: statsData.ditinjau, icon: Clock, color: "bg-amber-500" },
        { title: "Diproses", value: statsData.diproses, icon: RefreshCw, color: "bg-emerald-600" },
        { title: "Selesai", value: statsData.selesai, icon: CheckCircle2, color: "bg-purple-600" },
    ];

    return (
        <>
            {/* Header tetap sama seperti kode sebelumnya */}
            <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 dark:text-gray-300"><Menu className="w-6 h-6" /></button>
                        <nav className="text-sm text-gray-500 dark:text-gray-400">Admin <span className="mx-2">/</span> <span className="text-gray-900 dark:text-gray-200 font-medium">Dashboard</span></nav>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="rounded-full w-10 h-10 bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer">
                            {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={20} />}
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-150">
                                <div className="px-4 py-3 border-b dark:border-gray-700">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{session?.user?.name || "User"}</p>
                                    <p className="text-xs text-gray-500 truncate">{session?.user?.email || "loading..."}</p>
                                </div>
                                <div className="p-1">
                                    <button onClick={() => signOut({ callbackUrl: '/sign-in' })} className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium">
                                        <LogOut size={16} /> <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-8 bg-slate-50/50 dark:bg-gray-900 min-h-screen transition-colors">
                {/* 1. SECTION STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-6 border border-slate-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${stat.color} shadow-${stat.color.split('-')[1]}-200 dark:shadow-none`}>
                                    <stat.icon size={22} />
                                </div>
                                {isLoading && <div className="w-4 h-4 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>}
                            </div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">{isLoading ? "..." : stat.value}</h2>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 2. SECTION GRAFIK (2/3 lebar) */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 border border-slate-100 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                    <TrendingUp size={20} className="text-emerald-500" /> Tren Laporan Minggu Ini
                                </h3>
                                <p className="text-sm text-slate-400">Statistik aktivitas pelaporan warga</p>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorJumlah" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                                    <YAxis hide />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="jumlah" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorJumlah)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 3. SECTION AKTIVITAS TERBARU (1/3 lebar) */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-slate-100 dark:border-gray-700 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <Calendar size={20} className="text-blue-500" /> Aktivitas Terbaru
                        </h3>
                        <div className="space-y-6">
                            {reports.slice(0, 5).map((report, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                                        report.status === 'Selesai' ? 'bg-emerald-500' : 'bg-amber-500'
                                    }`} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{report.title}</p>
                                        <p className="text-xs text-slate-400">{new Date(report.createdAt).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})} • {report.category}</p>
                                    </div>
                                </div>
                            ))}
                            {reports.length === 0 && <p className="text-sm text-slate-400 text-center py-10">Belum ada aktivitas</p>}
                        </div>
                        <Link href="/dashboard/reports" className="block text-center mt-8 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            Lihat Semua Laporan
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
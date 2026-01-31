'use client';
import { useSidebar } from '@/context/SidebarContext';
import {
    Menu, Search, User, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
    Eye, Trash2, SearchIcon, PlusSquare, Settings, X, MapPin, Phone, Mail, Edit,
    CreditCard, AlertTriangle, Loader2
} from 'lucide-react';
import Link from 'next/link';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Alert from '@/components/Alert'; // Sesuaikan path komponen Alert kamu

export default function DashboardPage() {
    const { setSidebarOpen } = useSidebar();
    const { data: session } = useSession();

    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('createdAt');
    const [sortDirection, setSortDirection] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Alert State
    const [alert, setAlert] = useState(null);

    // Modal States
    const [selectedReport, setSelectedReport] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Auto-hide Alert
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch('/api/reports');
                const data = await res.json();
                setReports(Array.isArray(data) ? data : []);
            } catch (err) {
                setAlert({ type: 'error', message: "Gagal memuat data dari server" });
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    const handleLogout = () => signOut({ callbackUrl: '/sign-in' });

    const confirmDelete = async () => {
        if (!selectedReport) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/reports/${selectedReport._id}`, { method: 'DELETE' });
            if (res.ok) {
                setReports(reports.filter(r => r._id !== selectedReport._id));
                setAlert({ type: 'success', message: "Laporan dan foto berhasil dihapus permanen" });
                setIsDeleteModalOpen(false);
            } else {
                throw new Error("Gagal menghapus data");
            }
        } catch (err) {
            setAlert({ type: 'error', message: err.message });
        } finally {
            setIsDeleting(false);
            setSelectedReport(null);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`/api/reports/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setReports(reports.map(r => r._id === id ? { ...r, status: newStatus } : r));
                setIsEditModalOpen(false);
                setAlert({ type: 'success', message: `Status berhasil diperbarui ke: ${newStatus}` });
            }
        } catch (err) {
            setAlert({ type: 'error', message: "Gagal memperbarui status ke database" });
        }
    };

    // Filter & Sort Logic
    const filteredData = useMemo(() => {
        return reports.filter(item =>
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.reporter?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [reports, searchTerm]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            const aVal = a[sortField] || '';
            const bVal = b[sortField] || '';
            return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
        });
    }, [filteredData, sortField, sortDirection]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSort = (field) => {
        if (sortField === field) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        else { setSortField(field); setSortDirection('asc'); }
    };

    return (
        <>
            {/* Tampilkan Alert Kustom */}
            {alert && <Alert type={alert.type} message={alert.message} />}

            <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 transition-colors">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 cursor-pointer">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <nav className="text-sm text-gray-500 dark:text-gray-400">
                                <span>Admin</span>
                                <span className="mx-2">/</span>
                                <span className="text-gray-900 dark:text-gray-200 font-medium">Dashboard</span>
                            </nav>
                        </div>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="rounded-full w-10 h-10 bg-blue-600 flex items-center justify-center text-white hover:ring-4 ring-blue-500/20 transition-all overflow-hidden font-bold cursor-pointer">
                            <span className="font-bold text-white uppercase">
                                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : <User size={20} />}                                
                            </span>
                        </button>

                        <div className={`absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50 transform transition-all duration-200 ease-out origin-top-right ${dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{session?.user?.name || "User"}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session?.user?.email || "Loading..."}</p>
                            </div>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-600/10 transition-colors cursor-pointer font-medium">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row sm:justify-between mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">Report Management</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Monitor and update environmental reports</p>
                    </div>
                    <button
                        onClick={() => setShowMobileSearch(!showMobileSearch)}
                        className="sm:hidden mt-4 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl shadow-md cursor-pointer">
                        <SearchIcon size={18} />
                        <span className="text-sm font-medium">Filter Laporan</span>
                    </button>
                </div>

                <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-gray-700 transition-all ${showMobileSearch ? 'block' : 'hidden sm:block'}`}>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Cari judul laporan atau nama pelapor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                {/* Table & Mobile Cards Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                                <tr>
                                    <th onClick={() => handleSort('title')} className="px-6 py-4 text-left cursor-pointer hover:text-blue-600 transition-colors">Laporan</th>
                                    <th className="px-6 py-4 text-left font-bold">Kategori</th>
                                    <th className="px-6 py-4 text-left font-bold">Pelapor</th>
                                    <th className="px-6 py-4 text-left font-bold">Status</th>
                                    <th className="px-6 py-4 text-right font-bold tracking-normal">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {isLoading ? (
                                    <tr><td colSpan="5" className="text-center py-12 text-gray-400 font-medium italic">Menghubungkan ke database...</td></tr>
                                ) : paginatedData.map((item) => (
                                    <tr key={item._id} className="hover:bg-blue-50/30 dark:hover:bg-gray-700 transition-colors text-sm group">
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white truncate max-w-xs">{item.title}</td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.category}</td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.reporter?.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                                                    item.status === 'Diproses' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>{item.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setSelectedReport(item); setIsViewModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Eye size={18} /></button>
                                            <button onClick={() => { setSelectedReport(item); setIsEditModalOpen(true); }} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer"><Edit size={18} /></button>
                                            <button onClick={() => { setSelectedReport(item); setIsDeleteModalOpen(true); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="lg:hidden">
                        {paginatedData.map((item) => (
                            <div key={item._id} className="p-5 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <h3 className="text-sm font-black text-gray-900 dark:text-white truncate">{item.title}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{item.reporter?.name}</p>
                                    </div>
                                    <span className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase ${item.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                                            item.status === 'Diproses' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700/50">
                                    <div className="flex space-x-6">
                                        <button onClick={() => { setSelectedReport(item); setIsViewModalOpen(true); }} className="flex items-center text-blue-600 font-black text-[10px] uppercase gap-1.5"><Eye size={16} /> View</button>
                                        <button onClick={() => { setSelectedReport(item); setIsEditModalOpen(true); }} className="flex items-center text-emerald-600 font-black text-[10px] uppercase gap-1.5"><Edit size={16} /> Status</button>
                                        <button onClick={() => { setSelectedReport(item); setIsDeleteModalOpen(true); }} className="flex items-center text-red-600 font-black text-[10px] uppercase gap-1.5"><Trash2 size={16} /> Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t dark:border-gray-600 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Halaman {currentPage} dari {totalPages || 1}</span>
                        <div className="flex space-x-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(c => c - 1)} className="p-2 border dark:border-gray-600 rounded-xl disabled:opacity-30 hover:bg-white dark:hover:bg-gray-600 transition-colors"><ChevronLeft size={16} /></button>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(c => c + 1)} className="p-2 border dark:border-gray-600 rounded-xl disabled:opacity-30 hover:bg-white dark:hover:bg-gray-600 transition-colors"><ChevronRight size={16} /></button>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL VIEW DETAIL */}
            {isViewModalOpen && selectedReport && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="px-8 py-5 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                            <h2 className="text-lg font-black uppercase">Detail Laporan</h2>
                            <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors cursor-pointer"><X size={20} /></button>
                        </div>
                        <div className="p-8 space-y-8 overflow-y-auto">
                            <img src={selectedReport.imageUrl} alt="Bukti" className="w-full h-80 object-cover rounded-2xl border dark:border-gray-700 shadow-xl" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Judul Laporan</p><p className="font-bold text-xl">{selectedReport.title}</p></div>
                                    <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Deskripsi</p><p className="text-sm text-gray-600 italic">"{selectedReport.description}"</p></div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Informasi Pelapor</p>
                                        <div className="space-y-2 text-sm font-medium">
                                            <p className="flex items-center gap-3"><User size={14} className="text-blue-500" /> {selectedReport.reporter.name}</p>
                                            <p className="flex items-center gap-3"><Mail size={14} className="text-blue-500" /> {selectedReport.reporter.email}</p>
                                            <p className="flex items-center gap-3"><Phone size={14} className="text-blue-500" /> {selectedReport.reporter.phone}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Lokasi</p>
                                        <p className="flex items-start gap-2 text-xs text-gray-700 font-medium"><MapPin size={16} className="text-rose-500 flex-shrink-0" /> {selectedReport.location.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL EDIT STATUS */}
            {isEditModalOpen && selectedReport && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in zoom-in duration-200">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-sm rounded-3xl shadow-2xl p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-lg font-black uppercase tracking-tight text-slate-800 dark:text-white">Update Status</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"><X size={20} /></button>
                        </div>
                        <div className="space-y-3">
                            {['Ditinjau', 'Diproses', 'Selesai'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleUpdateStatus(selectedReport._id, status)}
                                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-all cursor-pointer ${selectedReport.status === status
                                        ? 'bg-[#007E5B] text-white shadow-xl shadow-emerald-500/30'
                                        : 'bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL KONFIRMASI HAPUS */}
            {isDeleteModalOpen && selectedReport && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center">
                        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500 animate-pulse">
                            <AlertTriangle size={40} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Hapus Laporan?</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 font-medium">
                            Anda akan menghapus laporan <span className="font-black text-gray-800 dark:text-gray-200">"{selectedReport.title}"</span>. Foto bukti di Cloudinary juga akan hilang.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : 'Hapus Sekarang'}
                            </button>
                            <button
                                onClick={() => { setIsDeleteModalOpen(false); setSelectedReport(null); }}
                                disabled={isDeleting}
                                className="w-full py-4 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                Batalkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

const Page = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [successData, setSuccessData] = useState(null);

    const {
        register,
        handleSubmit,
        trigger,
        reset,
        watch,
    } = useForm();

    // Pantau input file untuk preview
    const fileInput = watch('bukti');

    useEffect(() => {
        if (fileInput && fileInput.length > 0) {
            const file = fileInput[0];
            setPreviewUrl(URL.createObjectURL(file));
        }
    }, [fileInput]);

    // Scroll ke atas setiap ganti step agar smooth
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    // ===============================
    // STEP VALIDATION
    // ===============================
    const nextStep = async () => {
        let fields = []
        if (step === 1) fields = ['nama', 'email', 'phone']
        if (step === 2) fields = ['kategori', 'judul', 'deskripsi', 'alamat']

        const valid = await trigger(fields)
        if (!valid) {
            toast.error('Mohon lengkapi data yang wajib diisi')
            return
        }
        setStep((s) => s + 1)
    }

    const prevStep = () => setStep((s) => s - 1)

    // ===============================
    // SUBMIT
    // ===============================
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData()
            formData.append('name', data.nama)
            formData.append('email', data.email)
            formData.append('phone', data.phone)
            formData.append('category', data.kategori)
            formData.append('title', data.judul)
            formData.append('description', data.deskripsi)
            formData.append('address', data.alamat)
            formData.append('image', data.bukti[0])

            const res = await fetch('/api/reports', {
                method: 'POST',
                body: formData,
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.message || 'Gagal mengirim laporan')

            setSuccessData({
                reportId: result.reportId,
                title: data.judul,
                category: data.kategori,
            })

            toast.success(`Laporan berhasil dikirim!`)
            reset()
            setPreviewUrl(null)
            setStep(4)
        } catch (error) {
            toast.error(error.message || 'Terjadi kesalahan koneksi')
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            <section id="home" className="pt-24 md:pt-44 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <section className="bg-white text-center md:text-left">
                        <div className="flex justify-start mb-6">
                            <Link href="/" className="flex justify-center items-center btn-primary transition-all hover:scale-105 active:scale-95">
                                <ArrowLeft size={18} className="mr-2" />
                                Kembali ke Halaman Utama
                            </Link>
                        </div>

                        <div className="flex justify-center mb-6">
                            <span className="px-4 py-2 border border-black rounded-full text-sm font-medium text-black uppercase tracking-wider">
                                Bersama Jaga Lingkungan Kita
                            </span>
                        </div>

                        <div className="text-center mb-8">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight">
                                Bantu Wujudkan{' '}
                                <span className="bg-[#007E5B] text-white px-4 py-1 rounded-lg inline-block shadow-lg">
                                    Lingkungan
                                </span>
                            </h1>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                Yang Lebih Bersih
                            </h2>
                        </div>

                        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-8 text-base md:text-xl leading-relaxed">
                            Sampaikan masalah lingkungan di sekitar Anda dengan mudah dan cepat.
                        </p>
                    </section>

                    <section className="pb-20 px-4">
                        <div className="max-w-7xl mx-auto bg-white shadow-2xl border border-gray-100 rounded-3xl p-6 md:p-12 transition-all">
                            
                            {/* STEPS INDICATOR */}
                            <div className="flex justify-center items-center gap-4 mb-12">
                                {[1, 2, 3].map((s) => (
                                    <div key={s} className="flex items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-md ${step >= s ? 'bg-[#007E5B] text-white scale-110 shadow-[#007E5B]/20' : 'bg-gray-100 text-gray-400'}`}>
                                            {step > s ? '✓' : s}
                                        </div>
                                        {s < 3 && <div className={`w-8 md:w-16 h-1 mx-2 rounded ${step > s ? 'bg-[#007E5B]' : 'bg-gray-100'}`} />}
                                    </div>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                        <h3 className="text-2xl font-bold mb-6 text-[#007E5B]">Informasi Pelapor</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <input {...register('nama', { required: true })} placeholder="Nama Lengkap" className="input py-4 px-6 rounded-xl border-gray-200 focus:ring-[#007E5B] focus:border-[#007E5B]" />
                                            <input {...register('phone', { required: true })} placeholder="Nomor Telepon / WhatsApp" className="input py-4 px-6 rounded-xl border-gray-200" />
                                            <input {...register('email', { required: true })} placeholder="Email" className="input py-4 px-6 rounded-xl border-gray-200" />
                                        </div>
                                        <div className="mt-8 flex justify-end">
                                            <button onClick={nextStep} className="btn-primary px-8 py-3 flex items-center gap-2 hover:gap-4 transition-all group">
                                                Lanjut <ArrowRight size={18} className="transition-transform" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                        <h3 className="text-2xl font-bold mb-6 text-[#007E5B]">Jenis Masalah</h3>
                                        <select {...register('kategori', { required: true })} className="input mb-4 py-4 px-6 rounded-xl border-gray-200">
                                            <option value="">Pilih Kategori</option>
                                            <option>Sampah</option>
                                            <option>Pencemaran</option>
                                            <option>Drainase</option>
                                        </select>
                                        <input {...register('judul', { required: true })} placeholder="Judul Laporan" className="input mb-4 py-4 px-6 rounded-xl border-gray-200" />
                                        <textarea {...register('deskripsi', { required: true })} placeholder="Deskripsi Masalah" className="input mb-4 h-36 py-4 px-6 rounded-xl border-gray-200" />
                                        <input {...register('alamat', { required: true })} placeholder="Alamat Kejadian" className="input mb-8 py-4 px-6 rounded-xl border-gray-200" />
                                        <div className="flex justify-between">
                                            <button onClick={prevStep} className="btn-secondary px-6 py-3 flex items-center gap-2">
                                                <ArrowLeft size={18} /> Kembali
                                            </button>
                                            <button onClick={nextStep} className="btn-primary px-8 py-3 flex items-center gap-2">
                                                Lanjut <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                        <h3 className="text-2xl font-bold mb-6 text-[#007E5B]">Upload Bukti</h3>
                                        
                                        {/* Preview Section */}
                                        {previewUrl && (
                                            <div className="mb-6 rounded-2xl overflow-hidden border shadow-sm max-w-md mx-auto">
                                                <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
                                            </div>
                                        )}

                                        <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-[#007E5B] transition-colors group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                {...register('bukti', { required: true })}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 p-4 bg-emerald-50 rounded-full text-[#007E5B] group-hover:scale-110 transition-transform">
                                                    <ArrowRight size={32} className="rotate-90" />
                                                </div>
                                                <p className="text-gray-600 font-medium">Klik atau seret gambar ke sini</p>
                                                <p className="text-gray-400 text-sm mt-1">Format: JPG, PNG (Maks 5MB)</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-10">
                                            <button onClick={prevStep} className="btn-secondary px-6 py-3 flex items-center gap-2" disabled={isSubmitting}>
                                                <ArrowLeft size={18} /> Kembali
                                            </button>
                                            <button 
                                                onClick={handleSubmit(onSubmit)} 
                                                className="btn-primary px-8 py-3 flex items-center gap-2 disabled:bg-gray-400"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <> <Loader2 size={18} className="animate-spin" /> Mengirim... </>
                                                ) : (
                                                    'Kirim Laporan'
                                                )}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && successData && (
                                    <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                        <div className="text-center py-10">
                                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle size={48} className="text-emerald-600" />
                                            </div>

                                            <h3 className="text-3xl font-bold mb-2 text-[#007E5B]">Laporan Berhasil!</h3>
                                            <p className="text-gray-500 mb-8 text-lg">
                                                Terima kasih telah berkontribusi menjaga lingkungan.
                                            </p>

                                            <div className="max-w-lg mx-auto bg-[#F9FBFA] border border-emerald-100 rounded-2xl p-6 text-left space-y-4 shadow-sm">
                                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                                    <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">ID Laporan</span>
                                                    <span className="font-mono text-sm text-[#007E5B] font-bold">{successData.reportId}</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Judul Laporan</p>
                                                    <p className="font-semibold text-gray-800">{successData.title}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-bold">Kategori</p>
                                                    <p className="text-gray-700">{successData.category}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                                                <Link href={`/laporan/${successData.reportId}`} className="btn-primary px-8 py-3 flex items-center justify-center gap-2">
                                                    Lihat Detail Laporan
                                                </Link>
                                                <Link href="/laporan" className="btn-secondary px-8 py-3 flex items-center justify-center gap-2">
                                                    Pantau Semua Laporan
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}

export default Page
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

const Page = () => {
    const [step, setStep] = useState(1);
    const [successData, setSuccessData] = useState(null)

    const {
        register,
        handleSubmit,
        trigger,
        getValues,
        reset,
    } = useForm()

    // ===============================
    // STEP VALIDATION (PER STEP)
    // ===============================
    const nextStep = async () => {
        let fields = []

        if (step === 1) fields = ['nama', 'email', 'phone']
        if (step === 2) fields = ['kategori', 'judul', 'deskripsi']
        if (step === 3) fields = ['bukti']

        const valid = await trigger(fields)
        if (!valid) {
            toast.error('Mohon lengkapi data terlebih dahulu')
            return
        }

        setStep((s) => s + 1)
    }

    const prevStep = () => setStep((s) => s - 1)

    // ===============================
    // SUBMIT
    // ===============================
    const onSubmit = async (data) => {
        try {
            const formData = new FormData()

            formData.append('name', data.nama)
            formData.append('email', data.email)
            formData.append('phone', data.phone)
            formData.append('category', data.kategori)
            formData.append('title', data.judul)
            formData.append('description', data.deskripsi)
            formData.append('image', data.bukti[0])

            const res = await fetch('/api/reports', {
                method: 'POST',
                body: formData,
            })

            const result = await res.json()
            if (!res.ok) throw new Error()

            setSuccessData({
                reportId: result.reportId,
                title: data.judul,
                category: data.kategori,
            })

            toast.success(`Laporan berhasil! ID: ${result.reportId}`)
            reset()
            setTimeout(() => setStep(4), 500)
        } catch {
            toast.error('Gagal mengirim laporan')
        }
    }

    return (
        <>
            <Toaster position="top-center" />

            <section
                id="home"
                className="pt-24 md:pt-44 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-white"
            >
                <div className="container mx-auto">
                    <section className="bg-white">
                        {/* Kembali */}
                        <div className="flex justify-start mb-6">
                            <Link href="/" className="flex justify-center items-center btn-primary">
                                <ArrowLeft size={18} />
                                Kembali ke Halaman Utama
                            </Link>
                        </div>

                        {/* Badge */}
                        <div className="flex justify-center mb-6">
                            <span className="px-4 py-2 border border-black rounded-full text-sm text-black">
                                Bersama Jaga Lingkungan Kita
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4">
                                Bantu Wujudkan{' '}
                                <span className="bg-[#007E5B] text-white px-3 py-1 rounded-lg inline-block">
                                    Lingkungan
                                </span>
                            </h1>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900">
                                Yang Lebih Bersih
                            </h2>
                        </div>

                        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-8 text-base md:text-xl leading-relaxed">
                            Sampaikan masalah lingkungan di sekitar Anda dengan mudah dan cepat.
                        </p>
                    </section>

                    {/* FORM */}
                    <section className="pb-20 px-4">
                        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-8">

                            {/* STEPS */}
                            <div className="flex justify-center gap-3 mb-8">
                                {[1, 2, 3].map((s) => (
                                    <div
                                        key={s}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${step >= s ? 'bg-[#007E5B] text-white' : 'bg-gray-300 text-gray-600'
                                            }`}
                                    >
                                        {s}
                                    </div>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">

                                {/* STEP 1 */}
                                {step === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                        <h3 className="text-xl font-semibold mb-4 text-[#007E5B]">
                                            Informasi Pelapor
                                        </h3>

                                        <input
                                            {...register('nama', { required: true })}
                                            placeholder="Nama Lengkap"
                                            className="input mb-4"
                                        />

                                        <input
                                            {...register('phone', { required: true })}
                                            placeholder="Nomor Telepon / WhatsApp"
                                            className="input mb-4"
                                        />

                                        <input
                                            {...register('email', { required: true })}
                                            placeholder="Email"
                                            className="input mb-4"
                                        />

                                        <button onClick={nextStep} className="btn-primary ml-auto">
                                            Lanjut <ArrowRight size={18} />
                                        </button>
                                    </motion.div>
                                )}

                                {/* STEP 2 */}
                                {step === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <h3 className="text-xl font-semibold mb-4 text-[#007E5B]">
                                            Jenis Masalah
                                        </h3>

                                        <select {...register('kategori', { required: true })} className="input mb-4">
                                            <option value="">Pilih Kategori</option>
                                            <option>Sampah</option>
                                            <option>Pencemaran</option>
                                            <option>Drainase</option>
                                        </select>

                                        <input
                                            {...register('judul', { required: true })}
                                            placeholder="Judul Laporan"
                                            className="input mb-4"
                                        />

                                        <textarea
                                            {...register('deskripsi', { required: true })}
                                            placeholder="Deskripsi Masalah"
                                            className="input mb-4 h-28"
                                        />

                                        <div className="flex justify-between">
                                            <button onClick={prevStep} className="btn-secondary">
                                                <ArrowLeft size={18} /> Kembali
                                            </button>
                                            <button onClick={nextStep} className="btn-primary">
                                                Lanjut <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3 */}
                                {step === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <h3 className="text-xl font-semibold mb-4 text-[#007E5B]">
                                            Upload Bukti
                                        </h3>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register('bukti', { required: true })}
                                            className="mb-6 text-neutral-400 border-2 border-neutral-400 hover:bg-[#007E5B] hover:text-white px-1 py-1 md:px-6 md:py-2 rounded-sm cursor-pointer"
                                        />

                                        <div className="flex justify-between">
                                            <button onClick={prevStep} className="btn-secondary">
                                                <ArrowLeft size={18} /> Kembali
                                            </button>
                                            <button onClick={handleSubmit(onSubmit)} className="btn-primary">
                                                Kirim Laporan
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* SUCCESS */}
                                {step === 4 && successData && (
                                    <motion.div
                                        key="success"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                    >
                                        <div className="text-center py-10">
                                            <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />

                                            <h3 className="text-2xl font-bold mb-2 text-[#007E5B]">
                                                Laporan Terkirim
                                            </h3>

                                            <p className="text-gray-600 mb-6">
                                                Terima kasih telah berkontribusi menjaga lingkungan.
                                            </p>

                                            {/* DETAIL LAPORAN */}
                                            <div className="max-w-lg mx-auto bg-gray-50 border rounded-xl p-4 text-left space-y-3">
                                                <div>
                                                    <p className="text-sm text-gray-500">ID Laporan</p>
                                                    <p className="font-mono text-sm break-all text-black">
                                                        {successData.reportId}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-500">Judul Laporan</p>
                                                    <p className="font-semibold text-black">
                                                        {successData.title}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-gray-500">Kategori</p>
                                                    <p className='text-black'>
                                                        {successData.category}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            <div className="flex justify-center gap-4 mt-6">
                                                <Link
                                                    href={`/laporan/${successData.reportId}`}
                                                    className="btn-primary"
                                                >
                                                    Lihat Detail Laporan
                                                </Link>

                                                <Link
                                                    href="/laporan"
                                                    className="btn-secondary"
                                                >
                                                    Cari Laporan
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

import { Link } from 'react-scroll';
import Logo from '../../../public/assets/Logo.png';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* CleanPoint Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <img src={Logo.src} alt="CleanPoint Logo" className="w-6 h-6"/>
                            </div>
                            <span className="text-xl font-bold">CleanPoint</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            CleanPoint adalah platform digital inovatif untuk melaporkan masalah lingkungan secara cepat dan mudah.
                        </p>
                    </div>

                    {/* Navigasi Cepat */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Navigasi Cepat</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to='home' 
                                    smooth
                                    spy offset={-800} duration={600} activeClass='active'
                                    className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link to='works' 
                                    smooth
                                    spy offset={-800} duration={600} activeClass='active'
                                    className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link to='impact' 
                                    smooth
                                    spy offset={-800} duration={600} activeClass='active'
                                    className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                                    Impact Real
                                </Link>
                            </li>
                            <li>
                                <Link to='benefits' 
                                    smooth
                                    spy offset={-800} duration={600} activeClass='active'
                                    className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                                    Benefits
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Bantuan & Informasi */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Bantuan & Informasi</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                    Panduan Pengguna
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                    Syarat & Ketentuan
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                    Kebijakan Privasi
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Hubungi Kami */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Hubungi Kami</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-400">support@cleanpoint.id</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-gray-400">+62 123 456 789</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <p className="text-center text-gray-500 text-sm">
                        © 2026 CleanPoint. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
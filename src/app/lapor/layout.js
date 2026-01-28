import React from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const Layout = ({ children }) => {
    return (
        <main className="min-h-screen">
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default Layout
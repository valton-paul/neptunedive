'use client'

import Link from 'next/link'
import {useState, useEffect} from 'react'
import {History, User, Waves, Menu, X, Fish} from 'lucide-react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient()

export function MainLayout({children}: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(true)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const NavLink = ({href, icon: Icon, children}: {
        href: string;
        icon: React.ElementType;
        children: React.ReactNode
    }) => (
        <Link
            href={href}
            className="flex flex-col items-center justify-center p-2 hover:bg-[#4a5180] transition-colors rounded-lg"
            onClick={() => setIsMenuOpen(false)}
        >
            <Icon size={24} className="mb-1"/>
            <span className="text-xs">{children}</span>
        </Link>
    )

    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen flex flex-col bg-[#e6f4ff]">
                <header className="bg-[#2f3570] text-white p-4 fixed top-0 left-0 right-0 z-10">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Waves size={28}/>
                            <span className="text-xl font-bold">NeptuneDive</span>
                        </Link>
                        {!isMobile && (
                            <nav className="flex space-x-4">
                                <NavLink href="/sorties" icon={Fish}>Sorties</NavLink>
                                <NavLink href="/historique" icon={History}>Historique</NavLink>
                                <NavLink href="/profil" icon={User}>Profil</NavLink>
                            </nav>
                        )}
                        {isMobile && (
                            <button onClick={toggleMenu}
                                    className="p-2 hover:bg-[#4a5180] rounded-full transition-colors">
                                <Menu size={24}/>
                            </button>
                        )}
                    </div>
                </header>

                {isMenuOpen && isMobile && (
                    <div className="fixed inset-0 bg-[#2f3570] z-20 flex flex-col justify-center items-center">
                        <button onClick={toggleMenu}
                                className="absolute top-4 right-4 p-2 hover:bg-[#4a5180] rounded-full transition-colors">
                            <X size={24}/>
                        </button>
                        <nav className="flex flex-col space-y-6 text-white text-xl">
                            <NavLink href="/sorties" icon={Fish}>Sorties</NavLink>
                            <NavLink href="/historique" icon={History}>Historique</NavLink>
                            <NavLink href="/profil" icon={User}>Profil</NavLink>
                        </nav>
                    </div>
                )}

                <main className="flex-grow container mx-auto p-4 mt-20 mb-20 md:mb-4">
                    {children}
                </main>

                <footer className="bg-[#2f3570] text-white p-4 text-sm">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2024 NeptuneDive App. All rights reserved.</p>
                    </div>
                </footer>

                {isMobile && (
                    <nav
                        className="fixed bottom-0 left-0 right-0 bg-[#2f3570] text-white p-2 flex justify-around items-center">
                        <NavLink href="/sorties" icon={Fish}>Sorties</NavLink>
                        <NavLink href="/historique" icon={History}>Historique</NavLink>
                        <NavLink href="/profil" icon={User}>Profil</NavLink>
                    </nav>
                )}
            </div>
        </QueryClientProvider>
    )
}
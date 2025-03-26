"use client"

import {
    CaretLeft,
    CaretRight,
    DownloadSimple,
    House,
    List
} from '@phosphor-icons/react';
import Image from 'next/image';
import { useState } from 'react';
import MonLogo from '../../../public/images/mon_logo.png';

export default function PrivateLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const menuItems = [
        { name: 'Home', icon: House, path: '/' },
        { name: 'Massificado', icon: DownloadSimple, path: '/massificado' },
    ];

    return (
        <section className="flex h-screen bg-gray-100">
            <button
                onClick={toggleMobileMenu}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-1000 text-white"
            >
                <List size={24} weight="bold" />
            </button>

            <aside
                className={`
                    bg-blue-1000 text-white transition-all duration-300 ease-in-out
                    fixed md:relative z-40 h-full
                    ${isCollapsed ? 'w-20' : 'w-64'}
                    ${isMobileMenuOpen ? 'left-0' : '-left-full md:left-0'}
                `}
            >
                <div className="flex flex-col h-full">
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4 border-b border-blue-800`}>
                        {!isCollapsed && (
                            <Image src={MonLogo} alt="circulo amarelo com estrela" className='w- w-2/6' />
                        )}
                        <button
                            onClick={toggleSidebar}
                            className="p-1 rounded-full hover:bg-blue-800 cursor-pointer"
                        >
                            {isCollapsed ? (
                                <CaretRight size={20} weight="bold" />
                            ) : (
                                <CaretLeft size={20} weight="bold" />
                            )}
                        </button>
                    </div>

                    <nav className="flex-1 mt-6">
                        <ul className="space-y-2 px-2">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.path}
                                        className={`
                                            flex items-center p-3 rounded-lg
                                            hover:bg-blue-800 transition-colors
                                            ${isCollapsed ? 'justify-center' : 'justify-start'}
                                        `}
                                    >
                                        <item.icon size={20} />
                                        {!isCollapsed && (
                                            <span className="ml-3">{item.name}</span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Rodapé */}
                    <div className={`p-4 border-t border-blue-800 ${isCollapsed ? 'text-center' : ''}`}>
                        {!isCollapsed && (
                            <p className="text-sm text-blue-300">Versão 1.0.0</p>
                        )}
                    </div>
                </div>
            </aside>

            {/* Conteúdo Principal */}
            <main className={`flex-1 overflow-auto transition-all duration-300 ease-in-out`}>
                <div className="p-5">
                    {children}
                </div>
            </main>
        </section>
    );
}

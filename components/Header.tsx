import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

interface HeaderProps {
    title: string;
    children?: React.ReactNode;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, children, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-700/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2 text-2xl font-bold text-white">
                            <Icon icon="robot" className="w-8 h-8 text-sky-400" />
                            SiteBot AI
                        </div>
                        <span className="text-slate-600">/</span>
                        <h1 className="text-xl font-medium text-slate-300">{title}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                       {children}
                        <div className="relative" ref={menuRef}>
                             <img
                                className="h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-slate-900 ring-sky-500 cursor-pointer"
                                src="https://picsum.photos/100/100"
                                alt="User avatar"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            />
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-slate-700 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                    <div className="py-1" role="none">
                                        <div className="px-4 py-3 text-sm text-slate-300 border-b border-slate-700">
                                            <p className="font-semibold">Jane Doe</p>
                                            <p className="truncate text-slate-400">jane.doe@example.com</p>
                                        </div>
                                        <a href="#" className="text-slate-300 hover:bg-slate-700 hover:text-white block px-4 py-2 text-sm" role="menuitem" tabIndex={-1}>
                                            Account settings
                                        </a>
                                        <button
                                            onClick={onLogout}
                                            className="w-full text-left flex items-center gap-2 text-slate-300 hover:bg-slate-700 hover:text-white px-4 py-2 text-sm"
                                            role="menuitem"
                                            tabIndex={-1}
                                        >
                                            <Icon icon="logout" className="w-4 h-4" />
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
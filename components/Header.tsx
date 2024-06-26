'use client';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import MobileNav from './MobileNav';
import Nav from './Nav';
import ThemeToggler from './ThemeToggler'
import {usePathname } from 'next/navigation';

const Header = () => {
    const [header, setHeader] = useState(false);
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 50 ? setHeader(true) : setHeader(false);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <header className={`${header
                ? 'py-4 bg-white shadow-lg dark:bg-accent dark:shadow-3xl'
                : 'py-4 dark:bg-transparent'
            } sticky top-0 z-30 transition-all ${pathname === '/' && 'bg-white'}`}>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center'>
                    <Logo />
                    <div className='flex items-center gap-x-6'>
                        <Nav
                            className="hidden xl:flex gap-x-8 items-center"
                            linkSyle='capitalize relative hover:text-primary transition-all'
                            motionSyle='absolute left-0 bottom-0 h-[2px] bg-primary w-full'
                        />
                        <ThemeToggler />
                        <div className='xl:hidden'>
                            <MobileNav />
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header
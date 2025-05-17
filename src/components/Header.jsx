import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="py-4 bg-white">
            <div className="container mx-auto px-4">
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center justify-between w-full">
                    <div className="mr-6">
                        <Link to="/" className="text-blue-700 font-bold text-3xl">VoFAS</Link>
                    </div>
                    <div className="flex space-x-4 justify-center flex-1">
                    <Link to="/" className="text-gray-500 hover:text-purple-400">Ana Sayfa</Link>
                        <Link to="/about" className="text-gray-500 hover:text-purple-400">Hakkımızda</Link>
                        <Link to="/contact" className="text-gray-500 hover:text-purple-400">İletişim</Link>
                        <Link to="/legal" className="text-gray-500 hover:text-purple-400">Yasal</Link>
                        <Link to="/privacy" className="text-gray-500 hover:text-purple-400">Gizlilik</Link>
                    </div>
                    <div className="ml-auto">
                        <Link to="/login" className="text-purple-900 hover:text-purple-400 font-medium">Giriş Yap</Link>
                    </div>
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="text-blue-700 font-bold text-xl">VoFAS</Link>
                        <button
                            onClick={toggleMenu}
                            className="border border-gray-20 p-2"
                            aria-label="Ana menüyü aç"
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <span className="text-sm text-gray-40"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg></span>
                            )}
                        </button>
                    </div>

                    {isMenuOpen && (
                        <nav className="mt-2">
                            <Link to="/" className="block py-1 text-black hover:text-gray-500">Ana Sayfa</Link>
                            <Link to="/hakkinda" className="block py-1 text-black hover:text-gray-500">Hakkımızda</Link>
                            <Link to="/iletisim" className="block py-1 text-black hover:text-gray-500">İletişim</Link>
                            <Link to="/dashboard" className="block py-1 text-black hover:text-gray-500">Panel</Link>
                            <Link to="/legal" className="block py-1 text-black hover:text-gray-500">Yasal</Link>
                            <Link to="/gizlilik" className="block py-1 text-black hover:text-gray-500">Gizlilik</Link>
                            <Link to="/login" className="block py-1 text-black hover:text-gray-500 font-bold">Giriş Yap</Link>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

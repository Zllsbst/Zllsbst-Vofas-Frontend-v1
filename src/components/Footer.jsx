import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-colors-primary-10 text-colors-purple-50 border-t border-gray-20 py-10 mt-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Sol Sütun */}
                <div>
                    <h2 className="text-xl font-bold text-primary mb-2">VoFAS</h2>
                    <p className="text-gray-30">Müşteri sesini anlamanın en doğal yolu.</p>
                </div>

                {/* Orta Sütun */}
                <div className="space-y-1">
                    <Link to="/" className="block hover:text-purple-30">Ana Sayfa</Link>
                    <Link to="/about" className="block hover:text-purple-30">Hakkımızda</Link>
                    <Link to="/contact" className="block hover:text-purple-30">İletişim</Link>
                    <Link to="/legal" className="block hover:text-purple-30">Yasal</Link>
                    <Link to="/privacy" className="block hover:text-purple-30">Gizlilik</Link>
                </div>

                {/* Sağ Sütun */}
                <div className="space-y-2">
                    <p className="text-gray-30">📧 Email: <a href="mailto:destek@vofas.com" className="hover:text-purple-30">destek@vofas.com</a></p>
                    <p className="text-gray-30">📍 Adres: Ankara Üniversitesi</p>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-30">
                © 2025 VoFAS. Tüm hakları saklıdır.
            </div>
        </footer>
    );
};

export default Footer;

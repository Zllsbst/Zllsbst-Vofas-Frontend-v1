import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AnaSayfa from './pages/AnaSayfa.jsx';
import Gizlilik from './pages/Privacy.jsx';
import Hakkinda from './pages/About.jsx';
import Iletisim from './pages/Contact.jsx';
import Legal from './pages/Legal.jsx';
import Login from './pages/Login.jsx';

function App() {
    return (
        <>
            <Header />
            <main >
                <Routes>
                    <Route path="/" element={<AnaSayfa />} />
                    <Route path="/gizlilik" element={<Gizlilik />} />
                    <Route path="/hakkinda" element={<Hakkinda />} />
                    <Route path="/iletisim" element={<Iletisim />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;

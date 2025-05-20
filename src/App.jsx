import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AnaSayfa from './pages/AnaSayfa.jsx';
import Login from './pages/Login.jsx';


function App() {
    return (
        <>
            <Header />
            <main >
                <Routes>
                    <Route path="/" element={<AnaSayfa />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;

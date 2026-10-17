import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import { MentionsLegales, CGV, Confidentialite } from './pages/LegalPages';
import { ListeProvider } from './context/ListeContext';
import ListeWidgets from './components/ListeWidgets';

function PageIntrouvable() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-5xl mb-4">😕</p>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Page introuvable</h1>
      <p className="text-sm text-[#1A1A1A]/50 mb-6">Cette page n’existe pas ou a été déplacée.</p>
      <Link to="/" className="bg-[#C9992C] hover:bg-[#B8872A] text-white font-semibold px-6 py-3 rounded-xl transition">
        Retour à l’accueil
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin panel — no header/footer */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Public site */}
        <Route
          path="/*"
          element={
            <ListeProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalogue" element={<CataloguePage />} />
                    <Route path="/produit/:id" element={<ProductDetailPage />} />
                    <Route path="/mentions-legales" element={<MentionsLegales />} />
                    <Route path="/cgv" element={<CGV />} />
                    <Route path="/confidentialite" element={<Confidentialite />} />
                    <Route path="*" element={<PageIntrouvable />} />
                  </Routes>
                </div>
                <Footer />
                <ListeWidgets />
              </div>
            </ListeProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
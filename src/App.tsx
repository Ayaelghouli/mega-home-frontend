import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import { MentionsLegales, CGV, Confidentialite } from './pages/LegalPages';

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
                </Routes>
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from "@/pages/Home.jsx";
import Contact from "@/pages/Contact.jsx";
import Login from "@/pages/Login.jsx";
import Geschiedenis from "@/pages/Geschiedenis.jsx";
import Registratie from "@/pages/Registratie.jsx";
import Statistieken from "@/pages/Statistieken.jsx";
import Faq from "@/pages/Faq.jsx";
import CompleteLijst from "./pages/Completelijst";
import Detaillied from "./pages/Detaillied";
import Detailartiest from "./pages/Detailartiest";
import Overzichtartiest from "./pages/Overzichtartiest";
import Overzichtnummers from "./pages/Overzichtnummers";

import Layout from "@/layout/Layout.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import { useAuth } from "@/hooks/useAuth";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>    
        <Routes>
            <Route path="/*" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="geschiedenis" element={<Geschiedenis />} />
                <Route path="login" element={<Login />} />
                <Route path="registratie" element={<Registratie />} />
                <Route path="statistieken" element={<Statistieken />} />
                <Route path="faq" element={<Faq />} />
                <Route path="completelijst" element={<CompleteLijst />} />
                <Route path="Detailartiest/:id" element={<Detailartiest />} />
                <Route path="Detaillied/:id" element={<Detaillied />} />
                <Route path="Overzichtartiest" element={<Overzichtartiest />} />
                <Route path="Overzichtnummers" element={<Overzichtnummers />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
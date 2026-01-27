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
import CompleteLijst from "./pages/CompleteLijst";
import Detailpaginalied from "./pages/Detailpaginalied";
import Detailpaginaartiest from "./pages/Detailpaginaartiest";
import Gezakt from "./pages/Gezakt";
import Gestegen from "./pages/Gestegen";
import AlleEdities from "./pages/AlleEdities";
import NiewKomers from "./pages/Nieuwkomers";
import Verdwenen from "./pages/Verdwenen";
import OpnieuwBinnen from "./pages/OpnieuewBinnen";
import ZelfdePlek from "./pages/ZelfdePlek";
import AchterElkaar from "./pages/AchterElkaar";
import EenKeer from "./pages/EenKeer";

import Layout from "@/layout/Layout.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import { useAuth } from "@/hooks/useAuth";
import TopArtiesten from "./pages/TopArtiesten";


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
                <Route path="detailpaginaartiest/:id" element={<Detailpaginaartiest />} />
                <Route path="detailpaginalied/:id" element={<Detailpaginalied />} />
                <Route path="gezakt" element={<Gezakt />} />
                <Route path="gestegen" element={<Gestegen />} />
                <Route path="alleedities" element={<AlleEdities />} />
                <Route path="nieuwkomers" element={<NiewKomers />} />
                <Route path="verdwenen" element={<Verdwenen />} />
                <Route path="opnieuwbinnen" element={<OpnieuwBinnen />} />
                <Route path="zelfdeplek" element={<ZelfdePlek />} />
                <Route path="achterelkaar" element={<AchterElkaar />} />
                <Route path="eenkeer" element={<EenKeer />} />
                <Route path="topartiesten" element={<TopArtiesten />} />
                
                

              

            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
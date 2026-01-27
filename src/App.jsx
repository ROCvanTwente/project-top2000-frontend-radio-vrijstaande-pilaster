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
import Editartiest from "./pages/Editartiest";
import Editlied from "./pages/Editlied";
import Editroles from "./pages/Editroles";
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
  const { isAdmin, isAuthenticated } = useAuth();
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
                <Route path="Playlist" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Playlist /></ProtectedRoute>} />
                <Route
                    path="Editartiest/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAdmin}>
                            <Editartiest />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="Editlied/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAdmin}>
                            <Editlied />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="Editroles"
                    element={
                        <ProtectedRoute isAuthenticated={isAdmin}>
                            <Editroles />
                        </ProtectedRoute>
                    }
                />
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
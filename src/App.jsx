import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "@/pages/Contact.jsx";
import Login from "@/pages/Login.jsx";
import Geschiedenis from "@/pages/Geschiedenis.jsx";
import Registratie from "@/pages/Registratie.jsx";
import Statistieken from "@/pages/Statistieken.jsx";
import Faq from "@/pages/Faq.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "@/pages/Home.jsx";
import Layout from "@/layout/Layout.jsx";

const App = () => {
  return (
    <BrowserRouter>    
        <Routes>
            <Route path="/*" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="geschiedenis" element={<Geschiedenis />} />
                <Route path="login" element={<Login />} />
                <Route path="registratie" element={<Registratie />} />
                <Route path="statistieken" element={<Statistieken />} />
                <Route path="faq" element={<Faq />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
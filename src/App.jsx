import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "@/pages/contact.jsx";
import Login from "@/pages/login.jsx";
import Geschiedenis from "@/pages/geschiedenis.jsx";
import Registratie from "@/pages/registratie.jsx";
import Statistieken from "@/pages/statistieken.jsx";

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
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
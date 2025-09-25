import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ContactCard from './components/ContactCard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal que muestra directamente el perfil de Eugenio Andreone */}
        <Route path="/" element={<ContactCard defaultSlug="eugenio-andreone" />} />
        {/* Mantener las rutas existentes para compatibilidad */}
        <Route path="/id/:slug" element={<ContactCard />} />
        <Route path="*" element={<Navigate to="/id/eugenio-andreone" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
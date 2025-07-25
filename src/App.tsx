import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactCard from './components/ContactCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactCard />} />
        <Route path="/id/:slug" element={<ContactCard />} />
        <Route path="*" element={<ContactCard />} />
      </Routes>
    </Router>
  );
}

export default App;
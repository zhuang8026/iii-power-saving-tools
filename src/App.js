import React, { Fragment, Suspense, useState, useEffect, useContext} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import Menu from './components/global/Menu';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Menu */}
        <Suspense fallback={<></>}>
          <Menu/>
        </Suspense>

        {/* body */}
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </header>
    </div>
  );
}

export default App;

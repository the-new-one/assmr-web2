import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './admin/dashboard';
import { DroppedProperty } from './admin/dropped-property';
import { AdminNavigation } from './admin/nav';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AdminNavigation /> } children={
          <>
        <Route path="/dashboard" element={ <AdminDashboard /> } />
        <Route path="/dropped" element={ <DroppedProperty /> } />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

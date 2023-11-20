import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './admin/dashboard';
import { DroppedProperty } from './admin/dropped-property';
import { AdminNavigation } from './admin/nav';
import { OnGoingTransactions } from './admin/on-going-trnsctn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AdminNavigation /> } children={
          <>
        <Route path="/dashboard" element={ <AdminDashboard /> } />
        <Route path="/on-going-transactions" element={ <OnGoingTransactions /> } />
        <Route path="/dropped" element={ <DroppedProperty /> } />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

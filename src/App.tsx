import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './admin/dashboard';
import { DroppedProperty } from './admin/dropped-property';
import { AdminNavigation } from './admin/nav';
import { OnGoingTransactions } from './admin/on-going-trnsctn';
import { UserSubscription } from './admin/subscriptions';
import { UserFeedBacks } from './admin/user-feedbacks';
import { UserRatings } from './admin/user-ratings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AdminNavigation /> } children={
          <>
            <Route path="/dashboard" element={ <AdminDashboard /> } />
            <Route path="/on-going-transactions" element={ <OnGoingTransactions /> } />
            <Route path="/dropped" element={ <DroppedProperty /> } />
            <Route path="/subscriptions" element={ <UserSubscription /> } />
            <Route path="/feedbacks" element={ <UserFeedBacks /> } />
            <Route path="/ratings" element={ <UserRatings /> } />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

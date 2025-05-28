import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages
import LandingPage from './pages/LandingPage';
import PaymentPage from './pages/PaymentPage';
import DashboardLayout from './layouts/DashboardLayout';
import PostJobPage from './pages/dashboard/PostJobPage';
import CandidatesPage from './pages/dashboard/CandidatesPage';
import ManageJobsPage from './pages/dashboard/ManageJobsPage';
import StagingPage from './pages/dashboard/StagingPage';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<PostJobPage />} />
          <Route path="post-job" element={<PostJobPage />} />
          <Route path="candidates" element={<CandidatesPage />} />
          <Route path="manage-jobs" element={<ManageJobsPage />} />
          <Route path="staging" element={<StagingPage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
import React from 'react';
import { Outlet } from 'react-router-dom';
import DemoBanner from '../components/DemoBanner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ToastContainer from '../components/ToastContainer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-app text-app">
      <DemoBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;

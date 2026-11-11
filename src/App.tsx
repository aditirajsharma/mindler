import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WellnessProvider } from './context/WellnessContext';
import { ChatProvider } from './context/ChatContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ChatWidget } from './components/chat/ChatWidget';
import { HomePage } from './pages/HomePage';
import { YogaPage } from './pages/YogaPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';

export const App: React.FC = () => {
  return (
    <Router>
      <WellnessProvider>
        <ChatProvider>
          <div className="min-h-screen flex flex-col bg-[#0A0A0F] text-[#F5F3FF]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/yoga" element={<YogaPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
          </div>
        </ChatProvider>
      </WellnessProvider>
    </Router>
  );
};

export default App;


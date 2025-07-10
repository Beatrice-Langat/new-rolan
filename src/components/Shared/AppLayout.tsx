'use client';

import { useState, } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Navbar Component */}
      <Navbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Layout Container */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar Component */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-8 px-4">
            <div className="mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


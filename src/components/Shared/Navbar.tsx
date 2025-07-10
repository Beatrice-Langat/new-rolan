'use client';

import { useState } from 'react';


interface NavbarProps {
  onSidebarToggle: () => void;
}

export default function Navbar({ onSidebarToggle }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-primary/20 dark:border-primary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Brand & Mobile Menu */}
          <div className="flex items-center">
            <button
              onClick={onSidebarToggle}
              className="lg:hidden p-2 rounded-md  dark:text-white hover:text-primary dark:hover:text-primary-400 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <h1 className="text-2xl font-headline text-primary dark:text-primary-400 ml-2 lg:ml-0">Rolan</h1>
              <span className="ml-2 text-sm font-paragraph /60 dark:text-gray-400 hidden sm:inline">Version 7.0</span>
            </div>
          </div>
          
          {/* Center: Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Rolan Exam Master..."
                  className="w-full pl-10 pr-4 py-2 border border-primary/20 dark:border-primary/40 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph  dark:text-white placeholder-dark/50 dark:placeholder-gray-400 bg-white dark:bg-gray-700"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 /50 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>
          
          {/* Right: Actions & User */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 rounded-md  dark:text-white hover:text-primary dark:hover:text-primary-400 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              aria-label="Toggle search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-md  dark:text-white hover:text-primary dark:hover:text-primary-400 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 0 12.5" />
              </svg>
            </button>
            
            {/* Profile */}
            <button className="flex items-center space-x-2 p-2 rounded-md  dark:text-white hover:text-primary dark:hover:text-primary-400 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
              <div className="w-8 h-8 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center">
                <span className="text-sm font-headline text-primary dark:text-primary-400">👤</span>
              </div>
              <span className="hidden sm:block text-sm font-paragraph">Profile</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="md:hidden py-4 border-t border-primary/20 dark:border-primary/40">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Rolan Exam Master..."
                  className="w-full pl-10 pr-4 py-2 border border-primary/20 dark:border-primary/40 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-paragraph  dark:text-white placeholder-dark/50 dark:placeholder-gray-400 bg-white dark:bg-gray-700"
                  autoFocus
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 /50 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
} 


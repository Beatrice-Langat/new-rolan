// app/analysismenu/page.tsx

'use client';

import React from 'react';


import Settings from '../../components/Settings/SettingsForm';

export default function SettingsPage() {
  return (
    <div className="w-full max-w-sm bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      
      <Settings />
    </div>
  );
}
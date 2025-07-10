// app/analysismenu/page.tsx

'use client';

import React from 'react';

import AnalysisMenu from '../../components/Analysis/AnalysisMenu';

export default function AnalysisPage() {
  return (
    <div className="w-full max-w-sm bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      
      <AnalysisMenu />
    </div>
  );
} 
// app/examination/page.tsx

'use client';

import React from 'react';

// This is the correct import statement:
// Path from app/examination/page.tsx to components/Examination.tsx
import Examination from '../../components/Examination/Examination';

export default function ExaminationPage() {
  return (
    <div className="w-full max-w-sm bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200" >
      
      <Examination />
    </div>
  );
} 
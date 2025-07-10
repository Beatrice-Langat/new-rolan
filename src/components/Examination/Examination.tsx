

import React from 'react';
// For Font Awesome icons, ensure you have installed:
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
// And configured it in your _app.tsx or layout.tsx, e.g.:
// import '@fortawesome/fontawesome-svg-core/styles.css';
// import { config } from '@fortawesome/fontawesome-svg-core';
// config.autoAddCss = false; // Prevent Font Awesome from adding its own CSS automatically

// If you prefer not to use Font Awesome, you can replace the <i> tags with:
// - Inline SVGs (e.g., <svg>...</svg>)
// - Emojis (e.g., ✏️)
// - Placeholder text

interface MenuItem {
  id: string;
  label: string;
  href: string; // The URL path for Next.js routing
  iconClass?: string; // Font Awesome icon class
  isSectionHeader?: boolean; // To mark items as section headers
  specialClass?: string; // For specific styling like the red diamond
}

const menuItems: MenuItem[] = [
  { id: 'students-subject-assignment', label: 'Students Subject Assignment', href: '/examination/students-subject-assignment', iconClass: 'fas fa-pencil-alt' }, // Changed to pencil-alt for better visual
  { id: 'marks-entry', label: 'Marks Entry (CATs,SERIES etc)', href: '/examination/marks-entry', iconClass: 'fas fa-keyboard' },
  { id: 'view-enter-marks', label: 'View/Enter Marks Per Student', href: '/examination/view-enter-marks', iconClass: 'fas fa-clipboard-list' },
  { id: 'transfer-marks', label: 'Transfer Marks from an Exam to Another', href: '/examination/transfer-marks', iconClass: 'fas fa-exchange-alt' },
  { id: 'reset-transcript', label: 'Reset/Update Transcript', href: '/examination/reset-transcript', iconClass: 'fas fa-gem', specialClass: 'text-red-500' }, // Tailwind class for red
  // Note: The image shows "Student's House grade" as a non-clickable header, so it's marked as `isSectionHeader`
  { id: 'students-house-grade', label: 'Student\'s House Grade', href: '/examination/students-house-grade-entry', iconClass: 'fas fa-home' },
  { id: 'kcse-mock-grades', label: 'KCSE/MOCK Grades Entry', href: '/examination/kcse-mock-grades', iconClass: 'fas fa-edit' },
  { id: 'kcse-yearly-mean', label: 'KCSE Yearly Mean Score', href: '/examination/kcse-yearly-mean', iconClass: 'fas fa-chart-line' },
  { id: 'kcpe-marks', label: 'KCPE Marks', href: '/examination/kcpe-marks', iconClass: 'fas fa-calculator' }, // Changed to calculator for better visual
  { id: 'minimum-expected-mgrade', label: 'Minimum Expected Mgrade Per Form', href: '/examination/minimum-expected-mgrade', iconClass: 'fas fa-clipboard-check' },
  { id: 'search-student-name', label: 'Search Student Name', href: '/examination/search-student-name', iconClass: 'fas fa-search' },
  { id: 'backup-examination-file', label: 'Backup Examination File', href: '/examination/backup-examination-file', iconClass: 'fas fa-save' },
];

const Examination: React.FC = () => {
  return (
    <div className="w-full max-w-sm bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      
      <div className="px-6 py-4 bg-gray-800 text-white text-xl font-semibold text-center">
        Examination Menu
      </div>

      <nav className="p-2">
        <ul className="divide-y divide-gray-200">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.isSectionHeader ? (
                // Styling for section headers
                <div className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 border-b border-gray-200 mt-2 first:mt-0">
                  {item.label}
                </div>
              ) : (
                // Buttons for navigation
                // In a real Next.js app, consider using `next/link` for client-side routing:
                // import Link from 'next/link';
                // <Link href={item.href} passHref>
                //   <a className="...">...</a>
                // </Link>
                <a
                  href={item.href} // Placeholder href, replace with actual Next.js routes
                  className={`
                    flex items-center gap-4 px-4 py-3
                    text-gray-800 hover:text-blue-700
                    bg-white hover:bg-blue-50
                    rounded-md transition-all duration-200 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                    group
                  `}
                >
                  {/* Icon */}
                  {item.iconClass && (
                    <i className={`
                      text-lg w-6 text-center
                      text-gray-500 group-hover:text-blue-600
                      ${item.specialClass || ''}
                    `}></i>
                  )}
                  {/* Label */}
                  <span className="flex-1 text-base font-normal">
                    {item.label}
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Examination;



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

const registrationMenuItems: MenuItem[] = [
  { id: 'school-particulars', label: 'School Particulars', href: '/registration/school-particulars', iconClass: 'fas fa-school' }, // Representing a school/building
  { id: 'streams', label: 'Streams', href: '/registration/streams', iconClass: 'fas fa-stream' }, // Flows/streams icon
  { id: 'houses', label: 'Houses', href: '/registration/houses', iconClass: 'fas fa-house-user' }, // House with a user
  { id: 'family', label: 'Family', href: '/registration/family', iconClass: 'fas fa-users' }, // Group of users
  { id: 'student-details', label: 'Student Details', href: '/registration/student-details', iconClass: 'fas fa-user-graduate' }, // Graduation cap for student
  { id: 'assign-index-numbers', label: 'Assign Index Numbers', href: '/registration/assign-index-numbers', iconClass: 'fas fa-sort-numeric-up' }, // Numeric sorting
  { id: 'student-details-photo', label: 'Student Details - (Photo)', href: '/registration/student-details-photo', iconClass: 'fas fa-camera' }, // Camera icon for photo
  { id: 'main-subjects', label: 'Main Subjects', href: '/registration/main-subjects', iconClass: 'fas fa-book' }, // Book icon for subjects
  { id: 'assign-family-details', label: 'Assign Family Details', href: '/registration/assign-family-details', iconClass: 'fas fa-user-friends' }, // Friends/family icon
  { id: 'staff-details', label: 'Staff Details', href: '/registration/staff-details', iconClass: 'fas fa-chalkboard-teacher' }, // Teacher icon
  { id: 'assign-class-teachers', label: 'Assign Class Teachers', href: '/registration/assign-class-teachers', iconClass: 'fas fa-person-chalkboard' }, // Person teaching
  { id: 'assign-subject-teacher', label: 'Assign Subject Teacher', href: '/registration/assign-subject-teacher', iconClass: 'fas fa-user-tie' }, // Professional/tie for subject teacher
  { id: 'examination-types', label: 'Examination Types', href: '/registration/examination-types', iconClass: 'fas fa-scroll' }, // Scroll/list for types
  { id: 'authenticity', label: 'Authenticity', href: '/registration/authenticity', iconClass: 'fas fa-key' }, // Key icon
  { id: 'open-another-file', label: 'Open Another File', href: '/registration/log-off-open-another-file', iconClass: 'fas fa-arrow-alt-circle-left' }, // Arrow for log off
  
];

const Registration: React.FC = () => {
  return (
    <div className="w-full max-w-sm bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      

      <div className="px-6 py-4 bg-gray-800 text-white text-xl font-semibold text-center">
        Registration Menu
      </div>


      <nav className="p-2">
        <ul className="divide-y divide-gray-200">
          {registrationMenuItems.map((item) => (
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

export default Registration;

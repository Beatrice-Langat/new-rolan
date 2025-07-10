

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

const settingsMenuItems: MenuItem[] = [
  { id: 'system-users-details', label: 'System Users Details', href: '/settings/system-users-details', iconClass: 'fas fa-users-gear' }, // Users with gear
  { id: 'assign-user-levels', label: 'Assign User Levels', href: '/settings/assign-user-levels', iconClass: 'fas fa-user-tag', specialClass: 'text-red-500' }, // User with tag, red diamond
  { id: 'set-ranking-subjects-per-form', label: 'Set Ranking Subjects Per Form', href: '/settings/set-ranking-subjects-per-form', iconClass: 'fas fa-sort-numeric-up-alt' },
  { id: 'set-best-subjects-per-form-per-group', label: 'Set Best Subjects Per Form Per Group', href: '/settings/set-best-subjects-per-form-per-group', iconClass: 'fas fa-trophy' },
  { id: 'set-subjects-grading', label: 'Set Subjects Grading (Per Form Per Subject)', href: '/settings/set-subjects-grading', iconClass: 'fas fa-graduation-cap' },
  { id: 'set-own-mean-grade-criteria', label: 'Set Your Own Mean Grade Criteria(Marks)', href: '/settings/set-own-mean-grade-criteria', iconClass: 'fas fa-calculator' },
  { id: 'set-subjects-comments-remarks', label: 'Set Subjects Comments/Remarks', href: '/settings/set-subjects-comments-remarks', iconClass: 'fas fa-comment-dots' },
  { id: 'set-reportform-comments', label: 'Set ReportForm Comments', href: '/settings/set-reportform-comments', iconClass: 'fas fa-comment-alt' },
  { id: 'set-house-comments', label: 'Set House Comments', href: '/settings/set-house-comments', iconClass: 'fas fa-comments' },
  { id: 'set-enter-arrears-next-term-fees-balances', label: 'Set/Enter Arrears and Next Term Fees Balances', href: '/settings/set-enter-arrears-next-term-fees-balances', iconClass: 'fas fa-money-bill-wave' },
  { id: 'set-end-term-divider-x-y', label: 'Set End Term Divider X and Y', href: '/settings/set-end-term-divider-x-y', iconClass: 'fas fa-divide' },
  { id: 'set-term-year', label: 'Set Term/Year', href: '/settings/set-term-year', iconClass: 'fas fa-calendar-alt' },
  { id: 'promote-demote-students', label: 'Promote/Demote Student(s)', href: '/settings/promote-demote-students', iconClass: 'fas fa-arrows-alt-v' }, // Vertical arrows for change
  { id: 'end-of-term-routine', label: 'End Of Term Routine', href: '/settings/end-of-term-routine', iconClass: 'fas fa-calendar-check' },
  { id: 'end-of-year-routine', label: 'End Of Year Routine', href: '/settings/end-of-year-routine', iconClass: 'fas fa-calendar-times' },
  { id: 'edit-user-menus', label: 'Edit User Menus', href: '/settings/edit-user-menus', iconClass: 'fas fa-bars' }, // Hamburger menu for menus
  { id: 'reset-rolan-file', label: 'Reset Rolan File', href: '/settings/reset-rolan-file', iconClass: 'fas fa-rotate-right' }, // Rotate/reset icon
];

const Settings: React.FC = () => {
  return (
    <div className="w-full max-w-sm bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      
      <div className="px-6 py-4 bg-gray-800 text-white text-xl font-semibold text-center">
        Settings Menu
      </div>

      <nav className="p-2">
        <ul className="divide-y divide-gray-200">
          {settingsMenuItems.map((item) => (
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

export default Settings;

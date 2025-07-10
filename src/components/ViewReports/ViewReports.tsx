

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

const viewReportsMenuItems: MenuItem[] = [
  { id: 'students-details-list', label: 'Students Details List', href: '/view-reports/students-details-list', iconClass: 'fas fa-list-alt' },
  { id: 'students-details-per-house', label: 'Students Details Per House', href: '/view-reports/students-details-per-house', iconClass: 'fas fa-house-user' },
  { id: 'staff-list', label: 'Staff List', href: '/view-reports/staff-list', iconClass: 'fas fa-users' },
  { id: 'subject-grading', label: 'Subject Grading', href: '/view-reports/subject-grading', iconClass: 'fas fa-star' }, // Star for grading/rating
  { id: 'marks-sheet-1-adm-no', label: 'Marks Sheet_1(Order by Adm.No)', href: '/view-reports/marks-sheet-1-adm-no', iconClass: 'fas fa-file-invoice' },
  { id: 'marks-sheet-2-name', label: 'Marks Sheet_2(Order by Name)', href: '/view-reports/marks-sheet-2-name', iconClass: 'fas fa-file-invoice-dollar' }, // Different icon for variant
  { id: 'marks-sheet-3-index-no', label: 'Marks Sheet_3(Order by Index.No)', href: '/view-reports/marks-sheet-3-index-no', iconClass: 'fas fa-file-invoice-xmark' }, // Another variant
  { id: 'set-sms-sender-path-salutation', label: 'Set SMS Sender Path And Salutation', href: '/view-reports/set-sms-sender-path-salutation', iconClass: 'fas fa-sms' },
  { id: 'subjects-analysis-with-sms', label: 'Subjects Analysis With SMS', href: '/view-reports/subjects-analysis-with-sms', iconClass: 'fas fa-chart-pie' }, // Pie chart for analysis
  { id: 'principals-commendation', label: 'Principals\' Commendation', href: '/view-reports/principals-commendation', iconClass: 'fas fa-trophy' }, // Trophy for commendation
  { id: 'kcpe-position-comparison', label: 'KCPE Position Vz Any Exam Comparison', href: '/view-reports/kcpe-position-comparison', iconClass: 'fas fa-arrows-alt-h' }, // Horizontal arrows for comparison
  { id: 'student-position-per-subject-pos-order', label: 'Student Position Per subject(Pos Order)', href: '/view-reports/student-position-per-subject-pos-order', iconClass: 'fas fa-sort-numeric-up' },
  { id: 'student-position-per-subject-adm-no-order', label: 'Student Position Per subject(AdmNo Order)', href: '/view-reports/student-position-per-subject-adm-no-order', iconClass: 'fas fa-sort-numeric-down-alt' },
  { id: 'subject-champions-certificates', label: 'Subject Champions And Certificates', href: '/view-reports/subject-champions-certificates', iconClass: 'fas fa-award' }, // Award icon
  { id: 'view-top-bottom-students', label: 'View Top/Bottom Students', href: '/view-reports/view-top-bottom-students', iconClass: 'fas fa-sort' }, // Sort icon for top/bottom
  { id: 'grade-subject-position-broadsheet', label: 'Grade and Subject Position BroadSheet', href: '/view-reports/grade-subject-position-broadsheet', iconClass: 'fas fa-table' }, // Table icon
  { id: 'view-print-report-forms-end-year', label: 'View/Print Report Forms (End Year)', href: '/view-reports/view-print-report-forms-end-year', iconClass: 'fas fa-print' },
  { id: 'kcpe-marks-report', label: 'KCPE Marks', href: '/view-reports/kcpe-marks-report', iconClass: 'fas fa-calculator' }, // Calculator for marks
  { id: 'view-transcript', label: 'View Transcript', href: '/view-reports/view-transcript', iconClass: 'fas fa-scroll' }, // Scroll/document
  { id: 'set-report-form-to-use', label: 'Set Report Form To Use', href: '/view-reports/set-report-form-to-use', iconClass: 'fas fa-cogs' }, // Cogs for settings
  { id: 'view-print-report-forms', label: 'View/Print Report Forms', href: '/view-reports/view-print-report-forms', iconClass: 'fas fa-file-alt' }, // Generic file icon
  { id: 'report-form-entries-per-subject', label: 'Report Form Entries Per Subject', href: '/view-reports/report-form-entries-per-subject', iconClass: 'fas fa-pen-to-square' }, // Pen for entries
  { id: 'view-end-year-mean-by-points', label: 'View End Year Mean by Points', href: '/view-reports/view-end-year-mean-by-points', iconClass: 'fas fa-chart-bar' }, // Bar chart
  { id: 'view-end-year-mean-by-marks', label: 'View End Year Mean by Marks', href: '/view-reports/view-end-year-mean-by-marks', iconClass: 'fas fa-chart-line' }, // Line chart
];

const ViewReports: React.FC = () => {
  return (
    <div className="w-full max-w-sm bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      
     

      <div className="px-6 py-4 bg-gray-800 text-white text-xl font-semibold text-center">
        View Reports Menu
      </div>

      <nav className="p-2">
        <ul className="divide-y divide-gray-200">
          {viewReportsMenuItems.map((item) => (
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

export default ViewReports;

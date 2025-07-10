// components/AnalysisMenu.tsx

'use client'; // This component will contain interactive elements and use next/link

import React from 'react';
import Link from 'next/link'; // Import Link for client-side navigation

interface MenuItem {
  id: string;
  label: string;
  href: string; // The URL path for Next.js routing
  iconClass?: string; // Font Awesome icon class
  isSectionHeader?: boolean; // To mark items as section headers (none in this list)
  specialClass?: string; // For specific styling
}

const analysisMenuItems: MenuItem[] = [
  { id: 'subject-percent-grade-15-column', label: 'Subject Percent/Grade -15 Column', href: '/analysis/subject-percent-grade-15-column', iconClass: 'fas fa-columns' },
  { id: 'subject-percent-grade-15-column-family', label: 'Subject Percent/Grade -15 Column-(Family)', href: '/analysis/subject-percent-grade-15-column-family', iconClass: 'fas fa-users-viewfinder' }, // New icon from FA6 for groups/family
  { id: 'subject-percent-grade-18-column', label: 'Subject Percent/Grade -18 Column', href: '/analysis/subject-percent-grade-18-column', iconClass: 'fas fa-grip-lines' }, // More columns
  { id: 'subject-percent-grade-20-column', label: 'Subject Percent/Grade -20 Column', href: '/analysis/subject-percent-grade-20-column', iconClass: 'fas fa-table-cells-large' }, // Even more columns
  { id: 'subject-percent-grade-end-year-broad-sheet', label: 'Subject Percent/Grade-(End Year Broad Sheet)', href: '/analysis/subject-percent-grade-end-year-broad-sheet', iconClass: 'fas fa-sheet-plastic' }, // Sheet icon
  { id: 'compare-improvement-dropped-index-marks', label: 'Compare Improvement/Dropped Index by Marks', href: '/analysis/compare-improvement-dropped-index-marks', iconClass: 'fas fa-arrow-trend-up' }, // Trend up
  { id: 'compare-improvement-dropped-index-points', label: 'Compare Improvement/Dropped Index by Points', href: '/analysis/compare-improvement-dropped-index-points', iconClass: 'fas fa-arrow-trend-down' }, // Trend down
  { id: 'compare-subject-improved-index', label: 'Compare Subject Improved Index', href: '/analysis/compare-subject-improved-index', iconClass: 'fas fa-chart-line' }, // Line chart for comparison
  { id: 'ungraded-raw-marks-analysis', label: 'Ungraded Raw Marks Analysis', href: '/analysis/ungraded-raw-marks-analysis', iconClass: 'fas fa-calculator' },
  { id: 'raw-marks-correction-sheet', label: 'Raw Marks (Correction Sheet)', href: '/analysis/raw-marks-correction-sheet', iconClass: 'fas fa-clipboard-check' },
  { id: 'subject-analysis-per-form', label: 'Subject Analysis Per Form', href: '/analysis/subject-analysis-per-form', iconClass: 'fas fa-chart-column' }, // Column chart
  { id: 'subject-analysis-departmental', label: 'Subject Analsis (Departmental)', href: '/analysis/subject-analysis-departmental', iconClass: 'fas fa-building' }, // Building for department
  { id: 'subject-grade-count-analysis', label: 'Subject Grade Count analysis', href: '/analysis/subject-grade-count-analysis', iconClass: 'fas fa-chart-bar' }, // Bar chart for counts
  { id: 'mean-grade-count-analysis-per-exam', label: 'Mean Grade Count analysis Per Exam', href: '/analysis/mean-grade-count-analysis-per-exam', iconClass: 'fas fa-chart-area' }, // Area chart for mean
  { id: 'mean-grade-count-graphical', label: 'Mean Grade Count(Graphical)', href: '/analysis/mean-grade-count-graphical', iconClass: 'fas fa-chart-line' }, // Line graph
  { id: 'house-analysis', label: 'House Analysis', href: '/analysis/house-analysis', iconClass: 'fas fa-chart-gantt' }, // Gantt chart or similar for structure
  { id: 'family-analysis', label: 'Family Analysis', href: '/analysis/family-analysis', iconClass: 'fas fa-family' }, // Family icon
  { id: 'family-analysis-report', label: 'Family Analysis Report', href: '/analysis/family-analysis-report', iconClass: 'fas fa-file-invoice' }, // Report icon
  { id: 'kcse-bar-graph', label: 'KCSE Bar Graph', href: '/analysis/kcse-bar-graph', iconClass: 'fas fa-chart-simple' }, // Simple bar chart
];

const AnalysisMenu: React.FC = () => {
  return (
    <div className="w-full max-w-sm bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      {/* Header section */}
      <div className="px-6 py-4 bg-gray-800 text-white text-xl font-semibold text-center">
        Analysis Menu
      </div>

      <nav className="p-2">
        <ul className="divide-y divide-gray-200">
          {analysisMenuItems.map((item) => (
            <li key={item.id}>
              {item.isSectionHeader ? (
                <div className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 border-b border-gray-200 mt-2 first:mt-0">
                  {item.label}
                </div>
              ) : (
                <Link href={item.href} className={`
                  flex items-center gap-4 px-4 py-3
                  text-gray-800 hover:text-blue-700
                  bg-white hover:bg-blue-50
                  rounded-md transition-all duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  group
                `}>
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
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AnalysisMenu;
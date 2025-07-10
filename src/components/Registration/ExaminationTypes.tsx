// components/Registration/ExaminationTypes.tsx

'use client'; // This component uses React Hooks and handles user interactions.

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation.

// Define interfaces for data structures.
interface ExamType {
  id: string; // Unique ID for each exam type row
  variable: string; // A, B, C, D, E, F
  description: string;
  markedOutOf: number;
  include: boolean; // Should be included in report form?
  sum: boolean; // Should be sum or average?
  marksEntry: boolean; // Should appear in marks entry list?
}

const ExaminationTypesForm: React.FC = () => {
  const router = useRouter();

  // --- Dummy Data ---
  const forms = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];
  const terms = ['1', '2', '3']; // Assuming terms are 1, 2, or 3

  // Initial dummy examination types
  const [examTypes, setExamTypes] = useState<ExamType[]>([
    { id: 'examA', variable: 'A', description: 'CAT 1', markedOutOf: 100, include: true, sum: true, marksEntry: true },
    { id: 'examB', variable: 'B', description: 'CAT 2', markedOutOf: 100, include: true, sum: false, marksEntry: true },
    { id: 'examC', variable: 'C', description: 'cat1', markedOutOf: 100, include: false, sum: false, marksEntry: false },
    { id: 'examD', variable: 'D', description: 'cat2', markedOutOf: 100, include: false, sum: false, marksEntry: false },
    { id: 'examE', variable: 'E', description: 'LUGARI SOUTH B JOINT', markedOutOf: 100, include: false, sum: false, marksEntry: false },
    { id: 'examF', variable: 'F', description: 'ENDTERM', markedOutOf: 100, include: false, sum: false, marksEntry: false },
  ]);

  // Selected form and term
  const [selectedForm, setSelectedForm] = useState<string>('Form 1');
  const [selectedTerm, setSelectedTerm] = useState<string>('1');

  // --- Refs for Keyboard Navigation ---
  const formSelectRef = useRef<HTMLSelectElement>(null);
  const termSelectRef = useRef<HTMLSelectElement>(null);
  const descriptionInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const markedOutOfInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const includeCheckboxRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const sumCheckboxRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const marksEntryCheckboxRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // --- useEffect to set initial focus ---
  useEffect(() => {
    formSelectRef.current?.focus();
  }, []);

  // --- Keyboard Navigation Handler ---
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>,
    nextRef?: React.RefObject<HTMLElement | null>,
    currentRowId?: string, // Used for navigating within table rows
    currentColumnType?: 'description' | 'markedOutOf' | 'include' | 'sum' | 'marksEntry'
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (event.currentTarget.tagName === 'SELECT') {
        // For selects, Enter opens/closes. We'll handle focus movement on change.
        return;
      }

      // Handle navigation within table rows
      if (currentRowId && currentColumnType) {
        const currentIndex = examTypes.findIndex(et => et.id === currentRowId);
        if (currentIndex === -1) return;

        let nextElementRef: React.RefObject<HTMLElement | null> | undefined;

        switch (currentColumnType) {
          case 'description':
            nextElementRef = markedOutOfInputRefs.current[currentRowId] ? { current: markedOutOfInputRefs.current[currentRowId] } : undefined;
            break;
          case 'markedOutOf':
            nextElementRef = includeCheckboxRefs.current[currentRowId] ? { current: includeCheckboxRefs.current[currentRowId] } : undefined;
            break;
          case 'include':
            nextElementRef = sumCheckboxRefs.current[currentRowId] ? { current: sumCheckboxRefs.current[currentRowId] } : undefined;
            break;
          case 'sum':
            nextElementRef = marksEntryCheckboxRefs.current[currentRowId] ? { current: marksEntryCheckboxRefs.current[currentRowId] } : undefined;
            break;
          case 'marksEntry':
            // If it's the last column in the current row, move to the first input of the next row
            if (currentIndex < examTypes.length - 1) {
              const nextRowId = examTypes[currentIndex + 1].id;
              nextElementRef = descriptionInputRefs.current[nextRowId] ? { current: descriptionInputRefs.current[nextRowId] } : undefined;
            } else {
              // If it's the last row, move to the Close button
              nextElementRef = closeButtonRef;
            }
            break;
        }

        if (nextElementRef && nextElementRef.current) {
          setTimeout(() => nextElementRef.current?.focus(), 0); // Use setTimeout for DOM update
          return;
        }
      }

      // General navigation for elements outside the table or if table navigation didn't apply
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else if (event.currentTarget === closeButtonRef.current) {
        handleClose();
      }
    }
  };


  // --- Event Handlers ---

  // `handleInputChange`: Generic handler for text inputs in the table.
  const handleInputChange = (id: string, field: keyof ExamType, value: string | number) => {
    setExamTypes(prevExamTypes =>
      prevExamTypes.map(exam =>
        exam.id === id ? { ...exam, [field]: value } : exam
      )
    );
  };

  // `handleCheckboxChange`: Generic handler for checkboxes in the table.
  const handleCheckboxChange = (id: string, field: keyof ExamType, checked: boolean) => {
    setExamTypes(prevExamTypes =>
      prevExamTypes.map(exam =>
        exam.id === id ? { ...exam, [field]: checked } : exam
      )
    );
  };

  // `handleSave`: Simulates saving the examination types.
  const handleSave = () => {
    console.log('Saving Examination Types (Frontend Only):', examTypes);
    alert('Examination Types Saved (Frontend Only)!');
  };

  // `handleClose`: Navigates back to the previous page.
  const handleClose = () => {
    console.log('Closing Examination Types form.');
    router.back();
  };

  // --- Component JSX (UI Structure and Styling) ---
  return (
    <div className="min-h-screen bg-green-50 p-6 flex items-center justify-center font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl w-full border border-green-200">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center border-b pb-4 border-green-100">
          Examination Types
        </h2>

        {/* Formula Display */}
        <div className="bg-gray-800 text-green-400 p-4 rounded-md mb-6 text-center font-mono text-sm">
          <p className="mb-2">x and v = (I 1 or 2 or 3)</p>
          <p className="font-bold text-lg">ENDTERM TO REPORT FORM = ((A+B+C)/X + D+E+F)/Y</p>
        </div>

        {/* Form and Term Selection */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
          <label htmlFor="formSelect" className="text-gray-700 font-medium">Form:</label>
          <select
            id="formSelect"
            ref={formSelectRef}
            onKeyDown={(e) => handleKeyDown(e, termSelectRef)}
            className="px-3 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white transition duration-150 ease-in-out"
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
          >
            {forms.map(form => (<option key={form} value={form}>{form}</option>))}
          </select>

          <label htmlFor="termSelect" className="text-gray-700 font-medium ml-4">Term:</label>
          <select
            id="termSelect"
            ref={termSelectRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                // After selecting term, move focus to the first description input in the table
                const firstExamTypeId = examTypes[0]?.id;
                if (firstExamTypeId) {
                  setTimeout(() => descriptionInputRefs.current[firstExamTypeId]?.focus(), 0);
                }
              }
            }}
            className="px-3 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white transition duration-150 ease-in-out"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            {terms.map(term => (<option key={term} value={term}>{term}</option>))}
          </select>
        </div>

        {/* Examination Types Table */}
        <div className="border border-green-200 rounded-md overflow-hidden shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-green-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Var.</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Exam Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Marked Out Of</th>
                  {/* FIX: Added text-center to header cells for better alignment with checkboxes */}
                  <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">Include?</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">Sum?</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">Marks Entry?</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-100">
                {examTypes.length > 0 ? (
                  examTypes.map((exam) => (
                    <tr key={exam.id} className="hover:bg-green-50 transition duration-150 ease-in-out">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-bold">{exam.variable}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        <input
                          type="text"
                          ref={el => { descriptionInputRefs.current[exam.id] = el; }}
                          onKeyDown={(e) => handleKeyDown(e, undefined, exam.id, 'description')}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                          value={exam.description}
                          onChange={(e) => handleInputChange(exam.id, 'description', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        <input
                          type="number"
                          ref={el => { markedOutOfInputRefs.current[exam.id] = el; }}
                          onKeyDown={(e) => handleKeyDown(e, undefined, exam.id, 'markedOutOf')}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
                          value={exam.markedOutOf}
                          onChange={(e) => handleInputChange(exam.id, 'markedOutOf', parseInt(e.target.value) || 0)}
                          min="0"
                        />
                      </td>
                      {/* FIX: Ensure flex properties are correct for centering checkboxes */}
                      <td className="px-4 py-3 flex justify-center items-center h-full">
                        <input
                          type="checkbox"
                          ref={el => { includeCheckboxRefs.current[exam.id] = el; }}
                          onKeyDown={(e) => handleKeyDown(e, undefined, exam.id, 'include')}
                          checked={exam.include}
                          onChange={(e) => handleCheckboxChange(exam.id, 'include', e.target.checked)}
                          className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 flex justify-center items-center h-full">
                        <input
                          type="checkbox"
                          ref={el => { sumCheckboxRefs.current[exam.id] = el; }}
                          onKeyDown={(e) => handleKeyDown(e, undefined, exam.id, 'sum')}
                          checked={exam.sum}
                          onChange={(e) => handleCheckboxChange(exam.id, 'sum', e.target.checked)}
                          className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 flex justify-center items-center h-full">
                        <input
                          type="checkbox"
                          ref={el => { marksEntryCheckboxRefs.current[exam.id] = el; }}
                          onKeyDown={(e) => handleKeyDown(e, undefined, exam.id, 'marksEntry')}
                          checked={exam.marksEntry}
                          onChange={(e) => handleCheckboxChange(exam.id, 'marksEntry', e.target.checked)}
                          className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-3 text-gray-500 text-center">No examination types defined.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Explanatory Text */}
        <div className="bg-green-100 text-green-900 p-4 rounded-md border border-green-200 text-sm mb-6">
          <p className="mb-1"><span className="font-bold">INCLUDE</span> Means Should the exam be included in the report form?</p>
          <p className="mb-1"><span className="font-bold">SUM</span> Means Should it be sum or average with the rest?</p>
          <p><span className="font-bold">MARKS ENTRY</span> Means should it appear in the marks entry list?</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-green-100 mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Save
          </button>
          <button
            type="button"
            ref={closeButtonRef}
            onKeyDown={(e) => handleKeyDown(e)}
            onClick={handleClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExaminationTypesForm;
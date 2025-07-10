// components/Registration/SubjectRegistration.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define an interface for a Subject object.
interface Subject {
  id: string;
  code: string;
  abr: string;
  name: string;
  group: number;
}

const SubjectRegistrationForm: React.FC = () => {
  const router = useRouter();

  // --- State Variables ---
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 'sub101', code: '101', abr: 'ENG', name: 'ENGLISH', group: 6 },
    { id: 'sub102', code: '102', abr: 'KIS', name: 'KISWAHILI', group: 2 },
    { id: 'sub121', code: '121', abr: 'MAT', name: 'MATHEMATICS', group: 1 },
    { id: 'sub231', code: '231', abr: 'BIO', name: 'BIOLOGY', group: 3 },
    { id: 'sub232', code: '232', abr: 'PHY', name: 'PHYSICS', group: 3 },
    { id: 'sub233', code: '233', abr: 'CHE', name: 'CHEMISTRY', group: 3 },
    { id: 'sub311', code: '311', abr: 'HIS', name: 'HISTORY & GOVERNMENT', group: 3 },
    { id: 'sub312', code: '312', abr: 'GEO', name: 'GEOGRAPHY', group: 3 },
    { id: 'sub313', code: '313', abr: 'CRE', name: 'C.R.E.', group: 3 },
    { id: 'sub443', code: '443', abr: 'AGR', name: 'AGRICULTURE', group: 3 },
    { id: 'sub565', code: '565', abr: 'BST', name: 'BUSINESS STUDIES', group: 3 },
  ]);

  const [newCode, setNewCode] = useState('');
  const [newAbr, setNewAbr] = useState('');
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState<string>('');

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  // --- Refs for input fields and buttons for keyboard navigation ---
  const codeInputRef = useRef<HTMLInputElement>(null);
  const abrInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const groupInputRef = useRef<HTMLInputElement>(null);
  const addSubjectButtonRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const uppercaseButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // --- useEffect to set initial focus ---
  useEffect(() => {
    codeInputRef.current?.focus(); // Set focus to the first input field on component mount
  }, []);

  // --- Keyboard Navigation Handler ---
  // FIX: Added '| null' to the nextRef parameter type to resolve TypeScript error.
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
    nextRef?: React.RefObject<HTMLInputElement | HTMLButtonElement | null> // Now correctly allows null
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission or newline in input

      if (event.currentTarget === groupInputRef.current) {
        // If Enter is pressed on the Group input, try to add the subject
        const success = handleAddSubject(); // Call the add function
        if (success) {
          codeInputRef.current?.focus(); // If successful, return focus to the Code input for next entry
        }
      } else if (nextRef && nextRef.current) { // Ensure nextRef and its current property exist
        // For other inputs/buttons, move focus to the next specified element
        nextRef.current.focus();
      } else if (event.currentTarget === closeButtonRef.current) {
        // If Enter is pressed on the Close button, trigger its click
        handleClose();
      } else if (event.currentTarget === addSubjectButtonRef.current) {
        // If Enter is pressed on the Add Subject button, trigger its click
        handleAddSubject();
        codeInputRef.current?.focus(); // Return focus to Code input after adding
      } else if (event.currentTarget === deleteButtonRef.current) {
        // If Enter is pressed on the Delete button, trigger its click
        handleDeleteRecord();
      } else if (event.currentTarget === uppercaseButtonRef.current) {
        // If Enter is pressed on the Uppercase button, trigger its click
        handleUppercase();
      }
    }
  };


  // --- Event Handlers ---

  // `handleAddSubject`: Handles adding a new subject. Returns true on success, false on validation error.
  const handleAddSubject = (): boolean => {
    const trimmedCode = newCode.trim();
    const trimmedAbr = newAbr.trim();
    const trimmedName = newName.trim();
    const parsedGroup = parseInt(newGroup.trim(), 10);

    if (trimmedCode === '' || trimmedAbr === '' || trimmedName === '' || isNaN(parsedGroup)) {
      alert('Please fill in all fields correctly (Code, Abr., Subject Name, and a valid Group number) in the last row.');
      return false; // Indicate failure
    }

    if (subjects.some(sub => sub.code === trimmedCode)) {
      alert('Subject with this Code already exists!');
      return false; // Indicate failure
    }
    if (subjects.some(sub => sub.name.toLowerCase() === trimmedName.toLowerCase())) {
      alert('Subject with this Name already exists!');
      return false; // Indicate failure
    }

    const newSubject: Subject = {
      id: `sub${Date.now()}`,
      code: trimmedCode,
      abr: trimmedAbr,
      name: trimmedName,
      group: parsedGroup,
    };

    setSubjects([...subjects, newSubject]);

    // Clear input fields after adding.
    setNewCode('');
    setNewAbr('');
    setNewName('');
    setNewGroup('');
    setSelectedSubjectId(null); // Clear any existing selection.

    // Removed the alert for successful addition as requested.
    console.log(`Subject "${trimmedName}" added (frontend only)!`); // Log to console instead.
    return true; // Indicate success
  };

  const handleDeleteRecord = () => {
    if (selectedSubjectId) {
      const subjectToDelete = subjects.find(sub => sub.id === selectedSubjectId);
      if (subjectToDelete && confirm(`Are you sure you want to delete "${subjectToDelete.name}" (Code: ${subjectToDelete.code})? (Frontend Only)`)) {
        setSubjects(subjects.filter(sub => sub.id !== selectedSubjectId));
        setSelectedSubjectId(null);
        alert(`Subject "${subjectToDelete.name}" deleted (frontend only)!`);
      }
    } else {
      alert('Please select a subject to delete from the table.');
    }
  };

  const handleUppercase = () => {
    if (selectedSubjectId) {
      setSubjects(prevSubjects =>
        prevSubjects.map(sub =>
          sub.id === selectedSubjectId
            ? { ...sub, name: sub.name.toUpperCase(), abr: sub.abr.toUpperCase() }
            : sub
        )
      );
      alert('Subject name and abbreviation converted to uppercase (frontend only)!');
    } else {
      alert('Please select a subject to convert to uppercase from the table.');
    }
  };

  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjectId(prevSelected => (prevSelected === subjectId ? null : subjectId));
  };

  const handleClose = () => {
    console.log('Closing Subject Registration form.');
    router.back();
  };

  // --- Component JSX (UI Structure and Styling) ---
  return (
    <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl w-full border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center border-b pb-4 border-blue-100">
          Subject Registration
        </h2>

        {/* Display area for the list of registered subjects */}
        <div className="border border-blue-200 rounded-md overflow-hidden shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Abr.</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Subject Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Group</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {/* Existing Subjects */}
                {subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <tr
                      key={subject.id}
                      className={`
                        hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out
                        ${selectedSubjectId === subject.id ? 'bg-blue-200 font-medium text-blue-900' : ''}
                      `}
                      onClick={() => handleSelectSubject(subject.id)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{subject.code}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{subject.abr}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{subject.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{subject.group}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-gray-500 text-center">No subjects registered.</td>
                  </tr>
                )}
                {/* Input Row for New Subject */}
                <tr className="bg-blue-50 border-t border-blue-200">
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      ref={codeInputRef}
                      onKeyDown={(e) => handleKeyDown(e, abrInputRef)}
                      placeholder="Code"
                      className="w-full px-2 py-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      ref={abrInputRef}
                      onKeyDown={(e) => handleKeyDown(e, nameInputRef)}
                      placeholder="Abr."
                      className="w-full px-2 py-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newAbr}
                      onChange={(e) => setNewAbr(e.target.value.toUpperCase())} // Auto-uppercase
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      ref={nameInputRef}
                      onKeyDown={(e) => handleKeyDown(e, groupInputRef)}
                      placeholder="Subject Name"
                      className="w-full px-2 py-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value.toUpperCase())} // Auto-uppercase
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      ref={groupInputRef}
                      onKeyDown={(e) => handleKeyDown(e)} // Enter on Group should trigger save
                      placeholder="Group"
                      className="w-full px-2 py-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newGroup}
                      onChange={(e) => setNewGroup(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons:  Delete, Uppercase, Close */}
        <div className="flex justify-end gap-4 pt-4 border-t border-blue-100 mt-6">
          
          <button
            type="button"
            ref={deleteButtonRef}
            onKeyDown={(e) => handleKeyDown(e, uppercaseButtonRef)}
            onClick={handleDeleteRecord}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Delete
          </button>
          <button
            type="button"
            ref={uppercaseButtonRef}
            onKeyDown={(e) => handleKeyDown(e, closeButtonRef)}
            onClick={handleUppercase}
            className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Uppercase
          </button>
          <button
            type="button"
            ref={closeButtonRef}
            onKeyDown={(e) => handleKeyDown(e)} // Enter on Close button will trigger its click
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

export default SubjectRegistrationForm;
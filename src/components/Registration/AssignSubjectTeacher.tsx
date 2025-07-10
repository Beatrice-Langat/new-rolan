/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Registration/AssignSubjectTeacher.tsx

'use client'; // This component uses React Hooks and handles user interactions.

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation.

// Define interfaces for data structures.
interface SubjectAssignment {
  id: string; // Unique ID for each subject assignment row
  subCode: string;
  subjectName: string;
  assignedStaffId: string | null; // ID of the assigned staff member
  initials: string; // Automatically populated initials
}

interface StaffOption {
  id: string;
  name: string;
  initials: string;
}

interface SubjectOption {
  code: string;
  name: string;
}

const AssignSubjectTeacherForm: React.FC = () => {
  const router = useRouter();

  // --- Dummy Data ---
  // Simulated list of staff members for the dropdown.
  const dummyStaffOptions: StaffOption[] = [
    { id: '', name: 'Select Staff', initials: '' }, // Default empty option
    { id: 'stf001', name: 'King George Nabibya', initials: 'K.G' },
    { id: 'stf002', name: 'Nyongesa Peter', initials: 'P.N' },
    { id: 'stf003', name: 'Norah Mulusa', initials: 'N.M' },
    { id: 'stf004', name: 'Elijah Wafula', initials: 'E.W' },
    { id: 'stf005', name: 'Lutiali Hellen', initials: 'H.L' },
    { id: 'stf006', name: 'Benard Juma', initials: 'B.J' },
    { id: 'stf007', name: 'Sharon Kirui', initials: 'S.K' },
    { id: 'stf008', name: 'Lugado Patrick', initials: 'L.P' },
    { id: 'stf009', name: 'Eugine Agesa', initials: 'E.A' },
    { id: 'stf010', name: 'Omoit Anzeemas', initials: 'O.A' },
    { id: 'stf011', name: 'Ruth Njoroge', initials: 'R.N' },
  ];

  // Simulated list of subjects
  const dummySubjectOptions: SubjectOption[] = [
    { code: '102', name: 'KISWAHILI' },
    { code: '121', name: 'MATHEMATICS' },
    { code: '231', name: 'BIOLOGY' },
    { code: '232', name: 'PHYSICS' },
    { code: '233', name: 'CHEMISTRY' },
    { code: '311', name: 'HISTORY & GOVERNMENT' },
    { code: '312', name: 'GEOGRAPHY' },
    { code: '313', name: 'C.R.E.' },
    { code: '443', name: 'AGRICULTURE' },
    { code: '456', name: 'YARAH' }, // Example subject without initial assignment
    { code: '565', name: 'BUSINESS STUDIES' },
  ];

  // --- State Variables ---
  const [formCodes] = useState<string[]>(['1', '2', '3', '4']);
  const [streams] = useState<string[]>(['Green', 'Indigo', 'White', 'Yellow']);
  const [selectedFormCode, setSelectedFormCode] = useState<string>('1');
  const [selectedStream, setSelectedStream] = useState<string>('Yellow');

  // Main state for subject assignments
  const [subjectAssignments, setSubjectAssignments] = useState<SubjectAssignment[]>(() => {
    // Initial dummy assignments based on the image
    return [
      { id: 'assign1', subCode: '102', subjectName: 'KISWAHILI', assignedStaffId: 'stf005', initials: 'H.L' }, // Lutiali Hellen
      { id: 'assign2', subCode: '121', subjectName: 'MATHEMATICS', assignedStaffId: 'stf008', initials: 'L.P' }, // Lugado Patrick
      { id: 'assign3', subCode: '231', subjectName: 'BIOLOGY', assignedStaffId: 'stf002', initials: 'P.N' }, // Nyongesa Peter
      { id: 'assign4', subCode: '232', subjectName: 'PHYSICS', assignedStaffId: 'stf013', initials: 'O.O' }, // Assuming Obed Ondiek for O.O
      { id: 'assign5', subCode: '233', subjectName: 'CHEMISTRY', assignedStaffId: 'stf008', initials: 'L.P' }, // Lugado Patrick
      { id: 'assign6', subCode: '311', subjectName: 'HISTORY & GOVERNMENT', assignedStaffId: 'stf006', initials: 'B.J' }, // Benard Juma
      { id: 'assign7', subCode: '312', subjectName: 'GEOGRAPHY', assignedStaffId: 'stf005', initials: 'H.L' }, // Lutiali Hellen
      { id: 'assign8', subCode: '313', subjectName: 'C.R.E.', assignedStaffId: 'stf004', initials: 'E.W' }, // Elijah Wafula
      { id: 'assign9', subCode: '443', subjectName: 'AGRICULTURE', assignedStaffId: 'stf009', initials: 'E.A' }, // Eugine Agesa
      { id: 'assign10', subCode: '456', subjectName: 'YARAH', assignedStaffId: null, initials: '' }, // No teacher assigned
      { id: 'assign11', subCode: '565', subjectName: 'BUSINESS STUDIES', assignedStaffId: 'stf011', initials: 'R.N' }, // Ruth Njoroge
      // Add more subjects from dummySubjectOptions as unassigned if they are not in the initial list
      ...dummySubjectOptions
        .filter(sub => !['102', '121', '231', '232', '233', '311', '312', '313', '443', '456', '565'].includes(sub.code))
        .map(sub => ({
          id: `assign${Date.now()}-${sub.code}`,
          subCode: sub.code,
          subjectName: sub.name,
          assignedStaffId: null,
          initials: ''
        }))
    ].reduce((acc: SubjectAssignment[], current) => {
      // Ensure unique subjects by code
      if (!acc.some(item => item.subCode === current.subCode)) {
        acc.push(current);
      }
      return acc;
    }, []);
  });


  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null); // For row selection

  // --- Refs for keyboard navigation ---
  const formCodeSelectRef = useRef<HTMLSelectElement>(null);
  const streamSelectRef = useRef<HTMLSelectElement>(null);
  const staffSelectRefs = useRef<{ [key: string]: HTMLSelectElement | null }>({}); // Dynamic refs for staff dropdowns
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstRecordButtonRef = useRef<HTMLButtonElement>(null);
  const prevRecordButtonRef = useRef<HTMLButtonElement>(null);
  const nextRecordButtonRef = useRef<HTMLButtonElement>(null);
  const lastRecordButtonRef = useRef<HTMLButtonElement>(null);

  // --- Record Navigation State ---
  const [currentRecordIndex, setCurrentRecordIndex] = useState(0);

  // Filtered assignments based on form and stream (though not directly used in this UI, kept for consistency)
  const filteredAssignments = useMemo(() => {
    // In this specific UI, the table shows all subjects regardless of form/stream.
    // If you had a mechanism to filter subjects by form/stream, this is where you'd apply it.
    // For now, it just returns all subjectAssignments.
    return subjectAssignments;
  }, [subjectAssignments]);

  // --- useEffect to set initial focus ---
  useEffect(() => {
    formCodeSelectRef.current?.focus();
  }, []);

  // --- Keyboard Navigation Handler ---
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>,
    nextRef?: React.RefObject<HTMLElement | null>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      // Special handling for select elements: Enter should not move focus immediately
      if (event.currentTarget.tagName === 'SELECT') {
        return; // Let the default select behavior handle opening/closing
      }

      // General navigation for inputs and buttons
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else if (event.currentTarget === closeButtonRef.current) {
        handleClose();
      } else if (event.currentTarget === deleteButtonRef.current) {
        handleDeleteAssignment();
      }
      // Add other button handlers if needed for Enter key
    }
  };

  // --- Event Handlers ---

  // `handleStaffAssignmentChange`: Updates the assigned staff and initials for a subject.
  const handleStaffAssignmentChange = (assignmentId: string, staffId: string) => {
    setSubjectAssignments(prevAssignments =>
      prevAssignments.map(assignment => {
        if (assignment.id === assignmentId) {
          const selectedStaff = dummyStaffOptions.find(s => s.id === staffId);
          return {
            ...assignment,
            assignedStaffId: staffId || null,
            initials: selectedStaff ? selectedStaff.initials : '',
          };
        }
        return assignment;
      })
    );

    // After changing a dropdown, move focus to the next one
    const currentIndex = filteredAssignments.findIndex(item => item.id === assignmentId);
    if (currentIndex !== -1 && currentIndex < filteredAssignments.length - 1) {
      const nextAssignmentId = filteredAssignments[currentIndex + 1].id;
      setTimeout(() => staffSelectRefs.current[nextAssignmentId]?.focus(), 0);
    } else {
      // If it's the last dropdown, move focus to the delete button
      setTimeout(() => deleteButtonRef.current?.focus(), 0);
    }
  };

  // `handleDeleteAssignment`: Deletes the currently selected subject assignment.
  const handleDeleteAssignment = () => {
    if (selectedAssignmentId) {
      const assignmentToDelete = subjectAssignments.find(a => a.id === selectedAssignmentId);
      if (assignmentToDelete && confirm(`Are you sure you want to delete the assignment for "${assignmentToDelete.subjectName}"? (Frontend Only)`)) {
        setSubjectAssignments(subjectAssignments.filter(a => a.id !== selectedAssignmentId));
        setSelectedAssignmentId(null);
        alert(`Assignment for "${assignmentToDelete.subjectName}" deleted (frontend only)!`);
      }
    } else {
      alert('Please select a subject assignment row to delete.');
    }
  };

  // `handleSave`: Simulates saving all assignments.
  const handleSave = () => {
    console.log('Saving Subject Teacher Assignments (Frontend Only):', subjectAssignments);
    alert('Subject Teacher Assignments Saved (Frontend Only)!');
  };

  // `handleClose`: Navigates back to the previous page.
  const handleClose = () => {
    console.log('Closing Assign Subject Teacher form.');
    router.back();
  };

  // --- Record Navigation Handlers ---
  const handleFirstRecord = () => {
    if (filteredAssignments.length > 0) {
      setCurrentRecordIndex(0);
      setSelectedAssignmentId(filteredAssignments[0].id);
    }
  };

  const handlePrevRecord = () => {
    if (currentRecordIndex > 0) {
      setCurrentRecordIndex(prev => prev - 1);
      setSelectedAssignmentId(filteredAssignments[currentRecordIndex - 1].id);
    }
  };

  const handleNextRecord = () => {
    if (currentRecordIndex < filteredAssignments.length - 1) {
      setCurrentRecordIndex(prev => prev + 1);
      setSelectedAssignmentId(filteredAssignments[currentRecordIndex + 1].id);
    }
  };

  const handleLastRecord = () => {
    if (filteredAssignments.length > 0) {
      setCurrentRecordIndex(filteredAssignments.length - 1);
      setSelectedAssignmentId(filteredAssignments[filteredAssignments.length - 1].id);
    }
  };

  // --- Component JSX (UI Structure and Styling) ---
  return (
    <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-5xl w-full border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center border-b pb-4 border-blue-100">
          Assign Subject Teacher
        </h2>

        {/* Form Code and Stream Selection */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
          <label htmlFor="formCodeSelect" className="text-gray-700 font-medium">Form Code:</label>
          <select
            id="formCodeSelect"
            ref={formCodeSelectRef}
            onKeyDown={(e) => handleKeyDown(e, streamSelectRef)}
            className="px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition duration-150 ease-in-out"
            value={selectedFormCode}
            onChange={(e) => setSelectedFormCode(e.target.value)}
          >
            {formCodes.map(code => (<option key={code} value={code}>{code}</option>))}
          </select>

          <label htmlFor="streamSelect" className="text-gray-700 font-medium ml-4">Stream:</label>
          <select
            id="streamSelect"
            ref={streamSelectRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                // After selecting stream, move focus to the first staff dropdown
                const firstStaffSelectId = filteredAssignments[0]?.id;
                if (firstStaffSelectId) {
                  setTimeout(() => staffSelectRefs.current[firstStaffSelectId]?.focus(), 0);
                }
              }
            }}
            className="px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition duration-150 ease-in-out"
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
          >
            {streams.map(stream => (<option key={stream} value={stream}>{stream}</option>))}
          </select>
        </div>

        {/* Subject Assignment Table */}
        <div className="border border-blue-200 rounded-md overflow-hidden shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Sub_Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Subject Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Staff</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Initials</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment, _index) => (
                    <tr
                      key={assignment.id}
                      className={`
                        hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out
                        ${selectedAssignmentId === assignment.id ? 'bg-blue-200 font-medium text-blue-900' : ''}
                      `}
                      onClick={() => setSelectedAssignmentId(assignment.id)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{assignment.subCode}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{assignment.subjectName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        <select
                          ref={el => { staffSelectRefs.current[assignment.id] = el; }} // Dynamic ref
                          value={assignment.assignedStaffId || ''}
                          onChange={(e) => handleStaffAssignmentChange(assignment.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              // Move focus to the next staff select or the delete button
                              const currentIndex = filteredAssignments.findIndex(item => item.id === assignment.id);
                              if (currentIndex !== -1 && currentIndex < filteredAssignments.length - 1) {
                                const nextAssignmentId = filteredAssignments[currentIndex + 1].id;
                                setTimeout(() => staffSelectRefs.current[nextAssignmentId]?.focus(), 0);
                              } else {
                                setTimeout(() => deleteButtonRef.current?.focus(), 0);
                              }
                            }
                          }}
                          className="w-full px-2 py-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                        >
                          {dummyStaffOptions.map(staff => (
                            <option key={staff.id} value={staff.id}>{staff.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        <input
                          type="text"
                          readOnly
                          className="w-full px-2 py-1 border border-gray-200 rounded-md bg-gray-50 text-sm"
                          value={assignment.initials}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-center text-gray-500 text-sm">No subjects available for assignment.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Record Navigation */}
        <div className="flex items-center justify-center gap-4 text-gray-700 mb-6">
          <button
            ref={firstRecordButtonRef}
            onKeyDown={(e) => handleKeyDown(e, prevRecordButtonRef)}
            onClick={handleFirstRecord}
            disabled={currentRecordIndex === 0}
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;&lt;
          </button>
          <button
            ref={prevRecordButtonRef}
            onKeyDown={(e) => handleKeyDown(e, nextRecordButtonRef)}
            onClick={handlePrevRecord}
            disabled={currentRecordIndex === 0}
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>
          <span>Record: {currentRecordIndex + 1} of {filteredAssignments.length}</span>
          <button
            ref={nextRecordButtonRef}
            onKeyDown={(e) => handleKeyDown(e, lastRecordButtonRef)}
            onClick={handleNextRecord}
            disabled={currentRecordIndex === filteredAssignments.length - 1}
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
          <button
            ref={lastRecordButtonRef}
            onKeyDown={(e) => handleKeyDown(e, deleteButtonRef)} // After last record, go to Delete button
            onClick={handleLastRecord}
            disabled={currentRecordIndex === filteredAssignments.length - 1}
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;&gt;
          </button>
        </div>

        {/* Action Buttons: Delete, Close */}
        <div className="flex justify-end gap-4 pt-4 border-t border-blue-100 mt-6">

        <button
            type="button"
            onClick={handleSave}
            // FIX: Changed background and hover colors to green
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Save
          </button>


          <button
            type="button"
            ref={deleteButtonRef}
            onKeyDown={(e) => handleKeyDown(e, closeButtonRef)}
            onClick={handleDeleteAssignment}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Delete
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

export default AssignSubjectTeacherForm;
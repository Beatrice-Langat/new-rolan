// components/Registration/AssignClassTeachers.tsx

'use client'; // This component uses React Hooks and handles user interactions.

import React, { useState, useRef, useEffect } from 'react'; // Correct import for useState, useRef, useEffect
import { useRouter } from 'next/navigation'; // For programmatic navigation.

// Define interfaces for data structures.
interface FormStream {
  id: string; // Unique ID for each Form-Stream combination.
  form: string;
  stream: string;
  assignedTeacherId: string | null; // ID of the assigned staff member, or null if none.
}

interface StaffOption {
  id: string;
  name: string;
}

const AssignClassTeachersForm: React.FC = () => {
  const router = useRouter();

  // --- Dummy Data ---
  // Simulated list of staff members for the dropdown.
  const dummyStaffOptions: StaffOption[] = [
    { id: '', name: 'Select Teacher' }, // Default empty option
    { id: 'stf001', name: 'King George Nabibya' },
    { id: 'stf002', name: 'Nyongesa Peter' },
    { id: 'stf003', name: 'Norah Mulusa' },
    { id: 'stf004', name: 'Elijah Wafula' }, // Teacher assigned in image
    { id: 'stf005', name: 'Lutiali Hellen' }, // Teacher assigned in image
    { id: 'stf006', name: 'Benard Juma' },
    { id: 'stf007', name: 'Sharon Kirui' },
  ];

  // Simulated list of Form-Stream combinations with initial assignments.
  const [formStreams, setFormStreams] = useState<FormStream[]>([
    { id: 'fs1G', form: '1', stream: 'Green', assignedTeacherId: 'stf004' }, // Elijah Wafula
    { id: 'fs1I', form: '1', stream: 'Indigo', assignedTeacherId: null },
    { id: 'fs1W', form: '1', stream: 'White', assignedTeacherId: null },
    { id: 'fs1Y', form: '1', stream: 'Yellow', assignedTeacherId: 'stf005' }, // Lutiali Hellen
    { id: 'fs2G', form: '2', stream: 'Green', assignedTeacherId: 'stf004' }, // Elijah Wafula
    { id: 'fs2I', form: '2', stream: 'Indigo', assignedTeacherId: null },
    { id: 'fs2W', form: '2', stream: 'White', assignedTeacherId: null },
    { id: 'fs2Y', form: '2', stream: 'Yellow', assignedTeacherId: 'stf005' }, // Lutiali Hellen
    // Add more as needed
  ]);

  // States for the additional school details.
  const [schoolClosingDate, setSchoolClosingDate] = useState('20/04/2023');
  const [schoolOpeningDate, setSchoolOpeningDate] = useState('09/05/2023');
  const [principalHMName, setPrincipalHMName] = useState('MR. MARK CHEMWENO');
  const [principalHMSignature, setPrincipalHMSignature] = useState('');

  // --- Refs for keyboard navigation ---
  // Using a dynamic ref object to store refs for each select element
  const teacherSelectRefs = useRef<{ [key: string]: HTMLSelectElement | null }>({});
  const closingDateRef = useRef<HTMLInputElement>(null);
  const openingDateRef = useRef<HTMLInputElement>(null);
  const principalNameRef = useRef<HTMLInputElement>(null);
  const principalSignatureRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // --- useEffect to set initial focus ---
  useEffect(() => {
    // Focus the first teacher dropdown or the first date input if no dropdowns
    const firstSelectId = formStreams[0]?.id;
    if (firstSelectId && teacherSelectRefs.current[firstSelectId]) {
      teacherSelectRefs.current[firstSelectId]?.focus();
    } else {
      closingDateRef.current?.focus();
    }
  }, [formStreams]); // Dependency array includes formStreams to re-evaluate focus on data change

  // --- Keyboard Navigation Handler ---
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>,
    nextRef?: React.RefObject<HTMLElement | null> // Use HTMLElement for general focusable elements
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission

      // If it's a select element, pressing Enter should not move focus immediately
      // but rather open/close the dropdown. We'll handle navigation after it has changed.
      if (event.currentTarget.tagName === 'SELECT') {
        // For select elements, Enter typically opens/closes.
        // We'll let the onChange handler (which fires after selection) manage focus change.
        return;
      }

      // General navigation for input fields and buttons
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else if (event.currentTarget === principalSignatureRef.current) {
        // After the last input field, move to the Close button
        closeButtonRef.current?.focus();
      } else if (event.currentTarget === closeButtonRef.current) {
        handleClose(); // Trigger close action if Enter is pressed on Close button
      }
    }
  };

  // --- Event Handlers ---

  // `handleTeacherAssignmentChange`: Updates the assigned teacher for a specific Form-Stream.
  const handleTeacherAssignmentChange = (formStreamId: string, staffId: string) => {
    setFormStreams(prevFormStreams =>
      prevFormStreams.map(fs =>
        fs.id === formStreamId ? { ...fs, assignedTeacherId: staffId || null } : fs
      )
    );
    console.log(`Assigned teacher ${staffId} to Form-Stream ID: ${formStreamId}`);

    // Logic to move focus to the next dropdown or the first date input after a selection is made
    const currentIndex = formStreams.findIndex(fs => fs.id === formStreamId);
    if (currentIndex !== -1) { // Ensure the current item was found
      if (currentIndex < formStreams.length - 1) {
        const nextFormStreamId = formStreams[currentIndex + 1].id;
        // Use setTimeout to allow the DOM to update before trying to focus
        setTimeout(() => teacherSelectRefs.current[nextFormStreamId]?.focus(), 0);
      } else {
        // If it's the last dropdown, move focus to the first date input
        setTimeout(() => closingDateRef.current?.focus(), 0);
      }
    }
  };

  // `handleSave`: Simulates saving all the assignments and details.
  const handleSave = () => {
    console.log('Saving Class Teacher Assignments and School Details (Frontend Only):', {
      formStreamAssignments: formStreams.map(fs => ({
        form: fs.form,
        stream: fs.stream,
        assignedTeacher: dummyStaffOptions.find(s => s.id === fs.assignedTeacherId)?.name || 'None',
      })),
      schoolClosingDate,
      schoolOpeningDate,
      principalHMName,
      principalHMSignature,
    });
    alert('Class Teacher Assignments and School Details Saved (Frontend Only)!'); // Use custom modal
  };

  // `handleClose`: Navigates back to the previous page.
  const handleClose = () => {
    console.log('Closing Assign Class Teachers form.');
    router.back();
  };

  // --- Component JSX (UI Structure and Styling) ---
  return (
    <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl w-full border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center border-b pb-4 border-blue-100">
          Report Forms Class Teachers
        </h2>

        {/* Table for Form-Stream and Staff Code Assignment */}
        <div className="border border-blue-200 rounded-md overflow-hidden shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Form</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Stream</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Staff Code</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {formStreams.length > 0 ? (
                  formStreams.map((fs) => (
                    <tr key={fs.id} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{fs.form}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{fs.stream}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        <select
                          // FIX: Changed ref callback to explicitly return void.
                          ref={el => { teacherSelectRefs.current[fs.id] = el; }}
                          value={fs.assignedTeacherId || ''}
                          onChange={(e) => handleTeacherAssignmentChange(fs.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              // Move focus to the next select or the first date input
                              const currentIndex = formStreams.findIndex(item => item.id === fs.id);
                              if (currentIndex !== -1 && currentIndex < formStreams.length - 1) {
                                const nextFormStreamId = formStreams[currentIndex + 1].id;
                                // Use setTimeout to allow the DOM to update before trying to focus
                                setTimeout(() => teacherSelectRefs.current[nextFormStreamId]?.focus(), 0);
                              } else {
                                setTimeout(() => closingDateRef.current?.focus(), 0);
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-gray-500 text-center">No form-stream combinations available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* School Closing/Opening Dates and Principal Details */}
        <div className="bg-green-100 p-6 rounded-md border border-green-200 space-y-4 text-green-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <label htmlFor="schoolClosingDate" className="font-medium">School Closing Date:</label>
            <input
              type="text"
              id="schoolClosingDate"
              ref={closingDateRef}
              onKeyDown={(e) => handleKeyDown(e, openingDateRef)}
              className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
              value={schoolClosingDate}
              onChange={(e) => setSchoolClosingDate(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <label htmlFor="schoolOpeningDate" className="font-medium">School Opening Date:</label>
            <input
              type="text"
              id="schoolOpeningDate"
              ref={openingDateRef}
              onKeyDown={(e) => handleKeyDown(e, principalNameRef)}
              className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
              value={schoolOpeningDate}
              onChange={(e) => setSchoolOpeningDate(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <label htmlFor="principalHMName" className="font-medium">Principal/HM Name:</label>
            <input
              type="text"
              id="principalHMName"
              ref={principalNameRef}
              onKeyDown={(e) => handleKeyDown(e, principalSignatureRef)}
              className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
              value={principalHMName}
              onChange={(e) => setPrincipalHMName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <label htmlFor="principalHMSignature" className="font-medium">Principal/HM Signature:</label>
            <input
              type="text"
              id="principalHMSignature"
              ref={principalSignatureRef}
              onKeyDown={(e) => handleKeyDown(e, closeButtonRef)} // After last input, go to Close button
              className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white"
              value={principalHMSignature}
              onChange={(e) => setPrincipalHMSignature(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-blue-100 mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Save
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

export default AssignClassTeachersForm;
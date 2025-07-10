// components/Registration/StaffDetails.tsx

'use client'; // This component uses React Hooks and handles user interactions.

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation.

// Define an interface for a Staff member object.
interface Staff {
  id: string; // Unique ID for each staff member.
  code: string;
  name: string; // Staff Name.
  initials: string;
  password: string; // Stores the actual password.
  allChecked: boolean; // Now represents if this specific staff member is selected.
}

const StaffDetailsForm: React.FC = () => {
  const router = useRouter();

  // --- State Variables ---

  // `staffMembers`: An array holding all dummy staff data.
  // Initialize `allChecked` to false for all existing members by default.
  const [staffMembers, setStaffMembers] = useState<Staff[]>([
    { id: 'stf001', code: '001', name: 'King George Nabibya', initials: 'K.G', password: 'pass123', allChecked: false },
    { id: 'stf002', code: '002', name: 'Nyongesa Peter', initials: 'P.N', password: 'pass456', allChecked: false },
    { id: 'stf003', code: '003', name: 'Norah Mulusa', initials: 'N.M', password: 'pass789', allChecked: false },
    { id: 'stf004', code: '004', name: 'Jacob Khisa', initials: 'J.K', password: 'pass101', allChecked: false },
    { id: 'stf005', code: '005', name: 'Lutiali Hellen', initials: 'H.L', password: 'pass112', allChecked: false },
    { id: 'stf006', code: '006', name: 'Benard Juma', initials: 'B.J', password: 'pass131', allChecked: false },
    { id: 'stf007', code: '007', name: 'Sharon Kirui', initials: 'S.K', password: 'pass414', allChecked: true }, // Example: pre-checked
    { id: 'stf008', code: '008', name: 'Lugado Patrick', initials: 'L.P', password: 'pass515', allChecked: false },
    { id: 'stf009', code: '009', name: 'Eugine Agesa', initials: 'E.A', password: 'pass616', allChecked: false },
    { id: 'stf010', code: '010', name: 'Omoit Anzeemas', initials: 'O.A', password: 'pass717', allChecked: false },
    { id: 'stf011', code: '011', name: 'Pauline Rakama', initials: 'P.R', password: 'pass818', allChecked: true }, // Example: pre-checked
    { id: 'stf012', code: '012', name: 'Ben Erick Omito', initials: 'B.E.O', password: 'pass919', allChecked: false },
    { id: 'stf013', code: '013', name: 'Obed Ondiek', initials: 'O.O', password: 'pass202', allChecked: false },
    { id: 'stf014', code: '014', name: 'Elijah Wafula', initials: 'E.W', password: 'pass212', allChecked: true }, // Example: pre-checked
    { id: 'stf015', code: '015', name: 'Timothy Imbanga', initials: 'T.I', password: 'pass232', allChecked: false },
    { id: 'stf016', code: '016', name: 'Ruth Njoroge', initials: 'R.N', password: 'pass242', allChecked: false },
  ]);

  // States for the input fields in the "new staff" row.
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newInitials, setNewInitials] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAllChecked, setNewAllChecked] = useState(false); // State for the new entry's 'All' checkbox

  // `selectedStaffId`: This state is now less critical for individual actions,
  // as actions will be based on the `allChecked` status of each staff member.
  // Keeping it for consistent row highlighting if desired, but not for action targeting.
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

  // --- Refs for input fields and buttons for keyboard navigation ---
  const codeInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const initialsInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const newEntryAllCheckboxRef = useRef<HTMLInputElement>(null); // Ref for the checkbox in the NEW entry row
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const printButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // --- useEffect to set initial focus ---
  useEffect(() => {
    codeInputRef.current?.focus(); // Set focus to the first input field on component mount
  }, []);

  // --- Keyboard Navigation Handler ---
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
    nextRef?: React.RefObject<HTMLInputElement | HTMLButtonElement | null> // Allows null for refs
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission or newline in input

      // Special handling for the last input field in the new entry row (the 'All' checkbox)
      if (event.currentTarget === newEntryAllCheckboxRef.current) {
        // Toggle checkbox state on Enter for the new entry
        setNewAllChecked(prev => !prev);
        // Attempt to add staff
        const success = handleAddStaff();
        if (success) {
          codeInputRef.current?.focus(); // If successful, return focus to Code input for next entry
        } else {
          // If add fails (e.g., validation), keep focus on the Code input to allow correction
          codeInputRef.current?.focus();
        }
      } else if (nextRef && nextRef.current) {
        nextRef.current.focus(); // Move focus to the next element
      }
      // Handle Enter on buttons
      else if (event.currentTarget === deleteButtonRef.current) {
        handleDeleteRecord();
      } else if (event.currentTarget === printButtonRef.current) {
        handlePrint();
      } else if (event.currentTarget === closeButtonRef.current) {
        handleClose();
      }
    }
  };

  // --- Event Handlers ---

  // `handleAddStaff`: Handles adding a new staff member. Returns true on success, false on validation error.
  const handleAddStaff = (): boolean => {
    const trimmedCode = newCode.trim();
    const trimmedName = newName.trim();
    const trimmedInitials = newInitials.trim();
    const trimmedPassword = newPassword.trim();

    if (trimmedCode === '' || trimmedName === '' || trimmedInitials === '') {
      alert('Please fill in Code, Staff Name, and Initials.');
      return false;
    }

    if (staffMembers.some(staff => staff.code === trimmedCode)) {
      alert('Staff member with this Code already exists!');
      return false;
    }

    const newStaff: Staff = {
      id: `stf${Date.now()}`, // Unique ID for frontend demo.
      code: trimmedCode,
      name: trimmedName,
      initials: trimmedInitials,
      password: trimmedPassword, // Store actual password
      allChecked: newAllChecked, // Use the state of the new entry's checkbox
    };

    setStaffMembers([...staffMembers, newStaff]);

    // Clear input fields after adding.
    setNewCode('');
    setNewName('');
    setNewInitials('');
    setNewPassword('');
    setNewAllChecked(false); // Reset checkbox for next entry
    setSelectedStaffId(null); // Clear any existing selection.

    console.log(`Staff member "${trimmedName}" added (frontend only)!`);
    return true;
  };

  // `handleDeleteRecord`: Now deletes ALL selected staff members.
  const handleDeleteRecord = () => {
    const selectedStaff = staffMembers.filter(staff => staff.allChecked);
    if (selectedStaff.length === 0) {
      alert('Please select at least one staff member to delete using the "All" checkboxes.');
      return;
    }

    const confirmMessage = `Are you sure you want to delete ${selectedStaff.length} selected staff member(s)? (Frontend Only)`;
    if (confirm(confirmMessage)) { // Use confirm for frontend-only, replace with custom modal
      setStaffMembers(staffMembers.filter(staff => !staff.allChecked)); // Keep only unselected staff
      setSelectedStaffId(null); // Clear any row highlighting
      alert(`${selectedStaff.length} staff member(s) deleted (frontend only)!`);
    }
  };

  // `handlePrint`: Now prints details for ALL selected staff members.
  const handlePrint = () => {
    const selectedStaff = staffMembers.filter(staff => staff.allChecked);
    if (selectedStaff.length === 0) {
      alert('Please select at least one staff member to print using the "All" checkboxes.');
      return;
    }

    const staffNames = selectedStaff.map(s => s.name).join(', ');
    console.log(`Triggering browser print dialog for selected staff: ${staffNames}`);
    // In a real app, you might generate a print-friendly report for these specific staff.
    // For this demo, window.print() will print the current view.
    alert(`Simulating print for: ${staffNames} (Frontend Only)!`); // Use custom modal
    window.print();
  };

  // `handleToggleAllChecked`: Toggles the 'allChecked' status for a specific staff member.
  const handleToggleAllChecked = (id: string) => {
    setStaffMembers(prevStaff =>
      prevStaff.map(staff =>
        staff.id === id ? { ...staff, allChecked: !staff.allChecked } : staff
      )
    );
  };

  // `handleSelectStaff`: Toggles the selection of a staff member for row highlighting.
  // This is separate from the 'allChecked' for multi-selection.
  const handleSelectStaff = (staffId: string) => {
    setSelectedStaffId(prevSelected => (prevSelected === staffId ? null : staffId));
  };

  // `handleClose`: Navigates back to the previous page.
  const handleClose = () => {
    console.log('Closing Staff Details form.');
    router.back();
  };

  // --- Component JSX (UI Structure and Styling) ---
  return (
    <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-5xl w-full border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center border-b pb-4 border-blue-100">
          Staff Details
        </h2>

        {/* Display area for the list of staff members */}
        <div className="border border-blue-200 rounded-md overflow-hidden shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Staff Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Initials</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Password</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">All</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {/* Existing Staff Members */}
                {staffMembers.length > 0 ? (
                  staffMembers.map((staff) => (
                    <tr
                      key={staff.id}
                      // Apply row highlighting based on selectedStaffId (optional, separate from checkbox)
                      className={`
                        hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out
                        ${selectedStaffId === staff.id ? 'bg-blue-200 font-medium text-blue-900' : ''}
                      `}
                      onClick={() => handleSelectStaff(staff.id)} // For single row selection/highlighting
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{staff.code}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{staff.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{staff.initials}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        {staff.password ? '***' : ''}
                      </td>
                      <td className="px-4 py-3 flex justify-center items-center h-full">
                        <input
                          type="checkbox"
                          checked={staff.allChecked}
                          onChange={() => handleToggleAllChecked(staff.id)} // Toggle individual checkbox
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-3 text-gray-500 text-center">No staff members registered.</td>
                  </tr>
                )}
                {/* Input Row for New Staff Member */}
                <tr className="bg-blue-50 border-t border-blue-200">
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      ref={codeInputRef}
                      onKeyDown={(e) => handleKeyDown(e, nameInputRef)}
                      placeholder="Code"
                      className="w-full px-2 py-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      ref={nameInputRef}
                      onKeyDown={(e) => handleKeyDown(e, initialsInputRef)}
                      placeholder="Staff Name"
                      className="w-full px-2 py-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      ref={initialsInputRef}
                      onKeyDown={(e) => handleKeyDown(e, passwordInputRef)}
                      placeholder="Initials"
                      className="w-full px-2 py-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newInitials}
                      onChange={(e) => setNewInitials(e.target.value.toUpperCase())}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="password"
                      ref={passwordInputRef}
                      onKeyDown={(e) => handleKeyDown(e, newEntryAllCheckboxRef)} // Navigate to new entry checkbox
                      placeholder="Password"
                      className="w-full px-2 py-1 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-3 flex justify-center items-center h-full">
                    <input
                      type="checkbox"
                      ref={newEntryAllCheckboxRef} // This ref is for the new entry's checkbox
                      onKeyDown={(e) => handleKeyDown(e, deleteButtonRef)} // After new entry, navigate to delete button
                      checked={newAllChecked}
                      onChange={(e) => setNewAllChecked(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Record Navigation (simplified) */}
        <div className="flex items-center justify-center gap-4 text-gray-700 mb-6">
          <span>Record: 1 of {staffMembers.length}</span>
        </div>

        {/* Action Buttons: Delete, Print, Close */}
        <div className="flex justify-end gap-4 pt-4 border-t border-blue-100 mt-6">
          <button
            type="button"
            ref={deleteButtonRef}
            onKeyDown={(e) => handleKeyDown(e, printButtonRef)}
            onClick={handleDeleteRecord} // This now deletes selected items
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Delete 
          </button>
          <button
            type="button"
            ref={printButtonRef}
            onKeyDown={(e) => handleKeyDown(e, closeButtonRef)}
            onClick={handlePrint} // This now prints selected items
            className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            <i className="fas fa-print"></i> Print
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

export default StaffDetailsForm;
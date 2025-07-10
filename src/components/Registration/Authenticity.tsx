// components/Registration/Authenticity.tsx

'use client'; // This component uses React Hooks and handles user interactions.

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation.

const AuthenticityForm: React.FC = () => {
  const router = useRouter();

  // --- State Variables ---
  const [authenticityKey, setAuthenticityKey] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Academics'); // Default selected department

  // Dummy data for display
  const schoolLicenseNumber = '3914951853';
  const vendorPhone1 = '0721 158 433';
  const vendorPhone2 = '0734 289 443';
  const vendorEmail = 'rolanschool@gmail.com';

  const departments = ['Academics', 'Finance', 'SMS']; // Options for the department dropdown

  // --- Refs for Keyboard Navigation ---
  const authenticityKeyRef = useRef<HTMLInputElement>(null);
  const departmentSelectRef = useRef<HTMLSelectElement>(null);
  const okButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // --- useEffect to set initial focus ---
  useEffect(() => {
    authenticityKeyRef.current?.focus();
  }, []);

  // --- Keyboard Navigation Handler ---
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>,
    nextRef?: React.RefObject<HTMLElement | null>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (event.currentTarget.tagName === 'SELECT') {
        // For selects, Enter opens/closes. We'll handle focus movement on change.
        return;
      }

      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else if (event.currentTarget === okButtonRef.current) {
        handleOk();
      } else if (event.currentTarget === cancelButtonRef.current) {
        handleCancel();
      }
    }
  };

  // --- Event Handlers ---

  // `handleOk`: Handles the "Ok" button click (authenticity check).
  const handleOk = () => {
    // Basic frontend validation for demonstration purposes
    const expectedKey = 'ROLAN123'; // Example authenticity key
    if (authenticityKey.trim() === expectedKey) {
      alert(`Program unlocked for ${selectedDepartment} using key: ${authenticityKey}! (Frontend Only)`);
      console.log(`Authenticity check successful for Department: ${selectedDepartment}, Key: ${authenticityKey}`);
      // In a real app, you'd integrate with a backend to unlock features.
      router.back(); // Navigate back after successful activation
    } else {
      alert('Invalid Authenticity Key. Please contact the vendor.');
      console.warn(`Authenticity check failed for Department: ${selectedDepartment}, Key: ${authenticityKey}`);
      authenticityKeyRef.current?.focus(); // Re-focus for correction
    }
  };

  // `handleCancel`: Handles the "Cancel" button click.
  const handleCancel = () => {
    console.log('Authenticity check cancelled.');
    router.back(); // Navigate back to the previous page
  };

  // --- Component JSX (UI Structure and Styling) ---
  return (
    <div className="min-h-screen bg-cyan-500 p-6 flex items-center justify-center font-inter"> {/* Cyan background as per image */}
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full border border-cyan-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4 border-gray-200">
          Rolan School Manager® Ver. 7.0.24
        </h2>

        {/* Vendor Contact Information */}
        <div className="bg-cyan-700 text-white p-4 rounded-md mb-6 text-center shadow-md">
          <p className="text-lg font-semibold mb-2">For Authenticity Key Please Call the Vendor</p>
          <p className="text-md">on:- {vendorPhone1} / {vendorPhone2}</p>
          <p className="text-md">Email: {vendorEmail}</p>
        </div>

        {/* School License Number */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-lg font-semibold text-gray-800 mb-2">Your School Licence Number</p>
          <input
            type="text"
            readOnly
            value={schoolLicenseNumber}
            className="w-full max-w-sm px-4 py-3 text-center text-2xl font-bold border border-gray-400 rounded-md bg-gray-100 text-gray-800 shadow-inner"
          />
        </div>

        {/* Rolan Softlinks Solutions Logo/Text */}
        <div className="text-center my-8">
          <p className="text-red-600 text-4xl font-extrabold tracking-wide uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            ROLAN
          </p>
          <p className="text-red-600 text-3xl font-bold tracking-wide uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            SOFTLINKS
          </p>
          <p className="text-red-600 text-3xl font-bold tracking-wide uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            SOLUTIONS
          </p>
        </div>

        {/* Authenticity Key and Department Selection */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4">
            <label htmlFor="authenticityKey" className="w-36 text-gray-700 font-medium">Authenticity Key:</label>
            <input
              type="text"
              id="authenticityKey"
              ref={authenticityKeyRef}
              onKeyDown={(e) => handleKeyDown(e, departmentSelectRef)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={authenticityKey}
              onChange={(e) => setAuthenticityKey(e.target.value)}
              placeholder="Enter authenticity key"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="departmentSelect" className="w-36 text-gray-700 font-medium">Select Department&gt;:</label>
            <select
              id="departmentSelect"
              ref={departmentSelectRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setTimeout(() => okButtonRef.current?.focus(), 0);
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8 pt-4 border-t border-gray-200">
          <button
            type="button"
            ref={okButtonRef}
            onKeyDown={(e) => handleKeyDown(e, cancelButtonRef)}
            onClick={handleOk}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Ok
          </button>
          <button
            type="button"
            ref={cancelButtonRef}
            onKeyDown={(e) => handleKeyDown(e)}
            onClick={handleCancel}
            className="px-8 py-3 bg-gray-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticityForm;
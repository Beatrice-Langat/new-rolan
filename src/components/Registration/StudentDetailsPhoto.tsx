// components/Registration/StudentDetailsPhoto.tsx

'use client'; // This component uses React Hooks and handles user interactions.

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation.
import Image from 'next/image';

// Define interface for student data
interface Student {
  id: string; // Unique ID for each student
  admNo: string;
  name: string;
  stream: string;
  photoUrl: string; // URL to the student's photo
}

const StudentDetailsPhotoForm: React.FC = () => {
  const router = useRouter();

  // --- Dummy Student Data ---
  // Using placeholder images for demonstration. In a real app, these would be actual image URLs.
  const [students, setStudents] = useState<Student[]>([
    { id: 's001', admNo: '1001', name: 'Melvin Anita', stream: 'Yellow', photoUrl: 'https://placehold.co/150x150/ADD8E6/000000?text=Student+1' },
    { id: 's002', admNo: '1002', name: 'Lucky Vugutsa', stream: 'Yellow', photoUrl: 'https://placehold.co/150x150/90EE90/000000?text=Student+2' },
    { id: 's003', admNo: '1003', name: 'Noel Jahenda', stream: 'Yellow', photoUrl: 'https://placehold.co/150x150/FFB6C1/000000?text=Student+3' },
    { id: 's004', admNo: '1004', name: 'Euphemia Lijodi', stream: 'Yellow', photoUrl: 'https://placehold.co/150x150/DDA0DD/000000?text=Student+4' },
    { id: 's005', admNo: '1005', name: 'Caren Namaemba', stream: 'Yellow', photoUrl: 'https://placehold.co/150x150/F0E68C/000000?text=Student+5' },
    { id: 's006', admNo: '1006', name: 'Ivy Masaka', stream: 'Yellow', photoUrl: 'https://placehold.co/150x150/AFEEEE/000000?text=Student+6' },
    { id: 's007', admNo: '1007', name: 'Leah Nafula', stream: 'Yellow', photoUrl: 'https://placehold.co/150x150/D8BFD8/000000?text=Student+7' },
    { id: 's008', admNo: '1008', name: 'Gloria Tsikhungu', stream: 'Yellow', photoUrl: 'https://placehold.co/150x150/FFDAB9/000000?text=Student+8' },
    { id: 's009', admNo: '1009', name: 'Wefila Sarah', stream: 'Yellow', photoUrl: 'https://placehold.co/150x150/E0FFFF/000000?text=Student+9' },
    { id: 's010', admNo: '1010', name: 'Bridgit Nasisho', stream: 'Yellow', photoUrl: 'https://placehold.co/150x150/F5DEB3/000000?text=Student+10' },
  ]);

  // State to track the currently displayed student's index
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);

  // Get the current student based on the index
  const currentStudent = students[currentStudentIndex];

  // --- Refs for Keyboard Navigation ---
  const admNoInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const streamInputRef = useRef<HTMLInputElement>(null);
  const photoUploadInputRef = useRef<HTMLInputElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const lastButtonRef = useRef<HTMLButtonElement>(null);
  const newButtonRef = useRef<HTMLButtonElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // --- useEffect to set initial focus ---
  useEffect(() => {
    admNoInputRef.current?.focus();
  }, []);

  // --- Keyboard Navigation Handler ---
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
    nextRef?: React.RefObject<HTMLElement | null>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission or newline

      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      } else if (event.currentTarget === closeButtonRef.current) {
        handleClose();
      }
    }
  };

  // --- Event Handlers ---

  // Handler for photo file selection
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const objectUrl = URL.createObjectURL(file);

      // Update the photoUrl for the current student
      setStudents(prevStudents =>
        prevStudents.map((student, index) =>
          index === currentStudentIndex ? { ...student, photoUrl: objectUrl } : student
        )
      );
      console.log(`Photo selected for ${currentStudent.name}: ${file.name}`);
    } else {
      // If no file selected, clear the photo for the current student
      setStudents(prevStudents =>
        prevStudents.map((student, index) =>
          index === currentStudentIndex ? { ...student, photoUrl: 'https://placehold.co/150x150/aabbcc/ffffff?text=No+Photo' } : student
        )
      );
      console.log(`Photo cleared for ${currentStudent.name}.`);
    }
  };

  // Navigation handlers
  const handleFirst = () => setCurrentStudentIndex(0);
  const handlePrevious = () => setCurrentStudentIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrentStudentIndex(prev => Math.min(students.length - 1, prev + 1));
  const handleLast = () => setCurrentStudentIndex(students.length - 1);

  const handleNew = () => {
    // In a real app, you'd generate a new unique ID and clear all fields.
    // For this dummy, we'll just add an empty student at the end and move to it.
    const newStudent: Student = {
      id: `s${Date.now()}`,
      admNo: '',
      name: '',
      stream: '',
      photoUrl: 'https://placehold.co/150x150/aabbcc/ffffff?text=New+Student',
    };
    setStudents(prevStudents => [...prevStudents, newStudent]);
    setCurrentStudentIndex(students.length); // Move to the newly added student
    alert('New student record created (frontend only)!');
    // Focus the first input of the new record
    setTimeout(() => admNoInputRef.current?.focus(), 0);
  };

  const handleSave = () => {
    console.log('Saving current student data (Frontend Only):', currentStudent);
    alert(`Student ${currentStudent.name || currentStudent.admNo || 'New Record'} saved (frontend only)!`);
  };

  const handleDelete = () => {
    if (students.length === 0) {
      alert('No students to delete.');
      return;
    }
    if (confirm(`Are you sure you want to delete student ${currentStudent.name} (Adm No: ${currentStudent.admNo})? (Frontend Only)`)) {
      setStudents(prevStudents => prevStudents.filter(s => s.id !== currentStudent.id));
      // Adjust index if the last student was deleted, or move to the first if list is not empty
      setCurrentStudentIndex(prev => Math.max(0, Math.min(prev, students.length - 2)));
      alert(`Student ${currentStudent.name} deleted (frontend only)!`);
    }
  };

  const handleClose = () => {
    console.log('Closing Student Details - (Photo) form.');
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
          Student Details - (Photo)
        </h2>

        <div className="flex flex-col md:flex-row gap-8 mb-6">
          {/* Student Details Section */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <label htmlFor="admNo" className="text-gray-700 font-medium">Adm.No:</label>
              <input
                type="text"
                id="admNo"
                ref={admNoInputRef}
                onKeyDown={(e) => handleKeyDown(e, nameInputRef)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800"
                value={currentStudent ? currentStudent.admNo : ''}
                readOnly // Adm.No is typically read-only or managed by system
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label htmlFor="name" className="text-gray-700 font-medium">Name:</label>
              <input
                type="text"
                id="name"
                ref={nameInputRef}
                onKeyDown={(e) => handleKeyDown(e, streamInputRef)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800"
                value={currentStudent ? currentStudent.name : ''}
                readOnly // Name is typically read-only
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label htmlFor="stream" className="text-gray-700 font-medium">Stream:</label>
              <input
                type="text"
                id="stream"
                ref={streamInputRef}
                onKeyDown={(e) => handleKeyDown(e, photoUploadInputRef)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-800"
                value={currentStudent ? currentStudent.stream : ''}
                readOnly // Stream is typically read-only
              />
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50">
            <div className="w-40 h-40 border-2 border-gray-400 rounded-md flex items-center justify-center overflow-hidden mb-4 bg-white">
              {currentStudent && currentStudent.photoUrl ? (
                <Image
                  src={currentStudent.photoUrl}
                  alt="Student Photo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/150x150/aabbcc/ffffff?text=No+Photo';
                    // Optionally update state to reflect broken image if needed, though for dummy data, it's less critical
                  }}
                />
              ) : (
                <span className="text-gray-400 text-sm">No Photo</span>
              )}
            </div>
            <input
              type="file"
              id="studentPhotoUpload"
              ref={photoUploadInputRef}
              accept="image/*"
              onChange={handlePhotoChange}
              onKeyDown={(e) => handleKeyDown(e, firstButtonRef)}
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 pt-4 border-t border-gray-200">
          <button
            onClick={handleFirst}
            ref={firstButtonRef}
            onKeyDown={(e) => handleKeyDown(e, prevButtonRef)}
            disabled={currentStudentIndex === 0 || students.length === 0}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            First
          </button>
          <button
            onClick={handlePrevious}
            ref={prevButtonRef}
            onKeyDown={(e) => handleKeyDown(e, nextButtonRef)}
            disabled={currentStudentIndex === 0 || students.length === 0}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            ref={nextButtonRef}
            onKeyDown={(e) => handleKeyDown(e, lastButtonRef)}
            disabled={currentStudentIndex === students.length - 1 || students.length === 0}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            Next
          </button>
          <button
            onClick={handleLast}
            ref={lastButtonRef}
            onKeyDown={(e) => handleKeyDown(e, newButtonRef)}
            disabled={currentStudentIndex === students.length - 1 || students.length === 0}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            Last
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 mt-6">
          <button
            type="button"
            onClick={handleNew}
            ref={newButtonRef}
            onKeyDown={(e) => handleKeyDown(e, saveButtonRef)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            New
          </button>
          <button
            type="button"
            onClick={handleSave}
            ref={saveButtonRef}
            onKeyDown={(e) => handleKeyDown(e, deleteButtonRef)}
            disabled={!currentStudent}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            ref={deleteButtonRef}
            onKeyDown={(e) => handleKeyDown(e, closeButtonRef)}
            disabled={!currentStudent}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleClose}
            ref={closeButtonRef}
            onKeyDown={(e) => handleKeyDown(e, newButtonRef)} // Loop back to New button
            className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPhotoForm;

/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Registration/StudentDetails.tsx (StudentDetailsPerStreamForm)

'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface Student {
  id: string; // Unique ID for each student (generated locally for now)
  admNo: string;
  name: string;
  upiNo: string;
  kcpe: number;
  gender: 'M' | 'F' | '';
  house: string; // Used for Stream filtering
  boarder: 'Yes' | 'No' | '';
  phone: string;
  stop: 'Yes' | 'No' | '';
}

const StudentDetailsPerStreamForm: React.FC = () => {
  const router = useRouter();

  const [forms, setForms] = useState<string[]>(['1', '2', '3', '4']);
  const [streams, setStreams] = useState<string[]>(['All', 'Green', 'Indigo', 'White', 'Yellow', 'Elgon', 'Kilimanjaro', 'Savala']);

  const [selectedForm, setSelectedForm] = useState<string>('1');
  const [selectedStream, setSelectedStream] = useState<string>('All');

  // Dummy student data
  const [students, setStudents] = useState<Student[]>([
    { id: 's001', admNo: '1001', name: 'John Doe', upiNo: 'UPI001', kcpe: 350, gender: 'M', house: 'Elgon', boarder: 'Yes', phone: '123-456-7890', stop: 'No' },
    { id: 's002', admNo: '1002', name: 'Jane Smith', upiNo: 'UPI002', kcpe: 380, gender: 'F', house: 'Kilimanjaro', boarder: 'No', phone: '098-765-4321', stop: 'Yes' },
    { id: 's003', admNo: '1003', name: 'Peter Jones', upiNo: 'UPI003', kcpe: 320, gender: 'M', house: 'Savala', boarder: 'Yes', phone: '111-222-3333', stop: 'No' },
    { id: 's004', admNo: '1004', name: 'Alice Brown', upiNo: 'UPI004', kcpe: 390, gender: 'F', house: 'Elgon', boarder: 'No', phone: '444-555-6666', stop: 'No' },
    { id: 's005', admNo: '1005', name: 'Bob White', upiNo: 'UPI005', kcpe: 310, gender: 'M', house: 'Kilimanjaro', boarder: 'Yes', phone: '777-888-9999', stop: 'Yes' },
    { id: 's006', admNo: '2001', name: 'Charlie Green', upiNo: 'UPI006', kcpe: 360, gender: 'M', house: 'Yellow', boarder: 'No', phone: '123-123-1234', stop: 'No' },
    { id: 's007', admNo: '2002', name: 'Diana Black', upiNo: 'UPI007', kcpe: 375, gender: 'F', house: 'Yellow', boarder: 'Yes', phone: '321-321-4321', stop: 'No' },
  ]);

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const formMatch = selectedForm === '' || student.admNo.startsWith(selectedForm);
      const streamMatch = selectedStream === 'All' || student.house === selectedStream;
      return formMatch && streamMatch;
    });
  }, [students, selectedForm, selectedStream]);

  const handleDeleteRecord = () => {
    if (selectedStudentId) {
      const studentToDelete = students.find(s => s.id === selectedStudentId);
      if (studentToDelete && confirm(`Are you sure you want to delete student ${studentToDelete.name} (Adm.No: ${studentToDelete.admNo})? (Frontend Only)`)) {
        setStudents(students.filter(s => s.id !== selectedStudentId));
        setSelectedStudentId(null);
        alert(`Student ${studentToDelete.name} deleted (frontend only)!`);
      }
    } else {
      alert('Please select a student to delete.');
    }
  };

  const handleViewPerForm = () => {
    alert(`Viewing details for Form: ${selectedForm} (Frontend Only - No actual navigation).`);
  };

  const handleClose = () => {
    console.log('Closing Student Details Per Stream form.');
    router.back();
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl w-full border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center border-b pb-4 border-blue-100">
          Students Details Per Stream
        </h2>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
          <label htmlFor="formSelect" className="text-gray-700 font-medium">Form:</label>
          <select id="formSelect" className="px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition duration-150 ease-in-out" value={selectedForm} onChange={(e) => setSelectedForm(e.target.value)}>
            {forms.map(form => (<option key={form} value={form}>{form}</option>))}
          </select>

          <label htmlFor="streamSelect" className="text-gray-700 font-medium ml-4">Stream:</label>
          <select id="streamSelect" className="px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white transition duration-150 ease-in-out" value={selectedStream} onChange={(e) => setSelectedStream(e.target.value)}>
            {streams.map(stream => (<option key={stream} value={stream}>{stream}</option>))}
          </select>
        </div>

        <div className="border border-blue-200 rounded-md overflow-hidden shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Adm.No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">UPI NO.</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">K.C.P.E</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Gender</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">House</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Boarder?</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Stop?</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className={`
                        hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out
                        ${selectedStudentId === student.id ? 'bg-blue-200 font-medium text-blue-900' : ''}
                      `}
                      onClick={() => setSelectedStudentId(student.id)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.admNo}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.upiNo}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.kcpe}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.gender}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.house}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.boarder}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.phone}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.stop}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-3 text-center text-gray-500 text-sm">No students found for the selected criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-sm text-gray-600 text-center mb-6">
          Records: {filteredStudents.length} of {students.length}
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-blue-100 mt-6">
          <button type="button" onClick={handleDeleteRecord} className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105">
            Delete
          </button>
          <button type="button" onClick={handleViewPerForm} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105">
            View Per Form
          </button>
          <button type="button" onClick={handleClose} className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPerStreamForm;
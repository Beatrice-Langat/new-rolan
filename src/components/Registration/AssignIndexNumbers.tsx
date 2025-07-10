/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Registration/AssignIndexNumbers.tsx

'use client';

import React, { useState, useMemo } from 'react';
// import { useRouter } from 'next/navigation'; // Commented out due to missing module

interface Student {
  id: string; // Unique ID for each student (generated locally for now)
  admNo: string;
  name: string;
  stream: string;
  indexNo: string; // Field for index number
}

const AssignIndexNumbersForm: React.FC = () => {
  // const router = useRouter(); // Removed due to missing import/module

  const [forms, setForms] = useState<string[]>(['Form 1', 'Form 2', 'Form 3', 'Form 4']);
  const [streams, setStreams] = useState<string[]>(['All', 'Yellow', 'Green', 'Indigo', 'White']);
  const [selectedForm, setSelectedForm] = useState<string>('Form 3');
  const [selectedStream, setSelectedStream] = useState<string>('Yellow');

  // Dummy student data
  const [students, setStudents] = useState<Student[]>([
    { id: 's001', admNo: '1001', name: 'Melvin Anita', stream: 'Yellow', indexNo: '001' },
    { id: 's002', admNo: '1002', name: 'Lucky Vugutsa', stream: 'Yellow', indexNo: '' },
    { id: 's003', admNo: '1003', name: 'Noel Jahenda', stream: 'Yellow', indexNo: '003' },
    { id: 's004', admNo: '1004', name: 'Euphemia Lijodi', stream: 'Yellow', indexNo: '' },
    { id: 's005', admNo: '1005', name: 'Caren Namaemba', stream: 'Yellow', indexNo: '005' },
    { id: 's006', admNo: '1006', name: 'Ivy Masaka', stream: 'Yellow', indexNo: '' },
    { id: 's007', admNo: '1007', name: 'Leah Nafula', stream: 'Yellow', indexNo: '007' },
    { id: 's008', admNo: '1008', name: 'Gloria Tsikhungu', stream: 'Yellow', indexNo: '' },
    { id: 's009', admNo: '1009', name: 'Wefila Sarah', stream: 'Yellow', indexNo: '009' },
    { id: 's010', admNo: '1010', name: 'Bridgit Nasisho', stream: 'Yellow', indexNo: '' },
  ]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const formMatch = selectedForm === '' || student.admNo.startsWith(selectedForm.split(' ')[1]);
      const streamMatch = selectedStream === 'All' || student.stream === selectedStream;
      return formMatch && streamMatch;
    });
  }, [students, selectedForm, selectedStream]);

  const handleIndexNoChange = (studentId: string, newIndexNo: string) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, indexNo: newIndexNo } : student
      )
    );
  };

  const handleSaveIndexNumbers = () => {
    console.log('Saving Index Numbers (Frontend Only) - Data to be saved:', filteredStudents.map(s => ({ id: s.id, admNo: s.admNo, indexNo: s.indexNo })));
    alert('Index numbers saved (frontend only)!');
  };

  const handleClose = () => {
    console.log("Closing Assign Student's Index Numbers form.");
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center font-inter">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-5xl w-full border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center border-b pb-4 border-blue-100">
          Assign Students Index Numbers
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Stream</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-800 uppercase tracking-wider">Index.No.</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.admNo}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{student.stream}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                        <input type="text" className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" value={student.indexNo} onChange={(e) => handleIndexNoChange(student.id, e.target.value)} placeholder="Enter Index" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-center text-gray-500 text-sm">No students found for the selected criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-blue-100 mt-6">
          <button type="button" onClick={handleSaveIndexNumbers} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105">
            Save Index Numbers
          </button>
          <button type="button" onClick={handleClose} className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignIndexNumbersForm;
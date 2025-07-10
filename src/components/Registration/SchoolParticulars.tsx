// components/SchoolParticularsForm.tsx

'use client'; // This is a client-side component (uses useState, handles user input)

import Image from 'next/image';
import React, { useState } from 'react';

// You might need to install 'react-dropzone' for robust file uploads,
// but for a simple placeholder, we can manage without for now.
// npm install react-dropzone (if you want a proper drag-and-drop area)

const SchoolParticulars: React.FC = () => {
  // State for each form field
  const [schoolName, setSchoolName] = useState('ROLAN HIGH SCHOOL');
  const [schoolLicense, setSchoolLicense] = useState('3914951853');
  const [schoolCode, setSchoolCode] = useState(''); // Assuming School Code might be separate
  const [fullAddress, setFullAddress] = useState('P.o Box 1234, 30100 Eldoret');
  const [telFaxNumber, setTelFaxNumber] = useState('0721 xxxxxx');
  const [emailAddress, setEmailAddress] = useState('rolanschools@gmail.com');
  const [schoolWebsite, setSchoolWebsite] = useState('');
  const [schoolMotto, setSchoolMotto] = useState('');
  const [schoolCategory, setSchoolCategory] = useState('Mixed School'); // Initial value from image
  const [schoolLogo, setSchoolLogo] = useState<File | string | null>(null); // For image file or URL

  // Handler for file input change
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSchoolLogo(file);
      // Optional: Display a preview
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setSchoolLogo(reader.result as string); // Set to base64 string for preview
      // };
      // reader.readAsDataURL(file);
    }
  };

  // Handler for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // In a real application, you would send this data to your backend API
    console.log('Updating School Particulars:', {
      schoolName,
      schoolLicense,
      schoolCode,
      fullAddress,
      telFaxNumber,
      emailAddress,
      schoolWebsite,
      schoolMotto,
      schoolCategory,
      schoolLogo: schoolLogo ? (typeof schoolLogo === 'string' ? schoolLogo : schoolLogo.name) : 'No logo', // Just log name/url for now
    });

    // You would typically show a success message or handle errors here
    alert('School Particulars Updated (Check console for data)');
  };

  // Handler for the "Close" button
  const handleClose = () => {
    console.log('Closing School Particulars form.');
    // In a real application, you might navigate back or close a modal
    // Example: router.back(); or router.push('/registration');
    alert('Form Closed (In a real app, this would navigate away or close)');
  };

  const schoolCategories = ['Mixed School', 'Boys School', 'Girls School', 'Primary School', 'Secondary School'];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
          School Particulars
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* School Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <label htmlFor="schoolName" className="block text-gray-700 font-medium md:col-span-1">School Name:</label>
            <input
              type="text"
              id="schoolName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
            />
          </div>

          {/* School License & Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <label htmlFor="schoolLicense" className="block text-gray-700 font-medium md:col-span-1">School License:</label>
            <input
              type="text"
              id="schoolLicense"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              value={schoolLicense}
              onChange={(e) => setSchoolLicense(e.target.value)}
            />
            <div className="flex items-center gap-2 md:col-span-1">
              <label htmlFor="schoolCode" className="block text-gray-700 font-medium whitespace-nowrap">School Code:</label>
              <input
                type="text"
                id="schoolCode"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value)}
              />
            </div>
          </div>

          {/* Full Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <label htmlFor="fullAddress" className="block text-gray-700 font-medium md:col-span-1">Full Address:</label>
            <input
              type="text"
              id="fullAddress"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
            />
          </div>

          {/* Tel And Fax Number */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <label htmlFor="telFaxNumber" className="block text-gray-700 font-medium md:col-span-1">Tel. And Fax Number:</label>
            <input
              type="tel"
              id="telFaxNumber"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              value={telFaxNumber}
              onChange={(e) => setTelFaxNumber(e.target.value)}
            />
          </div>

          {/* Email Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <label htmlFor="emailAddress" className="block text-gray-700 font-medium md:col-span-1">Email Address:</label>
            <input
              type="email"
              id="emailAddress"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>

          {/* School Website */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <label htmlFor="schoolWebsite" className="block text-gray-700 font-medium md:col-span-1">School Website:</label>
            <input
              type="url"
              id="schoolWebsite"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              value={schoolWebsite}
              onChange={(e) => setSchoolWebsite(e.target.value)}
              placeholder="e.g., https://www.example.com"
            />
          </div>

          {/* School Motto */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <label htmlFor="schoolMotto" className="block text-gray-700 font-medium md:col-span-1">School Motto:</label>
            <input
              type="text"
              id="schoolMotto"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
              value={schoolMotto}
              onChange={(e) => setSchoolMotto(e.target.value)}
            />
          </div>

          {/* School Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <label htmlFor="schoolCategory" className="block text-gray-700 font-medium md:col-span-1">School Category:</label>
            <select
              id="schoolCategory"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base bg-white"
              value={schoolCategory}
              onChange={(e) => setSchoolCategory(e.target.value)}
            >
              {schoolCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* School Logo */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4 ">
            <label htmlFor="schoolLogo" className="block text-gray-700 font-medium md:col-span-1">School Logo:</label>
            <div className="md:col-span-2 flex flex-col items-start gap-4">
              <div className="w-32 h-32 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-50">
                {schoolLogo ? (
                  typeof schoolLogo === 'string' ? ( // For a URL or base64 preview
                    <Image src={schoolLogo} alt="School Logo Preview" className="w-full h-full object-contain" />
                  ) : ( // For a File object (no direct preview without FileReader)
                    <span className="text-sm text-gray-500 text-center p-2 break-words">{schoolLogo.name}</span>
                  )
                ) : (
                  <span className="text-gray-400 text-sm">No Logo</span>
                )}
              </div>
              <input
                type="file"
                id="schoolLogo"
                accept="image/*" // Only allow image files
                onChange={handleLogoChange}
                className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Update
            </button>
            <button
              type="button" // Important: use type="button" for non-submit buttons inside a form
              onClick={handleClose}
              className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolParticulars;
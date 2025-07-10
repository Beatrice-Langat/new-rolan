/* eslint-disable @typescript-eslint/no-unused-vars */
// components/HousesRegistrationForm.tsx

'use client'; // This component uses React Hooks (useState) and handles user interactions, so it must be a Client Component.

import React, { useState } from 'react'; // Import React and the useState hook.
import { useRouter } from 'next/navigation'; // Import useRouter for programmatic navigation.

// Define an interface for a House object to ensure type safety.
interface House {
  name: string;
  teacher: string;
}

const HousesRegistration: React.FC = () => {
  // --- State Variables ---

  // `houses`: An array of `House` objects. This state will hold all registered houses and their teachers.
  // Initialized with example data from your provided image.
  const [houses, setHouses] = useState<House[]>([
    { name: 'Elgon', teacher: 'Ann mrs' },
    { name: 'Kilimanjaro', teacher: 'Mr, Rotich' },
    { name: 'Savala', teacher: 'Langat' },
    // The image shows "House Name" and "House Master" as placeholders for a new entry,
    // so we won't include them in the initial state as actual registered houses.
  ]);

  // `newHouseName`: Stores the value typed into the input field for a new house name.
  const [newHouseName, setNewHouseName] = useState('');
  // `newHouseTeacher`: Stores the value typed into the input field for a new house teacher.
  const [newHouseTeacher, setNewHouseTeacher] = useState('');

  // `selectedHouse`: Stores the `House` object of the currently selected house in the list, or null if none.
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  const router = useRouter(); // Initialize the `router` object.

  // --- Event Handlers ---

  // `handleAddHouse`: Handles adding a new house when the form is submitted.
  const handleAddHouse = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission (page reload).

    const trimmedName = newHouseName.trim();
    const trimmedTeacher = newHouseTeacher.trim();

    // Validate inputs: ensure both fields are not empty.
    if (trimmedName === '' || trimmedTeacher === '') {
      alert('Please enter both House Name and House Teacher.'); // Use custom modal in production.
      return;
    }

    // Check for duplicate house names to prevent adding the same house multiple times.
    if (houses.some(house => house.name.toLowerCase() === trimmedName.toLowerCase())) {
      alert('House name already exists!'); // Use custom modal in production.
      return;
    }

    // Create a new House object.
    const newHouse: House = { name: trimmedName, teacher: trimmedTeacher };
    // Update the `houses` state by adding the new house.
    setHouses([...houses, newHouse]);
    setNewHouseName('');    // Clear input fields after adding.
    setNewHouseTeacher('');
    setSelectedHouse(null); // Clear any existing selection.
  };

  // `handleDeleteRecord`: Handles deleting the currently selected house.
  const handleDeleteRecord = () => {
    if (selectedHouse) { // Check if a house is selected.
      // Confirmation dialog before deletion.
      if (confirm(`Are you sure you want to delete "${selectedHouse.name}" (Teacher: ${selectedHouse.teacher})?`)) {
        // Filter out the selected house from the `houses` array.
        setHouses(houses.filter(house => house.name !== selectedHouse.name));
        setSelectedHouse(null); // Clear the selection after deletion.
      }
    } else {
      alert('Please select a house to delete.'); // Inform user if no house is selected.
    }
  };

  // `handleSelectHouse`: Toggles the selection of a house in the list.
  const handleSelectHouse = (house: House) => {
    // If the clicked `house` is already `selectedHouse`, deselect it; otherwise, select it.
    setSelectedHouse(prevSelected => (prevSelected?.name === house.name ? null : house));
  };

  // `handleClose`: Navigates back to the previous page.
  const handleClose = () => {
    console.log('Closing Houses Registration form.');
    router.back(); // Go back using Next.js router.
  };

  // --- Component JSX (UI Structure and Styling) ---
  return (
    // Main container div for the entire form, providing background, padding, and centering.
    <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center font-inter">
      {/* Main form card container with modern styling. */}
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full border border-blue-200">
        {/* Form Header */}
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center border-b pb-4 border-blue-100">
          Houses Registration
        </h2>

        {/* Form for adding a new house */}
        <form onSubmit={handleAddHouse} className="mb-6 space-y-4"> {/* Use space-y for vertical gap */}
          <div>
            <label htmlFor="newHouseName" className="block text-gray-700 font-medium mb-1">House Name:</label>
            <input
              type="text"
              id="newHouseName"
              placeholder="Enter house name (e.g., Saturn)"
              className="w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
              value={newHouseName}
              onChange={(e) => setNewHouseName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newHouseTeacher" className="block text-gray-700 font-medium mb-1">House Teacher:</label>
            <input
              type="text"
              id="newHouseTeacher"
              placeholder="Enter house teacher (e.g., Mr. John Doe)"
              className="w-full px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
              value={newHouseTeacher}
              onChange={(e) => setNewHouseTeacher(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Add House
          </button>
        </form>

        {/* Display area for the list of registered houses */}
        <div className="border border-blue-200 rounded-md overflow-hidden shadow-sm mb-6">
          {/* Table-like header for the list */}
          <div className="grid grid-cols-2 bg-blue-100 text-blue-800 font-semibold px-4 py-3 border-b border-blue-200">
            <div>House</div>
            <div>House Teacher</div>
          </div>
          {/* List of houses */}
          <ul className="divide-y divide-blue-100 max-h-60 overflow-y-auto">
            {houses.length > 0 ? (
              houses.map((house, index) => (
                <li
                  key={house.name} // Using `house.name` as key (assuming unique names) is better than `index` if items can be reordered/deleted.
                  className={`
                    grid grid-cols-2 px-4 py-3 cursor-pointer text-gray-800
                    hover:bg-blue-50 transition duration-150 ease-in-out
                    ${selectedHouse?.name === house.name ? 'bg-blue-200 font-medium text-blue-900' : ''}
                  `}
                  onClick={() => handleSelectHouse(house)}
                >
                  <div>{house.name}</div>
                  <div>{house.teacher}</div>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-gray-500 text-center col-span-2">No houses registered.</li>
            )}
          </ul>
        </div>

        {/* Action Buttons: Delete Record and Close */}
        <div className="flex justify-end gap-4 pt-4 border-t border-blue-100 mt-6">
          <button
            type="button"
            onClick={handleDeleteRecord}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Delete Record
          </button>
          <button
            type="button"
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

export default HousesRegistration;
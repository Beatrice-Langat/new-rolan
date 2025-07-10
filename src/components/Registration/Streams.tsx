// components/StreamsRegistrationForm.tsx

'use client'; // This directive is essential. It marks this component as a Client Component.
// This is required because the component uses React Hooks (like useState) to manage its internal state
// (e.g., the list of streams, the value in the input field, which stream is selected).
// It also handles user interactions (button clicks, input changes).
// Client Components run in the browser after the initial server-side rendering.

import React, { useState } from 'react'; // Import React and the useState hook from React.
// useState allows functional components to have state, making them dynamic and interactive.

import { useRouter } from 'next/navigation'; // Import useRouter from Next.js's navigation module.
// useRouter provides access to the router object, which we'll use here to
// programmatically navigate back to the previous page (e.g., the main Registration menu)
// when the "Close" button is clicked.

const StreamsRegistration: React.FC = () => {
  // --- State Variables ---
  // These variables hold the data that can change over time and trigger re-renders.

  // `streams`: An array of strings. This state will hold all the registered stream names.
  // We initialize it with the example streams seen in your provided image.
  const [streams, setStreams] = useState<string[]>(['All', 'Green', 'Indigo', 'White', 'Yellow']);

  // `newStreamName`: A string. This state will hold the text currently typed into the input field
  // where the user enters a new stream name. It's a "controlled component" pattern.
  const [newStreamName, setNewStreamName] = useState('');

  // `selectedStream`: A string or `null`. This state will keep track of which stream
  // (if any) the user has clicked on in the list. This is used to enable the "Delete Record" button.
  const [selectedStream, setSelectedStream] = useState<string | null>(null);

  const router = useRouter(); // Initialize the `router` object.

  // --- Event Handlers ---
  // These functions respond to user actions (form submission, button clicks, list item clicks).

  // `handleAddStream`: This function is called when the "Add Stream" form is submitted.
  const handleAddStream = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Crucially, this prevents the browser's default form submission behavior,
    // which would cause a full page reload. In React, we manage form submission manually.

    const trimmedName = newStreamName.trim(); // Remove leading/trailing whitespace from the input.

    // Check if the input is not empty and if the stream name doesn't already exist in our list.
    if (trimmedName !== '' && !streams.includes(trimmedName)) {
      // If valid and unique:
      // Update the `streams` state by creating a new array that includes all existing streams
      // plus the `trimmedName`. Using the spread operator (`...streams`) is a React best practice
      // for updating array/object states immutably (without directly modifying the original array).
      setStreams([...streams, trimmedName]);
      setNewStreamName(''); // Clear the input field after successful addition.
      setSelectedStream(null); // Deselect any previously selected stream.
    } else if (streams.includes(trimmedName)) {
      // If the stream name is a duplicate, inform the user.
      // In a production application, you would replace `alert()` with a more sophisticated
      // UI notification (like a custom modal, toast message, or inline form validation error).
      alert('Stream already exists!');
    }
  };

  // `handleDeleteRecord`: This function is called when the "Delete Record" button is clicked.
  const handleDeleteRecord = () => {
    if (selectedStream) { // Check if a stream is actually selected.
      // Ask for user confirmation before deleting.
      // Again, replace `confirm()` with a custom modal in a real application.
      if (confirm(`Are you sure you want to delete the stream "${selectedStream}"?`)) {
        // Update the `streams` state by filtering out the `selectedStream`.
        // This creates a new array without the deleted stream.
        setStreams(streams.filter(stream => stream !== selectedStream));
        setSelectedStream(null); // Clear the selection after deletion.
      }
    } else {
      // If no stream is selected, prompt the user.
      alert('Please select a stream to delete.');
    }
  };

  // `handleSelectStream`: This function is called when a stream name in the list is clicked.
  const handleSelectStream = (stream: string) => {
    // This toggles the selection:
    // If the clicked `stream` is already `selectedStream`, set `selectedStream` to `null` (deselect).
    // Otherwise, set `selectedStream` to the clicked `stream` (select it).
    setSelectedStream(prevSelected => (prevSelected === stream ? null : stream));
  };

  // `handleClose`: This function is called when the "Close" button is clicked.
  const handleClose = () => {
    console.log('Closing Streams Registration form.');
    router.back(); // Uses the Next.js router to navigate back to the previous page in the browser's history.
    // This is useful for returning to the main Registration menu.
  };

  // --- Component JSX (UI Structure and Styling) ---
  return (
    // Main container div for the entire form.
    // - `min-h-screen`: Ensures the div takes at least the full height of the viewport.
    // - `bg-blue-50`: Sets a very light blue background color for the entire page, providing the soft hue.
    // - `p-6`: Adds padding around the content.
    // - `flex items-center justify-center`: Uses Flexbox to center the content (the white form card)
    //   both horizontally (`justify-center`) and vertically (`items-center`) on the page.
    // - `font-inter`: Applies the "Inter" font, as per project guidelines, for modern typography.
    <div className="min-h-screen bg-blue-50 p-6 flex items-center justify-center font-inter">
      {/* The main form card. */}
      
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full border border-blue-200">
        {/* Form Header */}
        
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center border-b pb-4 border-blue-100">
          Streams Registration
        </h2>

        {/* Form for adding a new stream */}
        
        <form onSubmit={handleAddStream} className="mb-6 flex gap-2">
          <input
            type="text" // Specifies the input type as text.
            placeholder="Enter new stream name" // Placeholder text for user guidance.
            // Tailwind CSS classes for styling the input field:
            // - `flex-1`: Allows the input to grow and take all available space within the flex container.
            // - `px-4 py-2`: Horizontal and vertical padding.
            // - `border border-blue-300 rounded-md shadow-sm`: Light blue border, rounded corners, subtle shadow.
            // - `focus:ring-blue-500 focus:border-blue-500`: Adds a blue ring and border when the input is focused,
            //   providing clear visual feedback.
            // - `sm:text-base`: Sets the text size to base on small screens and up.
            // - `transition duration-150 ease-in-out`: Ensures smooth transitions for focus and other states.
            className="flex-1 px-4 py-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out"
            value={newStreamName} // Binds the input's value to the `newStreamName` state (controlled component).
            onChange={(e) => setNewStreamName(e.target.value)} // Updates `newStreamName` state as the user types.
            required // HTML5 attribute: makes the input field mandatory.
          />
          <button
            type="submit" // Specifies the button type as submit, triggering the `handleAddStream` function.
            // Tailwind CSS classes for styling the "Add Stream" button:
            // - `px-6 py-2`: Padding.
            // - `bg-blue-600 text-white font-semibold rounded-md shadow-md`: Solid blue background, white text, bold font, rounded corners, shadow.
            // - `hover:bg-blue-700`: Darker blue on hover for interactive feedback.
            // - `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`: Focus styles.
            // - `transition duration-150 ease-in-out`: Smooth transitions.
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Add Stream
          </button>
        </form>

        {/* Display area for the list of registered streams */}
        
        <div className="border border-blue-200 rounded-md overflow-hidden shadow-sm mb-6">
          {/* Header for the streams list */}
          
          <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-3 border-b border-blue-200">
            Stream Name
          </div>
          {/* Unordered list (`<ul>`) to display the streams */}
          
          <ul className="divide-y divide-blue-100 max-h-60 overflow-y-auto">
            {/* Conditional rendering: Check if there are any streams in the `streams` array. */}
            {streams.length > 0 ? (
              // If streams exist, map over the `streams` array to render each stream as a list item.
              streams.map((stream, index) => (
                <li
                  key={index} // `key` prop is crucial for React to efficiently update lists.
                  // It should ideally be a stable, unique ID from your data. Using `index` is acceptable
                  // if the list items are static and their order doesn't change after initial render.
                  // Tailwind CSS classes for styling each list item:
                  // - `px-4 py-3 cursor-pointer text-gray-800`: Padding, changes cursor to pointer on hover, dark gray text.
                  // - `hover:bg-blue-50 transition duration-150 ease-in-out`: Light blue background on hover with smooth transition.
                  // - Conditional styling: If the `selectedStream` matches the current `stream`, apply
                  //   a darker blue background, medium font weight, and darker text color to highlight it.
                  className={`
                    px-4 py-3 cursor-pointer text-gray-800
                    hover:bg-blue-50 transition duration-150 ease-in-out
                    ${selectedStream === stream ? 'bg-blue-200 font-medium text-blue-900' : ''}
                  `}
                  onClick={() => handleSelectStream(stream)} // Call `handleSelectStream` when a list item is clicked.
                >
                  {stream} {/* Display the stream name */}
                </li>
              ))
            ) : (
              // If the `streams` array is empty, display a message indicating no streams are registered.
              <li className="px-4 py-3 text-gray-500 text-center">No streams registered.</li>
            )}
          </ul>
        </div>

        {/* Action Buttons: Delete Record and Close */}
       
        <div className="flex justify-end gap-4 pt-4 border-t border-blue-100 mt-6">
          <button
            type="button" // Important: `type="button"` prevents this button from accidentally submitting a form.
            onClick={handleDeleteRecord} // Calls the `handleDeleteRecord` function when clicked.
            // Tailwind CSS classes for styling the "Delete Record" button:
            // - `bg-red-600 text-white`: Red background and white text, commonly used for destructive actions.
            // - `hover:bg-red-700`: Darker red on hover.
            // - `transform hover:scale-105`: Adds a subtle scaling animation on hover for better user feedback.
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Delete Record
          </button>
          <button
            type="button" // Important: `type="button"` prevents this button from accidentally submitting a form.
            onClick={handleClose} // Calls the `handleClose` function when clicked.
            // Tailwind CSS classes for styling the "Close" button:
            // - `bg-gray-300 text-gray-800`: Neutral gray background and dark gray text.
            // - `hover:bg-gray-400`: Darker gray on hover.
            // - `transform hover:scale-105`: Adds a subtle scaling animation on hover.
            className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamsRegistration; // Export the component so it can be imported and used in other files.
'use client';

import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../../../lib/firebase';
import { Button } from '@radix-ui/themes';

const AddUserPopup = ({ onAdd }: { onAdd: () => void }) => {
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAddUser = async () => {
    if (!username.trim()) return;

    const newUserRef = ref(database, `component_1/${username}`);
    await set(newUserRef, {
      status: true,
      loginTime: new Date().toLocaleString(),
      logoutTime: 'null',
    });

    setUsername('');
    setIsOpen(false);
    onAdd();
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className= "cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-md"
      >
        Add Users
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center animate-fadeIn">
          {/* Modal Container */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-[90%] max-w-md p-6 border border-gray-200 dark:border-zinc-700 transition-all duration-300 animate-slideUp">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Add New User
            </h2>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-1 mb-5 border border-gray-300 dark:border-gray-600 bg-white rounded-sm dark:bg-zinc-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            />
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddUser}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserPopup;

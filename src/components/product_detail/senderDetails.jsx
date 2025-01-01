import React, { useState } from 'react';
import getCookie from '../../atom/utils/getCookies';

const SenderDetailsForm = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: getCookie("email") ?? "",
    phone: '+91 - ',
    location: `${getCookie("city")}, ${getCookie("region")}`
  });

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto lg:max-w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Sender's Details</h2>
          <p className="text-sm text-gray-500">Order related communication will also be sent on these details.</p>
        </div>
        <button 
          onClick={handleEditToggle} 
          className="text-gray-700 border px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          {isEditable ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            value={formData.name == "undefined" ? "" : formData.name}
            onChange={handleInputChange}
            disabled={!isEditable}
            className={`border rounded-md p-2 text-gray-700 ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="email"
            name="email"
            value={formData.email == "undefined" ? "" : formData.email}
            onChange={handleInputChange}
            disabled={!isEditable}
            className={`border rounded-md p-2 text-gray-700 ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            name="phone"
            value={formData.phon == "undefined" ? "" : formData.phone}
            onChange={handleInputChange}
            disabled={!isEditable}
            className={`border rounded-md p-2 text-gray-700 ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            name="location"
            value={formData.location == "undefined" ? "" : formData.location}
            onChange={handleInputChange}
            disabled={!isEditable}
            className={`border rounded-md p-2 text-gray-700 ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
          />
        </div>
      </div>
    </div>
  );
};

export default SenderDetailsForm;

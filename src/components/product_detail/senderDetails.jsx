// import React, { useState } from 'react';
// import getCookie from '../../atom/utils/getCookies';

// const SenderDetailsForm = () => {
//   const [isEditable, setIsEditable] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: getCookie("email") ?? "",
//     phone: '+91 - ',
//     location: `${getCookie("city")}, ${getCookie("region")}`
//   });

//   const handleEditToggle = () => {
//     setIsEditable(!isEditable);
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="p-4 border rounded-lg max-w-md mx-auto lg:max-w-full">
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h2 className="text-lg font-semibold">Sender's Details</h2>
//           <p className="text-sm text-gray-500">Order related communication will also be sent on these details.</p>
//         </div>
//         <button 
//           onClick={handleEditToggle} 
//           className="text-gray-700 border px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none"
//         >
//           {isEditable ? 'Save' : 'Edit'}
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
//         <div className="flex flex-col">
//           <input
//             type="text"
//             name="name"
//             value={formData.name == "undefined" ? "" : formData.name}
//             onChange={handleInputChange}
//             disabled={!isEditable}
//             className={`border rounded-md p-2 text-gray-700 ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
//           />
//         </div>

//         <div className="flex flex-col">
//           <input
//             type="email"
//             name="email"
//             value={formData.email == "undefined" ? "" : formData.email}
//             onChange={handleInputChange}
//             disabled={!isEditable}
//             className={`border rounded-md p-2 text-gray-700 ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
//           />
//         </div>

//         <div className="flex flex-col">
//           <input
//             type="text"
//             name="phone"
//             value={formData.phon == "undefined" ? "" : formData.phone}
//             onChange={handleInputChange}
//             disabled={!isEditable}
//             className={`border rounded-md p-2 text-gray-700 ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
//           />
//         </div>

//         <div className="flex flex-col">
//           <input
//             type="text"
//             name="location"
//             value={formData.location == "undefined" ? "" : formData.location}
//             onChange={handleInputChange}
//             disabled={!isEditable}
//             className={`border rounded-md p-2 text-gray-700 ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SenderDetailsForm;
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2 } from 'lucide-react';
import getCookie from '../../atom/utils/getCookies';

const SenderDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: getCookie("email") ?? "",
    phone: '+91 - ',
    location: `${getCookie("city")}, ${getCookie("region")}`
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white md:shadow-lg rounded-md md:rounded-2xl p-6 max-w-2xl mx-auto mb-3 md:mt-3">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Sender's Details</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your contact information for order communications
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name === "undefined" ? "" : formData.name}
            onChange={handleInputChange}
            className="
              w-full 
              pl-10 
              pr-4 
              py-3 
              rounded-xl 
              border 
              border-gray-300 
              focus:border-blue-500 
              focus:ring-2 
              focus:ring-blue-200 
              transition 
              duration-300 
              text-gray-700
            "
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email === "undefined" ? "" : formData.email}
            onChange={handleInputChange}
            className="
              w-full 
              pl-10 
              pr-4 
              py-3 
              rounded-xl 
              border 
              border-gray-300 
              focus:border-blue-500 
              focus:ring-2 
              focus:ring-blue-200 
              transition 
              duration-300 
              text-gray-700
            "
          />
        </div>

        {/* Phone Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone === "undefined" ? "" : formData.phone}
            onChange={handleInputChange}
            className="
              w-full 
              pl-10 
              pr-4 
              py-3 
              rounded-xl 
              border 
              border-gray-300 
              focus:border-blue-500 
              focus:ring-2 
              focus:ring-blue-200 
              transition 
              duration-300 
              text-gray-700
            "
          />
        </div>

        {/* Location Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location === "undefined" ? "" : formData.location}
            onChange={handleInputChange}
            className="
              w-full 
              pl-10 
              pr-4 
              py-3 
              rounded-xl 
              border 
              border-gray-300 
              focus:border-blue-500 
              focus:ring-2 
              focus:ring-blue-200 
              transition 
              duration-300 
              text-gray-700
            "
          />
        </div>
      </div>

      {/* Subtle Hint */}
      <div className="mt-4 text-sm text-gray-500 flex items-center">
        <Edit2 className="h-4 w-4 mr-2" />
        You can update your details anytime
      </div>
    </div>
  );
};

export default SenderDetailsForm;
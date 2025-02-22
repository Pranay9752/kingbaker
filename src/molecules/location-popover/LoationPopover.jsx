import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';

const LocationPopover = () => {
  const [open, setOpen] = useState(true);
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState('within');


  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">        

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">
            Let's Personalize Your Experience!
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Find the perfect gifts for you or your loved ones – it's like magic!
          </p>
        </div>

        {/* Radio Buttons */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="region"
              value="within"
              checked={region === 'within'}
              onChange={(e) => setRegion(e.target.value)}
              className="w-4 h-4 text-orange-300 border-gray-300 focus:ring-orange-200"
            />
            <span>Within India</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="region"
              value="outside"
              checked={region === 'outside'}
              onChange={(e) => setRegion(e.target.value)}
              className="w-4 h-4 text-orange-300 border-gray-300 focus:ring-orange-200"
            />
            <span>Outside India</span>
          </label>
        </div>

        {/* Location Input */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter delivery location or pincode"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200"
          />
        </div>

        {/* Continue Button */}
        <button 
          onClick={() => setOpen(false)}
          className="w-full mt-6 py-2 bg-orange-200 hover:bg-orange-300 text-black rounded-md font-medium transition-colors"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};

export default LocationPopover;
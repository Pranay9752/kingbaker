import React from 'react';

const SecurePaymentCard = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg max-w-md text-left mt-2">
      <h2 className="text-lg font-bold mb-4 text-gray-700">JOJO CART SECURE</h2>
      
      <div className="flex justify-start gap-1 items-center mb-2">
        <img 
          src="https://cdn.worldvectorlogo.com/logos/geotrust-1.svg" 
          alt="GoDaddy Secured" 
          className="h-16 object-fill"
        />
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 text-gray-600"
            >
              <path 
                fillRule="evenodd" 
                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-sm text-gray-600">100% Safe and Secure Payments</span>
          </div>
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 text-gray-600"
            >
              <path 
                fillRule="evenodd" 
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-sm text-gray-600">6 Million People Trust Us</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <img 
          src="https://cdn.worldvectorlogo.com/logos/visa-10.svg" 
          alt="Verified by VISA" 
          className="mb-2 h-6 aspect-video object-fill"
        />
        <img 
          src="https://cdn.worldvectorlogo.com/logos/mastercard.svg" 
          alt="MasterCard SecureCode" 
          className="mb-2 h-16 aspect-video"
        />
        <img 
          src="https://cdn.worldvectorlogo.com/logos/rupay.svg" 
          alt="RuPay" 
          className="mb-2 h-6 aspect-video"
        />
        <img 
          src="https://cdn.worldvectorlogo.com/logos/american-express-card-2.svg" 
          alt="American Express" 
          className="mb-2 h-16 aspect-video object-fill"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          className="h-10 text-gray-700"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" 
          />
        </svg>
        <div>
          <p className="font-bold text-sm text-gray-700">100% Smile Guaranteed</p>
          <p className="text-xs text-gray-600">Unique Products - On Time Delivery</p>
        </div>
      </div>
    </div>
  );
};

export default SecurePaymentCard;

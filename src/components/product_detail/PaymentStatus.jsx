import React, { useState, useEffect } from 'react';

const PaymentStatus = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Toggle between desktop and mobile view for demo purposes
  const toggleView = () => setIsMobile(!isMobile);
  
  // Order details
  const orderDetails = {
    orderNumber: "60999993",
    orderStatus: "Confirmed",
    orderDate: "20th Mar '25 01:45 PM",
    deliveryDate: "25th Mar '25, 9:00 AM-9:00 PM",
    product: "I Love U Dairy Milk Silk Chocolate",
    price: 149,
    shipping: 19,
    convenience: 39,
    total: 207,
    recipient: {
      name: "Udit",
      address: "42 hotel king city near novelty cinema roorkee road muzaffarnagar - 251001"
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Toggle button for demo */}
      <div className="p-4 bg-white shadow flex justify-center">
        <button 
          onClick={toggleView} 
          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
        >
          Switch to {isMobile ? 'Desktop' : 'Mobile'} View
        </button>
      </div>
      
      {window.innerWidth < 768 ? <MobileView orderDetails={orderDetails} /> : <DesktopView orderDetails={orderDetails} />}
    </div>
  );
};

const DesktopView = ({ orderDetails }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <header className="bg-olive-600 text-white p-4 flex justify-between items-center rounded-t-lg shadow-md">
        <div className="flex items-center">
          <img src="/api/placeholder/40/40" alt="FnP Logo" className="mr-2" />
          <h1 className="text-xl font-bold">Ferns N Petals</h1>
        </div>
        <div className="flex gap-4">
          <button className="hover:text-gray-200">
            <span>Cart</span>
          </button>
          <button className="hover:text-gray-200">
            <span>Account</span>
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="bg-white rounded-b-lg shadow-md p-6">
        {/* Order Confirmation */}
        <div className="flex items-center justify-center flex-col text-center mb-8">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You For Your Order!</h2>
          <p className="text-lg">
            YOUR ORDER <span className="text-blue-500 font-bold">#{orderDetails.orderNumber}</span> IS CONFIRMED
          </p>
          <p className="text-gray-600 mt-2">
            You will receive an email and SMS confirmation shortly.
          </p>
        </div>
        
        {/* Order Status Timeline */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Order Status</h3>
          <div className="flex items-center justify-between mb-8">
            <div className="relative flex items-center justify-center flex-col">
              <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center z-10">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-center mt-2">
                <p className="font-medium text-green-700">Confirmed</p>
                <p className="text-sm text-gray-500">{orderDetails.orderDate}</p>
              </div>
            </div>
            
            <div className="flex-grow mx-2 h-1 bg-gray-300 relative">
              <div className="absolute inset-0 h-1 w-0 bg-green-600"></div>
            </div>
            
            <div className="relative flex items-center justify-center flex-col">
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center z-10">
                <span className="text-gray-600 font-bold">2</span>
              </div>
              <div className="text-center mt-2">
                <p className="font-medium text-gray-500">Processing</p>
              </div>
            </div>
            
            <div className="flex-grow mx-2 h-1 bg-gray-300"></div>
            
            <div className="relative flex items-center justify-center flex-col">
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center z-10">
                <span className="text-gray-600 font-bold">3</span>
              </div>
              <div className="text-center mt-2">
                <p className="font-medium text-gray-500">On the way</p>
              </div>
            </div>
            
            <div className="flex-grow mx-2 h-1 bg-gray-300"></div>
            
            <div className="relative flex items-center justify-center flex-col">
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center z-10">
                <span className="text-gray-600 font-bold">4</span>
              </div>
              <div className="text-center mt-2">
                <p className="font-medium text-gray-500">Delivered</p>
                <p className="text-sm text-gray-500">{orderDetails.deliveryDate}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            <div className="flex items-center mb-4">
              <img src="/api/placeholder/80/80" alt="Product" className="mr-4 rounded-md" />
              <div>
                <h4 className="font-bold">{orderDetails.product}</h4>
                <p className="text-gray-700">₹ {orderDetails.price} - Milk Chocolate</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>Product Price:</span>
                <span>₹ {orderDetails.price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>₹ {orderDetails.shipping}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Convenience Charge:</span>
                <span>₹ {orderDetails.convenience}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
                <span>Total:</span>
                <span>₹ {orderDetails.total}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
            <div className="mb-6">
              <h4 className="font-bold text-gray-700 mb-2">Recipient:</h4>
              <p className="text-gray-700">{orderDetails.recipient.name}</p>
              <p className="text-gray-600">{orderDetails.recipient.address}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-700 mb-2">Delivery Date:</h4>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-700">{orderDetails.deliveryDate}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center mt-8 gap-4">
          <button className="px-6 py-3 border border-olive-600 text-olive-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            VIEW FULL DETAILS
          </button>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
            CONTINUE SHOPPING
          </button>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">Need assistance? Contact our support team</p>
          <p className="text-blue-500 cursor-pointer font-medium">Need Help?</p>
        </div>
      </main>
    </div>
  );
};

const MobileView = ({ orderDetails }) => {
  // State for order status
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  
  // Animation for progress bar
  const [progress, setProgress] = useState(0);
  
  // Tracking steps
  const steps = [
    { id: 1, name: 'Confirmed', date: orderDetails.orderDate, completed: true },
    { id: 2, name: 'Processing', date: '', completed: false },
    { id: 3, name: 'On the way', date: '', completed: false },
    { id: 4, name: 'Delivered', date: orderDetails.deliveryDate, completed: false }
  ];
  
  // Function to move to next step (for demo)
  const moveToNextStep = () => {
    if (currentStep < 4) {
      setLoading(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setLoading(false);
      }, 1500);
    }
  };
  
  // Update progress based on current step
  useEffect(() => {
    setProgress((currentStep - 1) * (100/3));
  }, [currentStep]);
  
  // Update completed steps
  const updatedSteps = steps.map(step => ({
    ...step,
    completed: step.id <= currentStep
  }));

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg">
      {/* Header */}
      <header className="bg-olive-600 text-white p-4 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center">
          <button className="mr-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Thank you</h1>
        </div>
        <button>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>
      
      {/* Main Content */}
      <main className="p-6">
        {/* Confirmation */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-md animate-pulse">
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">YOUR ORDER <span className="text-blue-500">#{orderDetails.orderNumber}</span></h2>
          <p className="text-lg font-bold mb-2">IS CONFIRMED</p>
          <p className="text-gray-600">THANK YOU FOR SHOPPING WITH US</p>
        </div>
        
        {/* Order Tracking Card */}
        <div className="bg-gray-50 rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="bg-olive-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-bold text-lg">Track Your Order</h3>
            <button 
              onClick={() => setShowStatus(!showStatus)} 
              className="text-white bg-white bg-opacity-20 rounded-full p-1"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showStatus ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="px-4 pt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Current Status */}
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Current Status</p>
              <p className="font-bold text-lg">{updatedSteps[currentStep - 1].name}</p>
            </div>
            {loading ? (
              <div className="animate-spin h-6 w-6 border-2 border-olive-600 border-t-transparent rounded-full"></div>
            ) : currentStep < 4 ? (
              <button 
                onClick={moveToNextStep} 
                className="bg-olive-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Refresh Status
              </button>
            ) : (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium">
                Completed
              </div>
            )}
          </div>
          
          {/* Detailed Status Timeline */}
          {showStatus && (
            <div className="p-4 pt-0 border-t border-gray-200 animate-fadeIn">
              {updatedSteps.map((step, index) => (
                <div key={step.id} className={`flex mb-4 ${index === updatedSteps.length - 1 ? 'mb-0' : ''}`}>
                  <div className="mr-4 relative">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-600' : 'bg-gray-300'}`}>
                      {step.completed ? (
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-gray-600 text-xs font-bold">{step.id}</span>
                      )}
                    </div>
                    {index < updatedSteps.length - 1 && (
                      <div className={`absolute top-6 left-3 w-0.5 h-full ${step.completed && updatedSteps[index + 1].completed ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold ${step.completed ? 'text-green-700' : 'text-gray-500'}`}>
                      {step.name}
                    </p>
                    {step.date && <p className="text-sm text-gray-500">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Order Info */}
        <div className="bg-gray-50 rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="bg-olive-600 text-white p-3">
            <h3 className="font-bold text-lg">Order Information</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-4">
              <img src="/api/placeholder/60/60" alt="Product" className="mr-3 rounded-md" />
              <div>
                <h4 className="font-bold">{orderDetails.product}</h4>
                <p className="text-gray-600">₹ {orderDetails.price} - Milk Chocolate</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-2">
              <div className="flex justify-between mb-1 text-gray-600">
                <span>Total:</span>
                <span className="font-bold">₹ {orderDetails.total}</span>
              </div>
              <div className="flex justify-between mb-1 text-gray-600">
                <span>Payment Method:</span>
                <span>PayU Gateway</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recipient */}
        <div className="bg-gray-50 rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="bg-olive-600 text-white p-3">
            <h3 className="font-bold text-lg">Recipient</h3>
          </div>
          <div className="p-4">
            <p className="font-bold">{orderDetails.recipient.name}</p>
            <p className="text-gray-600">{orderDetails.recipient.address}</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="py-3 border-2 border-olive-600 text-olive-600 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
            VIEW ORDER DETAILS
          </button>
          <button className="py-3 bg-orange-500 text-white rounded-xl font-medium text-sm hover:bg-orange-600 transition-colors shadow-sm">
            CONTINUE SHOPPING
          </button>
        </div>
        
        {/* Help */}
        <div className="text-center">
          <button className="text-blue-600 font-medium flex items-center justify-center mx-auto">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Need Help?
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentStatus;
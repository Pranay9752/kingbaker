import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, CheckCircle, AlertTriangle } from 'lucide-react';

const BulkUploadPreviewCard = ({ onRemove, product }) => {
  const [expanded, setExpanded] = useState(false);
  console.log(product)

  // This would come from validation logic in your app
  const isValid = true;

  return (
      <div className="w-full h-fit m ax-w-2xl bg-[#1a1f25] rounded-lg shadow-lg overflow-hidden border border-gray-700">
        {/* Main row - always visible */}
        <div className={`p-4 ${expanded ? 'border-b border-gray-700' : ''}`}>
          <div className="flex items-center">
            {/* Status indicator */}
            <div className="flex-shrink-0 mr-3">
              {isValid ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              )}
            </div>
            
            {/* Thumbnail and basic info */}
            <div className="flex flex-1 items-center overflow-hidden">
              <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-700">
                <img 
                  src={product.imageLink[0]} 
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-medium truncate">{product.title}</h3>
                    <p className="text-gray-400 text-sm">{product.specifications}</p>
                  </div>
                  <div className="flex-shrink-0 ml-2 flex items-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${product.is_veg ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                      {product.is_veg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center mt-1 text-sm">
                  <div className="text-gray-400 mr-3">₹{product.prices} <span className="text-gray-500 line-through text-xs">₹{product.pp}</span></div>
                  <div className="text-gray-400">{product.weight.length} size options</div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
              <button 
                onClick={() => setExpanded(!expanded)}
                className="p-1.5 hover:bg-gray-700 rounded-full transition-colors"
              >
                {expanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              
              <button 
                onClick={onRemove}
                className="p-1.5 hover:bg-red-900/20 text-red-400 hover:text-red-300 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Expanded details */}
        {expanded && (
          <div className="bg-gray-900/50 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Product Images</h4>
                <div className="grid grid-cols-4 gap-2">
                  {product.imageLink.map((img, index) => (
                    <div key={index} className="aspect-square rounded overflow-hidden bg-gray-800">
                      <img 
                        src={img} 
                        alt={`Product view ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                <h4 className="text-sm font-medium text-gray-400 mt-4 mb-2">Weight Options</h4>
                <div className="space-y-2">
                  {product.weight.map((option, index) => (
                    <div key={index} className="flex items-center text-sm bg-gray-800 p-2 rounded">
                      <span className="text-white">{option.weight}</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-gray-300">₹{option.price}</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-gray-400">{option.images.length} images</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right column */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Brand</h4>
                <div className="bg-gray-800 p-2 rounded text-sm text-white mb-3">
                  {product.brand}
                </div>
                
                <h4 className="text-sm font-medium text-gray-400 mb-2">Events</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.event.map((evt, index) => (
                    <span key={index} className="bg-indigo-900/40 text-indigo-400 text-xs px-2 py-1 rounded">
                      {evt}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-sm font-medium text-gray-400 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-sm font-medium text-gray-400 mt-4 mb-2">Additional Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-800 p-2 rounded">
                    <span className="text-gray-400">Custom Message:</span>
                    <span className="text-white ml-1">{product.is_message ? 'Allowed' : 'Not Allowed'}</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded">
                    <span className="text-gray-400">Original Price:</span>
                    <span className="text-white ml-1">₹{product.pp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default BulkUploadPreviewCard;
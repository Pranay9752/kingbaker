import React, { useEffect, useState } from "react";
import {
  useCreateVendorMutation,
  useUpdateOwnerOrVendorMutation,
} from "../../../redux/apiSlices/owner/vendor";
import BasicButton from "../../../atom/button/BasicButton";
import { toast } from "sonner";
import getCookie from "../../../atom/utils/getCookies";

import { Eye, EyeOff, Upload, X, FileText, CheckCircle, Loader } from "lucide-react";
import LocationAutocomplete from "../../../molecules/location/LocationAutocomplete";
import useImageUpload from "../../../atom/utils/useUploadImages";

export const Input = ({
  name,
  value,
  onChange,
  className = "",
  error,
  type = "text",
  step,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const baseClasses =
    "w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
  const errorClasses = error ? "border-red-500" : "";

  return (
    <div className="relative w-full">
      <input
        id={name}
        name={name}
        type={isPassword && !showPassword ? "password" : "text"}
        value={value}
        onChange={onChange}
        step={step}
        className={`${baseClasses} ${errorClasses} ${className} pr-10`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

// New Document Upload Component
const DocumentUpload = ({ name, label, value, onChange, error, uploadInProgress }) => {
  const fileInputRef = React.useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({
        target: {
          name: name,
          value: file,
          type: "file"
        },
      });
    }
  };

  const removeFile = () => {
    onChange({
      target: {
        name: name,
        value: "",
        type: "text"
      },
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isFileObject = value instanceof File;
  const hasValue = value && typeof value === 'string' && value.trim() !== "";

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        {!hasValue && !isFileObject ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-700 rounded-md cursor-pointer bg-[#161b22] hover:bg-gray-800 transition-colors"
          >
            <div className="flex flex-col items-center gap-2">
              <Upload size={20} className="text-gray-400" />
              <span className="text-sm text-gray-400">
                Click to upload {label}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full p-3 rounded-md bg-gray-800/50 border border-gray-700">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-blue-400" />
              <span className="text-sm text-gray-300 truncate max-w-[200px]">
                {isFileObject ? value.name : value.split('/').pop()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {uploadInProgress ? (
                <Loader size={16} className="text-yellow-400 animate-spin" />
              ) : (
                <CheckCircle size={16} className="text-green-400" />
              )}
              <button
                type="button"
                onClick={removeFile}
                className="text-gray-400 hover:text-red-400"
                disabled={uploadInProgress}
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          name={name}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          disabled={uploadInProgress}
        />
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};

const VendorModal = ({ onClose, onSubmit, initialData = null }) => {
  const isUpdate = !!initialData;
  const { uploadImages, loading: uploading, error: uploadError } = useImageUpload();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    alt_phone: "",
    gst_no: "",
    gst_name: "",
    address: {
      street: "",
      landmark: "",
      area: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    coordinates: [],
    // Document fields
    aadharCard: "",
    panCard: "", 
    fssaiLicense: "",
    msmeCertificate: "",
    canceledCheck: "",
  });

  // Keep track of documents being uploaded
  const [uploadsInProgress, setUploadsInProgress] = useState({
    aadharCard: false,
    panCard: false,
    fssaiLicense: false,
    msmeCertificate: false,
    canceledCheck: false
  });

  const [dirtyFields, setDirtyFields] = useState(new Set());
  const [errors, setErrors] = useState({});

  const [createVendor, { isLoading: isCreating }] = useCreateVendorMutation();
  const [updateVendor, { isLoading: isUpdating }] =
    useUpdateOwnerOrVendorMutation();

  // Transform and set initial data if in update mode
  useEffect(() => {
    if (initialData) {
      // Map document URLs from initialData
      setFormData({
        ...initialData,
        aadharCard: initialData.aadharCard || "",
        panCard: initialData.panCard || "",
        fssaiLicense: initialData.fssaiLicense || "",
        msmeCertificate: initialData.msmeCertificate || "",
        canceledCheck: initialData.canceledCheck || "",
      });
    }
  }, [initialData]);

  const handleDocumentUpload = (fieldName, file) => {
    // Mark this document as uploading
    setUploadsInProgress(prev => ({ ...prev, [fieldName]: true }));
    
    // Upload the file
    uploadImages([file], (uploadedUrls) => {
      if (uploadedUrls && uploadedUrls.length > 0) {
        // Update the form data with the URL
        setFormData(prev => ({
          ...prev,
          [fieldName]: uploadedUrls[0]
        }));
        
        // Mark the field as dirty
        setDirtyFields(prev => new Set(prev).add(fieldName));
      } else {
        toast.error(`Failed to upload ${fieldName}`);
      }
      
      // Mark upload as complete
      setUploadsInProgress(prev => ({ ...prev, [fieldName]: false }));
    });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setDirtyFields((prev) => new Set(prev).add(name));

    // Handle file uploads
    if (type === "file" && value instanceof File) {
      const fieldName = name.split('.')[1]; // Extract field name from "documents.fieldName"
      handleDocumentUpload(fieldName, value);
      return;
    }

    // Handle regular form fields
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Skip password validation if updating
    if (!isUpdate) {
      if (!formData.password) newErrors.password = "Password is required";
      else if (
        !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          formData.password
        )
      ) {
        newErrors.password =
          "Password must contain at least 8 characters, one uppercase, one number and one special character";
      }
    }

    // Always validate these fields
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";

    // Address validation
    if (!formData.address.street.trim())
      newErrors["address.street"] = "Street is required";
    if (!formData.address.city.trim())
      newErrors["address.city"] = "City is required";
    if (!formData.address.state.trim())
      newErrors["address.state"] = "State is required";
    if (!formData.address.country.trim())
      newErrors["address.country"] = "Country is required";
    if (!formData.address.pincode)
      newErrors["address.pincode"] = "Pincode is required";

    // Check if any uploads are in progress
    if (Object.values(uploadsInProgress).some(value => value)) {
      newErrors["upload"] = "Please wait for document uploads to complete";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        alt_phone: formData.alt_phone || "",
        gst_no: formData.gst_no || "",
        gst_name: formData.gst_name || "",
        address: {
          street: formData.address.street,
          landmark: formData.address.landmark || "",
          area: formData.address.area || "",
          city: formData.address.city,
          state: formData.address.state,
          country: formData.address.country,
          pincode: parseInt(formData.address.pincode),
        },
        geoLocation: {
          type: "Point",
          coordinates: [formData.coordinates?.[0] || 0, formData.coordinates?.[1] || 0],
        },
        // Add document URLs
        aadharCard: formData.aadharCard || "",
        panCard: formData.panCard || "",
        fssaiLicense: formData.fssaiLicense || "",
        msmeCertificate: formData.msmeCertificate || "",
        canceledCheck: formData.canceledCheck || "",
      };

      if (isUpdate) {
        // For update, only include dirty fields
        const dirtyFieldsPayload = {};
        dirtyFields.forEach((field) => {
          if (field.includes(".")) {
            const [parent, child] = field.split(".");
            if (!dirtyFieldsPayload[parent]) {
              dirtyFieldsPayload[parent] = {};
            }
            dirtyFieldsPayload[parent][child] = payload[parent][child];
          } else {
            dirtyFieldsPayload[field] = payload[field];
          }
        });
        
        await updateVendor({
          email: dirtyFieldsPayload.email || formData.email,
          ...dirtyFieldsPayload,
        }).unwrap();
        
        toast.success("Vendor updated successfully");
        onSubmit({
          ...formData,
          ...dirtyFieldsPayload,
        });
      } else {
        // For create, include owner_id and password
        await createVendor({
          owner_id: getCookie("_id"),
          password: formData.password,
          ...payload,
        }).unwrap();
        
        toast.success("Vendor created successfully");
        onSubmit(payload);
      }
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error("Operation failed: " + (error.data?.message || "Unknown error"));
    }
  };

  const handleLocationSelect = (locationData) => {
    console.log("locationData: ", locationData);
    handleChange({
      target: { name: "address.pincode", value: locationData?.pincode || "" },
    });
    handleChange({
      target: { name: "address.country", value: locationData.country || "" },
    });
    handleChange({
      target: { name: "address.state", value: locationData.state || "" },
    });
    handleChange({
      target: { name: "address.city", value: locationData.city || "" },
    });
    handleChange({
      target: {
        name: "address.street",
        value: [
          locationData?.allAddressComponents?.premise?.long_name,
          locationData?.allAddressComponents?.route?.long_name,
        ]
          .filter(Boolean)
          .join(", "),
      },
    });
    handleChange({
      target: {
        name: "address.landmark",
        value: locationData?.allAddressComponents?.landmark?.long_name || "",
      },
    });
    handleChange({
      target: {
        name: "address.area",
        value:
          locationData?.allAddressComponents?.neighborhood?.long_name || "",
      },
    });
    handleChange({
      target: {
        name: "coordinates",
        value: [locationData?.lng || 0, locationData?.lat || 0],
      },
    });
  };

  // Check if any document uploads are in progress
  const isAnyUploadInProgress = Object.values(uploadsInProgress).some(value => value);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-300 mb-5 flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path d="M2.879 7.121A3 3 0 0 0 7.5 6.66a2.997 2.997 0 0 0 2.5 1.34 2.997 2.997 0 0 0 2.5-1.34 3 3 0 1 0 4.622-3.78l-.293-.293A2 2 0 0 0 15.415 2H4.585a2 2 0 0 0-1.414.586l-.292.292a3 3 0 0 0 0 4.243ZM3 9.032a4.507 4.507 0 0 0 4.5-.29A4.48 4.48 0 0 0 10 9.5a4.48 4.48 0 0 0 2.5-.758 4.507 4.507 0 0 0 4.5.29V16.5h.25a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5H3V9.032Z" />
        </svg>
        {isUpdate ? "Edit Vendor" : "Add New Vendor"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-8">
          {/* Basic Information Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              Basic Information
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Enter your essential personal details.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                  error={errors.name}
                />
                {errors.name && (
                  <span className="text-xs text-red-400">{errors.name}</span>
                )}
              </div>
              {!isUpdate && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-[#161b22] border-gray-800 text-gray-300"
                      error={errors.email}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-400">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </>
              )}
              {!isUpdate && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-[#161b22] border-gray-800 text-gray-300"
                      error={errors.password}
                    />
                    {errors.password && (
                      <span className="text-xs text-red-400">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                  error={errors.phone}
                />
                {errors.phone && (
                  <span className="text-xs text-red-400">{errors.phone}</span>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Alt Phone</label>
                <Input
                  name="alt_phone"
                  value={formData.alt_phone}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                  error={errors.alt_phone}
                />
                {errors.alt_phone && (
                  <span className="text-xs text-red-400">
                    {errors.alt_phone}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GST No.</label>
                <Input
                  name="gst_no"
                  value={formData.gst_no}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                  error={errors.gst_no}
                />
                {errors.gst_no && (
                  <span className="text-xs text-red-400">{errors.gst_no}</span>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">GST Name</label>
                <Input
                  name="gst_name"
                  value={formData.gst_name}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                  error={errors.gst_name}
                />
                {errors.gst_name && (
                  <span className="text-xs text-red-400">{errors.gst_name}</span>
                )}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              Address Information
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Provide your detailed address for records.
            </p>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">
                Search Address
              </label>
              <LocationAutocomplete
                className={
                  "bg-[#161b22] border-gray-800 text-gray-300 max-w-md"
                }
                onLocationSelect={handleLocationSelect}
                regionRestriction="" // Optional: Add country restriction like "in" for India
              />
              <p className="text-xs text-gray-400 mt-1">
                Search for your address to automatically fill city, state,
                country and pincode
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Street</label>
                <Input
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                  error={errors["address.street"]}
                />
                {errors["address.street"] && (
                  <span className="text-xs text-red-400">
                    {errors["address.street"]}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Landmark</label>
                <Input
                  name="address.landmark"
                  value={formData.address.landmark}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Area</label>
                <Input
                  name="address.area"
                  value={formData.address.area}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                  error={errors["address.city"]}
                />
                {errors["address.city"] && (
                  <span className="text-xs text-red-400">
                    {errors["address.city"]}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <Input
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                  error={errors["address.state"]}
                />
                {errors["address.state"] && (
                  <span className="text-xs text-red-400">
                    {errors["address.state"]}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Input
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                  error={errors["address.country"]}
                />
                {errors["address.country"] && (
                  <span className="text-xs text-red-400">
                    {errors["address.country"]}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pincode</label>
                <Input
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  className="bg-[#161b22] border-gray-800 text-gray-300"
                  error={errors["address.pincode"]}
                />
                {errors["address.pincode"] && (
                  <span className="text-xs text-red-400">
                    {errors["address.pincode"]}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-300 mb-2">
              Document Verification
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Upload essential documents for vendor verification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DocumentUpload
                name="documents.aadharCard"
                label="Aadhaar Card"
                value={formData.aadharCard}
                onChange={handleChange}
                error={errors["aadharCard"]}
                uploadInProgress={uploadsInProgress.aadharCard}
              />
              
              <DocumentUpload
                name="documents.panCard"
                label="PAN Card"
                value={formData.panCard}
                onChange={handleChange}
                error={errors["panCard"]}
                uploadInProgress={uploadsInProgress.panCard}
              />
              
              <DocumentUpload
                name="documents.fssaiLicense"
                label="FSSAI License"
                value={formData.fssaiLicense}
                onChange={handleChange}
                error={errors["fssaiLicense"]}
                uploadInProgress={uploadsInProgress.fssaiLicense}
              />
              
              <DocumentUpload
                name="documents.msmeCertificate"
                label="MSME Certificate"
                value={formData.msmeCertificate}
                onChange={handleChange}
                error={errors["msmeCertificate"]}
                uploadInProgress={uploadsInProgress.msmeCertificate}
              />
              
              <DocumentUpload
                name="documents.canceledCheck"
                label="Canceled Check"
                value={formData.canceledCheck}
                onChange={handleChange}
                error={errors["canceledCheck"]}
                uploadInProgress={uploadsInProgress.canceledCheck}
              />
            </div>
            
            {errors["upload"] && (
              <div className="mt-2">
                <span className="text-xs text-red-400">{errors["upload"]}</span>
              </div>
            )}
            
            {isUpdate && (
              <p className="text-xs text-blue-400 mt-3">
                Note: Only upload documents that you want to update. Existing documents will remain unchanged if no new file is selected.
              </p>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3">
          <BasicButton
            type="button"
            className="border-gray-300 text-gray-300 px-4 py-2 bg-red-800/50 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </BasicButton>
          <BasicButton
            type="submit"
            className="border-gray-300 text-gray-300 px-4 py-2 bg-green-800/50 rounded-lg"
            disabled={isCreating || isUpdating || isAnyUploadInProgress}
          >
            {isCreating || isUpdating
              ? "Processing..."
              : isAnyUploadInProgress
              ? "Uploading documents..."
              : isUpdate
              ? "Update Vendor"
              : "Create Vendor"}
          </BasicButton>
        </div>
      </form>
    </div>
  );
};

export default VendorModal;
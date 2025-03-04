import React, { useEffect, useState } from "react";
import {
  useCreateVendorMutation,
  useUpdateOwnerOrVendorMutation,
} from "../../../redux/apiSlices/owner/vendor";
import BasicButton from "../../../atom/button/BasicButton";
import { toast } from "sonner";
import getCookie from "../../../atom/utils/getCookies";


import { Eye, EyeOff } from "lucide-react";
import LocationAutocomplete from "../../../molecules/location/LocationAutocomplete";

const baseClasses =
  "w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
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


const VendorModal = ({ onClose, onSubmit, initialData = null }) => {
  const isUpdate = !!initialData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: {
      street: "",
      landmark: "",
      area: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    coordinates: {
      longitude: "",
      latitude: "",
    },
  });

  const [dirtyFields, setDirtyFields] = useState(new Set());
  const [errors, setErrors] = useState({});

  const [createVendor, { isLoading: isCreating }] = useCreateVendorMutation();
  const [updateVendor, { isLoading: isUpdating }] =
    useUpdateOwnerOrVendorMutation();

  // Transform and set initial data if in update mode
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDirtyFields((prev) => new Set(prev).add(name));

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
        address: {
          street: formData.address.street,
          landmark: formData.address.landmark,
          area: formData.address.area,
          city: formData.address.city,
          state: formData.address.state,
          country: formData.address.country,
          pincode: parseInt(formData.address.pincode),
        },
        geoLocation: {
          type: "Point",
          coordinates: [72.868725, 19.027004],
        },
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
          email:
            "email" in dirtyFieldsPayload
              ? dirtyFieldsPayload["email"]
              : formData.email,
          ...dirtyFieldsPayload,
        }).unwrap();
        toast.success("Vendor updated successfully");

        onSubmit({
          name: dirtyFieldsPayload?.name || formData.name,
          ...payload,
          address: {
            ...payload.address,
            ...dirtyFieldsPayload?.address,
          },
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
      // You might want to show an error message to the user here
    }
  };

  const handleLocationSelect = (locationData) => {
    // Update address fields based on Google Autocomplete data
    const addressUpdates = {
      city: locationData.city || formData.address.city,
      state: locationData.state || formData.address.state,
      country: locationData.country || formData.address.country,
      pincode: locationData.pincode || formData.address.pincode,
    };

    // Update coordinates
    const coordinatesUpdates = {
      longitude: locationData.lng || formData.coordinates.longitude,
      latitude: locationData.lat || formData.coordinates.latitude,
    };

    // Mark the updated fields as dirty
    Object.keys(addressUpdates).forEach(field => {
      if (addressUpdates[field] !== formData.address[field]) {
        setDirtyFields(prev => new Set(prev).add(`address.${field}`));
      }
    });

    Object.keys(coordinatesUpdates).forEach(field => {
      if (coordinatesUpdates[field] !== formData.coordinates[field]) {
        setDirtyFields(prev => new Set(prev).add(`coordinates.${field}`));
      }
    });

    // Update the form data
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        ...addressUpdates
      },
      coordinates: coordinatesUpdates
    }));

    // Clear any errors for fields that are now populated
    const newErrors = { ...errors };
    Object.keys(addressUpdates).forEach(field => {
      if (addressUpdates[field] && newErrors[`address.${field}`]) {
        delete newErrors[`address.${field}`];
      }
    });
    setErrors(newErrors);
  };

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

      {/* Rest of the form JSX remains the same */}
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
                      <span className="text-xs text-red-400">
                        {errors.phone}
                      </span>
                    )}
                  </div>

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

            {/* Google Autocomplete */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Search Address</label>
              <LocationAutocomplete
                className={baseClasses}
                onLocationSelect={handleLocationSelect}
                regionRestriction="" // Optional: Add country restriction like "in" for India
              />
              <p className="text-xs text-gray-400 mt-1">
                Search for your address to automatically fill city, state, country and pincode
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
        </div>
        {/* Just update the submit button text */}
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
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating
              ? "Processing..."
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

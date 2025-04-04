import { useState } from 'react';
import { useUploadImagesMutation } from '../../redux/apiSlices/owner/product';

const useImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadImages] = useUploadImagesMutation();

  const uploadImagesHandler = async (files, onSuccess) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      const result = await uploadImages(formData).unwrap();
      onSuccess(result?.url); // Call onSuccess with the array of image URLs
    } catch (error) {
      setError(error.data?.message || error.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return { uploadImages: uploadImagesHandler, loading, error };
};

export default useImageUpload;

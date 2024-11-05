

import React from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../vendors/addVendor';
import BasicButton from '../../../atom/button/BasicButton';

const ProductForm = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    product_details: Yup.array().of(
      Yup.object().shape({
        prices: Yup.number().required('Price is required'),
        imageLink: Yup.array().of(Yup.string().required('Image link is required')).min(1, 'At least one image is required'),
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        specifications: Yup.string().required('Specifications are required'),
        details: Yup.array().of(
          Yup.object().shape({
            'Cake Flavour': Yup.string().required('Cake Flavour is required'),
            'Best Before': Yup.string().required('Best Before date is required'),
          })
        ).min(1, 'At least one detail is required'),
        amenities: Yup.array().of(
          Yup.object().shape({
            Delivery: Yup.string().required('Delivery information is required'),
          })
        ).min(1, 'At least one amenity is required'),
        event: Yup.array().of(Yup.string().required('Event is required')).min(1, 'At least one event is required'),
        rating: Yup.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5').required('Rating is required'),
        reviews: Yup.array().of(
          Yup.object().shape({
            user_id: Yup.string().required('User ID is required'),
            reviews: Yup.string().required('Review is required'),
          })
        ).min(1, 'At least one review is required'),
        tags: Yup.array().of(Yup.string().required('Tag is required')).min(1, 'At least one tag is required'),
        weight: Yup.array().of(Yup.string().required('Weight is required')).min(1, 'At least one weight is required'),
        brand: Yup.string().required('Brand is required'),
        color: Yup.array().of(Yup.string().required('Color is required')).min(1, 'At least one color is required'),
      })
    ).min(1, 'At least one product detail is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      product_details: [
        {
          prices: 0,
          imageLink: [],
          title: '',
          description: '',
          specifications: '',
          details: [
            { 'Cake Flavour': '', 'Best Before': '' },
          ],
          amenities: [
            { Delivery: '' },
          ],
          event: [],
          rating: 0,
          reviews: [
            { user_id: '', reviews: '' },
          ],
          tags: [],
          weight: [],
          brand: '',
          color: [],
        },
      ],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Product Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-300">Product Details</h2>
          {/* Display product details fields here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Price</label>
              <Input
                name="product_details.0.prices"
                type="number"
                {...register('product_details.0.prices')}
                className="bg-[#161b22] border-gray-800 text-gray-300"
                error={errors.product_details?.[0]?.prices?.message}
              />
            </div>
            {/* Add more product details fields here */}
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-300">Images</h2>
          {/* Display image link fields here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Image Link</label>
              <Input
                name="product_details.0.imageLink.0"
                {...register('product_details.0.imageLink.0')}
                className="bg-[#161b22] border-gray-800 text-gray-300"
                error={errors.product_details?.[0]?.imageLink?.[0]?.message}
              />
            </div>
            {/* Add more image link fields here */}
          </div>
        </div>

        {/* Other Sections */}
        {/* Add other form sections like Title, Description, Specifications, etc. */}
      </div>

      <div className="flex justify-end">
        <BasicButton className="bg-blue-800/50 hover:bg-blue-800 text-gray-300 px-4 py-2 rounded-lg">
          Save
        </BasicButton>
      </div>
    </form>
  );
};



function AddProductModal() {
  return (
    <div><h2 className="text-xl font-semibold text-gray-300 mb-5 flex gap-2 items-center">
      Add Product
    </h2>
      <ProductForm />
    </div>
  )
}

export default AddProductModal
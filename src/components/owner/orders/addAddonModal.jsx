import React, { useMemo, useState } from 'react'
import { useGetAddOnQuery } from '../../../redux/apiSlices/ecom/productsApiSlice';
import AddonCard from '../../../molecules/cards/AddonCard';
import BasicButton from '../../../atom/button/BasicButton';
import CategoryFilter from '../../../molecules/CategoryFilter';
import { useFormContext } from 'react-hook-form';

function AddAddonModal({ getSelectedAddons }) {
    const { data } = useGetAddOnQuery();
    const [activeCategory, setActiveCategory] = useState("All");
    const [quantities, setQuantities] = useState({});

    const categories = useMemo(
        () => ["All", ...new Set(data?.data ? data?.data?.map((p) => p.category) : [])],
        [data?.data]
    );
    const filteredProducts = useMemo(
        () => data?.data ?
            activeCategory === "All"
                ? data?.data
                : data?.data.filter((p) => p.category === activeCategory) : [],
        [activeCategory, data?.data]
    );

    const handleQuantityChange = (productId, newQuantity) => {
        setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
    };



  

    const handleSubmitAddons =  () => {
        const addonsArr = Object.keys(quantities)?.map((item) => {
            const addON_id = Array.isArray(data?.data)
              ? data?.data.find((el) => el.addOn_id == item)
              : [];
            return {
             ...addON_id,
             image: addON_id?.images,
              count:{count: quantities[item]},
            };
          });
          getSelectedAddons(addonsArr ?? [])
    };

    return (
        <div className='space-y-4'>
            

            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 overflow-y-auto h-[62vh] hide-scrollbar">
                {filteredProducts.map((product) => (
                    <AddonCard
                        key={product.addOn_id}
                        product={product}
                        quantity={quantities[product.addOn_id] || 0}
                        onQuantityChange={handleQuantityChange}
                        darkMode
                    />
                ))}
            </div>
            <BasicButton
                type="button"
                className="border-gray-300 w-full text-gray-300 px-4 py-2 bg-orange-800/50 rounded-lg"
                onClick={handleSubmitAddons}
              >
                Add Addons
              </BasicButton>
              
            
        </div>)
}

export default AddAddonModal
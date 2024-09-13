import React, { memo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Basicheader from './header/Basicheader';
import Cookies from 'js-cookie';

// Form validation schema
const schema = yup.object().shape({
    recipientName: yup.string().required("Recipient's Name is required"),
    recipientAddress: yup.string().required("Recipient's Address is required"),
    recipientMobile: yup.string().required("Recipient's Mobile is required"),
    recipientAltMobile: yup.string(),
    recipientEmail: yup.string().email('Invalid email'),
    landmark: yup.string(),
});

const Card = memo(() => (
    <div className='flex px-3 gap-3'>
        <img
            src="https://www.fnp.com/images/pr/s/v20240829111259/decorated-chocolate-truffle-cake-half-kg_1.jpg"
            className='h-[75px] aspect-square object-fill rounded-lg'
        />
        <div className='text-left truncate pt-3'>
            <h3 className='font-medium'>Decorated Chocolate Truffle Cake Half Kg</h3>
            <p className='text-slate-500'>575 x 1 No</p>
        </div>
    </div>
));

const InputField = memo(({ id, label, register, errors, type = "text", boxClass }) => (
    <div className={`relative ${boxClass}`}>
        <input
            type={type}
            id={id}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
            placeholder=" "
            {...register(id)}
        />
        <label
            htmlFor={id}
            className="absolute left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
            {label}
        </label>
        {errors[id] && <p className="text-left text-red-500 text-xs">{errors[id].message}</p>}
    </div>
));

const SelectField = memo(({ id, label, register, options, hideLabel }) => (
    <div className="relative z-0 w-full">
        <select
            id={id}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-slate-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
            {...register(id)}
        >
            {options.map(({ value, label }) => (
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
        <label
            htmlFor={id}
            className={`${hideLabel && "hidden"} absolute left-3 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`}
        >
            {label}
        </label>
    </div>
));

const RadioButton = memo(({ id, label, register, value }) => (
    <div className="flex items-center">
        <input type="radio" id={id} value={value} {...register('addressType')} />
        <label htmlFor={id} className="ml-2 text-sm">
            {label}
        </label>
    </div>
));

function AddNewAddress() {
    const methods = useForm({
        resolver: yupResolver(schema),
    });

    const { register, handleSubmit, formState: { errors } } = methods;

    const onSubmit = (data) => {
        console.log(data);
        alert(JSON.stringify(data));
    };

    console.log(methods.getValues())

    return (
        <>
            <Basicheader num={2} title={'Add New Address'} />
            <section className='w-full mt-20 flex flex-col gap-3 border-b-2 pb-2'>
                <Card />
                <h3 className='text-left font-semibold text-slate-600 mt-3 mb-2 px-3'>Addons</h3>
                {[...Array(3
                )].map((_, i) => <Card key={i} />)}
            </section>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="h-full  px-3 flex flex-col gap-2 pb-2">
                    <div className="grid  grid-cols-[25%,75%] gap-2 mt-4">
                        <SelectField
                            id="title"
                            label="Title"
                            register={register}
                            options={[
                                { value: "Mr", label: "Mr." },
                                { value: "Mrs", label: "Mrs." },
                                { value: "Ms", label: "Ms." },
                                { value: "Dr", label: "Dr." },
                            ]}
                            hideLabel={true}
                        />
                        <InputField
                            boxClass={``}
                            id="recipientName"
                            label="* Recipient Name"
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <InputField
                        id="recipientAdd"
                        label="* Recipient's Address"
                        register={register}
                        errors={errors}
                    />
                    <InputField
                        id="landmark"
                        label="Landmark"
                        register={register}
                        errors={errors}
                    />
                    <div className='flex gap-2 my-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                        </svg>
                        <span>{Cookies.get('city')}, {Cookies.get('pincode')}</span>
                    </div>
                    <div className="grid  grid-cols-[25%,75%] gap-2 ">
                        <SelectField
                            id="reccountryCode"
                            label="Country Code"
                            register={register}
                            options={[
                                { value: "+91", label: "+91 IND" },
                                { value: "+1", label: "+1 USA" },
                                { value: "+44", label: "+44 UK" },
                            ]}
                            hideLabel={true}
                        />
                        <InputField
                            id="recphone"
                            label="* Recipient's Mobile"
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="grid  grid-cols-[25%,75%] gap-2 ">
                        <SelectField
                            id="altreccountryCode"
                            label="Alt Country Code"
                            register={register}
                            options={[
                                { value: "+91", label: "+91 IND" },
                                { value: "+1", label: "+1 USA" },
                                { value: "+44", label: "+44 UK" },
                            ]}
                            hideLabel={true}
                        />
                        <InputField
                            id="altrecphone"
                            label="* Alternate Mobile"
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <InputField
                        id="recaltemail"
                        label="Recipient Alt email"
                        register={register}
                        errors={errors}
                    />
                    <div className="flex justify-between mt-4">
                        <label className="text-sm">Address Type</label>
                        <RadioButton id="home" label="Home" register={register} value="home" />
                        <RadioButton id="work" label="Work" register={register} value="work" />
                        <RadioButton id="other" label="Other" register={register} value="other" />
                    </div>
                    <button type="submit" className="bg-pink-600 text-white py-2 mt-4 rounded-lg w-full focus:scale-95">Add Address</button>
                </form>
            </FormProvider>
        </>
    );
}

export default memo(AddNewAddress);

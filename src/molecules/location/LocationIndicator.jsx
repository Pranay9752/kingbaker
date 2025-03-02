import { MapPin } from 'lucide-react'
import React, { useState } from 'react'
import getCookie from '../../atom/utils/getCookies'
import LocationPopover from './LoationPopover'

function LocationIndicator() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>

        <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex justify-start gap-2 bg-gray-100 text-gray-600 rounded-md items-center p-2 px-5'>
            <MapPin /> <h2 className='whitespace-nowrap font-semibold text-base'>{
                getCookie("pincode") ? <span>
                    Deliver To <span className='underline'>{getCookie("pincode")}</span>
                </span> : "Select Delivery Location"}
            </h2>

        </div>
        {
            isOpen && <LocationPopover onClose={() => setIsOpen(!isOpen)} />
        }
        </>
    )
}

export default LocationIndicator
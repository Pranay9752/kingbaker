import React from 'react'
import BasicNav from '../../../atom/nav/BasicNav'
import { useNavigate } from 'react-router-dom';

function Basicheader({title, num}) {
    const navigate = useNavigate();

    return (
        <BasicNav className={`flex justify-between items-center`}>
            <svg onClick={() => navigate(-1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>

            <span className="text-lg font-medium">{title}</span>
            <span>{num}/3</span>

        </BasicNav>
    )
}

export default Basicheader
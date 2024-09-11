

import React from 'react'

function BasicNav({ children, className }) {
    return (
        <nav className={`fixed top-0 left-0 right-0 bg-[#7e8035] text-white p-4 flex items-center z-10 justify-between ${className}`}>
            {children}
        </nav>)
}

export default BasicNav
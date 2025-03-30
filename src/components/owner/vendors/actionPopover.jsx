import { useState, useRef, useEffect } from "react";

export default function ActionPopover({ onProductMapping }) {
    const [open, setOpen] = useState(false);
    const popoverRef = useRef(null);

    // Close popover when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <td className="p-4 bg-[#1a1f25] border border-gray-800 group-hover:bg-[#22272e] transition-all duration-200 rounded-r-lg">
            <div className="relative" ref={popoverRef}>
                <button
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition duration-300"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!open);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 text-white"
                    >
                        <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                    </svg>
                </button>

                {open && (
                    <div className="absolute z-10 right-0 mt-2 w-44 bg-gray-900 border border-gray-700 rounded-md shadow-lg overflow-hidden animate-fadeIn">
                        <ul className="text-sm text-white divide-y divide-gray-700">
                            <li
                                className="p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-2 transition duration-300"
                                onClick={() => console.log("Deactivate Vendor")}
                            >
                                <span className="text-red-400">🚫</span> Deactivate Vendor
                            </li>
                            <li
                                className="p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-2 transition duration-300"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onProductMapping?.()
                                }}
                            >
                                <span className="text-green-400">🔗</span> Product Mapping
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </td>
    );
}

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  {
    title: "BIRTHDAY",
    content: [
      {
        category: "MUST HAVES",
        items: [
          "Flowers",
          "Flowers N Cakes",
          "Cakes",
          "Flowers N Chocolates",
          "Plants",
          "Combos",
          "Gift Hampers",
          "Personalised Gifts",
          "Chocolates",
          "Greeting Cards",
        ],
      },
      {
        category: "PRIME PICKS",
        items: [
          "All Gifts",
          "Bestsellers",
          "Premium Gifts",
          "Unusual Gifts",
          "New Arrivals",
          "Midnight Delivery",
          "Return Gifts",
        ],
      },
      {
        category: "PERSONAL PICKS",
        items: ["Plant Lover", "Wanderer", "Foodies", "Music Fan"],
      },
      {
        category: "AGE PERFECT GIFTS",
        items: [
          "1st Birthday",
          "10th Birthday",
          "18th Birthday",
          "50th Birthday",
        ],
      },
      {
        category: "TREASURE TROVE",
        items: [
          "Spiritual Gifts",
          "Electronics",
          "Jewellery",
          "Exotic Flowers",
          "Experiential Gifts",
          "Toys N Games",
          "Balloon Decor",
          "Gifts N Guitarist",
        ],
      },
      {
        category: "PRICE WISE GIFTS",
        items: [
          "Rs500 - Rs1000",
          "Rs1000 - Rs2000",
          "above Rs2000",
          "Below 500",
        ],
      },
    ],
  },
  {
    title: "CAKES",
    content: [
      {
        category: "MUST",
        items: [
          "Flowers",
          "Flowers N Cakes",
          "Cakes",
          "Flowers N Chocolates",
          "Plants",
          "Combos",
          "Gift Hampers",
          "Personalised Gifts",
          "Chocolates",
          "Greeting Cards",
        ],
      },
      {
        category: "PRIME",
        items: [
          "All Gifts",
          "Bestsellers",
          "Premium Gifts",
          "Unusual Gifts",
          "New Arrivals",
          "Midnight Delivery",
          "Return Gifts",
        ],
      },
      {
        category: "PERSONAL",
        items: ["Plant Lover", "Wanderer", "Foodies", "Music Fan"],
      },
      {
        category: "AGE PERFECT",
        items: [
          "1st Birthday",
          "10th Birthday",
          "18th Birthday",
          "50th Birthday",
        ],
      },
      {
        category: "TREASURE TROVE",
        items: [
          "Spiritual Gifts",
          "Electronics",
          "Jewellery",
          "Exotic Flowers",
          "Experiential Gifts",
          "Toys N Games",
          "Balloon Decor",
          "Gifts N Guitarist",
        ],
      },
      {
        category: "PRICE WISE GIFTS",
        items: [
          "Rs500 - Rs1000",
          "Rs1000 - Rs2000",
          "above Rs2000",
          "Below 500",
        ],
      },
    ],
  },
  {
    title: "BIRTHDAY",
    content: [
      {
        category: "MUST HAVES",
        items: [
          "Flowers",
          "Flowers N Cakes",
          "Cakes",
          "Flowers N Chocolates",
          "Plants",
          "Combos",
          "Gift Hampers",
          "Personalised Gifts",
          "Chocolates",
          "Greeting Cards",
        ],
      },
      {
        category: "PRIME PICKS",
        items: [
          "All Gifts",
          "Bestsellers",
          "Premium Gifts",
          "Unusual Gifts",
          "New Arrivals",
          "Midnight Delivery",
          "Return Gifts",
        ],
      },
      {
        category: "PERSONAL PICKS",
        items: ["Plant Lover", "Wanderer", "Foodies", "Music Fan"],
      },
      {
        category: "AGE PERFECT GIFTS",
        items: [
          "1st Birthday",
          "10th Birthday",
          "18th Birthday",
          "50th Birthday",
        ],
      },
      {
        category: "TREASURE TROVE",
        items: [
          "Spiritual Gifts",
          "Electronics",
          "Jewellery",
          "Exotic Flowers",
          "Experiential Gifts",
          "Toys N Games",
          "Balloon Decor",
          "Gifts N Guitarist",
        ],
      },
      {
        category: "PRICE WISE GIFTS",
        items: [
          "Rs500 - Rs1000",
          "Rs1000 - Rs2000",
          "above Rs2000",
          "Below 500",
        ],
      },
    ],
  },
  {
    title: "CAKES",
    content: [
      {
        category: "MUST",
        items: [
          "Flowers",
          "Flowers N Cakes",
          "Cakes",
          "Flowers N Chocolates",
          "Plants",
          "Combos",
          "Gift Hampers",
          "Personalised Gifts",
          "Chocolates",
          "Greeting Cards",
        ],
      },
      {
        category: "PRIME",
        items: [
          "All Gifts",
          "Bestsellers",
          "Premium Gifts",
          "Unusual Gifts",
          "New Arrivals",
          "Midnight Delivery",
          "Return Gifts",
        ],
      },
      {
        category: "PERSONAL",
        items: ["Plant Lover", "Wanderer", "Foodies", "Music Fan"],
      },
      {
        category: "AGE PERFECT",
        items: [
          "1st Birthday",
          "10th Birthday",
          "18th Birthday",
          "50th Birthday",
        ],
      },
      {
        category: "TREASURE TROVE",
        items: [
          "Spiritual Gifts",
          "Electronics",
          "Jewellery",
          "Exotic Flowers",
          "Experiential Gifts",
          "Toys N Games",
          "Balloon Decor",
          "Gifts N Guitarist",
        ],
      },
      {
        category: "PRICE WISE GIFTS",
        items: [
          "Rs500 - Rs1000",
          "Rs1000 - Rs2000",
          "above Rs2000",
          "Below 500",
        ],
      },
    ],
  },
];

const NavBar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navRef = useRef(null);
  const [navWidth, setNavWidth] = useState(0);


  useEffect(() => {
    if (navRef.current) {
      setNavWidth(navRef.current.offsetWidth);
    }

    const handleMouseLeave = (event) => {
      if (!navRef.current.contains(event.relatedTarget)) {
        setActiveItem(null);
      }
    };

    const navElement = navRef.current;
    navElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      navElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const navigate = useNavigate()
  return (
    <div className="w-full hidden md:block" ref={navRef}>
      <nav className="bg-white shadow-md relative">
        <ul className="flex justify-start max-w-[1500px] relative mx-auto space-x-4 ">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setActiveItem(index)}
              onClick={() => navigate('search/' + item.title)}

            >
              <button
                type="button"
                className={`px-3 py-2 font-semibold text-[14px] flex items-center gap-2 ${activeItem === index ? "text-blue-600 bg-white" : "text-gray-700"
                  } hover:text-blue-600`}
              >
                {item.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-4 pt-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </li>
          ))}
          {activeItem !== null && (
            <li className="bg-white shadow-lg p-4 border absolute bottom-0 translate-y-full  w-full max-w-[1600px] -left-4 z-10" style={{ width: navWidth }} >
              <div className="grid grid-cols-6 gap-4">
                {navItems[activeItem].content.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-2">
                    <h3 className="font-bold text-gray-700">{category.category}</h3>
                    <ul className="space-y-1">
                      {category.items.map((item, itemIndex) => (
                        <li
                          onClick={() => navigate('search/' + item)}
                          key={itemIndex}
                          className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          )}
        </ul>
      </nav>

    </div>
  );
};

export default NavBar;

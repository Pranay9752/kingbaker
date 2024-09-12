/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import NavBar from "./NavBar";
import TopNavbar from "../../molecules/header/TopNavBar";
import BirthdayCollection from "./BirthdayCollection";
import { twMerge } from "tailwind-merge";
import Carousel from "./CarouselSlider";
import GiftFinder from "./GiftFinder";
import CardCarousel from "./CardCarousel";
import CategoriesCard from "./CategoriesCard";
import TextTitleComponent from "./TextTitleComponent";
import GiftGrid from "./GiftCard";
import CardThree from "./CardThree";
import CustomGrid from "./CustomGrid";

export const getCard = ({ data }) => {
  console.log("data: ", data);
  const cards = {
    card3: <CardThree data={data} />,
  };

  return cards[data?.type] ?? <></>;
};

const mainStructure = {
  data: {
    meta_data: {
      backgroundColor: "#f2f2f2",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    data: [
      {
        item_ranked: 1,
        title: null,
        type: "carusel_full",
        containerStyle: {},

        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk%20(3)-8-9-24.jpg",
            type: "image",
            route: "/route1",
            text: "",
            cardStyle: { height: "30vh" },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk%20(3)-8-9-24.jpg",
            type: "image",
            route: "/route1",
            text: "",
            cardStyle: { height: "30vh" },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk%20(3)-8-9-24.jpg",
            type: "image",
            route: "/route1",
            text: "",
            cardStyle: { height: "30vh" },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk%20(3)-8-9-24.jpg",
            type: "image",
            route: "/route1",
            text: "",
            cardStyle: { height: "30vh" },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Gourmet_Desk%20(3)-8-9-24.jpg",
            type: "image",
            route: "/route1",
            text: "",
            cardStyle: { height: "30vh" },
          },
        ],
      },
      {
        item_ranked: 2,
        title: null,
        type: "grid",
        containerStyle: {},
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
            type: "card1",
            route: "/route1",
            text: "Birthday",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
            type: "card1",
            route: "/route1",
            text: "Birthday",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
            type: "card1",
            route: "/route1",
            text: "Birthday",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
            type: "card1",
            route: "/route1",
            text: "Birthday",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
            type: "card1",
            route: "/route1",
            text: "Birthday",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
            type: "card1",
            route: "/route1",
            text: "Birthday",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
            type: "card1",
            route: "/route1",
            text: "Birthday",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
            type: "card1",
            route: "/route1",
            text: "Birthday",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
            type: "card1",
            route: "/route1",
            text: "Birthday",
          },
        ],
      },
      {
        item_ranked: 3,
        type: "gift_finder",
        containerStyle: { margin: "0 10%" },
      },
      {
        item_ranked: 4,
        type: "text",
        title: "Celebrate Occasions with India's #1 Online Gift Store",
        description:
          "Thoughtfully curated 139,821 Gift Ideas. Get 2-Hour Delivery & Free Shipping in India.",
      },
      {
        item_ranked: 5,
        title: "Thoughtfully Curated Gifts",
        type: "grid1",
        button: {
          name: "View All",
          style: {
            color: "green",
            fontSize: "16px",
          },
        },
        containerStyle: {
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gridTemplateRows: "repeat(7, 1fr)",
          gap: "20px",
        },
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Hero_DeskV2.jpg",
            type: "card2",
            route: "/route1",
            text: null,
            cardStyle: { gridColumn: "1 / 6", gridRow: "1 / 5" },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Hero_DeskV2.jpg",
            type: "card2",
            route: "/route1",
            text: null,
            cardStyle: { gridColumn: "6 / 11", gridRow: "1 / 5" },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
            type: "card3",
            route: "/route1",
            text: "Let them relish each moment with a Cake from you",
            cardStyle: { gridColumn: "1 / 3", gridRow: "5 / 8" },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
            type: "card3",
            route: "/route1",
            text: "Let them relish each moment with a Cake from you",
            cardStyle: { gridColumn: "3 / 5", gridRow: "5 / 8" },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
            type: "card3",
            route: "/route1",
            text: "Let them relish each moment with a Cake from you",
            cardStyle: { gridColumn: "5 / 7", gridRow: "5 / 8" },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
            type: "card3",
            route: "/route1",
            text: "Let them relish each moment with a Cake from you",
            cardStyle: { gridColumn: "7 / 9", gridRow: "5 / 8" },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
            type: "card3",
            route: "/route1",
            text: "Let them relish each moment with a Cake from you",
            cardStyle: { gridColumn: "9 / 11", gridRow: "5 / 8" },
          },
        ],
      },
      {
        item_ranked: 6,
        title: "Gifts In Trend",
        type: "carousel",
        containerStyle: {},
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
        ],
      },
      {
        item_ranked: 6,
        title: "The Birthday 2024 Collection",
        type: "customGrid",
        containerStyle: {},
        innerContainerStyle: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
        },
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
        ],
      },

      {
        item_ranked: 6,
        title: "Best Sellers",
        type: "customGrid",
        containerStyle: {},
        innerContainerStyle: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
        },
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
        ],
      },
      {
        item_ranked: 6,
        title: "Bakery-Fresh Cakes",
        type: "customGrid",
        containerStyle: {},
        innerContainerStyle: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
        },
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
        ],
      },
      {
        item_ranked: 6,
        title: "Anniversary : Rekindle Love",
        type: "customGrid",
        containerStyle: {},
        innerContainerStyle: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
        },
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
        ],
      },
      {
        item_ranked: 6,
        title: "Gifts worth waiting for",
        type: "customGrid",
        containerStyle: {},
        innerContainerStyle: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
        },
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
        ],
      },
      {
        item_ranked: 6,
        title: "Gifts that Go together",
        type: "customGrid",
        containerStyle: {},
        innerContainerStyle: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
        },
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
          },
        ],
      },
      {
        item_ranked: 6,
        title: "Recently Viewed By You",
        type: "customGrid",
        containerStyle: {},
        innerContainerStyle: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
        },
        boxStyle: {
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid",
        },
        items: [
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
            button: {
              name: "Buy Now",
              style: {
                backgroundColor: "#FFC300",
                fontSize: "14px",
                margin: "0 auto",
              },
            },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
            button: {
              name: "Buy Now",
              style: {
                backgroundColor: "#FFC300",
                fontSize: "14px",
                margin: "0 auto",
              },
            },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
            button: {
              name: "Buy Now",
              style: {
                backgroundColor: "#FFC300",
                fontSize: "14px",
                margin: "0 auto",
              },
            },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
            button: {
              name: "Buy Now",
              style: {
                backgroundColor: "#FFC300",
                fontSize: "14px",
                margin: "0 auto",
              },
            },
          },
          {
            image:
              "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
            type: "card3",
            route: "/route1",
            text: "Bouquet Of 8 Royal Red Roses",
            button: {
              name: "Buy Now",
              style: {
                backgroundColor: "#000",
                fontSize: "14px",
                margin: "0 auto",
              },
            },
          },
        ],
      },
    ],
  },
};
const Home = () => {
  const GetComponents = ({ data }) => {
    const components = {
      carusel_full: (
        <div>
          <Carousel slides={data.items} />
        </div>
      ),
      gift_finder: <GiftFinder />,
      carousel: (
        <div>
          <CardCarousel cards={data} />
        </div>
      ),
      grid: (
        <div>
          <CategoriesCard data={data.items} />
        </div>
      ),
      text: (
        <div>
          <TextTitleComponent
            title={data?.title ?? ""}
            description={data?.description ?? ""}
          />
        </div>
      ),
      customGrid: <CustomGrid cards={data} />,
      grid1: (
        <div>
          <GiftGrid data={data} />
        </div>
      ),
      carousel1: (
        <div>
          <CardCarousel data={data} />
        </div>
      ),
      grid2: (
        <div>
          <BirthdayCollection data={data} />
        </div>
      ),
    };
    return components[data.type] || "hiiiii";
  };

  useEffect(() => {
    document.body.classList.add("bg-[#f2f2f2]");
  }, []);
  return (
    <>
      <TopNavbar
        logo="/path/to/your/logo.png"
        title="logo"
        searchPlaceholder="Search flowers, cakes, gifts, etc."
        currencies={["INR", "USD", "EUR"]}
        deliveryLocationText="Select Delivery Location"
        franchiseEnquiriesText="Franchise Enquiries"
        corporateGiftsText="Corporate Gifts"
        moreOptions={[
          { label: "About Us", link: "/about" },
          { label: "Contact", link: "/contact" },
          { label: "FAQ", link: "/faq" },
        ]}
        userGreeting="Hi Guest"
      />
      <NavBar />
      <div
        style={mainStructure.data.meta_data}
        className={twMerge(
          "p-0 mx-auto max-w-[1600px]",
          mainStructure.data.meta_data
        )}
      >
        {mainStructure.data.data.map((section, index) => {
          return (
            <section key={index} style={section.containerStyle}>
              <GetComponents data={section} />
            </section>
          );
        })}
      </div>
    </>
  );
};

export default Home;

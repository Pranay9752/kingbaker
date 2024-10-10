import DeliveryInfo from "../../molecules/DeliveryInfo";
import EggOptions from "../../molecules/EggOption";
import PriceInfo from "../../molecules/PriceInfo";
import Rating from "../../molecules/Rating";
import OffersAvailable from "../../molecules/OffersAvailable";
import ProductMetaDetail from "../../molecules/ProductMetaDetail";
import ProductCarousel from "../../molecules/carousal/ProductCarousal";
import ReviewCarousel from "../../molecules/carousal/ReviewCarousal";
import { productscarousels } from "./dummyData";
import ActionButtons from "../../molecules/ActionButtons";

const ProductDetails = ({
  data,
  title,
  rating,
  reviews,
  price,
  taxInfo,
  timeLeft,
}) => {
  console.log("data: ", data);
  const products = [
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    {
      imageUrl:
        "https://fnp.com/images/pr/l/v20190122233454/red-sensation_1.jpg",
      title: "Luxury Love Combo",
      price: "₹2275",
      deliveryInfo: "Earliest Delivery: Today",
      rating: "4.7",
      reviews: "11",
    },
    // Add more products as needed
  ];

  // const data = {
  //   "data": {
  //     "meta_data": {},
  //     "data": [
  //       {
  //         "item_ranked": 1,
  //         "title": null,
  //         "type": "carusel_full",
  //         "containerStyle": {

  //         },

  //         "items": [
  //           {
  //             "image": "http://example.com/image1.jpg",
  //             "type": "image",
  //             "route": "/route1",
  //             "text": ""
  //           },
  //           {
  //             "image": "http://example.com/image1.jpg",
  //             "type": "image",
  //             "route": "/route1",
  //             "text": ""
  //           },
  //           {
  //             "image": "http://example.com/image1.jpg",
  //             "type": "image",
  //             "route": "/route1",
  //             "text": ""
  //           },
  //           {
  //             "image": "http://example.com/image1.jpg",
  //             "type": "image",
  //             "route": "/route1",
  //             "text": ""
  //           },
  //           {
  //             "image": "http://example.com/image1.jpg",
  //             "type": "image",
  //             "route": "/route1",
  //             "text": ""
  //           },
  //           {
  //             "image": "http://example.com/image1.jpg",
  //             "type": "image",
  //             "route": "/route1",
  //             "text": ""
  //           },
  //           {
  //             "image": "http://example.com/image1.jpg",
  //             "type": "image",
  //             "route": "/route1",
  //             "text": ""
  //           },
  //           {
  //             "image": "http://example.com/image1.jpg",
  //             "type": "image",
  //             "route": "/route1",
  //             "text": ""
  //           }
  //         ]
  //       },
  //       {
  //         "item_ranked": 2,
  //         "title": null,
  //         "type": "grid",
  //         "containerStyle": {

  //         },
  //         "items": [
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
  //             "type": "card1",
  //             "route": "/route1",
  //             "text": "Birthday"
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
  //             "type": "card1",
  //             "route": "/route1",
  //             "text": "Birthday"
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
  //             "type": "card1",
  //             "route": "/route1",
  //             "text": "Birthday"
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
  //             "type": "card1",
  //             "route": "/route1",
  //             "text": "Birthday"
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
  //             "type": "card1",
  //             "route": "/route1",
  //             "text": "Birthday"
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
  //             "type": "card1",
  //             "route": "/route1",
  //             "text": "Birthday"
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
  //             "type": "card1",
  //             "route": "/route1",
  //             "text": "Birthday"
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
  //             "type": "card1",
  //             "route": "/route1",
  //             "text": "Birthday"
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Birthday_Squircle-28624.jpg",
  //             "type": "card1",
  //             "route": "/route1",
  //             "text": "Birthday"
  //           }
  //         ]
  //       },
  //       {
  //         "item_ranked": 3,
  //         "title": "Thoughtfully Curated Gifts",
  //         "type": "grid",
  //         "button": {
  //           "name": "View All",
  //           "style": {
  //             "color": "green",
  //             "fontSize": "16px"
  //           }
  //         },
  //         "containerStyle": {
  //           "display": 'grid',
  //           "gridTemplateColumns": 'repeat(10, 1fr)',
  //           "gridTemplateRows": 'repeat(7, 1fr)',
  //           "gap": '10px',
  //         },
  //         items: [
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Hero_DeskV2.jpg",
  //             "type": "card2",
  //             "route": "/route1",
  //             "text": null,
  //             "cardStyle": { gridColumn: '1 / 6', gridRow: '1 / 5' }
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Hero_DeskV2.jpg",
  //             "type": "card2",
  //             "route": "/route1",
  //             "text": null,
  //             "cardStyle": { gridColumn: '6 / 11', gridRow: '1 / 5' }
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
  //             "type": "card3",
  //             "route": "/route1",
  //             "text": "Let them relish each moment with a Cake from you",
  //             "cardStyle": { gridColumn: '1 / 3', gridRow: '5 / 8' }
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
  //             "type": "card3",
  //             "route": "/route1",
  //             "text": "Let them relish each moment with a Cake from you",
  //             "cardStyle": { gridColumn: '3 / 5', gridRow: '5 / 8' }
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
  //             "type": "card3",
  //             "route": "/route1",
  //             "text": "Let them relish each moment with a Cake from you",
  //             "cardStyle": { gridColumn: '5 / 7', gridRow: '5 / 8' }
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
  //             "type": "card3",
  //             "route": "/route1",
  //             "text": "Let them relish each moment with a Cake from you",
  //             "cardStyle": { gridColumn: '7 / 9', gridRow: '5 / 8' }
  //           },
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/shop-by-cat/new/SBB-Desk_Eggless-Cakes.jpg",
  //             "type": "card3",
  //             "route": "/route1",
  //             "text": "Let them relish each moment with a Cake from you",
  //             "cardStyle": { gridColumn: '9 / 11', gridRow: '5 / 8' }
  //           }

  //         ]
  //       },
  //       {
  //         "item_ranked": 4,
  //         "title": 'Gifts In Trend',
  //         "type": "carousel",
  //         "containerStyle": {
  //         },
  //         items: [{
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }, {
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }, {
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }, {
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }, {
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }, {
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }, {
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }, {
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }, {
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }, {
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }, {
  //           "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Flowers-14324.jpg",
  //           "type": "card3",
  //           "route": "/route1",
  //           "text": "Bouquet Of 8 Royal Red Roses",
  //         }]
  //       },
  //       {
  //         "item_ranked": 5,
  //         "title": 'The 2024 Birth Day Collection',
  //         "type": "grid",
  //         "button": {
  //           "name": "View All",
  //           "style": {
  //             "color": "green",
  //             "fontSize": "16px"
  //           }
  //         },
  //         "containerStyle": {
  //           "display": 'grid',
  //           "gridTemplateColumns": 'repeat(10, 2fr)',
  //         },
  //         items: [
  //           {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Cakes-14324.jpg",
  //             "type": "card3",
  //             "route": "/route1",
  //             "text": "Cakes",
  //           }, {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Cakes-14324.jpg",
  //             "type": "card3",
  //             "route": "/route1",
  //             "text": "Cakes",
  //           }, {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Cakes-14324.jpg",
  //             "type": "card3",
  //             "route": "/route1",
  //             "text": "Cakes",
  //           }, {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Cakes-14324.jpg",
  //             "type": "card3",
  //             "route": "/route1",
  //             "text": "Cakes",
  //           }, {
  //             "image": "https://www.fnp.com/assets/images/custom/new-desk-home/birthday-bestsellers/2023/BIRTHDAY_Web_Cakes-14324.jpg",
  //             "type": "card3",
  //             "route": "/route1",
  //             "text": "Cakes",
  //           },]
  //       },
  //     ]
  //   }
  // }

  return (
    <>
      <div className="md:hidden absolute top-[calc(48vh+56px)] left-0 right-0 m in-h-[calc(100vh-100px)] bg-white rounded-t-lg  flex flex-col text-left gap-4 ">
        <div className="p-2 flex flex-col gap-2">
          <h2 className="text-lg mb-2 truncate">{data?.title}</h2>
          <Rating score={data?.rating ?? 0} reviews={data?.reviews ?? []} />
          <PriceInfo price={data?.prices ?? 0} taxInfo={taxInfo} />
          <EggOptions />
        </div>
        <div className="bg-gray-100 p-2">
          <DeliveryInfo key={"mobileDel"} />
        </div>
        <div className="p-2 flex flex-col gap-4">
          <OffersAvailable />
          {/* <ProductMetaDetail details={data?.details ?? []} /> */}

          <ReviewCarousel
            reviews={data?.reviews ?? []}
            title={"What customers are saying"}
          />
          <ProductCarousel
            title=""
            products={products}
            className="my-custom-class"
            cardClassName="my-card-class"
          />
          <ProductCarousel
            title="You may also like"
            products={products}
            className="my-custom-class"
            cardClassName="my-card-class"
          />
          <ProductCarousel
            title="What others are viewing"
            products={products}
            className="my-custom-class"
            cardClassName="my-card-class"
          />
          <div className="h-32" />
        </div>
      </div>

      <div className="hidden md:flex flex-col gap-2 ">
        <h2 className="text-xl font-medium  truncate text-left">{title}</h2>
        <Rating score={rating} reviews={reviews} />
        <PriceInfo price={price} taxInfo={taxInfo} />
        <DeliveryInfo key={"desktopDel"} />
        <ActionButtons productId={data?._id} />
        <OffersAvailable />
        {/* <ProductMetaDetail details={data?.details ?? []} /> */}
      </div>
    </>
  );
};

export default ProductDetails;

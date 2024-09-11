import DeliveryInfo from "../../molecules/DeliveryInfo";
import EggOptions from "../../molecules/EggOption";
import PriceInfo from "../../molecules/PriceInfo";
import Rating from "../../molecules/Rating";
import OffersAvailable from "../../molecules/OffersAvailable";
import ProductMetaDetail from "../../molecules/ProductMetaDetail";
import ProductCarousel from "../../molecules/carousal/ProductCarousal";
import ReviewCarousel from "../../molecules/carousal/ReviewCarousal";
import { productscarousels } from "./dummyData";

const ProductDetails = ({
  title,
  rating,
  reviews,
  price,
  taxInfo,
  timeLeft,
  data
}) => {
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
    <div className="absolute top-[calc(48vh+56px)] left-0 right-0 m in-h-[calc(100vh-100px)] bg-white rounded-t-lg  flex flex-col text-left gap-4 ">
      <div className="p-2 flex flex-col gap-2">
        <h2 className="text-lg mb-2 truncate">{data?.title ?? ""}</h2>
        <Rating score={data?.rating ?? 0} reviews={data.reviews?.data?.length ?? 0} />
        <PriceInfo price={data?.price ?? 0} taxInfo={taxInfo} />
        <EggOptions />
      </div>
      <main className="grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 2fr)',
        gridTemplateRows: 'repeat(7, 1fr)',
        gap: '20px',
      }}>
        <div className="box" style={{ gridColumn: '1 / 6', gridRow: '1 / 5' }}>1</div>
        <div className="box" style={{ gridColumn: '6 / 11', gridRow: '1 / 5' }}>2</div>
        <div className="box" style={{ gridColumn: '1 / 3', gridRow: '5 / 8' }}>3</div>
        <div className="box" style={{ gridColumn: '3 / 5', gridRow: '5 / 8' }}>4</div>
        <div className="box" style={{ gridColumn: '5 / 7', gridRow: '5 / 8' }}>5</div>
        <div className="box" style={{ gridColumn: '7 / 9', gridRow: '5 / 8' }}>6</div>
        <div className="box" style={{ gridColumn: '9 / 11', gridRow: '5 / 8' }}>7</div>
      </main>

      <div className="bg-gray-100 p-2">
        <DeliveryInfo />
      </div>
      <div className="p-2 flex flex-col gap-4">
        <OffersAvailable offers={data?.offers ?? []} />
        <ProductMetaDetail data={data?.meta_data ?? []} />
        <ReviewCarousel title={data?.reviews?.title} reviews={data?.reviews?.data} />
        {
          productscarousels?.map((item, index) => <ProductCarousel key={index}
            title={item?.title ?? ""}
            products={item?.products ?? []}
            className="my-custom-class"
            cardClassName="my-card-class"
          />)
        }
        <div className="h-32" />
      </div>
    </div>
  );
};

export default ProductDetails;

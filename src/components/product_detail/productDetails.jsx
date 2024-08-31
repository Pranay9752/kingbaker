import DeliveryInfo from "../../molecules/DeliveryInfo";
import EggOptions from "../../molecules/EggOption";
import PriceInfo from "../../molecules/PriceInfo";
import Rating from "../../molecules/Rating";
import OffersAvailable from "../../molecules/OffersAvailable";
import ProductMetaDetail from "../../molecules/ProductMetaDetail";
import ProductCarousel from "../../molecules/carousal/ProductCarousal";
import ReviewCarousel from "../../molecules/carousal/ReviewCarousal";

const ProductDetails = ({
  title,
  rating,
  reviews,
  price,
  taxInfo,
  timeLeft,
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
  return (
    <div className="absolute top-[calc(48vh+56px)] left-0 right-0 m in-h-[calc(100vh-100px)] bg-white rounded-t-lg  flex flex-col text-left gap-4 ">
      <div className="p-2 flex flex-col gap-2">
        <h2 className=" mb-2">{title}</h2>
        <Rating score={rating} reviews={reviews} />
        <PriceInfo price={price} taxInfo={taxInfo} />
        <EggOptions />
      </div>
      <div className="bg-gray-100 p-2">
        <DeliveryInfo />
      </div>
      <div className="p-2 flex flex-col gap-4">
        <OffersAvailable />
        <ProductMetaDetail />

        <ReviewCarousel title={"What customers are saying"} />
        <ProductCarousel
          title="Recently viewed by you"
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
  );
};

export default ProductDetails;

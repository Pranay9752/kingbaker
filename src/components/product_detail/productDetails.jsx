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
        <ActionButtons product={data}  productId={data?._id} />
        <OffersAvailable />
        {/* <ProductMetaDetail details={data?.details ?? []} /> */}
      </div>
    </>
  );
};

export default ProductDetails;

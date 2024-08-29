import DeliveryInfo from "../../molecules/DeliveryInfo";
import EggOptions from "../../molecules/EggOption";
import PriceInfo from "../../molecules/PriceInfo";
import Rating from "../../molecules/Rating";
import OffersAvailable from "../../molecules/OffersAvailable";
import ProductMetaDetail from "../../molecules/ProductMetaDetail";

const ProductDetails = ({ title, rating, reviews, price, taxInfo, timeLeft }) => (
    <div className="absolute top-[calc(33vh+56px)] left-0 right-0 m in-h-[calc(100vh-100px)] bg-white rounded-t-lg  flex flex-col text-left gap-4 ">
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
        </div>

    </div>
);

export default ProductDetails;
import OfferItem from "./OfferItem";

const OffersAvailable = ({ offers }) => (
    <div id="offersAvailable" className="mb-4">
        <h3 className="text-lg mb-2 flex items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" />
            </svg><span className='ml-2 md:text-xl md:font-medium'>Offers Available</span>
        </h3>
        <OfferItem
            logo="https://i.ibb.co/LPFC6F8/logoking.png"
            description="FLAT 10% Off. Code: JOJO (for deliveries in India)"
            terms
        />
        <OfferItem
            logo="https://i.ibb.co/LPFC6F8/logoking.png"
            description="15% Off* on 1st Order, Code: FIRSTORDER"
            terms
        />
        <OfferItem
            logo="https://i.ibb.co/LPFC6F8/logoking.png"
            description="Amazon Pay - Get cashback upto Rs 250"
            terms
        />
        <OfferItem
            logo="https://i.ibb.co/LPFC6F8/logoking.png"
            description="Cred - Get cash back upto INR 200"
            terms
        />
    </div>
);
export default OffersAvailable;
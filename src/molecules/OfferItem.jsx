


const OfferItem = ({ logo, description, code, terms }) => (
    <div className="grid grid-cols-[25%,65%,10%] px-5 py-4 border text-left place-items-center gap-2">
        <img src={logo} alt="Offer logo" className="w-full mr-2" />
        <div>
            <p className="text-sm">{description}</p>
            {code && <p className="text-xs font-semibold">Code: {code}</p>}
        </div>
        {terms && <span className="text-xs text-blue-500 ">*T&C</span>}
    </div>
);

export default OfferItem;
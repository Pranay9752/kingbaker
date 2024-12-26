import { useState } from "react";
import BasicButton from "../atom/button/BasicButton";
import parse from 'html-react-parser';




const ProductMetaDetail = ({ details }) => {
  console.log('details: ', details);
  const [selectedSection, setSelectedSection] = useState(0);

  const handleChange = (index) => {
    setSelectedSection(index);
  };
  if (details?.length === 0) {
    return <></>;
  }

  console.log(details[selectedSection])

  if (details?.[0]?.key) {
    return <>
      <div id="productMeta" className="grid grid-cols-3 py-2 gap-2 md:hidden">
        <style>
          {`
          .editor ol {
            list-style-type: disc; /* Use bullets for ordered lists */
            padding-left: 1.5rem;
          }
          .editor ul {
            list-style-type: decimal; /* Use numbers for unordered lists */
            padding-left: 1.5rem;
          }
        `}
        </style>
        {details?.map((item, index) => {
          console.log(item)
          return (
            <BasicButton
              type={"button"}
              onClick={() => handleChange(index)}
              key={index}
              className={`${selectedSection == index
                  ? "bg-blue-400 text-white"
                  : "bg-black/30 text-gray-800"
                } rounded-lg`}
            >
              {item?.key ?? ""}
            </BasicButton>
          );
        })}
        <div className="col-span-3">
          {parse(details?.[selectedSection]?.value || '<p>No content to preview</p>')}
        </div>
      </div>
      <div id="productMeta" className="hidden md:flex flex-col gap-3 text-left">
        {details?.map((item, index) => {
          return (
            <div>
              <h4 className="text-xl text-gray-800 font-semibold">
                {item?.key ?? ""}
              </h4>
              <div className="w-full h-[2px] bg-gray-800 rounded-lg my-3" />

              <div className="editor">
                {parse(item?.value || '<p>No content to preview</p>')}
              </div>

            </div>
          );
        })}
      </div>
    </>
  }

  return (
    <>
      <div id="productMeta" className="grid grid-cols-3 py-2 gap-2 md:hidden">
        {details?.map((item, index) => {
          return (
            <BasicButton
              type={"button"}
              onClick={() => handleChange(index)}
              key={index}
              className={`${selectedSection == index
                  ? "bg-blue-400 text-white"
                  : "bg-black/30 text-gray-800"
                } rounded-lg`}
            >
              {item?.label ?? ""}
            </BasicButton>
          );
        })}
        <div className="col-span-3">
          {Object.keys(details?.[selectedSection]?.detail ?? {}).map(
            (key, index) => (
              <div>
                <h3 className="text-base font-bold text-gray-800">{key}:</h3>
                {Array.isArray(details?.[selectedSection]?.detail?.[key]) ? (
                  <ul className="list-disc list-inside text-gray-600 flex flex-col gap-2 m-3 mt-2">
                    {details?.[selectedSection]?.detail[key].map((item, i) => (
                      <li key={i}>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="list-disc list-inside text-gray-600 flex flex-col gap-2 m-3 mt-2">
                    {Object.keys(details?.[selectedSection]?.detail?.[key]).map(
                      (item, i) => (
                        <li key={i}>
                          {item} -{" "}
                          {details?.[selectedSection]?.detail?.[key]?.[item]}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            )
          )}
        </div>
      </div>
      <div id="productMeta" className="hidden md:flex flex-col gap-3 text-left">
        {details?.map((item, index) => {
          return (
            <div>
              <h4 className="text-xl text-gray-800 font-semibold">
                {item?.label ?? ""}
              </h4>
              <div className="w-full h-[2px] bg-gray-800 rounded-lg my-3" />
              {Object.keys(item?.detail ?? {}).map((key, i) => (
                <div>
                  <b className="text-sm  text-gray-800">{key}:</b>
                  {Array.isArray((item?.detail ?? {})?.[key]) ? (
                    <ul className="list-disc list-inside text-gray-600 flex flex-col gap-2 m-3 mt-2">
                      {(item?.detail ?? {})?.[key].map((item, i) => (
                        <li key={i}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-disc list-inside text-gray-600 flex flex-col gap-1 m-3 mt-2 text-sm ">
                      {Object.keys((item?.detail ?? {})?.[key]).map(
                        (item, i) => (
                          <li key={i}>
                            {item} - {(item?.detail ?? {})?.[key]?.[item]}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductMetaDetail;

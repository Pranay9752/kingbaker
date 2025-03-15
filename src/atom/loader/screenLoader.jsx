// import React from "react";
// import Loader from "./loader";

// function ScreenLoader({ isLoading }) {
//   return isLoading ? (
//     <div className="fixed inset-0 z-50 w-[100vw] h-[100vh] flex justify-center items-center bg-black/20">
//       <Loader />
//     </div>
//   ) : (
//     <></>
//   );
// }

// export default ScreenLoader;
import React from "react";
import Loader from "./loader";
import { cn } from "../utils/cn";

const ScreenLoader = React.memo(({ isLoading }) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm",
        // { "overflow-hidden": isLoading }
        !isLoading && "hidden"
      )}
    >
      {isLoading && <Loader />}
    </div>
  );
});

export default ScreenLoader;

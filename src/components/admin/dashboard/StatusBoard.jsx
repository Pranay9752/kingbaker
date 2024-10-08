import { useEffect, useState } from "react";
import StatusBar from "../../../molecules/cards/StatusBar";
import StatusCard from "../../../molecules/cards/StatusCard";
import { useGetalloatedAndAcceptedOrderQuery } from "../../../redux/apiSlices/admin/vendor";

const StatusBoard = () => {
  const [status, setStatus] = useState({});
  const { data, isLoading } = useGetalloatedAndAcceptedOrderQuery({
    vendor_id: "66f5347ec07df9ae95aae79c",
  });
  // const data = [
  //   { title: "Allocated", today: 1, tomorrow: 0, future: 0 },
  //   { title: "Accepted", today: 0, tomorrow: 0, future: 3 },
  //   { title: "Printed", today: 1, tomorrow: 0, future: 0 },
  // ];

  useEffect(() => {
    if (data) {
      setStatus(data.data);
    }
  }, [data]);

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      {Object.keys(status).map((item, index) => {
        const statusCard = status[item];
        console.log("statusCard: ", statusCard);

        return (
          <StatusCard
            key={index}
            title={item}
            today={statusCard?.today ?? {}}
            tomorrow={statusCard?.tomorrow ?? {}}
            future={statusCard?.future ?? {}}
          />
        );
      })}
      <StatusBar className={"mb-14"} title={"Out/Ready For Delivery"} icon />
      <StatusBar title={"Delivery Attempted"} />
      <StatusBar title={"Delivered"} />
    </div>
  );
};

export default StatusBoard;

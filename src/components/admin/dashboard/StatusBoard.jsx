import StatusBar from "../../../molecules/cards/StatusBar";
import StatusCard from "../../../molecules/cards/StatusCard";

const StatusBoard = () => {
  const data = [
    { title: "Allocated", today: 1, tomorrow: 0, future: 0 },
    { title: "Accepted", today: 0, tomorrow: 0, future: 3 },
    { title: "Printed", today: 1, tomorrow: 0, future: 0 },
  ];

  return (
    <div className="py-6 bg-gray-100 min-h-screen">
      {data.map((item, index) => (
        <StatusCard
          key={index}
          title={item.title}
          today={item.today}
          tomorrow={item.tomorrow}
          future={item.future}
        />
      ))}
        <StatusBar className={'mb-14'} title={'Out/Ready For Delivery'} icon />
        <StatusBar title={'Delivery Attempted'} />
        <StatusBar title={'Delivered'} />
    </div>
  );
};

export default StatusBoard;

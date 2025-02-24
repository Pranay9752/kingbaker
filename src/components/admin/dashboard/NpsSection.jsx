import DataTable from "../../../atom/table/DataTable";
import DateRangeOneFilter from "../../../molecules/date/DatePicker";

const NpsSection = () => {
  const headers = [
    "",
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "This Year",
    "Select Date",
  ];
  const tableData = [
    {
      "": "Score",
      today: "N/A",
      yesterday: "N/A",
      thisweek: "N/A",
      thisMonth: "N/A",
      thisyear: "N/A",
      selectdate: "N/A",
    },
    {
      "": "Survey Count",
      today: "0",
      yesterday: "0",
      thisweek: "0",
      thisMonth: "0",
      thisyear: "0",
      selectdate: "0",
    },
    // Add more rows as needed
  ];

  return (
    <section className="mb-8 flex flex-col gap-2">
      <div className="flex justify-between md:w-[82vw] items-center ">
        <span className="text-lg md:text-3xl font-bold ">My NPS</span>

        <DateRangeOneFilter handleDateChange={(date) => console.log(date)} />
      </div>

      <DataTable headers={headers} data={tableData} />
    </section>
  );
};

export default NpsSection;

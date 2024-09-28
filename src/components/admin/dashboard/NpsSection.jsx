import DataTable from "../../../atom/table/DataTable";
import DateRangeOneFilter from "../../../molecules/date/DatePicker";

const NpsSection = () => {
  const headers = [
    "",
    "Today",
    "Yesterday",
    "This Week",
    "This Year",
    "Select Date",
  ];
  const tableData = [
    {
      "": "Score",
      today: "N/A",
      yesterday: "N/A",
      thisweek: "N/A",
      thisyear: "N/A",
      selectdate: "N/A",
    },
    {
      "": "Survey Count",
      today: "0",
      yesterday: "0",
      thisweek: "0",
      thisyear: "0",
      selectdate: "0",
    },
    // Add more rows as needed
  ];

  return (
    <section className="mb-8 flex flex-col gap-2">
      <div className="flex justify-between items-center ">
        <p className="text-lg md:text-3xl font-bold ">My NPS</p>
        <DateRangeOneFilter handleDateChange={(date) => console.log(date)} />
      </div>

      <DataTable headers={headers} data={tableData} />
    </section>
  );
};

export default NpsSection;

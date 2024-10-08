import { format } from "date-fns";

const formatDate = (date, form) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return ""; // Return an empty string or handle the error as needed
  }
  return format(parsedDate, form ?? "dd-MM-yyyy");
};


export default formatDate;

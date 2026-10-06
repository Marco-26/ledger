const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Constants = {
  UI: {
    MONTHS,
    DATE_FORMAT: "YYYY-MM-DD",
    DATE_FORMAT_DISPLAY: "MMM D, YYYY",
  },
  USER: {
    // The API has no accounts yet; swap this for the session user once it does.
    NAME: "Marco",
  },
  ERRORS: {
    DATE_MISMATCH: {
      text1: "Wrong month",
      text2: "This statement doesn't belong to the selected date.",
    },
    GENERAL: {
      text1: "ERROR",
      text2: "There was an error processing your request.",
    },
  },
};

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

const API = {
  QUERY_PARAMS: {
    DATE: "date",
  },
  GENERATE_STATEMENT_FORMDATA_KEY: "file",
  TANSTACK_QUERIES: {
    STATEMENTS: "statements",
    UPLOAD: "uploadStatements",
  },
};

export const Constants = {
  UI: {
    MONTHS,
    DATE_FORMAT: "YYYY-MM-DD",
    DATE_FORMAT_DISPLAY: "MMM D, YYYY",
  },
  API: API,
};

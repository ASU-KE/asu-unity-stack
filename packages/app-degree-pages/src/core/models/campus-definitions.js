// @ts-check

const campusDefinitions = {
  "TEMPE": {
    text: "Tempe campus",
    url: "https://campus.asu.edu/tempe",
  },
  "POLY": {
    text: "Polytechnic campus",
    url: "https://campus.asu.edu/polytechnic",
  },
  "WEST": {
    text: "West Valley campus",
    url: "https://campus.asu.edu/west",
  },
  "DTPHX": {
    text: "Downtown Phoenix campus",
    url: "https://campus.asu.edu/downtown-phoenix",
  },
  "EAC": {
    text: "ASU at The Gila Valley",
    url: "https://admission.asu.edu/transfer/thegilavalley",
  },
  "CAC": {
    text: "ASU at Pinal",
    url: "https://admission.asu.edu/transfer/pinal",
  },
  "ONLNE": {
    text: "Online",
    url: "https://asuonline.asu.edu",
  },
  "CALHC": {
    text: "ASU at Lake Havasu",
    url: "https://havasu.asu.edu",
  },
  "COCHS": {
    text: "ASU at Cochise",
    url: "https://admission.asu.edu/transfer/asu-cochise",
  },
  "WASHD": {
    text: "ASU at Washington D.C.>",
    url: "https://washingtondc.asu.edu",
  },
  "YAVAP": {
    text: "ASU at Yavapai",
    url: "https://admission.asu.edu/transfer/asuyavapai",
  },
  "PIMA": {
    text: "ASU at Pima",
    url: "https://admission.asu.edu/transfer/pima",
  },
  "NEAZ": {
    text: "ASU at Northeastern Arizona",
    url: "https://admission.asu.edu/transfer/asu-northeastern-arizona",
  },
  "LOSAN": {
    text: "ASU at Los Angeles",
    url: "https://california.asu.edu",
  },
  "TUCSN-undergrad": {
    text: "ASU at Tucson",
    url: "https://transfer.asu.edu/tucson",
  },
  "TUCSN-graduate": {
    text: "ASU at Tucson",
    url: "https://admission.asu.edu/contact/graduate",
  },
  "MXCTY": {
    text: "ASU at Mexico City",
    url: "https://admission.asu.edu/contact/graduate",
  },
  "AWC-undergrad": {
    text: "ASU at Yuma",
    url: "https://admission.asu.edu/transfer/asu-yuma",
  },
  "AWC-graduate": {
    text: "ASU at Yuma",
    url: "https://admission.asu.edu/contact/graduate",
  },
};

/**
 *
 * @param {string} campus
 * @param {string} program
 */
const findCampusDefinition = (campus, program) => {
  const specialCases = ["TUCSN", "AWC"];
  const campusKey = campus.toUpperCase();
  const searchKey = specialCases.includes(campusKey)
    ? `${campusKey}-${program}`
    : campusKey;

  return campusDefinitions[searchKey];
};

export { campusDefinitions, findCampusDefinition };

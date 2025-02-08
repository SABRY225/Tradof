import countries from "world-countries";

export default function getLanguages() {
  let data = [];
  countries.forEach((country) => {
    Object.entries(country.languages).forEach(([key, value]) => {
      data.push({
        name: `${value} (${country.cca3})`,
      });
    });
  });
  return data;
}

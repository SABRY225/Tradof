import { openPage, blueOffers, rabash } from "../../../assets/paths.js";

const upcomingProject = [
  {
    id: 1,
    offers: 16,
    description: "Translation of an article about medical tools",
    LanguagePair: {
      from: {
        lang: "English",
        langCode: "en",
        country: "United States",
        countryCode: "US",
      },
      to: {
        lang: "French",
        langCode: "fr",
        country: "France",
        countryCode: "FR",
      },
    },
    category: "Medical",
    deliveryTimeByDays: 3,
    budget: {
      min: 50.25,
      max: 100,
    },
  },
  {
    id: 2,
    offers: 16,
    description: "Translation of an article about medical tools",
    LanguagePair: {
      from: {
        lang: "English",
        langCode: "en",
        country: "United States",
        countryCode: "US",
      },
      to: {
        lang: "French",
        langCode: "fr",
        country: "France",
        countryCode: "FR",
      },
    },
    category: "Medical",
    deliveryTimeByDays: 3,
    budget: {
      min: 50.25,
      max: 100,
    },
  },
  {
    id: 3,
    offers: 16,
    description: "Translation of an article about medical tools",
    LanguagePair: {
      from: {
        lang: "English",
        langCode: "en",
        country: "United States",
        countryCode: "US",
      },
      to: {
        lang: "French",
        langCode: "fr",
        country: "France",
        countryCode: "FR",
      },
    },
    category: "Medical",
    deliveryTimeByDays: 3,
    budget: {
      min: 50.25,
      max: 100,
    },
  },
  {
    id: 4,
    offers: 16,
    description: "Translation of an article about medical tools",
    LanguagePair: {
      from: {
        lang: "English",
        langCode: "en",
        country: "United States",
        countryCode: "US",
      },
      to: {
        lang: "French",
        langCode: "fr",
        country: "France",
        countryCode: "FR",
      },
    },
    category: "Medical",
    deliveryTimeByDays: 3,
    budget: {
      min: 50.25,
      max: 100,
    },
  },
];

export default function UpcomingProject() {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <h1 className="font-medium text-[18px]">Started Projects</h1>
        <img src={openPage} alt="" />
      </div>
      <ul className="space-y-[10px]">
        {upcomingProject.map((project) => {
          return (
            <li
              key={project.id}
              className="flex bg-white py-[10px] px-[30px] rounded-lg shadow"
            >
              <div>
                <div className="text-[18px] font-regular">
                  {project.description}
                </div>
                <ul>
                  <li className="text-[12px] font-semibold">
                    Language pair:{" "}
                    <span className="font-light">
                      {project.LanguagePair.from.lang} (
                      {project.LanguagePair.from.country})-
                      {project.LanguagePair.to.lang} (
                      {project.LanguagePair.to.langCode}) /{" "}
                      {project.LanguagePair.from.langCode} (
                      {project.LanguagePair.from.countryCode})-
                      {project.LanguagePair.to.langCode} (
                      {project.LanguagePair.to.countryCode})
                    </span>
                  </li>
                  <li className="text-[12px] font-semibold">
                    Category:{" "}
                    <span className="font-light">{project.category}</span>
                  </li>
                  <li className="text-[12px] font-semibold">
                    Delivery time:{" "}
                    <span className="font-light">
                      ${project.deliveryTimeByDays} days
                    </span>
                  </li>
                  <li className="text-[12px] font-semibold">
                    Budget:{" "}
                    <span className="font-light">
                      ${project.budget.min} - ${project.budget.max}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col ml-auto justify-between items-end">
                <div className="py-[5px] px-[20px] rounded-lg font-[500] text-[13px] text-main-color flex">
                  <img
                    src={blueOffers}
                    alt="offers icon"
                    width={15}
                    className="mr-1"
                  />{" "}
                  {project.offers} Offers
                </div>
                <button
                  type="button"
                  className="py-[5px] px-[20px] rounded-lg font-[500] text-[13px] text-[#FF3B30] flex"
                >
                  <img
                    src={rabash}
                    alt="offers icon"
                    width={15}
                    className="mr-1"
                  />
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

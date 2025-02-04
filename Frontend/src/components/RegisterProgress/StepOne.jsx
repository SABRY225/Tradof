import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import personcard from "../../assets/icons/personcard.svg";
import companycard from "../../assets/icons/companycard.svg";

export default function StepOne({ data, edit }) {
  const [selectedAccount, setSelectedAccount] = useState("");

  const accountOptions = [
    {
      type: "freelancer",
      img: personcard,
      title: "Freelancer Account",
      description:
        "If you are doing all jobs alone and do not subcontract freelancers.",
    },
    {
      type: "company",
      img: companycard,
      title: "Company Account",
      description:
        "If you are going to assign jobs to in-house translators, freelancers, or other companies. The system will have supplier functionality, and you will be able to assign jobs to your suppliers.",
    },
  ];

  const handleAccountSelect = (accountType) => {
    edit({
      ...data,
      accountType: accountType,
    });
    setSelectedAccount(accountType);
  };

  const AcceptPolicy = () => {
    edit({
      ...data,
      acceptPolicy: true,
    });
  };

  return (
    <div className="font-poppins flex flex-col">
      {accountOptions.map(({ type, img, title, description }) => (
        <motion.div
          key={type}
          whileHover={{ backgroundColor: "#f2f2f294" }}
          transition={{ duration: 0.2, type: "keyframes" }}
          className="flex gap-3 p-1 pt-5 pb-5 cursor-pointer"
          style={{
            backgroundColor:
              selectedAccount === type || data.accountType === type
                ? "#f2f2f294"
                : "#fff",
          }}
          onClick={() => handleAccountSelect(type)}
        >
          <img src={img} alt={type} />
          <div className="text-left">
            <h1 className="font-semibold text-[14px]">{title}</h1>
            <p>{description}</p>
          </div>
        </motion.div>
      ))}

      <label className="custom-radio pt-5 pb-5">
        <input
          type="radio"
          name="policy"
          className="mr-2"
          onChange={AcceptPolicy}
          checked={data.acceptPolicy || false}
        />
        <span className="radio-mark"></span>
        <p className="h-[26px]">
          I agree to the{" "}
          <Link className="font-semibold underline">Terms of Service</Link> and{" "}
          <Link className="font-semibold underline">Privacy Policy</Link>.
        </p>
      </label>
      {data.errors.length > 0 &&
        data.errors.map((error) => (
          <div
            key={error}
            className="errors text-left text-[#f00] font-regular text-[14px]"
          >
            {error}
          </div>
        ))}
    </div>
  );
}

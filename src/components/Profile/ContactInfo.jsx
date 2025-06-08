import PhoneInput from "react-phone-number-input";

const DisableInput = ({ label, value }) => {
  return (
    <div className="flex flex-col w-[300px] gap-1">
      <label className="text-gray-600 text-sm">{label}</label>
      <input
        type="text"
        disabled
        className="bg-[#F1F2F3] font-epilogue text-[#212225] outline-none rounded p-2"
        value={value}
      />
    </div>
  );
};

export default function ContactInfo({ contactData }) {
  return (
    <div>
      <h1 className="text-[20px] font-roboto-condensed font-medium italic border-b-2 border-main-color w-fit mt-5 pl-5 ml-5">
        Contact Information
      </h1>
      <form className="space-y-[20px] bg-card-color rounded-[8px] px-[50px] py-[30px]">
        <div className="grid md:grid-cols-2 gap-5 justify-center font-epilogue md:w-full text-[14px] text-left">
          <DisableInput label="Email address" value={contactData.email} />
          <PhoneInput
            international
            className="custom-phone-input w-[300px] "
            value={contactData.phone}
            disabled={true}
            defaultCountry="US" // Default country can be set here
          />
          <DisableInput label="Location" value={contactData.location} />
        </div>
      </form>
    </div>
  );
}

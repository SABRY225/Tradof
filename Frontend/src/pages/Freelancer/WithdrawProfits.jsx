import { useState } from "react";
import PageTitle from "@/UI/PageTitle";
import ButtonFelid from "@/UI/ButtonFelid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function WithdrawProfits() {
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(12000);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [beneficiaryInfo, setBeneficiaryInfo] = useState({
    name: "",
    iban: "",
    swiftCode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setTotalAmount(totalAmount - e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBeneficiaryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log("Withdrawal submitted:", {
      amount,
      beneficiaryInfo,
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-background-color min-h-screen">
      <PageTitle title="Withdraw Profits" />

      <div className="max-w-3xl mx-auto mt-8 p-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-main-color text-white py-5 px-6 text-center text-xl font-medium">
            Amount to be withdrawn
          </div>

          <div className="p-8 bg-card-color">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="flex w-full justify-between gap-4 mb-8">
                <div className="relative flex">
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color text-center"
                  />
                  <div className="bg-main-color text-white flex items-center justify-center w-16 rounded-r-md">
                    <span className="text-2xl">$</span>
                  </div>
                </div>

                <div className="relative flex-1">
                  <input
                    type="text"
                    value={totalAmount}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-center"
                  />
                </div>
              </div>

              <ButtonFelid
                text="Next"
                type="submit"
                classes="bg-main-color px-10 py-2 w-32"
              />
            </form>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-medium">
              Beneficiary Information
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="name" className="text-right font-medium text-sm">
                  اسم المستفيد *
                </label>
              </div>
              <input
                id="name"
                name="name"
                value={beneficiaryInfo.name}
                onChange={handleInputChange}
                placeholder="Enter your beneficiary name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="iban" className="text-right font-medium text-sm">
                  IBAN *
                </label>
              </div>
              <input
                id="iban"
                name="iban"
                value={beneficiaryInfo.iban}
                onChange={handleInputChange}
                placeholder="Enter your IBAN"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="swiftCode" className="text-right font-medium text-sm ">
                  كود SWIFT أو BIC *
                </label>
              </div>
              <input
                id="swiftCode"
                name="swiftCode"
                value={beneficiaryInfo.swiftCode}
                onChange={handleInputChange}
                placeholder="Enter your SWIFT or BIC code"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="addressLine1" className="text-right font-medium text-sm">
                  العنوان الشخصي *
                </label>
              </div>
              <input
                id="addressLine1"
                name="addressLine1"
                value={beneficiaryInfo.addressLine1}
                onChange={handleInputChange}
                placeholder="Enter your beneficiary address line 1"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color"
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <input
                id="addressLine2"
                name="addressLine2"
                value={beneficiaryInfo.addressLine2}
                onChange={handleInputChange}
                placeholder="Enter your beneficiary address line 2"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="city" className="text-right font-medium text-sm">
                    المدينة *
                  </label>
                </div>
                <input
                  id="city"
                  name="city"
                  value={beneficiaryInfo.city}
                  onChange={handleInputChange}
                  placeholder="Enter your beneficiary city"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="state" className="text-right font-medium text-sm">
                    المحافظة *
                  </label>
                </div>
                <input
                  id="state"
                  name="state"
                  value={beneficiaryInfo.state}
                  onChange={handleInputChange}
                  placeholder="Enter your beneficiary state"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="country" className="text-right font-medium text-sm">
                    الدولة *
                  </label>
                </div>
                <input
                  id="country"
                  name="country"
                  value={beneficiaryInfo.country}
                  onChange={handleInputChange}
                  placeholder="Enter your beneficiary country"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="postalCode" className="text-right font-medium text-sm">
                    الرمز البريدي *
                  </label>
                </div>
                <input
                  id="postalCode"
                  name="postalCode"
                  value={beneficiaryInfo.postalCode}
                  onChange={handleInputChange}
                  placeholder="Enter your postal code"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-main-color focus:ring-1 focus:ring-main-color"
                  required
                />
              </div>
            </div>

            {/* Added checkboxes at the end of the pop-up card */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="agree1" className="mr-2" required />
                <label htmlFor="agree1" className="text-sm">I confirm that the beneficiary information is correct.</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="agree2" className="mr-2" required />
                <label htmlFor="agree2" className="text-sm">I understand that withdrawal requests may take up to 5 business days.</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="agree3" className="mr-2" required />
                <label htmlFor="agree3" className="text-sm">I accept the terms and conditions of the withdrawal process.</label>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <ButtonFelid
                text="Submit"
                type="submit"
                classes="bg-main-color px-10 py-2 w-32"
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WithdrawProfits;

import { useState } from "react";
import PageTitle from "@/UI/PageTitle";
import ButtonFelid from "@/UI/ButtonFelid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Navigate, useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // CSS for toast notifications
import { sendWithdrawRequest } from "@/Util/Https/freelancerHttp";
import { useAuth } from "@/context/AuthContext";

function WithdrawProfits() {
  const { amountMoney } = useParams();
  const [amount, setAmount] = useState(0);
    const {
      user: { token },
    } = useAuth();
  const [totalAmount, setTotalAmount] = useState(parseFloat(amountMoney)); // Assuming amountMoney is a string
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
  const [error, setError] = useState("");
  // Checkbox state variables
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);
  const handleAmountChange = (e) => {
    const enteredAmount = parseFloat(e.target.value);
    setAmount(enteredAmount);
    if (enteredAmount > totalAmount) {
      setError("The amount to be withdrawn cannot exceed the total amount.");
    } else {
      setError(""); // Clear the error if the entered amount is valid
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBeneficiaryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (id === "agree1") setAgree1(checked);
    if (id === "agree2") setAgree2(checked);
    if (id === "agree3") setAgree3(checked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= totalAmount) {
      setIsDialogOpen(true);
    }
  };


  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = {
      amount,
      paymentDetails:beneficiaryInfo,
    };

    // Call the utility function to send the request
    await sendWithdrawRequest({formData,token});

    // Close the dialog after submission
    setIsDialogOpen(false);
    Navigate("")
  };

  return (
    <div className="bg-background-color min-h-screen">
      <PageTitle title="Withdraw Profits" />
      <ToastContainer />
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
                    <span className="text-xl">EGP</span>
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

              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}

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
                  Beneficiary Name  <span className="text-[#e74c3c]">*</span>
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
                  IBAN  <span className="text-[#e74c3c]">*</span>
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
                  SWIFT or BIC Code  <span className="text-[#e74c3c]">*</span>
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
                  Address Line 1  <span className="text-[#e74c3c]">*</span>
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
                    City  <span className="text-[#e74c3c]">*</span>
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
                    State <span className="text-[#e74c3c]">*</span>
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
                    Country  <span className="text-[#e74c3c]">*</span>
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
                    Postal Code 
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

             <div className="mt-6 space-y-2">
              {/* Checkbox Section */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree1"
                  checked={agree1}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                  required
                />
                <label htmlFor="agree1" className="text-sm">
                  I confirm that the beneficiary information is correct.
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree2"
                  checked={agree2}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                  required
                />
                <label htmlFor="agree2" className="text-sm">
                  I understand that withdrawal requests may take up to 5 business days.
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agree3"
                  checked={agree3}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                  required
                />
                <label htmlFor="agree3" className="text-sm">
                  I accept the terms and conditions of the withdrawal process.
                </label>
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

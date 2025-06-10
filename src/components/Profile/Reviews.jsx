import { motion } from "motion/react";
import { useLocation } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ButtonFelid from "@/UI/ButtonFelid";
import { share, copy, checkedCopy } from "../../assets/paths";
import { useState } from "react";

export default function Reviews({ rating, reviews, isShared, currentURL }) {
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset message after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <>
      <div className="container max-w-screen-xl mx-auto p-4 w-full  flex flex-col md:flex-row justify-between md:items-center bg-card-color rounded-lg px-10 space-y-2">
        <div className="flex md:space-x-24 flex-col md:flex-row">
          <div className="flex space-x-4">
            <span className="text-lg font-bold text-main-color">Rating</span>
            <span className="italic">{rating} stars</span>
          </div>
          {/* <div className="flex space-x-4">
            <span className="text-lg font-bold text-main-color">Reviews</span>
            <span className="italic">{reviews} review</span>
          </div> */}
        </div>
        {!isShared && (
          <AlertDialog>
            <AlertDialogTrigger>
              <ButtonFelid
                as="span"
                icon={share}
                text="Share your profile"
                type="button"
                classes="text-[15px] px-[20px] py-[7px] bg-second-color rounded-full"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Share your profile like</AlertDialogTitle>
                <AlertDialogDescription className="text-black flex flex-col gap-10 font-roboto-condensed">
                  <span className="font-roboto-condensed text-gray-800">
                    Now you can share your account with different sites and just
                    click on the link below
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="bg-[#eef4ff] flex justify-between px-4 py-2 border-2 border-[#a5c1ff] rounded-full "
                  >
                    <span className="truncate">Profile Link...</span>
                    <motion.img
                      layout
                      src={copied ? checkedCopy : copy}
                      alt="copy icon"
                    />
                  </button>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </>
  );
}

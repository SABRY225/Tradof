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

import {
  darkFacebook,
  darkGithub,
  darkGmail,
  darkLinkedin,
  darkPhone,
  closeDialog,
} from "../assets/paths";
import { Link } from "react-router-dom";

const links = {
  facebook: darkFacebook,
  github: darkGithub,
  gmail: darkGmail,
  linkedin: darkLinkedin,
  phone: darkPhone,
};

// Function to extract names from URLs
const extractName = (key, url) => {
  if (!url) return "Unknown"; // Fallback in case the URL is missing

  switch (key) {
    case "facebook":
    case "linkedin":
    case "github":
      try {
        const urlObj = new URL(url);
        return urlObj.pathname.split("/").filter(Boolean).pop(); // Last part of the path
      } catch (error) {
        return "Invalid URL"; // Handle cases where URL is malformed
      }
    case "gmail":
      return url.split("@")[0]; // Extract username before @
    case "phone":
      return url; // Return phone as is
    default:
      return "Unknown";
  }
};

export default function PersonCard({ member }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-full border-[3px]">
        <img
          src={member.image}
          alt={`${member.name} photo`}
          className="rounded-full object-cover h-[50px] w-[50px]"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="py-[50px] max-w-[961px] bg-background-color">
        <AlertDialogHeader>
          <AlertDialogTitle className="absolute w-fit top-[-5rem]">
            <img
              src={member.image}
              alt={`${member.name} photo`}
              className="w-[150px] h-[170px] object-cover rounded-sm shadow-[0px_0px_10px_1px_#1d1d1d54]"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="flex gap-5 items-center">
            <div className="min-w-[270px] border-r-2 border-[#C9C9C9]">
              <h1 className="text-black font-namdhinggo text-[20px]">
                {member.name}
              </h1>
              <p>{member.subtitle}</p>
              <div className="my-4">
                {Object.keys(member.media[0]).map((key, index) => {
                  return (
                    <Link
                      to={
                        key === "gmail"
                          ? `mailto:${member.media[0][key]}`
                          : key === "phone"
                          ? `https://web.whatsapp.com/send?phone=${member.media[0][key]}&text=Hello,%20I%20want%20to%20contact%20you!`
                          : member.media[0][key]
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                      className="flex gap-3 my-3 w-fit"
                    >
                      <img src={links[key]} alt={`${key} icon`} />
                      <div className="underline">
                        {extractName(key, member.media[0][key])}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="mb-5">
                <h1 className="text-main-color font-roboto-condensed font-semibold text-[22px] uppercase first-letter:text-3xl">
                  Profile
                </h1>
                <p className="text-black">
                  I am passionate about this field and aspire to become a
                  software engineer. I am also studying web technologies to
                  build my skills as a full-stack developer. Here, you’ll find
                  one of my web applications, and I’d be delighted for you
                  to visit my site.
                </p>
              </div>
              <div className="mb-5">
                <h1 className="text-main-color font-roboto-condensed font-semibold text-[22px] uppercase first-letter:text-3xl">
                  Skills
                </h1>
                <ul className="text-black grid grid-cols-3 list-disc pl-5">
                  {member.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className="text-main-color font-roboto-condensed font-semibold text-[22px] uppercase first-letter:text-3xl">
                  Experience
                </h1>
                <ul className="text-black list-disc pl-5">
                  {member.experience.map((ex, index) => (
                    <li key={index}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="absolute right-5 top-5">
          <AlertDialogCancel className="bg-transfer border-0 shadow-[0px] hover:bg-transfer">
            <img src={closeDialog} alt="" />
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

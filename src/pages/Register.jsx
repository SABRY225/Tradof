import BackgroundAuth from "@/UI/BackgroundAuth";
import RegisterFrom from "../components/RegisterProgress/RegisterFrom";
export default function Register() {

  return (
    <>
      <div className="flex items-center justify-center relative min-h-screen h-fit">
        <RegisterFrom />
      </div>
      <style>{`
        @media (max-width: 640px) {
          .polygon-background-1 {
            clip-path: polygon(0% 15%, 100% 60%, 100% 100%, 0% 100%) !important;
          }
          .polygon-background-2 {
            clip-path: polygon(0% 30%, 100% 70%, 100% 100%, 0% 100%) !important;
          }
        }
      `}</style>
    </>
  );
}
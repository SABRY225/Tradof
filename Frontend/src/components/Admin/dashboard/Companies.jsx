import { openPage } from "@/assets/paths";
import photo from '../../../assets/images/1560a64114a9372e.jpg';

const companies = [
  {
    id: 1,
    name: "Mohamed Abdalrazek",
    email: "abdalrazekmohmed6@gmail.com",
    image: photo,
    leftDays: 356,
    jopTitle: "jop title",
    is_blocked: false,
  },
  {
    id: 2,
    image: photo,
    name: "Mohamed Abdalrazek",
    email: "abdalrazekmohmed6@gmail.com",
    leftDays: 356,
    jopTitle: "jop title",
    is_blocked: true,
  },
  {
    id: 3,
    image: photo,

    name: "Mohamed Abdalrazek",
    email: "abdalrazekmohmed6@gmail.com",
    leftDays: 356,
    jopTitle: "jop title",
    is_blocked: false,
  },
  {
    id: 4,
    image: photo,
    name: "Mohamed Abdalrazek",
    email: "abdalrazekmohmed6@gmail.com",
    leftDays: 356,
    jopTitle: "jop title",
    is_blocked: true,
  },
  {
    id: 5,
    image: photo,
    name: "Mohamed Abdalrazek",
    email: "abdalrazekmohmed6@gmail.com",
    leftDays: 356,
    jopTitle: "jop title",
    is_blocked: false,
  },
];

export default function Companies() {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <h1 className="font-medium text-[18px]">Companies</h1>
        <img src={openPage} alt="" />
      </div>
      <div className="flex flex-col gap-3">
        {companies.map((freelancer) => (
          <div
            key={freelancer.id}
            className="bg-white p-3 px-5 rounded-md shadow-md flex w-full justify-between items-center gap-3"
          >
            <div className="flex flex-col md:flex-row items-center gap-2 text-center">
              <img
                src={freelancer.image}
                alt="person photo"
                className="w-10 h-10 object-cover rounded-full"
              />
              <div>
                <p className="font-roboto-condensed">{freelancer.name}</p>
                <p className="font-epilogue italic text-gray-400 text-[12px]">
                  {freelancer.jopTitle}
                </p>
              </div>
            </div>
            <p className="font-roboto-condensed break-all">
              {freelancer.email}
            </p>
            <p className="font-epilogue text-main-color font-semibold text-[13px]">
              {freelancer.leftDays} day left
            </p>
            <p
              className="font-epilogue font-semibold"
              style={{ color: !freelancer.is_blocked ? "#FF0000" : "#3DCF3D" }}
            >
              {freelancer.is_blocked ? "Unblock" : "Block"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

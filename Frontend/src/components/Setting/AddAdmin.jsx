

import ButtonFelid from "@/UI/ButtonFelid";
import Plus from "../../assets/icons/plus.svg";

function AddAdmin({ admins }) {

  return (
    <div>
      <h1 className="text-[23px] font-roboto-condensed font-bold  w-fit mt-5  ">
        Admins
      </h1>
      <div className="flex justify-between  items-center  bg-background-color py-3 px-5  text-[17px] font-roboto-condensed font-bold border border-background-color rounded mt-5 text-main-color  ">
        <div>Admin name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Country</div>
        <div>
          <ButtonFelid
            text="ADD"
            icon={Plus}
            classes="flex-row bg-second-color px-[25px] py-[8px]"
            type="button"
          />
        </div>
      </div>
      {admins.map((admin, index) => (
              <>
              <div key={index} className="flex justify-between items-center px-5  bg-white py-3  text-[17px] font-roboto-condensed font-mono border-2 border-card-color rounded mt-1 text-black  ">
              <div className="w-28">{admin.email}</div>
              <div className="w-28">{admin.name}</div>
              <div className="w-24">{admin.phone}</div>
              <div className="w-24">{admin.country}</div>
              <div>
                <ButtonFelid
                  text="Delete"
                  classes="flex-row text-second-color px-[25px] py-[8px]"
                  type="button"
                />
              </div>
            </div>
              </>
          ))}
    </div>
  )
}

export default AddAdmin

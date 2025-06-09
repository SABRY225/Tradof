import { useState } from "react";
import ButtonFelid from "@/UI/ButtonFelid";
import Plus from "../../assets/icons/plus.svg";
import { addAdmin } from "../../Util/Https/adminHttp";
import { useAuth } from "@/Context/AuthContext";
import { message } from "antd";
import { GetAllAdmins } from "@/Util/Https/adminHttp";

function AddAdmin({ admins, setAdmins }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const {
    user: { token },
  } = useAuth();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAdminData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    if (adminData.password !== adminData.confirmPassword) {
      setError("Passwords do not match");
      message.error("Passwords do not match");
      return;
    }

    try {
      await addAdmin({ data: adminData });
      message.success("Admin added successfully");

      const updatedAdmins = await GetAllAdmins();
      setAdmins(updatedAdmins);

      closeModal();
    } catch (error) {
      message.error("Error adding admin");
    }
  };

  return (
    <div>
      <h1 className="text-[23px] font-roboto-condensed font-bold w-fit mt-8 ">
        Admins
      </h1>
      <div className="flex justify-between items-center bg-background-color py-3 px-5 text-[17px] font-roboto-condensed font-bold border border-background-color rounded mt-5 text-main-color">
        <div>Admin name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>
          <ButtonFelid
            text="ADD"
            icon={Plus}
            classes="flex-row bg-second-color px-[25px] py-[8px]"
            type="button"
            onClick={openModal}
          />
        </div>
      </div>

      {admins.map((admin, index) => (
        <div
          key={index}
          className="flex justify-between items-center px-5 bg-white py-3 text-[17px] font-mono border-2 border-card-color rounded mt-1 text-black"
        >
          <div className="w-28">{admin.email}</div>
          <div className="w-28">
            {admin.firstName + " " + admin.lastName}
          </div>
          <div className="w-24">{admin.phoneNumber}</div>
          <div>
            <ButtonFelid
              text="Delete"
              classes="flex-row text-second-color px-[25px] py-[8px]"
              type="button"
            />
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[600px]">
            <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
            <form onSubmit={handleAddAdmin}>
              <div className="flex gap-4">
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    value={adminData.firstName}
                    onChange={(e) =>
                      setAdminData({ ...adminData, firstName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 mt-1"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    value={adminData.lastName}
                    onChange={(e) =>
                      setAdminData({ ...adminData, lastName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium">Phone Number</label>
                  <input
                    type="text"
                    value={adminData.phoneNumber}
                    onChange={(e) =>
                      setAdminData({ ...adminData, phoneNumber: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 mt-1"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData({ ...adminData, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    value={adminData.password}
                    onChange={(e) =>
                      setAdminData({ ...adminData, password: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 mt-1"
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block text-sm font-medium">Confirm Password</label>
                  <input
                    type="password"
                    value={adminData.confirmPassword}
                    onChange={(e) =>
                      setAdminData({ ...adminData, confirmPassword: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <ButtonFelid
                  text="Cancel"
                  classes="px-[25px] py-[8px] bg-main-color mr-2"
                  type="button"
                  onClick={closeModal}
                />
                <ButtonFelid
                  text="Save"
                  classes="px-[25px] py-[8px] bg-second-color"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAdmin;

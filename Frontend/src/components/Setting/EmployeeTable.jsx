import React from "react";


const EmployeeTable = ({ employees }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full rounded-lg overflow-auto">
        <thead className=" text-main-color">
          <tr>
            <th className="p-2 text-left">Employee name</th>
            <th className="p-2 text-left">Job Title</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Password</th>
            <th className="p-2 text-left">Phone number</th>
            <th className="p-2 text-left">City</th>
            <th className="p-2 text-left">Country</th>
            <th className="p-2 text-left">Permission</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr
              key={index}
              className="p-2 border-b-2 border-[#e5e5ff] bg-white"
            >
              <td className="px-3 py-2 border-r-2">{employee.name}</td>
              <td className="px-3 py-2 border-r-2">{employee.jobTitle}</td>
              <td className="px-3 py-2 border-r-2">{employee.email}</td>
              <td className="px-3 py-2 border-r-2">{employee.password}</td>
              <td className="px-3 py-2 border-r-2">{employee.phone}</td>
              <td className="px-3 py-2 border-r-2">{employee.city}</td>
              <td className="px-3 py-2 border-r-2">{employee.country}</td>
              <td className="px-3 py-2">{employee.permission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

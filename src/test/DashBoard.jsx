import React from "react";
import { Fade } from "react-awesome-reveal";

export default function DashBoard() {
  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <Fade direction="down" duration={600}>
        <div className="text-primary text-3xl font-bold mb-6">
          Welcome Back, Admin!
        </div>
        <p className="text-secondary text-lg">
          Here's a quick overview of your workforce.
        </p>
      </Fade>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {/* Total Employees */}
        <div className="bg-primary text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Total Employees</h3>
          <p className="text-4xl font-bold mt-2">1,245</p>
        </div>
        {/* Active Tasks */}
        <div className="bg-secondary text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Active Tasks</h3>
          <p className="text-4xl font-bold mt-2">78</p>
        </div>
        {/* Departments */}
        <div className="bg-accent text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Departments</h3>
          <p className="text-4xl font-bold mt-2">12</p>
        </div>
        {/* Attendance */}
        <div className="bg-text text-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold">Today's Attendance</h3>
          <p className="text-4xl font-bold mt-2">92%</p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-primary text-xl font-semibold mb-4">
            Employee Overview
          </h3>
          <div className="overflow-auto max-h-64">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-accent text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-background even:bg-secondary/10">
                  <td className="p-3">John Doe</td>
                  <td className="p-3">HR</td>
                  <td className="p-3">Manager</td>
                  <td className="p-3 text-green-600 font-semibold">Active</td>
                </tr>
                <tr className="odd:bg-background even:bg-secondary/10">
                  <td className="p-3">Jane Smith</td>
                  <td className="p-3">IT</td>
                  <td className="p-3">Developer</td>
                  <td className="p-3 text-red-600 font-semibold">Inactive</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-primary text-xl font-semibold mb-4">
            Notifications
          </h3>
          <ul className="space-y-3">
            <li className="bg-background p-3 rounded-md">
              New employee <strong>Emily Johnson</strong> added to IT
              department.
            </li>
            <li className="bg-background p-3 rounded-md">
              Weekly attendance report is available.
            </li>
            <li className="bg-background p-3 rounded-md">
              Upcoming meeting: <strong>Team Leads</strong> at 3 PM.
            </li>
            {/* Add more notifications as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
}

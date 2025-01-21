import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaTasks,
  FaChartLine,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useRole from "../customHooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../customHooks/useAuth";

export default function DashBoardLayout() {
  const { user } = useAuth();
  const [role, loading] = useRole();
  const { isAdmin, isHR, isEmployee } = role || {};
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  const navLinks = (
    <nav className="space-y-4 text-lg">
      {isEmployee && (
        <>
          <NavLink
            to="work-sheet"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-4 rounded ${
                isActive ? "bg-secondary" : "hover:bg-secondary"
              }`
            }
          >
            <FaTasks className="text-xl" />
            Work Sheet
          </NavLink>
          <NavLink
            to="payment-history"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-4 rounded ${
                isActive ? "bg-secondary" : "hover:bg-secondary"
              }`
            }
          >
            <FaMoneyCheckAlt className="text-xl" />
            Payment History
          </NavLink>
        </>
      )}

      {isHR && (
        <>
          <NavLink
            to="employee-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-4 rounded ${
                isActive ? "bg-secondary" : "hover:bg-secondary"
              }`
            }
          >
            <FaUsers className="text-xl" />
            Employee List
          </NavLink>
          <NavLink
            to="progress"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-4 rounded ${
                isActive ? "bg-secondary" : "hover:bg-secondary"
              }`
            }
          >
            <FaChartLine className="text-xl" />
            Progress
          </NavLink>
        </>
      )}

      {isAdmin && (
        <>
          <NavLink
            to="all-employees"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-4 rounded ${
                isActive ? "bg-secondary" : "hover:bg-secondary"
              }`
            }
          >
            <FaUsers className="text-xl" />
            All Employees
          </NavLink>
          <NavLink
            to="payroll"
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-4 rounded ${
                isActive ? "bg-secondary" : "hover:bg-secondary"
              }`
            }
          >
            <FaMoneyCheckAlt className="text-xl" />
            Payroll
          </NavLink>
        </>
      )}

      <div className="border-t border-secondary my-6"></div>

      {user && (
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-4 rounded ${
              isActive ? "bg-secondary" : "hover:bg-secondary"
            }`
          }
        >
          <FaHome className="text-xl" />
          Home
        </NavLink>
      )}
    </nav>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-text">
      {/* Sidebar for Large Screens */}
      <aside className="hidden lg:block w-64 bg-primary text-white p-4 lg:sticky top-0 h-screen overflow-y-auto">
        <Link to="/">
          <h2 className="text-2xl font-bold mb-6">WorkForce Pro</h2>
        </Link>
        {navLinks}
      </aside>

      {/* Navbar for Medium and Small Screens */}
      <nav className="lg:hidden bg-primary text-white sticky top-0 w-full p-4 flex items-center justify-between z-10">
        <Link to="/" className="text-xl font-bold">
          WorkForce Pro
        </Link>
        <button onClick={() => setIsDrawerOpen(true)}>
          <FaBars className="text-2xl" />
        </button>
      </nav>

      {/* Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full w-64 bg-primary text-white p-4 z-30 overflow-y-auto">
            <button
              className="flex items-center justify-end w-full mb-6"
              onClick={() => setIsDrawerOpen(false)}
            >
              <FaTimes className="text-2xl" />
            </button>
            <Link to="/">
              <h2 className="text-2xl font-bold mb-6">WorkForce Pro</h2>
            </Link>
            {navLinks}
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

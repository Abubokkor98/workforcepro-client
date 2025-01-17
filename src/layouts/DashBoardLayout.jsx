import { Outlet, NavLink, Navigate, Link } from "react-router-dom";
import useAuth from "../customHooks/useAuth";

export default function DashBoardLayout() {
  const { user } = useAuth();
  const role = "HR";

  return (
    <div className="flex min-h-screen bg-background text-text">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-4">
        <Link to={"/"}>
          <h2 className="text-2xl font-bold mb-6">WorkForce Pro</h2>
        </Link>
        <nav className="space-y-4">
          {role === "Employee" && (
            <>
              <NavLink
                to="work-sheet"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-secondary" : "hover:bg-secondary"
                  }`
                }
              >
                Work Sheet
              </NavLink>
              <NavLink
                to="payment-history"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-secondary" : "hover:bg-secondary"
                  }`
                }
              >
                Payment History
              </NavLink>
            </>
          )}

          {role === "HR" && (
            <>
              <NavLink
                to="employee-list"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-secondary" : "hover:bg-secondary"
                  }`
                }
              >
                Employee List
              </NavLink>
              <NavLink
                to="progress"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-secondary" : "hover:bg-secondary"
                  }`
                }
              >
                Progress
              </NavLink>
            </>
          )}

          {role === "Admin" && (
            <>
              <NavLink
                to="all-employees"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-secondary" : "hover:bg-secondary"
                  }`
                }
              >
                All Employees
              </NavLink>
              <NavLink
                to="payroll"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-secondary" : "hover:bg-secondary"
                  }`
                }
              >
                Payroll
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* Nested routes will render here */}
      </main>
    </div>
  );
}

import Sidebar from "../../components/Dashboard/Sidebar";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import { FaEdit } from "react-icons/fa";
import {Link} from "react-router-dom"

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 md:flex">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <DashboardHeader />

        {/* Profile Section */}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left Card */}

          <div className="rounded-3xl bg-white p-6 shadow-md sm:p-8 dark:bg-slate-800">
            <div className="flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white sm:h-32 sm:w-32 sm:text-5xl">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-5 text-2xl font-bold text-center sm:text-3xl dark:text-white">
                {user?.name}
              </h2>

              <p className="mt-2 break-all text-center text-sm text-slate-500 sm:text-base">
                {user?.email}
              </p>

              <span className="mt-4 rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 sm:text-base">
                {user?.role}
              </span>

              <Link to="/edit-profile" className="mt-8 w-full rounded-xl bg-blue-600 justify-center px-40 py-3 font-semibold text-white transition hover:bg-blue-700">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Right Card */}

          <div className="rounded-3xl bg-white p-6 shadow-md sm:p-8 lg:col-span-2 dark:bg-slate-800">
            <h2 className="text-2xl font-bold dark:text-white">
              Personal Information
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <h3 className="mt-2 text-base font-semibold sm:text-lg dark:text-white">
                  {user?.name}  <FaEdit/>
                </h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <h3 className="mt-2 break-all text-base font-semibold sm:text-lg dark:text-white">
                  <div>{user?.email}  <FaEdit/></div>
                </h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Role
                </p>

                <h3 className="mt-2 text-base font-semibold capitalize sm:text-lg dark:text-white">
                  {user?.role}
                </h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Member Since
                </p>

                <h3 className="mt-2 text-base font-semibold sm:text-lg dark:text-white">
                  July 2026
                </h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
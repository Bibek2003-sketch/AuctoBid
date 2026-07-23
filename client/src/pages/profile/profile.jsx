import Sidebar from "../../components/Dashboard/Sidebar";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";

function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">

      <Sidebar />

      <main className="flex-1 p-10">

        <DashboardHeader />

        {/* Profile Section */}

        <div className="mt-10 grid gap-8 lg:grid-cols-3">

          {/* Left Card */}

          <div className="rounded-3xl bg-white p-8 shadow-md dark:bg-slate-800">

            <div className="flex flex-col items-center">

              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white">

                {user?.name?.charAt(0)}

              </div>

              <h2 className="mt-6 text-3xl font-bold dark:text-white">

                {user?.name}

              </h2>

              <p className="mt-2 text-slate-500">

                {user?.email}

              </p>

              <span className="mt-4 rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700">

                {user?.role}

              </span>

              <button
                className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Edit Profile
              </button>

            </div>

          </div>

          {/* Right Card */}

          <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-md dark:bg-slate-800">

            <h2 className="text-2xl font-bold dark:text-white">

              Personal Information

            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <h3 className="mt-2 text-lg font-semibold dark:text-white">
                  {user?.name}
                </h3>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Email
                </p>

                <h3 className="mt-2 text-lg font-semibold dark:text-white">
                  {user?.email}
                </h3>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Role
                </p>

                <h3 className="mt-2 text-lg font-semibold capitalize dark:text-white">
                  {user?.role}
                </h3>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Member Since
                </p>

                <h3 className="mt-2 text-lg font-semibold dark:text-white">
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
import authImage from "../../assets/images/hero/image2.png";

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side */}

      <div
        className="relative hidden w-3/5 bg-cover bg-center lg:flex"
        style={{
          backgroundImage: `url(${authImage})`,
        }}
      >
        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}

        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white xl:p-16">
          {/* Logo */}

          <div>
            <h1 className="text-3xl font-bold xl:text-4xl">
              Aucto<span className="text-blue-500">Bid</span>
            </h1>
          </div>

          {/* Hero Text */}

          <div>
            <h2 className="text-4xl font-bold leading-tight xl:text-6xl">
              Bid Smarter.
              <br />
              Win Bigger.
            </h2>

            <p className="mt-5 max-w-lg text-base text-slate-200 xl:mt-6 xl:text-lg">
              Join thousands of buyers and sellers participating in secure
              online auctions every day.
            </p>
          </div>

          {/* Stats */}

          <div className="flex flex-wrap gap-8 xl:gap-10">
            <div>
              <h3 className="text-2xl font-bold xl:text-3xl">25K+</h3>
              <p className="text-sm text-slate-300 xl:text-base">Auctions</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold xl:text-3xl">10K+</h3>
              <p className="text-sm text-slate-300 xl:text-base">
                Happy Users
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold xl:text-3xl">99%</h3>
              <p className="text-sm text-slate-300 xl:text-base">
                Secure Bidding
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex w-full items-center justify-center bg-slate-100 px-4 py-8 sm:px-6 lg:w-2/5 lg:px-10 dark:bg-slate-900">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
import authImage from "../../assets/images/hero/image2.png";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">

      {/* Left Side */}

      <div
        className="relative hidden lg:flex w-3/5 bg-cover bg-center"
        style={{
          backgroundImage: `url(${authImage})`,
        }}
      >

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}

        <div className="relative z-10 flex flex-col justify-between p-16 text-white">

          {/* Logo */}

          <div>

            <h1 className="text-4xl font-bold">
              Aucto<span className="text-blue-500">Bid</span>
            </h1>

          </div>

          {/* Hero Text */}

          <div>

            <h2 className="text-6xl font-bold leading-tight">
              Bid Smarter.
              <br />
              Win Bigger.
            </h2>

            <p className="mt-6 max-w-xl text-lg text-slate-200">
              Join thousands of buyers and sellers participating
              in secure online auctions every day.
            </p>

          </div>

          {/* Bottom Stats */}

          <div className="flex gap-10">

            <div>
              <h3 className="text-3xl font-bold">25K+</h3>
              <p className="text-slate-300">Auctions</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-slate-300">Happy Users</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">99%</h3>
              <p className="text-slate-300">Secure Bidding</p>
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex w-full items-center justify-center bg-slate-100 p-10 lg:w-2/5">

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;
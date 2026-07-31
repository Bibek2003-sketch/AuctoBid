import FeatureCard from "../FeatureCard/FeatureCard";
import features from "../../data/features";

function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-16 transition-colors duration-300 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Why Choose AuctoBid
          </h2>

          <p className="mt-4 text-base text-slate-500 sm:text-lg">
            Trusted by thousands of buyers and sellers across India.
          </p>
        </div>

        {/* Features Grid */}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
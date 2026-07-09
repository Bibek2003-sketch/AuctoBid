import FeatureCard from "../FeatureCard/FeatureCard";
import features from "../../data/features";

function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-[1500px] px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-slate-900">
            Why Choose AuctoBid
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Trusted by thousands of buyers and sellers across India
          </p>
        </div>

        <div className="mt-16 grid grid-cols-4 gap-8">
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

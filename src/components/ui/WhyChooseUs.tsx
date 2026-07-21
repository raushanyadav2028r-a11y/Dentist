import { Shield, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Anxiety-Free Protocol",
    description: "Immersive entertainment, noise-cancelling acoustics, and spa-level amenities to ensure absolute tranquility during your visit.",
  },
  {
    icon: Clock,
    title: "Zero Wait Time",
    description: "Your time is a luxury. Our concierge scheduling ensures you are seen the moment you arrive, without exception.",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "We stand behind our masterpieces. All structural restorations come with an unconditional 10-year replacement guarantee.",
  },
];

export default function WhyChooseUs() {
  return (
    <section data-theme="dark" className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container-max relative z-10">
        <div className="text-center mb-20">
          <span className="section-label mb-4 inline-block">A Sanctuary of Care</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
            Beyond Traditional Dentistry
          </h2>
          <p className="text-platinum max-w-xl mx-auto text-lg">
            We have re-engineered the dental experience from the ground up, replacing clinical anxiety with high-end hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
            <div
              key={feature.title}
              className="dark-card glass-card-hover rounded-3xl p-8 md:p-10 flex flex-col items-center text-center group animate-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/6 border border-white/10 shadow-inner flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                <IconComponent size={28} className="text-sky-blue" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">{feature.title}</h3>
              <p className="text-platinum leading-relaxed">{feature.description}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Upload, Sparkles, IndianRupee } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    title: "Upload Your Clothes",
    desc: "Snap a photo of your pre-loved item and tell us a bit about it.",
    icon: Upload,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    title: "Get AI Price Suggestion",
    desc: "Our AI analyzes your item to suggest the perfect resale price based on quality and brand.",
    icon: Sparkles,
    color: "bg-amber-100 text-amber-600"
  },
  {
    title: "Sell & Earn",
    desc: "List your item in seconds and get paid when it finds a new home.",
    icon: IndianRupee,
    color: "bg-blue-100 text-blue-600"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Selling your clothes has never been easier or more sustainable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0`}>
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3 text-center md:text-left">{step.title}</h3>
              <p className="text-stone-600 leading-relaxed text-center md:text-left">{step.desc}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-stone-200 -z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { User, Rocket, Building2, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: User,
    title: "Idea-Stage Founders",
    description: "Got a concept but not sure where to start? We validate, refine, and build your vision.",
    stage: "Ideation",
  },
  {
    icon: Rocket,
    title: "Growing Startups",
    description: "Need strategy, execution, and AI integration? We accelerate your growth trajectory.",
    stage: "Growth",
  },
  {
    icon: Building2,
    title: "Established Businesses",
    description: "Looking for digital transformation and AI automation? We modernize your operations.",
    stage: "Scale",
  },
];

const WhoWeHelp = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider">Who We Serve</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4 mb-6">
            From Idea to Enterprise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're just starting out or scaling up, we meet you where you are 
            and help you get where you want to go.
          </p>
        </motion.div>

        {/* Audience cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="glass-card p-8 h-full hover:border-accent/30 transition-all duration-300">
                {/* Stage badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-6">
                  {audience.stage}
                </span>
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                  <audience.icon className="w-7 h-7 text-accent" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-heading font-semibold mb-3">
                  {audience.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {audience.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;

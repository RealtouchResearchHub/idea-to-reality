import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const categories = ["All", "AI", "Business Growth", "Automation", "Product Building"];

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Small Business: A Practical Guide",
    excerpt: "Discover how small businesses are leveraging AI to compete with larger companies. Real strategies, real results.",
    category: "AI",
    author: "Alex Chen",
    date: "Dec 10, 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "From Idea to MVP: The Startup Timeline You Need",
    excerpt: "A realistic breakdown of how long it takes to go from concept to a working product, and how to optimize each phase.",
    category: "Product Building",
    author: "Sarah Johnson",
    date: "Dec 8, 2025",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: 3,
    title: "5 Processes Every Business Should Automate Today",
    excerpt: "Stop wasting time on repetitive tasks. Here are the highest-impact automations you can implement this week.",
    category: "Automation",
    author: "Michael Park",
    date: "Dec 5, 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Validating Your Business Idea Without Writing Code",
    excerpt: "Learn the pre-development validation techniques that save time and money. Test demand before you build.",
    category: "Business Growth",
    author: "Alex Chen",
    date: "Dec 3, 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    title: "AI Chatbots vs. Human Support: Finding the Right Balance",
    excerpt: "When to use AI and when to involve humans. A framework for customer support in the AI age.",
    category: "AI",
    author: "Sarah Johnson",
    date: "Nov 30, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 6,
    title: "The Non-Technical Founder's Guide to Working with Developers",
    excerpt: "Bridge the communication gap and get better results from your development team.",
    category: "Product Building",
    author: "Michael Park",
    date: "Nov 28, 2025",
    readTime: "8 min read",
    featured: false,
  },
];

const Blog = () => {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <>
      <Helmet>
        <title>Blog | Realtouch Research & Consulting</title>
        <meta
          name="description"
          content="Insights on AI, business growth, automation, and product building. Practical advice for founders and businesses."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Our Blog</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mt-4 mb-6">
                Insights & <span className="text-gradient-accent">Ideas</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Practical advice on AI, business growth, and building products that matter. 
                No fluff, just actionable insights.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="container-custom px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  index === 0
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Featured posts */}
        <section className="section-padding pb-12">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.id}`} className="block">
                    <div className="glass-card p-6 sm:p-8 h-full hover:border-accent/30 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {post.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-cta/10 text-cta">
                          Featured
                        </span>
                      </div>

                      <h2 className="text-2xl font-heading font-bold mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Regular posts */}
        <section className="section-padding pt-0">
          <div className="container-custom">
            <h2 className="text-2xl font-heading font-bold mb-8">Latest Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.id}`} className="block">
                    <div className="glass-card p-6 h-full hover:border-accent/30 transition-all duration-300">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-secondary text-muted-foreground mb-4">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>

                      <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
                Stay in the Loop
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get weekly insights on AI, business growth, and building great products. 
                No spam, just value.
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 h-12 px-4 rounded-lg bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <button className="h-12 px-6 rounded-lg bg-cta text-cta-foreground font-medium hover:bg-cta/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useContent } from "../context/ContentContext";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

export default function Products() {
  const { products, loading } = useContent();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>;

  return (
    <div data-testid="products-page">
      <section className="bg-slate-950 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        <div className="container-x relative">
          <p className="eyebrow text-blue-300 mb-6">Product Catalog</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight max-w-3xl">Polymer granules engineered for global production.</h1>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-x">
          <div className="space-y-20">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className={`grid md:grid-cols-12 gap-10 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}
                data-testid={`products-page-item-${p.id}`}
              >
                <div className="md:col-span-5 [direction:ltr]">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="md:col-span-7 [direction:ltr]">
                  <p className="eyebrow mb-3">{p.tagline}</p>
                  <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-slate-900 mb-5">{p.name}</h2>
                  <p className="text-slate-600 leading-[1.8] mb-8">{p.description}</p>
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {p.features.map((f, idx) => <li key={idx} className="text-sm text-slate-700 flex gap-2"><span className="w-1 h-1 bg-blue-700 mt-2.5 rounded-full flex-shrink-0"></span>{f}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-3">Industry Applications</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {p.industries.map((ind) => <span key={ind} className="text-xs bg-slate-100 text-slate-800 px-3 py-1.5 border border-slate-200">{ind}</span>)}
                      </div>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-500 mt-5 mb-2">Quality</h4>
                      <p className="text-sm text-slate-700">{p.quality}</p>
                    </div>
                  </div>
                  <Link to="/contact" className="btn-primary" data-testid={`products-page-inquire-${p.id}`}>Request Quote <ArrowRight size={16} /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

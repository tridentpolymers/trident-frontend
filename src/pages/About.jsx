import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Award, Target, Compass, Building2 } from "lucide-react";
import { useContent } from "../context/ContentContext";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

export default function About() {
  const { content, loading } = useContent();
  if (loading || !content) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>;
  const a = content.about;

  return (
    <div data-testid="about-page">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white py-32 overflow-hidden" data-testid="about-hero">
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        <div className="container-x relative">
          <p className="eyebrow text-blue-300 mb-6">About Trident Enterprise</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight max-w-4xl leading-[1.05]">{a.headline}</h1>
        </div>
      </section>

      {/* STORY */}
      <section className="section-pad bg-white" data-testid="about-story">
        <div className="container-x grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <img src={a.image} alt="Manufacturing facility" className="w-full aspect-[4/5] object-cover" />
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">Our Story</p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-slate-900 mb-8">Three generations of polymer expertise.</h2>
            <p className="text-slate-600 leading-[1.8] text-base mb-10">{a.story}</p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border-l-2 border-blue-700 pl-5" data-testid="about-mission">
                <Target className="text-blue-700 mb-3" size={22} />
                <h3 className="font-display font-semibold text-slate-900 mb-2">Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{a.mission}</p>
              </div>
              <div className="border-l-2 border-blue-700 pl-5" data-testid="about-vision">
                <Compass className="text-blue-700 mb-3" size={22} />
                <h3 className="font-display font-semibold text-slate-900 mb-2">Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{a.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="section-pad bg-slate-50" data-testid="about-highlights">
        <div className="container-x">
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-4">Manufacturing Excellence</p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-slate-900">Built on infrastructure, refined by quality.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {a.highlights.map((h, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.07 }} className="card-bento" data-testid={`about-highlight-${i}`}>
                <Award className="text-blue-700 mb-4" size={24} />
                <h3 className="font-display font-semibold text-slate-900 mb-3">{h.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{h.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-section relative" data-testid="about-cta">
        <div className="grain-overlay"></div>
        <div className="container-x section-pad text-center relative">
          <Building2 className="text-blue-400 mx-auto mb-6" size={36} />
          <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-white mb-4 max-w-2xl mx-auto">Visit our manufacturing facility.</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">Schedule a guided tour to see our quality systems, lab and warehousing in action.</p>
          <Link to="/contact" className="btn-primary" data-testid="about-cta-btn">Schedule a Visit <ChevronRight size={18} /></Link>
        </div>
      </section>
    </div>
  );
}

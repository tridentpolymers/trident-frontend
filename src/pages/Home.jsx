import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { ChevronRight, Quote, Star, Download, ArrowRight } from "lucide-react";
import { useContent } from "../context/ContentContext";

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 2.2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, mv]);

  useEffect(() => rounded.on("change", (v) => setDisplay(v)), [rounded]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Home() {
  const { content, products, testimonials, faq, settings, loading } = useContent();
  const [openFaq, setOpenFaq] = useState(null);

  if (loading || !content) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>;

  const c = content;
  const trustLogos = ["PolyPack", "EuroForm", "GulfPolymer", "Krishnan", "AsiaTrade", "MumbaiPlast", "ExportCo"];

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center text-white overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0">
          <img src={c.hero.background} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay"></div>
          <div className="absolute inset-0 hero-pattern opacity-40"></div>
        </div>

        <div className="container-x relative py-32">
          <div className="max-w-3xl">
            <motion.p initial="hidden" animate="visible" variants={fadeUp} className="eyebrow text-blue-300 mb-6" data-testid="hero-eyebrow">
              {c.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] mb-8"
              data-testid="hero-title"
            >
              {c.hero.title}
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="text-lg text-slate-200 max-w-2xl leading-relaxed mb-10" data-testid="hero-subtitle">
              {c.hero.subtitle}
            </motion.p>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
              <a href="#products" className="btn-primary" data-testid="hero-cta-products">
                {c.hero.cta_primary} <ChevronRight size={18} />
              </a>
              <Link to="/contact" className="btn-ghost-light" data-testid="hero-cta-contact">
                {c.hero.cta_secondary}
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 backdrop-blur-sm bg-slate-950/30">
          <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            {c.stats.map((s, i) => (
              <div key={i} className="flex flex-col" data-testid={`hero-stat-${i}`}>
                <span className="text-3xl md:text-4xl font-display font-bold text-white"><Counter value={s.value} suffix={s.suffix} /></span>
                <span className="text-xs uppercase tracking-[0.15em] text-slate-300 mt-2">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="py-12 border-b border-slate-200 bg-white" data-testid="trust-marquee">
        <div className="container-x mb-8 text-center">
          <p className="eyebrow text-slate-500">Trusted by 850+ Manufacturers Across 32 Countries</p>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...trustLogos, ...trustLogos].map((n, i) => (
              <div key={i} className="font-display text-2xl font-semibold text-slate-300 whitespace-nowrap">{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="section-pad bg-slate-50" data-testid="products-section">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">Our Product Range</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-slate-900">
                Premium polymer granules,<br /><span className="text-blue-700">engineered for precision.</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-slate-600 leading-relaxed">From commodity HDPE to engineering-grade ABS — every grade is lab-tested, batch-traceable and export-compliant. Browse our seven core families below.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <motion.article
                key={p.id}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp} transition={{ delay: i * 0.05 }}
                className="card-product flex flex-col"
                data-testid={`product-card-${p.id}`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur text-xs font-bold tracking-wider uppercase text-blue-700">{p.tagline}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">{p.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">{p.description}</p>
                  <ul className="space-y-2 mb-5">
                    {p.features.slice(0, 3).map((f, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-700 mt-2 flex-shrink-0"></span>{f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.industries.map((ind) => (
                      <span key={ind} className="text-[10px] uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-1 border border-slate-200">{ind}</span>
                    ))}
                  </div>
                  <Link to="/contact" className="text-sm font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-2 group" data-testid={`product-inquire-${p.id}`}>
                    Request Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-pad bg-white" data-testid="why-section">
        <div className="container-x">
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-4">Why Trident Enterprise</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-slate-900">
              Six reasons global manufacturers choose us.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.why_choose_us.map((w, i) => {
              const Icon = Icons[w.icon] || Icons.CheckCircle;
              return (
                <motion.div
                  key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} transition={{ delay: i * 0.05 }}
                  className="card-bento" data-testid={`why-card-${i}`}
                >
                  <div className="w-12 h-12 bg-blue-50 text-blue-700 flex items-center justify-center mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-900 mb-3">{w.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{w.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-pad bg-slate-50" data-testid="industries-section">
        <div className="container-x">
          <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">Industries We Serve</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-slate-900">
                Powering production across<br /><span className="text-blue-700">six core industries.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.industries.map((ind, i) => {
              const Icon = Icons[ind.icon] || Icons.Layers;
              return (
                <motion.div
                  key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} transition={{ delay: i * 0.05 }}
                  className="industry-card" data-testid={`industry-card-${i}`}
                >
                  <Icon className="industry-icon text-blue-700 mb-5" size={28} />
                  <h3 className="font-display text-lg font-semibold text-slate-900 mb-3">{ind.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{ind.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad bg-white" data-testid="testimonials-section">
        <div className="container-x">
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-4">Client Voices</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-slate-900">
              Trusted by procurement leaders worldwide.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.05 }}
                className="testimonial-card" data-testid={`testimonial-${t.id}`}
              >
                <Quote className="text-blue-700 mb-4" size={28} />
                <p className="text-slate-700 leading-relaxed mb-6 text-base">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-semibold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500 mt-1">{t.title} · {t.company}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, idx) => <Star key={idx} size={14} className="fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-slate-50" data-testid="faq-section">
        <div className="container-x grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Frequently Asked</p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-slate-900 mb-6">Answers for serious B2B buyers.</h2>
            <p className="text-slate-600 leading-relaxed">Can't find what you're looking for? Our export team responds within 4 business hours.</p>
            <Link to="/contact" className="btn-primary mt-8" data-testid="faq-contact-cta">Contact Sales <ChevronRight size={18} /></Link>
          </div>
          <div className="md:col-span-8 space-y-3">
            {faq.map((q, i) => (
              <div key={i} className="bg-white border border-slate-200" data-testid={`faq-item-${i}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-6"
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-display font-semibold text-slate-900 text-base">{q.q}</span>
                  <Icons.Plus size={20} className={`transition-transform flex-shrink-0 ${openFaq === i ? "rotate-45 text-blue-700" : "text-slate-400"}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">{q.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dark-section relative overflow-hidden" data-testid="final-cta">
        <div className="grain-overlay"></div>
        <div className="container-x section-pad relative">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow text-blue-300 mb-4">Start Sourcing</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-white mb-6">{c.cta.title}</h2>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">{c.cta.subtitle}</p>
            </div>
            <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col gap-4 md:items-end">
              <Link to="/contact" className="btn-primary justify-center" data-testid="cta-quote-btn">{c.cta.primary} <ChevronRight size={18} /></Link>
              <a href="/brochure-trident.pdf" download className="btn-ghost-light justify-center" data-testid="cta-brochure-btn">
                <Download size={18} /> {c.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

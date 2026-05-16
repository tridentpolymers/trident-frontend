import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import api from "../lib/api";
import { useContent } from "../context/ContentContext";

export default function Contact() {
  const { settings, products, loading } = useContent();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", product: "", message: "" });
  const [status, setStatus] = useState({ loading: false, ok: false, error: "" });

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>;
  const company = settings?.company || {};

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: false, error: "" });
    try {
      await api.post("/inquiries", form);
      setStatus({ loading: false, ok: true, error: "" });
      setForm({ name: "", email: "", phone: "", company: "", product: "", message: "" });
    } catch (err) {
      const detail = err.response?.data?.detail;
      const msg = typeof detail === "string" ? detail : Array.isArray(detail) ? detail.map((d) => d.msg).join(", ") : "Failed to submit. Please try again.";
      setStatus({ loading: false, ok: false, error: msg });
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="bg-slate-950 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        <div className="container-x relative">
          <p className="eyebrow text-blue-300 mb-6">Get in Touch</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight max-w-3xl">Talk to our export team.</h1>
          <p className="text-slate-300 text-lg max-w-2xl mt-6">We respond to every B2B inquiry within 4 business hours. Send us your specifications, MOQ and destination port — we'll handle the rest.</p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-x grid md:grid-cols-12 gap-12">
          {/* CONTACT INFO */}
          <div className="md:col-span-5 space-y-6">
            <div data-testid="contact-info-block">
              <p className="eyebrow mb-2">Office</p>
              <div className="space-y-5 mt-6">
                <div className="flex gap-4"><MapPin className="text-blue-700 mt-1 flex-shrink-0" size={20} /><div><div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Address</div><div className="text-slate-900">{company.address}</div></div></div>
                <div className="flex gap-4"><Phone className="text-blue-700 mt-1 flex-shrink-0" size={20} /><div><div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Phone</div><a href={`tel:${company.phone}`} className="text-slate-900 hover:text-blue-700">{company.phone}</a></div></div>
                <div className="flex gap-4"><Mail className="text-blue-700 mt-1 flex-shrink-0" size={20} /><div><div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Email</div><a href={`mailto:${company.email}`} className="text-slate-900 hover:text-blue-700">{company.email}</a></div></div>
                <div className="flex gap-4"><Clock className="text-blue-700 mt-1 flex-shrink-0" size={20} /><div><div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Business Hours</div><div className="text-slate-900">{company.hours}</div></div></div>
              </div>
            </div>

            <a href={`https://wa.me/${company.whatsapp}?text=Hello%20Trident%20Enterprise`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-5 py-4 bg-green-50 border border-green-200 hover:border-green-500 transition-all" data-testid="contact-whatsapp-btn">
              <FaWhatsapp className="text-green-600" size={24} />
              <div>
                <div className="font-display font-semibold text-slate-900">Quick connect on WhatsApp</div>
                <div className="text-xs text-slate-600 mt-0.5">Average reply time: under 30 minutes</div>
              </div>
            </a>
          </div>

          {/* FORM */}
          <div className="md:col-span-7">
            <div className="bg-slate-50 border border-slate-200 p-8 md:p-10" data-testid="inquiry-form-card">
              <p className="eyebrow mb-2">Business Inquiry</p>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-slate-900 mb-8">Request a quote or sample.</h2>

              {status.ok && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 flex items-center gap-3" data-testid="inquiry-success">
                  <CheckCircle2 className="text-green-600" size={20} />
                  <span className="text-sm text-slate-800">Thank you. Our export team will respond within 4 business hours.</span>
                </div>
              )}
              {status.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-sm text-red-800" data-testid="inquiry-error">{status.error}</div>
              )}

              <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5" data-testid="inquiry-form">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2 block">Full Name *</label>
                  <input name="name" required value={form.name} onChange={onChange} className="input-field" data-testid="form-name" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2 block">Email *</label>
                  <input type="email" name="email" required value={form.email} onChange={onChange} className="input-field" data-testid="form-email" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2 block">Phone</label>
                  <input name="phone" value={form.phone} onChange={onChange} className="input-field" data-testid="form-phone" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2 block">Company</label>
                  <input name="company" value={form.company} onChange={onChange} className="input-field" data-testid="form-company" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2 block">Product Interest</label>
                  <select name="product" value={form.product} onChange={onChange} className="input-field" data-testid="form-product">
                    <option value="">Select a product…</option>
                    {products.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                    <option value="Multiple / Other">Multiple / Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2 block">Message *</label>
                  <textarea name="message" rows={5} required value={form.message} onChange={onChange} className="input-field" placeholder="Tell us about your requirements: grade, volume, destination port…" data-testid="form-message" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={status.loading} className="btn-primary disabled:opacity-50" data-testid="form-submit-btn">
                    {status.loading ? "Sending…" : "Send Inquiry"} <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-slate-50 pb-24" data-testid="contact-map">
        <div className="container-x">
          <p className="eyebrow mb-4">Find Us</p>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-slate-900 mb-8">Visit our manufacturing facility.</h2>
          <div className="aspect-[16/7] w-full border border-slate-200 overflow-hidden">
            <iframe
              title="Trident Enterprise Location"
              src={settings?.map?.embed_url}
              width="100%" height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="contact-map-iframe"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

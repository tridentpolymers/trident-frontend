import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

export default function Footer({ settings }) {
  const company = settings?.company || {};
  const social = settings?.social || {};
  const certs = settings?.certifications || [];
  const year = new Date().getFullYear();

  return (
    <footer className="dark-section relative overflow-hidden" data-testid="site-footer">
      <div className="grain-overlay"></div>
      <div className="container-x section-pad relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <Logo variant="light" />
            <p className="text-slate-300 mt-6 max-w-md leading-relaxed text-sm">
              {company.tagline || "Premium plastic granules engineered for global manufacturers."}
            </p>
            <div className="flex items-center gap-3 mt-8">
              {social.linkedin && <a href={social.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 border border-slate-700 hover:border-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all" data-testid="social-linkedin"><Linkedin size={16} /></a>}
              {social.twitter && <a href={social.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 border border-slate-700 hover:border-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all" data-testid="social-twitter"><Twitter size={16} /></a>}
              {social.facebook && <a href={social.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 border border-slate-700 hover:border-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all" data-testid="social-facebook"><Facebook size={16} /></a>}
              {social.instagram && <a href={social.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 border border-slate-700 hover:border-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all" data-testid="social-instagram"><Instagram size={16} /></a>}
              {social.youtube && <a href={social.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 border border-slate-700 hover:border-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all" data-testid="social-youtube"><Youtube size={16} /></a>}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">Navigate</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-slate-300 hover:text-white transition" data-testid="footer-nav-home">Home</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-white transition" data-testid="footer-nav-about">About</Link></li>
              <li><Link to="/products" className="text-slate-300 hover:text-white transition" data-testid="footer-nav-products">Products</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white transition" data-testid="footer-nav-contact">Contact</Link></li>
              <li><Link to="/admin/login" className="text-slate-500 hover:text-slate-300 transition text-xs" data-testid="footer-admin-link">Admin Panel</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex gap-3"><MapPin size={16} className="mt-1 flex-shrink-0 text-blue-400" /><span>{company.address}</span></li>
              <li className="flex gap-3"><Phone size={16} className="mt-1 flex-shrink-0 text-blue-400" /><a href={`tel:${company.phone}`} className="hover:text-white">{company.phone}</a></li>
              <li className="flex gap-3"><Mail size={16} className="mt-1 flex-shrink-0 text-blue-400" /><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></li>
            </ul>
          </div>
        </div>

        {certs.length > 0 && (
          <div className="border-t border-slate-800 pt-10 mb-10">
            <p className="eyebrow text-slate-500 mb-5">Certifications & Compliance</p>
            <div className="flex flex-wrap gap-6">
              {certs.map((c) => (
                <div key={c.name} className="px-5 py-3 border border-slate-700" data-testid={`cert-${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <div className="font-display text-white font-semibold text-sm">{c.name}</div>
                  <div className="text-xs text-slate-400 mt-1">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {year} Trident Enterprise. All rights reserved.</p>
          <p className="text-xs text-slate-500">Crafted for global polymer markets · GST registered · MSME certified</p>
        </div>
      </div>
    </footer>
  );
}

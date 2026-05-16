import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className="glass-header sticky top-0 z-50" data-testid="site-header">
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" data-testid="header-logo-link"><Logo /></Link>

        <nav className="hidden md:flex items-center gap-8" data-testid="main-nav">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? "text-blue-700" : "text-slate-700 hover:text-blue-700"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+919825012345" className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-700" data-testid="header-phone">
            <Phone size={16} /> +91 98250 12345
          </a>
          <Link to="/contact" className="btn-primary" data-testid="header-cta-quote">Get a Quote</Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white" data-testid="mobile-menu">
          <div className="container-x py-4 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-base font-semibold ${isActive ? "text-blue-700" : "text-slate-700"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary justify-center" data-testid="mobile-cta-quote">Get a Quote</Link>
          </div>
        </div>
      )}
    </header>
  );
}

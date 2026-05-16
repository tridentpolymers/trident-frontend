import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

const ContentCtx = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api.get("/content/content"),
      api.get("/content/products"),
      api.get("/content/settings"),
      api.get("/content/testimonials"),
      api.get("/content/faq"),
    ]).then(([c, p, s, t, f]) => {
      if (!mounted) return;
      setContent(c.data); setProducts(p.data); setSettings(s.data);
      setTestimonials(t.data); setFaq(f.data); setLoading(false);
    }).catch((e) => { console.error(e); if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <ContentCtx.Provider value={{ content, products, settings, testimonials, faq, loading }}>
      {children}
    </ContentCtx.Provider>
  );
}

export const useContent = () => useContext(ContentCtx);

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingActions({ whatsapp = "919328015880" }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={`https://wa.me/${whatsapp}?text=Hello%20Trident%20Enterprise%2C%20I%20am%20interested%20in%20your%20plastic%20granules.`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-fab"
        aria-label="WhatsApp"
        data-testid="whatsapp-float-btn"
      >
        <FaWhatsapp size={28} />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="scroll-top-btn"
          aria-label="Scroll to top"
          data-testid="scroll-top-btn"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}

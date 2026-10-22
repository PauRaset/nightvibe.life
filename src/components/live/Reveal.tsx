"use client";

import { useEffect } from "react";

// Entradas al hacer scroll. Se monta en cada página (no en el layout) para que
// al navegar se observen los elementos de la página nueva. Marca <html data-reveal> solo cuando el script ha
// arrancado: sin JS (o si falla) nada se oculta. Cada [data-reveal-item] se
// muestra una vez al entrar en pantalla.

export function Reveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    const items = document.querySelectorAll("[data-reveal-item], [data-reveal-grow]");
    // Lo que ya está en pantalla al cargar no se anima.
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.setAttribute("data-shown", "");
      else io.observe(el);
    });
    root.setAttribute("data-reveal", "");
    return () => {
      io.disconnect();
      root.removeAttribute("data-reveal");
    };
  }, []);
  return null;
}

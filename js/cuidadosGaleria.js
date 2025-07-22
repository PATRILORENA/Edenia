const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  gsap.registerPlugin(ScrollTrigger);

  const items = gsap.utils.toArray(".beneficio-item");

  gsap.set(items, { opacity: 0 });

  ScrollTrigger.create({
  trigger: ".dinamico",
  start: "top top",
  end: "+=50%",
  pin: true,
  scrub: true
});
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".dinamico",
    start: "top top",
    end: "+=50%",
    scrub: true
  }
});
 items.forEach((item, index) => {
    tl.to(item, { opacity: 1, duration: 0.3 });
    tl.to({}, { duration: 0.6 });
    tl.to(item, { opacity: 0, duration: 0.3 });
  });
 
gsap.from(".beneficio-item video", {opacity: 0, y: 50, duration: 1, ease: "power2.out"});
gsap.from(".beneficio-item h3", {opacity: 0, y: 20, duration: 1, delay: 0.5, ease: "power2.out"});

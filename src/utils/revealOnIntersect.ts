export const revealOnIntersect = (
  elements: Iterable<Element>,
  options: IntersectionObserverInit = { threshold: 0.2 }
) => {
  const targets = Array.from(elements);

  if (targets.length === 0) {
    return () => undefined;
  }

  if (!('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('visible'));
    return () => undefined;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, options);

  targets.forEach((target) => observer.observe(target));

  return () => observer.disconnect();
};

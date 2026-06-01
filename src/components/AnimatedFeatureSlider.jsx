import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    tag: 'AI Disease Detection',
    title: 'DETECT',
    title2: 'DISEASES',
    description: 'Upload a photo of your corn or maize leaf and our AI model — trained with 96.9% accuracy — instantly identifies diseases and recommends treatments.',
    cta: { label: 'Try Now', to: '/disease-detection' },
    bg: 'linear-gradient(135deg, #0f2d1a 0%, #14532d 60%, #166534 100%)',
    accent: '#22c55e',
    emoji: '🌿',
    stat: { value: '96.9%', label: 'AI Accuracy' },
  },
  {
    tag: 'Premium Seeds',
    title: 'HIGH YIELD',
    title2: 'SEEDS',
    description: 'Certified hybrid seeds developed for Indian climate. Disease resistant, drought tolerant, and proven to deliver 40% more yield than traditional varieties.',
    cta: { label: 'Shop Seeds', to: '/products?category=seeds' },
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
    accent: '#10b981',
    emoji: '🌾',
    stat: { value: '40%', label: 'More Yield' },
  },
  {
    tag: 'Smart Irrigation',
    title: 'SAVE',
    title2: 'WATER',
    description: 'Complete drip irrigation kits for 1 acre. Save up to 60% water compared to flood irrigation while increasing crop yield and reducing labour costs.',
    cta: { label: 'Explore Kits', to: '/products?category=irrigation' },
    bg: 'linear-gradient(135deg, #0c1a2e 0%, #0a2540 60%, #0d3b6e 100%)',
    accent: '#06b6d4',
    emoji: '💧',
    stat: { value: '60%', label: 'Water Saved' },
  },
  {
    tag: 'Organic Farming',
    title: 'GO',
    title2: 'ORGANIC',
    description: 'Premium vermicompost, neem oil, and bio-pesticides. Grow chemical-free produce that commands premium prices in the market while protecting soil health.',
    cta: { label: 'Shop Organic', to: '/products?category=organic' },
    bg: 'linear-gradient(135deg, #1a2e0f 0%, #2d4a1a 60%, #3d6b1a 100%)',
    accent: '#84cc16',
    emoji: '♻️',
    stat: { value: '100%', label: 'Chemical Free' },
  },
  {
    tag: 'Expert Support',
    title: 'FREE',
    title2: 'CONSULTATION',
    description: 'Get free agronomist consultation with every purchase above ₹2000. Our experts guide you on crop selection, soil health, and pest management.',
    cta: { label: 'Contact Us', to: '/contact' },
    bg: 'linear-gradient(135deg, #2e1a0f 0%, #4a2e1a 60%, #6b3d1a 100%)',
    accent: '#f59e0b',
    emoji: '👨‍🌾',
    stat: { value: '15K+', label: 'Farmers Helped' },
  },
];

export default function AnimatedFeatureSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  const titleRef   = useRef();
  const title2Ref  = useRef();
  const tagRef     = useRef();
  const descRef    = useRef();
  const ctaRef     = useRef();
  const statRef    = useRef();
  const emojiRef   = useRef();
  const progressRef = useRef();
  const intervalRef = useRef();

  const slide = slides[current];

  const animateIn = () => {
    const tl = gsap.timeline();
    tl.fromTo(tagRef.current,   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })
      .fromTo(titleRef.current,  { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .fromTo(title2Ref.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.35')
      .fromTo(descRef.current,   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      .fromTo(ctaRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.15')
      .fromTo(statRef.current,   { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.2')
      .fromTo(emojiRef.current,  { scale: 0, rotation: -20 }, { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.4');
  };

  const animateOut = (cb) => {
    const dir = direction === 'next' ? -1 : 1;
    const tl = gsap.timeline({ onComplete: cb });
    tl.to([tagRef.current, descRef.current, ctaRef.current], { y: -20 * dir, opacity: 0, duration: 0.25, ease: 'power2.in', stagger: 0.05 })
      .to([titleRef.current, title2Ref.current], { y: -40 * dir, opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2')
      .to([statRef.current, emojiRef.current], { scale: 0.8, opacity: 0, duration: 0.2 }, '-=0.2');
  };

  const goTo = (idx, dir = 'next') => {
    if (animating || idx === current) return;
    setAnimating(true);
    setDirection(dir);
    animateOut(() => {
      setCurrent(idx);
      setAnimating(false);
    });
  };

  const next = () => goTo((current + 1) % slides.length, 'next');
  const prev = () => goTo((current - 1 + slides.length) % slides.length, 'prev');

  // Animate in when current changes
  useEffect(() => {
    animateIn();
  }, [current]);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [current]);

  // Progress bar animation
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 5, ease: 'none', transformOrigin: 'left center' }
    );
  }, [current]);

  return (
    <section style={{
      position: 'relative',
      background: slide.bg,
      minHeight: '520px',
      overflow: 'hidden',
      transition: 'background 0.8s ease',
    }}>
      {/* Animated background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      {/* Glow orb */}
      <div style={{
        position: 'absolute', right: '-100px', top: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: `radial-gradient(circle, ${slide.accent}20 0%, transparent 70%)`,
        transition: 'background 0.8s ease',
        pointerEvents: 'none',
      }} />

      {/* Progress bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.1)', zIndex: 10 }}>
        <div ref={progressRef} style={{ height: '100%', background: slide.accent, transformOrigin: 'left center', transition: 'background 0.5s' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4rem 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>

          {/* Left — Text content */}
          <div>
            {/* Tag */}
            <div ref={tagRef} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: `${slide.accent}20`,
              border: `1px solid ${slide.accent}40`,
              borderRadius: '999px', padding: '0.375rem 1rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: slide.accent }} />
              <span style={{ fontSize: '0.8rem', color: slide.accent, fontWeight: 600 }}>{slide.tag}</span>
            </div>

            {/* Title */}
            <div style={{ overflow: 'hidden', marginBottom: '0.25rem' }}>
              <h2 ref={titleRef} style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 800,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                color: 'white', lineHeight: 1, letterSpacing: '-0.02em',
              }}>{slide.title}</h2>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
              <h2 ref={title2Ref} style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 800,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}aa)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1, letterSpacing: '-0.02em',
              }}>{slide.title2}</h2>
            </div>

            {/* Description */}
            <p ref={descRef} style={{
              color: 'rgba(255,255,255,0.7)', fontSize: '1rem',
              lineHeight: 1.7, maxWidth: '460px', marginBottom: '2rem',
            }}>{slide.description}</p>

            {/* CTA */}
            <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to={slide.cta.to} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 2rem',
                background: slide.accent,
                color: '#0f2d1a', fontWeight: 700, fontSize: '0.95rem',
                borderRadius: 'var(--radius-sm)',
                boxShadow: `0 8px 24px ${slide.accent}40`,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${slide.accent}60`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${slide.accent}40`; }}
              >
                {slide.cta.label} →
              </Link>

              {/* Dot indicators */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {slides.map((_, i) => (
                  <button key={i} onClick={() => goTo(i, i > current ? 'next' : 'prev')} style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px', borderRadius: '999px',
                    background: i === current ? slide.accent : 'rgba(255,255,255,0.3)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right — Visual card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>

              {/* Main card */}
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${slide.accent}30`,
                borderRadius: '24px',
                padding: '2.5rem',
                boxShadow: `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${slide.accent}10`,
              }}>
                {/* Emoji */}
                <div ref={emojiRef} style={{
                  fontSize: '5rem', marginBottom: '1.5rem',
                  display: 'block', textAlign: 'center',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                }}>
                  {slide.emoji}
                </div>

                {/* Stat */}
                <div ref={statRef} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'Poppins', fontWeight: 800,
                    fontSize: '3rem', color: slide.accent,
                    lineHeight: 1, marginBottom: '0.5rem',
                    textShadow: `0 0 30px ${slide.accent}60`,
                  }}>
                    {slide.stat.value}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 500 }}>
                    {slide.stat.label}
                  </div>
                </div>

                {/* Decorative line */}
                <div style={{
                  height: '2px', marginTop: '1.5rem',
                  background: `linear-gradient(90deg, transparent, ${slide.accent}, transparent)`,
                  borderRadius: '999px',
                }} />
              </div>

              {/* Floating mini cards */}
              <div style={{
                position: 'absolute', top: '-16px', right: '-16px',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                border: `1px solid ${slide.accent}30`,
                borderRadius: '12px', padding: '0.625rem 0.875rem',
                fontSize: '0.75rem', color: 'white', fontWeight: 600,
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}>
                ✓ Trusted by 15K+ Farmers
              </div>

              <div style={{
                position: 'absolute', bottom: '-16px', left: '-16px',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                border: `1px solid ${slide.accent}30`,
                borderRadius: '12px', padding: '0.625rem 0.875rem',
                fontSize: '0.75rem', color: 'white', fontWeight: 600,
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}>
                🚚 Same-day Dispatch
              </div>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div style={{
          display: 'flex', gap: '0.75rem',
          position: 'absolute', bottom: '2rem', right: '1.5rem',
        }}>
          {[{ fn: prev, Icon: ArrowLeft }, { fn: next, Icon: ArrowRight }].map(({ fn, Icon }, i) => (
            <button key={i} onClick={fn} style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: `1px solid rgba(255,255,255,0.2)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = slide.accent; e.currentTarget.style.borderColor = slide.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>

        {/* Slide counter */}
        <div style={{
          position: 'absolute', bottom: '2.25rem', left: '1.5rem',
          color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 600,
        }}>
          <span style={{ color: slide.accent, fontSize: '1.1rem' }}>{String(current + 1).padStart(2, '0')}</span>
          {' / '}{String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}

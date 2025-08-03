// Animation utilities
export class AnimationController {
  constructor() {
    this.animatedElements = [];
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupCustomCursor();
    this.setupParallaxEffects();
    this.setupTextReveal();
  }

  // Scroll animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Hover effects
  setupHoverEffects() {
    // Project cards hover effect
    document.querySelectorAll('.home__projects__project').forEach(card => {
      card.classList.add('hover-lift');
    });

    // Button hover effects
    document.querySelectorAll('.c-button').forEach(button => {
      button.classList.add('hover-glow');
    });

    // Link hover effects
    document.querySelectorAll('a').forEach(link => {
      link.classList.add('hover-scale');
    });
  }

  // Custom cursor
  setupCustomCursor() {
    if (window.innerWidth > 768) { // Only on desktop
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      document.body.appendChild(cursor);

      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });

      // Cursor effects on hover
      document.querySelectorAll('a, button, .c-button').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(2)';
          cursor.style.background = 'rgba(255, 165, 0, 0.9)';
        });

        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'scale(1)';
          cursor.style.background = 'rgba(255, 165, 0, 0.8)';
        });
      });
    }
  }

  // Parallax effects
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // Text reveal animation
  setupTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.5 });

    textElements.forEach(el => {
      textObserver.observe(el);
    });
  }

  // Smooth scroll to element
  scrollToElement(element, duration = 1000) {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // Loading animation
  showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loading-shimmer';
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      z-index: 10000;
    `;
    document.body.appendChild(loader);

    setTimeout(() => {
      loader.remove();
    }, 1500);
  }

  // Typing effect
  typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }
}

// Responsive utilities
export class ResponsiveController {
  constructor() {
    this.currentBreakpoint = this.getBreakpoint();
    this.init();
  }

  init() {
    window.addEventListener('resize', () => {
      const newBreakpoint = this.getBreakpoint();
      if (newBreakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = newBreakpoint;
        this.handleBreakpointChange();
      }
    });
  }

  getBreakpoint() {
    const width = window.innerWidth;
    if (width <= 550) return 'phone';
    if (width <= 768) return 'tablet';
    if (width <= 1366) return 'desktop';
    return 'large';
  }

  handleBreakpointChange() {
    // Adjust animations based on breakpoint
    const animationController = new AnimationController();
    
    if (this.currentBreakpoint === 'phone') {
      // Disable heavy animations on mobile
      document.body.classList.add('mobile-optimized');
    } else {
      document.body.classList.remove('mobile-optimized');
    }
  }

  // Touch-friendly interactions
  setupTouchInteractions() {
    if ('ontouchstart' in window) {
      document.querySelectorAll('.hover-lift, .hover-scale').forEach(el => {
        el.addEventListener('touchstart', () => {
          el.style.transform = 'scale(1.05) translateY(-3px)';
        });
        
        el.addEventListener('touchend', () => {
          el.style.transform = '';
        });
      });
    }
  }
}

// Performance optimizations
export class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.debounceScroll();
    this.optimizeImages();
    this.setupLazyLoading();
  }

  debounceScroll() {
    let ticking = false;
    
    function updateScroll() {
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    });
  }

  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.decoding = 'async';
    });
  }

  setupLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          lazyObserver.unobserve(entry.target);
        }
      });
    });

    lazyElements.forEach(el => lazyObserver.observe(el));
  }
} 
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. STICKY HEADER & SCROLL PROGRESS
     ========================================== */
  const header = document.getElementById('site-header');
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    // Sticky header class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (windowHeight > 0) {
      const scrolled = (window.scrollY / windowHeight) * 100;
      scrollProgress.style.width = `${scrolled}%`;
    }
  });


  /* ==========================================
     2. MOBILE DRAWER NAVIGATION
     ========================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileMenu.classList.add('open');
    drawerOverlay.classList.add('active');
    hamburgerBtn.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeDrawer = () => {
    mobileMenu.classList.remove('open');
    drawerOverlay.classList.remove('active');
    hamburgerBtn.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerCloseBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  /* ==========================================
     3. INTERSECTION OBSERVER FOR SCROLL REVEAL
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .fade-in');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger counter animation if it's the hero content containing numbers
        if (entry.target.classList.contains('reveal-left') && entry.target.querySelector('.stat-number')) {
          animateStats();
        }
        
        observer.unobserve(entry.target); // Stop observing after animated
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  /* ==========================================
     4. HERO STATS COUNTER ANIMATION
     ========================================== */
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 2000; // 2 seconds
      const stepTime = 30; // Milliseconds per step
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const counterInterval = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(counterInterval);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }


  /* ==========================================
     5. INTERACTIVE BMI CALCULATOR
     ========================================== */
  const weightInput = document.getElementById('bmi-weight');
  const heightInput = document.getElementById('bmi-height');
  const calcBtn = document.getElementById('btn-calculate-bmi');
  
  const needle = document.getElementById('bmi-needle');
  const gaugeFill = document.querySelector('.gauge-fill');
  const valDisplay = document.getElementById('bmi-value-display');
  const statusDisplay = document.getElementById('bmi-status-display');
  const tipDisplay = document.getElementById('bmi-tip-display');

  const calculateBMI = () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value) / 100; // convert cm to m

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid, positive numbers for weight and height.');
      return;
    }

    const bmi = weight / (height * height);
    const bmiRounded = bmi.toFixed(1);
    
    // Display value
    valDisplay.textContent = bmiRounded;

    // Calculate Gauge rotation and categorization
    // BMI ranges: 15 to 35. 
    // Needle rot: -90deg (Underweight) to +90deg (Obese)
    const minBmi = 15;
    const maxBmi = 35;
    let percent = (bmi - minBmi) / (maxBmi - minBmi);
    percent = Math.max(0, Math.min(1, percent)); // clamp 0 to 1

    const rotDeg = -90 + (percent * 180);
    
    // Apply animations
    needle.style.transform = `translateX(-50%) rotate(${rotDeg}deg)`;
    
    // Gauge SVG arc length is 125.6. Offset sets the empty part: 
    // offset = total (125.6) * (1 - filled_fraction)
    const strokeOffset = 125.6 * (1 - percent);
    gaugeFill.style.strokeDashoffset = strokeOffset;

    // Assign categories
    let category = '';
    let tipText = '';
    let categoryColor = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      tipText = 'Consider focusing on calorie-dense, nutritious foods and progressive strength training to build lean muscle safely.';
      categoryColor = '#3498db'; // Blue
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal Weight';
      tipText = 'Great job! Maintain your current routine, prioritizing a balanced diet, regular strength, and cardio conditioning.';
      categoryColor = '#39FF14'; // Neon Green
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      tipText = 'We suggest adding HIIT workouts or increasing active daily energy expenditure combined with a slight calorie deficit.';
      categoryColor = '#f1c40f'; // Yellow
    } else {
      category = 'Obese';
      tipText = 'Focus on low-impact cardio, strength workouts, and consult with our nutritionists to structure a healthy caloric plan.';
      categoryColor = '#e74c3c'; // Red
    }

    statusDisplay.textContent = category;
    statusDisplay.style.color = categoryColor;
    tipDisplay.textContent = tipText;
  };

  calcBtn.addEventListener('click', calculateBMI);


  /* ==========================================
     6. BILLING CYCLE TOGGLE (MONTHLY / ANNUALLY)
     ========================================== */
  const toggleBtn = document.getElementById('billing-toggle-switch');
  const labelMonthly = document.getElementById('billing-monthly');
  const labelAnnual = document.getElementById('billing-annual');
  const priceValues = document.querySelectorAll('.price-val');

  const toggleBillingCycle = () => {
    const isAnnual = toggleBtn.classList.toggle('active');
    labelMonthly.classList.toggle('active', !isAnnual);
    labelAnnual.classList.toggle('active', isAnnual);

    priceValues.forEach(price => {
      const monthlyVal = price.getAttribute('data-monthly');
      const annualVal = price.getAttribute('data-annual');
      
      // Animate price change
      price.style.opacity = '0';
      price.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        price.textContent = isAnnual ? annualVal : monthlyVal;
        price.style.opacity = '1';
        price.style.transform = 'translateY(0)';
      }, 180);
    });
  };

  toggleBtn.addEventListener('click', toggleBillingCycle);
  labelMonthly.addEventListener('click', () => {
    if (toggleBtn.classList.contains('active')) {
      toggleBillingCycle();
    }
  });
  labelAnnual.addEventListener('click', () => {
    if (!toggleBtn.classList.contains('active')) {
      toggleBillingCycle();
    }
  });


  /* ==========================================
     7. FORM SUBMISSIONS (LEAD & NEWSLETTER)
     ========================================== */
  // Lead Form
  const leadForm = document.getElementById('lead-form');
  const leadSubmitBtn = document.getElementById('btn-submit-lead');
  const leadSuccessMsg = document.getElementById('form-success-msg');

  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable button during submitting simulation
    leadSubmitBtn.disabled = true;
    leadSubmitBtn.textContent = 'Processing...';

    setTimeout(() => {
      leadForm.reset();
      leadSubmitBtn.style.display = 'none';
      leadSuccessMsg.style.display = 'flex';
    }, 1200);
  });

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const button = newsletterForm.querySelector('button');

    input.disabled = true;
    button.disabled = true;

    setTimeout(() => {
      input.value = '';
      newsletterSuccess.style.display = 'block';
      setTimeout(() => {
        input.disabled = false;
        button.disabled = false;
        newsletterSuccess.style.display = 'none';
      }, 3000);
    }, 800);
  });


  /* ==========================================
     8. ACTIVE LINK INDICATOR ON SCROLL
     ========================================== */
  const sections = document.querySelectorAll('section[id], header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 150; // offset for nav header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}` || (currentId === 'hero' && href === '#hero')) {
        link.classList.add('active');
      }
    });
  });

});

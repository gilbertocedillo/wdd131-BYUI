// ===== Main JavaScript Module =====
import { LanguageManager } from './language.js';

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const mobileMenuBtn = document.querySelector('.navbar-toggler');
const mainNav = document.getElementById('navbarText');
const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePassword');
const strengthBar = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');
const passwordSuggestions = document.getElementById('passwordSuggestions');
const statsElements = {
  phishing: document.getElementById('phishingStat'),
  password: document.getElementById('passwordStat'),
  mobile: document.getElementById('mobileStat'),
  financial: document.getElementById('financialStat')
};

// ===== Theme Management =====
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setTheme(this.theme);
    this.addEventListeners();
  }

  setTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateToggleIcon();
  }

  toggleTheme() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }

  updateToggleIcon() {
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (this.theme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
      } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
  }

  addEventListeners() {
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
}

// ===== Password Strength Analyzer =====
class PasswordAnalyzer {
  constructor() {
    this.rules = [
      { id: 'ruleLength', test: (pwd) => pwd.length >= 12, message: 'Use at least 12 characters' },
      { id: 'ruleUppercase', test: (pwd) => /[A-Z]/.test(pwd), message: 'Add uppercase letters' },
      { id: 'ruleLowercase', test: (pwd) => /[a-z]/.test(pwd), message: 'Add lowercase letters' },
      { id: 'ruleNumbers', test: (pwd) => /[0-9]/.test(pwd), message: 'Include numbers' },
      { id: 'ruleSpecial', test: (pwd) => /[^A-Za-z0-9]/.test(pwd), message: 'Add special characters' }
    ];
  }

  analyze(password) {
    if (!password) {
      return {
        strength: 0,
        label: 'Enter a password',
        color: '#ff4444',
        suggestions: []
      };
    }

    const passedRules = this.rules.filter(rule => rule.test(password));
    const strength = Math.round((passedRules.length / this.rules.length) * 100);
    
    let label, color;
    if (strength < 40) {
      label = 'Weak';
      color = '#ff4444';
    } else if (strength < 70) {
      label = 'Fair';
      color = '#ffa500';
    } else if (strength < 90) {
      label = 'Good';
      color = '#4CAF50';
    } else {
      label = 'Strong';
      color = '#2E7D32';
    }

    const failedRules = this.rules.filter(rule => !rule.test(password));
    const suggestions = failedRules.map(rule => rule.message);

    return { strength, label, color, suggestions };
  }

  updateUI(password) {
    const analysis = this.analyze(password);
    
    // Update strength bar
    strengthBar.style.width = `${analysis.strength}%`;
    strengthBar.style.backgroundColor = analysis.color;
    
    // Update label
    strengthLabel.textContent = analysis.label;
    strengthLabel.style.color = analysis.color;
    
    // Update suggestions
    if (analysis.suggestions.length > 0) {
      passwordSuggestions.innerHTML = `
        <strong>Suggestions:</strong>
        <ul>${analysis.suggestions.map(s => `<li>${s}</li>`).join('')}</ul>
      `;
      passwordSuggestions.style.display = 'block';
    } else {
      passwordSuggestions.style.display = 'none';
    }
    
    // Update rule indicators
    this.rules.forEach(rule => {
      const element = document.getElementById(rule.id);
      if (element) {
        const icon = element.querySelector('i');
        if (rule.test(password)) {
          icon.className = 'fas fa-check-circle';
          icon.style.color = '#4CAF50';
        } else {
          icon.className = 'fas fa-times-circle';
          icon.style.color = '#f44336';
        }
      }
    });
  }
}

// ===== Stats Animation =====
class StatsAnimator {
  constructor() {
    this.stats = {
      phishing: { value: 3400000000, suffix: '', formatter: this.formatLargeNumber },
      password: { value: 81, suffix: '%', formatter: (v) => v },
      mobile: { value: 24, suffix: '% Increase', formatter: (v) => v },
      financial: { value: 4.35, suffix: ' Million', formatter: (v) => v.toFixed(2) }
    };
  }

  formatLargeNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    return num.toLocaleString();
  }

  animateStat(key, element) {
    const stat = this.stats[key];
    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        current = stat.value;
        clearInterval(timer);
      }
      
      const displayValue = stat.formatter(current);
      element.textContent = displayValue + stat.suffix;
    }, duration / steps);
  }

  animateAll() {
    Object.keys(statsElements).forEach(key => {
      if (statsElements[key]) {
        this.animateStat(key, statsElements[key]);
      }
    });
  }
}

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize managers
  const themeManager = new ThemeManager();
  const passwordAnalyzer = new PasswordAnalyzer();
  const statsAnimator = new StatsAnimator();
  const languageManager = new LanguageManager();

  // Navbar elements
  const mobileMenuBtn = document.querySelector('.navbar-toggler');
  const mainNav = document.getElementById('navbarText');

  // ===== Mobile menu toggle with ARIA =====
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mainNav.classList.remove('show'); // Bootstrap uses .collapse.show
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== Password analyzer =====
  if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
      passwordAnalyzer.updateUI(e.target.value);
    });

    if (togglePasswordBtn) {
      togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        const icon = togglePasswordBtn.querySelector('i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        togglePasswordBtn.setAttribute('aria-label', 
          type === 'password' ? 'Show password' : 'Hide password');
      });
    }
  }

  // ===== Animate stats when they come into view =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statsAnimator.animateAll();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);

  // ===== Set current year in footer =====
  const yearElement = document.querySelector('footer p');
  if (yearElement) {
    yearElement.textContent = yearElement.textContent.replace(/\d{4}/, new Date().getFullYear());
  }

  // ===== Keyboard navigation for accessibility =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('show')) {
      mainNav.classList.remove('show');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
});

// ===== Export for testing =====
export { ThemeManager, PasswordAnalyzer, StatsAnimator };
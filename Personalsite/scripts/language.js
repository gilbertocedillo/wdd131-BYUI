// ===== Language Management =====
export class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.translations = {
      en: {
        // Navigation
        'nav.home': 'Home',
        'nav.quiz': 'Security Quiz',
        'nav.resources': 'Resources',
        
        // Hero Section
        'hero.title': 'Empowering You with Cybersecurity Knowledge',
        'hero.subtitle': 'Learn how to protect yourself online with our beginner-friendly resources and interactive tools.',
        'hero.quizBtn': 'Take Security Quiz',
        'hero.statsBtn': 'View Statistics',
        
        // Stats
        'stats.title': 'Cybersecurity Statistics Dashboard',
        'stats.phishing': 'Phishing Attacks',
        'stats.password': 'Password Security',
        'stats.mobile': 'Mobile Threats',
        'stats.financial': 'Financial Impact',
        
        // Password Analyzer
        'password.title': 'Password Strength Analyzer',
        'password.subtitle': 'Check how strong your password is and get suggestions for improvement.',
        'password.placeholder': 'Enter your password to analyze',
        'password.checklist': 'Strong Password Checklist:',
        'password.ruleLength': 'At least 12 characters',
        'password.ruleUppercase': 'Includes uppercase letters',
        'password.ruleLowercase': 'Includes lowercase letters',
        'password.ruleNumbers': 'Includes numbers',
        'password.ruleSpecial': 'Includes special characters',
        
        // Security Tips
        'tips.title': 'Weekly Security Tips',
        'tips.passwordManager': 'Use a Password Manager',
        'tips.twoFactor': 'Enable Two-Factor Authentication',
        'tips.phishing': 'Spot Phishing Emails',
        
        // Footer
        'footer.tagline': 'Making cybersecurity accessible to everyone.',
        'footer.quickLinks': 'Quick Links',
        'footer.contact': 'Contact'
      },
      es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.quiz': 'Cuestionario de Seguridad',
        'nav.resources': 'Recursos',
        
        // Hero Section
        'hero.title': 'Empoderándote con Conocimiento de Ciberseguridad',
        'hero.subtitle': 'Aprende a protegerte en línea con nuestros recursos para principiantes y herramientas interactivas.',
        'hero.quizBtn': 'Realizar Cuestionario',
        'hero.statsBtn': 'Ver Estadísticas',
        
        // Stats
        'stats.title': 'Panel de Estadísticas de Ciberseguridad',
        'stats.phishing': 'Ataques de Phishing',
        'stats.password': 'Seguridad de Contraseñas',
        'stats.mobile': 'Amenazas Móviles',
        'stats.financial': 'Impacto Financiero',
        
        // Password Analyzer
        'password.title': 'Analizador de Fortaleza de Contraseñas',
        'password.subtitle': 'Verifica qué tan fuerte es tu contraseña y obtén sugerencias para mejorarla.',
        'password.placeholder': 'Ingresa tu contraseña para analizar',
        'password.checklist': 'Lista de Verificación de Contraseñas Fuertes:',
        'password.ruleLength': 'Al menos 12 caracteres',
        'password.ruleUppercase': 'Incluye letras mayúsculas',
        'password.ruleLowercase': 'Incluye letras minúsculas',
        'password.ruleNumbers': 'Incluye números',
        'password.ruleSpecial': 'Incluye caracteres especiales',
        
        // Security Tips
        'tips.title': 'Consejos de Seguridad de la Semana',
        'tips.passwordManager': 'Usa un Gestor de Contraseñas',
        'tips.twoFactor': 'Activa la Autenticación de Dos Factores',
        'tips.phishing': 'Detecta Correos de Phishing',
        
        // Footer
        'footer.tagline': 'Haciendo la ciberseguridad accesible para todos.',
        'footer.quickLinks': 'Enlaces Rápidos',
        'footer.contact': 'Contacto'
      }
    };

    this.init();
  }

  init() {
    this.updatePage();
    this.addEventListeners();
  }

  addEventListeners() {
    const toggleBtn = document.getElementById('languageToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleLanguage());
    }
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('language', this.currentLang);
    this.updatePage();
    this.updateToggleButton();
  }

  updateToggleButton() {
    const toggleBtn = document.getElementById('languageToggle');
    if (toggleBtn) {
      const span = toggleBtn.querySelector('span');
      if (span) {
        span.textContent = this.currentLang.toUpperCase();
      }
      toggleBtn.setAttribute(
        'aria-label',
        this.currentLang === 'en' ? 'Cambiar a español' : 'Switch to English'
      );
    }
  }

  translate(key) {
    const keys = key.split('.');
    let translation = this.translations[this.currentLang];

    for (const k of keys) {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        return key;
      }
    }

    return translation;
  }

  updatePage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (!key) return;

      const translation = this.translate(key);

      if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
        element.placeholder = translation;
      } 
      else {
        element.textContent = translation;
      }
    });
  }
}

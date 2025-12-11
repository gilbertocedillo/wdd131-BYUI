// ===== Resources JavaScript Module =====
import { languageManager } from './language.js';

// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const searchResults = document.getElementById('searchResults');
const resourcesGrid = document.getElementById('resourcesGrid');
const glossarySearch = document.getElementById('glossarySearch');
const glossaryList = document.getElementById('glossaryList');

// Resources Data
const resources = [
  // Beginner Resources
  {
    id: 1,
    title: "Password Security Basics",
    description: "Learn how to create and manage strong passwords that protect your accounts.",
    category: "password",
    difficulty: "beginner",
    type: "guide",
    tags: ["password", "security", "beginner"],
    icon: "fa-key",
    url: "#"
  },
  {
    id: 2,
    title: "How to Spot Phishing Emails",
    description: "Identify common signs of phishing attempts and protect yourself from scams.",
    category: "email",
    difficulty: "beginner",
    type: "guide",
    tags: ["phishing", "email", "scams"],
    icon: "fa-envelope",
    url: "#"
  },
  {
    id: 3,
    title: "Two-Factor Authentication Setup Guide",
    description: "Step-by-step instructions for setting up 2FA on popular platforms.",
    category: "authentication",
    difficulty: "beginner",
    type: "tutorial",
    tags: ["2fa", "authentication", "security"],
    icon: "fa-user-shield",
    url: "#"
  },
  
  // Intermediate Resources
  {
    id: 4,
    title: "Home Network Security",
    description: "Secure your home Wi-Fi network and connected devices from threats.",
    category: "network",
    difficulty: "intermediate",
    type: "guide",
    tags: ["network", "wifi", "router"],
    icon: "fa-wifi",
    url: "#"
  },
  {
    id: 5,
    title: "Using Password Managers",
    description: "Complete guide to using password managers effectively and securely.",
    category: "password",
    difficulty: "intermediate",
    type: "tutorial",
    tags: ["password-manager", "security", "tools"],
    icon: "fa-lock",
    url: "#"
  },
  {
    id: 6,
    title: "Social Media Privacy Settings",
    description: "Optimize your privacy settings on Facebook, Twitter, Instagram, and more.",
    category: "privacy",
    difficulty: "intermediate",
    type: "guide",
    tags: ["social-media", "privacy", "settings"],
    icon: "fa-share-alt",
    url: "#"
  },
  
  // Advanced Resources
  {
    id: 7,
    title: "Advanced Threat Detection",
    description: "Learn about advanced persistent threats and how to detect them.",
    category: "threats",
    difficulty: "advanced",
    type: "guide",
    tags: ["threats", "malware", "detection"],
    icon: "fa-bug",
    url: "#"
  },
  {
    id: 8,
    title: "Network Security Monitoring",
    description: "Tools and techniques for monitoring network security.",
    category: "network",
    difficulty: "advanced",
    type: "guide",
    tags: ["network", "monitoring", "security"],
    icon: "fa-network-wired",
    url: "#"
  },
  
  // Tools
  {
    id: 9,
    title: "Recommended Security Tools",
    description: "Curated list of essential cybersecurity tools for personal use.",
    category: "tools",
    difficulty: "all",
    type: "tools",
    tags: ["tools", "software", "recommendations"],
    icon: "fa-tools",
    url: "#"
  },
  {
    id: 10,
    title: "Free Antivirus Software",
    description: "Review of the best free antivirus solutions for home users.",
    category: "tools",
    difficulty: "all",
    type: "tools",
    tags: ["antivirus", "malware", "protection"],
    icon: "fa-shield-virus",
    url: "#"
  },
  
  // Videos
  {
    id: 11,
    title: "Cybersecurity for Beginners",
    description: "Video series explaining basic cybersecurity concepts in simple terms.",
    category: "education",
    difficulty: "beginner",
    type: "video",
    tags: ["video", "tutorial", "beginners"],
    icon: "fa-video",
    url: "#"
  },
  {
    id: 12,
    title: "Password Management Best Practices",
    description: "Video tutorial on creating and managing secure passwords.",
    category: "password",
    difficulty: "intermediate",
    type: "video",
    tags: ["video", "password", "tutorial"],
    icon: "fa-film",
    url: "#"
  }
];

// Glossary Data
const glossaryTerms = [
  {
    term: "Phishing",
    definition: "A cyber attack that uses disguised email as a weapon. The goal is to trick the email recipient into believing that the message is something they want or need."
  },
  {
    term: "Malware",
    definition: "Software that is specifically designed to disrupt, damage, or gain unauthorized access to a computer system."
  },
  {
    term: "Two-Factor Authentication (2FA)",
    definition: "A security process in which users provide two different authentication factors to verify themselves."
  },
  {
    term: "VPN",
    definition: "Virtual Private Network - extends a private network across a public network, enabling users to send and receive data across shared or public networks."
  },
  {
    term: "Firewall",
    definition: "A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules."
  },
  {
    term: "Encryption",
    definition: "The process of converting information or data into a code, especially to prevent unauthorized access."
  },
  {
    term: "Ransomware",
    definition: "A type of malicious software designed to block access to a computer system until a sum of money is paid."
  },
  {
    term: "Social Engineering",
    definition: "The use of deception to manipulate individuals into divulging confidential or personal information that may be used for fraudulent purposes."
  },
  {
    term: "Brute Force Attack",
    definition: "A trial-and-error method used to obtain information such as a user password or personal identification number (PIN)."
  },
  {
    term: "Zero-Day Vulnerability",
    definition: "A software vulnerability that is unknown to, or unaddressed by, those who should be interested in mitigating the vulnerability."
  }
];

// ===== Resource Manager =====
class ResourceManager {
  constructor() {
    this.currentFilter = 'all';
    this.currentSearch = '';
    this.filteredResources = [...resources];
    this.init();
  }

  init() {
    this.renderResources();
    this.renderGlossary();
    this.addEventListeners();
  }

  renderResources() {
    resourcesGrid.innerHTML = '';
    
    if (this.filteredResources.length === 0) {
      resourcesGrid.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h3>No resources found</h3>
          <p>Try a different search term or filter</p>
        </div>
      `;
      return;
    }
    
    this.filteredResources.forEach(resource => {
      const resourceCard = this.createResourceCard(resource);
      resourcesGrid.appendChild(resourceCard);
    });
  }

  createResourceCard(resource) {
    const card = document.createElement('article');
    card.className = 'resource-card';
    card.dataset.difficulty = resource.difficulty;
    card.dataset.type = resource.type;
    
    // Determine badge color based on difficulty
    let badgeColor = '#1A24EB'; // Default: primary blue
    switch(resource.difficulty) {
      case 'beginner':
        badgeColor = '#4CAF50'; // Green
        break;
      case 'intermediate':
        badgeColor = '#FF9800'; // Orange
        break;
      case 'advanced':
        badgeColor = '#f44336'; // Red
        break;
    }
    
    card.innerHTML = `
      <div class="resource-icon">
        <i class="fas ${resource.icon}"></i>
      </div>
      <span class="resource-tag" style="background-color: ${badgeColor}20; color: ${badgeColor};">
        ${resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
      </span>
      <h3>${resource.title}</h3>
      <p>${resource.description}</p>
      <div class="resource-tags">
        ${resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <a href="${resource.url}" class="btn btn-outline">Learn More</a>
    `;
    
    return card;
  }

  filterResources(filter) {
    this.currentFilter = filter;
    
    if (filter === 'all') {
      this.filteredResources = [...resources];
    } else {
      this.filteredResources = resources.filter(resource => {
        // Check if resource matches filter
        if (filter === 'tools' && resource.type === 'tools') return true;
        if (filter === 'videos' && resource.type === 'video') return true;
        if (resource.difficulty === filter) return true;
        return resource.category === filter;
      });
    }
    
    // Apply search filter if there's a search term
    if (this.currentSearch) {
      this.applySearchFilter(this.currentSearch);
    } else {
      this.renderResources();
    }
  }

  searchResources(searchTerm) {
    this.currentSearch = searchTerm.toLowerCase().trim();
    
    if (!this.currentSearch) {
      // Reset to current filter
      this.filterResources(this.currentFilter);
      searchResults.style.display = 'none';
      return;
    }
    
    // Filter resources based on search term
    this.filteredResources = resources.filter(resource => {
      const searchableText = `
        ${resource.title} 
        ${resource.description} 
        ${resource.tags.join(' ')} 
        ${resource.category}
        ${resource.difficulty}
      `.toLowerCase();
      
      return searchableText.includes(this.currentSearch);
    });
    
    this.renderResources();
    
    // Show search results count
    const resultCount = this.filteredResources.length;
    searchResults.textContent = `Found ${resultCount} ${resultCount === 1 ? 'result' : 'results'}`;
    searchResults.style.display = 'block';
  }

  applySearchFilter(searchTerm) {
    this.filteredResources = this.filteredResources.filter(resource => {
      const searchableText = `
        ${resource.title} 
        ${resource.description} 
        ${resource.tags.join(' ')} 
        ${resource.category}
        ${resource.difficulty}
      `.toLowerCase();
      
      return searchableText.includes(searchTerm);
    });
    
    this.renderResources();
  }

  renderGlossary() {
    glossaryList.innerHTML = '';
    
    glossaryTerms.forEach(term => {
      const termElement = document.createElement('div');
      termElement.className = 'glossary-term';
      termElement.innerHTML = `
        <h4>${term.term}</h4>
        <p>${term.definition}</p>
      `;
      glossaryList.appendChild(termElement);
    });
  }

  searchGlossary(searchTerm) {
    const search = searchTerm.toLowerCase().trim();
    
    if (!search) {
      this.renderGlossary();
      return;
    }
    
    const filteredTerms = glossaryTerms.filter(term => 
      term.term.toLowerCase().includes(search) || 
      term.definition.toLowerCase().includes(search)
    );
    
    glossaryList.innerHTML = '';
    
    if (filteredTerms.length === 0) {
      glossaryList.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <p>No glossary terms found for "${searchTerm}"</p>
        </div>
      `;
      return;
    }
    
    filteredTerms.forEach(term => {
      const termElement = document.createElement('div');
      termElement.className = 'glossary-term';
      termElement.innerHTML = `
        <h4>${term.term}</h4>
        <p>${term.definition}</p>
      `;
      glossaryList.appendChild(termElement);
    });
  }

  addEventListeners() {
    // Filter button clicks
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Apply filter
        const filter = btn.dataset.filter;
        this.filterResources(filter);
      });
    });
    
    // Search input
    searchInput.addEventListener('input', (e) => {
      this.searchResources(e.target.value);
    });
    
    // Clear search button
    clearSearchBtn?.addEventListener('click', () => {
      searchInput.value = '';
      this.searchResources('');
      searchResults.style.display = 'none';
    });
    
    // Glossary search
    glossarySearch?.addEventListener('input', (e) => {
      this.searchGlossary(e.target.value);
    });
    
    // Download checklist buttons
    document.querySelectorAll('.checklist-card .btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const checklistTitle = e.target.closest('.checklist-card').querySelector('h4').textContent;
        this.downloadChecklist(checklistTitle);
      });
    });
  }

  downloadChecklist(title) {
    // Create sample checklist content
    const checklistContent = `
      CyberSafe Advocacy - ${title}
      ================================
      
      IMPORTANT: This is a sample checklist for demonstration purposes.
      
      1. [ ] Update all software and operating systems
      2. [ ] Enable automatic updates
      3. [ ] Install reputable antivirus software
      4. [ ] Enable firewall protection
      5. [ ] Use strong, unique passwords
      6. [ ] Enable two-factor authentication
      7. [ ] Regularly backup important data
      8. [ ] Be cautious with email attachments
      9. [ ] Avoid suspicious websites
      10. [ ] Keep personal information private
      
      Last updated: ${new Date().toLocaleDateString()}
      
      For more resources, visit: CyberSafeAdvocacy.org
    `;
    
    // Create blob and download link
    const blob = new Blob([checklistContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-checklist.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    this.showNotification(`${title} downloaded successfully!`);
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// ===== Initialize Resources Page =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize resource manager
  const resourceManager = new ResourceManager();
  
  // Set current year in footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Add CSS for additional components
  const style = document.createElement('style');
  style.textContent = `
    .no-results {
      text-align: center;
      padding: 3rem;
      grid-column: 1 / -1;
    }
    
    .no-results i {
      font-size: 3rem;
      color: #ccc;
      margin-bottom: 1rem;
    }
    
    .resource-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1rem 0;
    }
    
    .resource-tags .tag {
      background-color: rgba(41, 240, 247, 0.2);
      color: #29F0F7;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }
    
    .glossary-term {
      background-color: var(--card-bg);
      padding: 1.5rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      margin-bottom: 1rem;
    }
    
    .glossary-term h4 {
      color: var(--primary-blue);
      margin-bottom: 0.5rem;
    }
    
    .achievement-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: var(--radius-sm);
      margin-bottom: 0.5rem;
    }
    
    .achievement-item i.earned {
      color: #FFD700;
    }
    
    .achievement-item i.locked {
      color: #ccc;
    }
    
    .achievement-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #4CAF50;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    }
    
    .download-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: var(--primary-blue);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .search-container {
      position: relative;
      margin-bottom: 2rem;
    }
    
    .search-box {
      display: flex;
      align-items: center;
      background-color: var(--card-bg);
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 0.75rem 1rem;
    }
    
    .search-box i {
      color: var(--text-secondary);
      margin-right: 0.75rem;
    }
    
    .search-box input {
      flex: 1;
      border: none;
      background: none;
      color: var(--text-primary);
      font-size: 1rem;
    }
    
    .search-box input:focus {
      outline: none;
    }
    
    .search-results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      border-top: none;
      border-radius: 0 0 var(--radius-md) var(--radius-md);
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
      display: none;
    }
    
    .checklists-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
    
    .checklist-card {
      background-color: var(--card-bg);
      padding: 1.5rem;
      border-radius: var(--radius-md);
      border: 2px solid var(--border-color);
      text-align: center;
    }
    
    .checklist-icon {
      font-size: 2rem;
      color: var(--primary-blue);
      margin-bottom: 1rem;
    }
  `;
  document.head.appendChild(style);
});

// ===== Export for testing =====
export { ResourceManager };
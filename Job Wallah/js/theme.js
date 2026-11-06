// Job Wallah - Theme Manager (Dark / Light Mode)
(function () {
  // Apply saved theme immediately to prevent FOUC (Flash of Unstyled Content)
  function getPreferredTheme() {
    const saved = localStorage.getItem('jobwallah_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  const initialTheme = getPreferredTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);

  // SVG Icons for Sun and Moon
  const sunIcon = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
  const moonIcon = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;

  function updateIcons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
      btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });

    const drawerLabels = document.querySelectorAll('.drawer-theme-label');
    drawerLabels.forEach(label => {
      label.innerText = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    });

    // Update logos for dark/light mode
    const logoImgs = document.querySelectorAll('.nav-brand img, .drawer-header img');
    logoImgs.forEach(img => {
      if (theme === 'dark') {
        img.src = 'assets/logo-dark.svg';
      } else {
        img.src = 'assets/logo.svg';
      }
    });
  }

  window.toggleTheme = function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('jobwallah_theme', nextTheme);
    updateIcons(nextTheme);

    if (window.showToast) {
      window.showToast(nextTheme === 'dark' ? '🌙 Dark Mode activated' : '☀️ Light Mode activated', 'info');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateIcons(currentTheme);

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', window.toggleTheme);
    });

    document.querySelectorAll('.drawer-theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.toggleTheme();
      });
    });
  });
})();

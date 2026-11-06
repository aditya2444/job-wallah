const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to inspect & update.`);

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Ensure theme.js is in <head>
  if (!content.includes('src="js/theme.js"')) {
    content = content.replace('</head>', '  <script src="js/theme.js"></script>\n</head>');
    changed = true;
  }

  // 2. Ensure theme toggle button is in .nav-actions
  if (!content.includes('id="theme-toggle-btn"')) {
    // Insert before post-job-nav-btn or before closing .nav-actions
    const toggleButtonHtml = `\n        <!-- Theme Toggle Button -->\n        <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Toggle theme" title="Toggle Light / Dark Mode"></button>\n`;
    if (content.includes('id="post-job-nav-btn"')) {
      content = content.replace(/(<!-- Employer Post Job Button -->|<button id="post-job-nav-btn")/i, `${toggleButtonHtml}        $1`);
      changed = true;
    } else if (content.includes('<div class="nav-actions">')) {
      content = content.replace('<div class="nav-actions">', `<div class="nav-actions">${toggleButtonHtml}`);
      changed = true;
    }
  }

  // 3. Ensure theme toggle is in .mobile-drawer .drawer-nav
  if (!content.includes('drawer-theme-btn')) {
    const drawerThemeHtml = `\n        <button class="drawer-link drawer-theme-btn" style="text-align: left; width: 100%; display: flex; align-items: center; justify-content: space-between;">\n          <span class="drawer-theme-label">🌙 Dark Mode</span>\n          <span style="font-size: 11px; padding: 2px 8px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); color: var(--primary); font-weight: 700;">Theme</span>\n        </button>`;
    if (content.includes('<div class="drawer-divider"></div>')) {
      content = content.replace('<div class="drawer-divider"></div>', `${drawerThemeHtml}\n        <div class="drawer-divider"></div>`);
      changed = true;
    }
  }

  // 4. Ensure Prince Chaurasiya credit is in the footer
  if (!content.includes('Prince Chaurasiya')) {
    console.warn(`Warning: ${file} does not contain Prince Chaurasiya credit!`);
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
  } else {
    console.log(`Already up to date: ${file}`);
  }
});

console.log('Finished updating all HTML files.');

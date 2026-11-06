const fs = require('fs');
const path = require('path');

const targetFiles = [
  'about.html',
  'careers.html',
  'employer-verification.html',
  'terms.html',
  'privacy.html',
  'contact.html'
];

const newFooterCols = `        <div class="footer-col">
          <h5>Internships by Places</h5>
          <ul class="footer-links">
            <li><a href="internships-work-from-home.html">Work from home</a></li>
            <li><a href="internships-delhi-ncr.html">Delhi NCR</a></li>
            <li><a href="internships-bengaluru.html">Bengaluru</a></li>
            <li><a href="internships-mumbai.html">Mumbai</a></li>
            <li><a href="internships-hyderabad.html">Hyderabad</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Internships by Stream</h5>
          <ul class="footer-links">
            <li><a href="internships-web-development.html">Web Development</a></li>
            <li><a href="internships-data-science.html">Data Science</a></li>
            <li><a href="internships-graphic-design.html">Graphic Design</a></li>
            <li><a href="internships-digital-marketing.html">Digital Marketing</a></li>
            <li><a href="internships-finance.html">Finance &amp; Accounts</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Jobs by Stream</h5>
          <ul class="footer-links">
            <li><a href="jobs-full-time-tech.html">Full-Time Tech Jobs</a></li>
            <li><a href="jobs-associate-product-manager.html">Associate Product Manager</a></li>
            <li><a href="jobs-sales-business-development.html">Sales &amp; Business Development</a></li>
            <li><a href="jobs-operations-hr.html">Operations &amp; HR Trainee</a></li>
            <li><a href="jobs-cyber-security.html">Cyber Security Trainee</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>About Job Wallah</h5>
          <ul class="footer-links">
            <li><a href="about.html">About Us</a></li>
            <li><a href="careers.html">We're hiring</a></li>
            <li><a href="employer-verification.html">Employer Verification</a></li>
            <li><a href="terms.html">Terms &amp; Conditions</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>`;

const newFooterBottom = `      <div class="footer-bottom">
        <div>
          &copy; 2026 Job Wallah Technologies Pvt. Ltd. All rights reserved.
        </div>
        <div>
          <a href="javascript:void(0)" onclick="window.openCreatorModal()" class="designer-credit-badge" title="Creator of Job Wallah">
            <svg style="width: 15px; height: 15px;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/></svg>
            <span>Designed &amp; Made by Prince Chaurasiya</span>
          </a>
        </div>
        <div style="display: flex; gap: 16px;">
          <a href="javascript:void(0)" style="color: #94A3B8;">LinkedIn</a>
          <a href="javascript:void(0)" style="color: #94A3B8;">Instagram</a>
          <a href="javascript:void(0)" style="color: #94A3B8;">Twitter (X)</a>
          <a href="javascript:void(0)" style="color: #94A3B8;">YouTube</a>
        </div>
      </div>`;

const drawerCredit = `        <div class="drawer-section-title">Legal &amp; Trust</div>
        <a href="terms.html" class="drawer-link">📜 Terms &amp; Conditions</a>
        <a href="privacy.html" class="drawer-link">🔒 Privacy Policy</a>
        <div class="drawer-divider"></div>
        <div style="padding: 12px 14px; text-align: center;">
          <a href="javascript:void(0)" onclick="window.closeDrawer(); window.openCreatorModal()" class="designer-credit-badge" style="width: 100%; justify-content: center;">
            <svg style="width: 15px; height: 15px;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/></svg>
            <span>Made by Prince Chaurasiya</span>
          </a>
        </div>`;

targetFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace footer columns
  content = content.replace(/<div class="footer-columns">[\s\S]*?<\/div>\s*<div class="footer-bottom">/i, `<div class="footer-columns">\n${newFooterCols}\n      </div>\n      <div class="footer-bottom">`);

  // Replace footer bottom
  content = content.replace(/<div class="footer-bottom">[\s\S]*?<\/footer>/i, `${newFooterBottom}\n    </div>\n  </footer>`);

  // Replace drawer bottom
  content = content.replace(/<div class="drawer-section-title">Legal &amp; Trust<\/div>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, `${drawerCredit}\n      </div>\n    </div>\n  </div>`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated footer and credit on: ${file}`);
});

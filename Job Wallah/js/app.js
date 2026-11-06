// Job Wallah - Application Logic, Responsiveness & Interactivity
document.addEventListener('DOMContentLoaded', () => {
  const { appState, Icons, categoriesList, topLocations } = window;

  // DOM Elements (may be null on inner pages)
  const jobsContainer = document.getElementById('jobs-container');
  const resultsCountEl = document.getElementById('results-count');
  const categoriesGridEl = document.getElementById('categories-grid');
  const heroSearchInput = document.getElementById('hero-search-input');
  const heroLocationSelect = document.getElementById('hero-location-select');
  const heroSearchBtn = document.getElementById('hero-search-btn');
  const filterKeywordInput = document.getElementById('filter-keyword');
  const filterLocationSelect = document.getElementById('filter-location');
  const filterCategorySelect = document.getElementById('filter-category');
  const filterWfhCheckbox = document.getElementById('filter-wfh');
  const filterPpoCheckbox = document.getElementById('filter-ppo');
  const filterStipendRange = document.getElementById('filter-stipend');
  const filterStipendDisplay = document.getElementById('filter-stipend-val');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const sortSelect = document.getElementById('sort-select');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const bookmarkCountBadge = document.getElementById('bookmark-count-badge');
  const myAppsCountBadge = document.getElementById('my-apps-count-badge');
  const toastContainer = document.getElementById('toast-container');
  const userProfileArea = document.getElementById('user-profile-area');
  const filterSidebar = document.querySelector('.filter-sidebar');

  // Modals & Mobile Drawer Elements
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContainer = document.getElementById('modal-container');
  const drawerOverlay = document.getElementById('mobile-drawer-overlay');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileFilterBtn = document.getElementById('mobile-filter-btn');

  // Mobile Bottom Badges
  const bottomSavedBadge = document.getElementById('bottom-saved-badge');
  const bottomAppsBadge = document.getElementById('bottom-apps-badge');

  // Toast Function
  window.showToast = (message, type = 'success') => {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
    toast.innerHTML = `
      <span>${type === 'success' ? Icons.checkCircle : Icons.sparkles}</span>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  // Skeleton Loader for Jobs
  function renderSkeletons(count = 3) {
    if (!jobsContainer) return;
    jobsContainer.innerHTML = Array(count).fill(0).map(() => `
      <div class="skeleton-card">
        <div class="sk-top">
          <div class="skeleton" style="width: 120px; height: 22px; border-radius: 12px;"></div>
          <div class="skeleton" style="width: 80px; height: 16px;"></div>
        </div>
        <div class="sk-header">
          <div style="flex: 1;">
            <div class="skeleton skeleton-text" style="width: 65%; height: 20px;"></div>
            <div class="skeleton skeleton-text" style="width: 40%; height: 14px;"></div>
          </div>
          <div class="skeleton" style="width: 48px; height: 48px; border-radius: 8px;"></div>
        </div>
        <div class="skeleton skeleton-text" style="width: 30%; height: 14px;"></div>
        <div class="sk-meta-grid">
          <div class="skeleton" style="height: 38px;"></div>
          <div class="skeleton" style="height: 38px;"></div>
          <div class="skeleton" style="height: 38px;"></div>
          <div class="skeleton" style="height: 38px;"></div>
        </div>
        <div class="sk-tags">
          <div class="skeleton" style="width: 70px; height: 24px; border-radius: 4px;"></div>
          <div class="skeleton" style="width: 110px; height: 24px; border-radius: 4px;"></div>
          <div class="skeleton" style="width: 85px; height: 24px; border-radius: 4px;"></div>
        </div>
        <div class="sk-bottom">
          <div class="skeleton" style="width: 90px; height: 16px;"></div>
          <div style="display: flex; gap: 10px;">
            <div class="skeleton" style="width: 32px; height: 32px; border-radius: 6px;"></div>
            <div class="skeleton" style="width: 95px; height: 32px; border-radius: 6px;"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Populate Categories & Locations
  function populateSelects() {
    if (!heroLocationSelect && !filterLocationSelect) return;

    const locOptions = topLocations.map(loc => `<option value="${loc}">${loc}</option>`).join('');
    if (heroLocationSelect) heroLocationSelect.innerHTML = locOptions;
    if (filterLocationSelect) filterLocationSelect.innerHTML = locOptions;

    if (filterCategorySelect) {
      const catOptions = ['All Categories', ...categoriesList.map(c => c.name)]
        .map(cat => `<option value="${cat}">${cat}</option>`).join('');
      filterCategorySelect.innerHTML = catOptions;
    }

    // Render Hero Category Grid
    if (categoriesGridEl) {
      categoriesGridEl.innerHTML = categoriesList.map(cat => `
        <div class="category-card" data-category="${cat.name}">
          <div class="icon-wrapper">
            ${Icons.briefcase}
          </div>
          <div class="cat-name">${cat.name}</div>
          <div class="cat-count">${cat.count}+ Openings</div>
        </div>
      `).join('');

      document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
          const cat = card.dataset.category;
          appState.setFilters({ category: cat });
          if (filterCategorySelect) filterCategorySelect.value = cat;
          document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
  }

  // Render Job Cards with Shimmer Transition
  let renderTimeout = null;
  function scheduleRenderJobs(showShimmer = false) {
    if (!jobsContainer) return;
    if (showShimmer) {
      renderSkeletons(3);
    }
    clearTimeout(renderTimeout);
    renderTimeout = setTimeout(() => {
      renderJobs();
    }, showShimmer ? 220 : 0);
  }

  function renderJobs() {
    if (!jobsContainer) return;
    const jobs = appState.getFilteredJobs();
    if (resultsCountEl) resultsCountEl.innerText = `${jobs.length} Opportunities`;
    if (bookmarkCountBadge) bookmarkCountBadge.innerText = appState.state.bookmarks.length;
    if (myAppsCountBadge) myAppsCountBadge.innerText = appState.state.applications.length;
    if (bottomSavedBadge) bottomSavedBadge.innerText = appState.state.bookmarks.length;
    if (bottomAppsBadge) bottomAppsBadge.innerText = appState.state.applications.length;

    if (jobs.length === 0) {
      jobsContainer.innerHTML = `
        <div style="background: #ffffff; border: 1px dashed var(--border-color); border-radius: var(--radius-lg); padding: 48px 24px; text-align: center;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background: #EFF6FF; color: var(--primary); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            ${Icons.search}
          </div>
          <h3 style="font-size: 18px; font-weight: 700; color: var(--navy); margin-bottom: 6px;">No openings match your criteria</h3>
          <p style="font-size: 14px; color: var(--text-secondary); max-width: 440px; margin: 0 auto 20px auto;">
            Try clearing some filters or searching for broader terms like "Developer", "Marketing", or "Internship".
          </p>
          <button id="empty-reset-btn" class="btn btn-primary btn-sm">Clear All Filters</button>
        </div>
      `;
      document.getElementById('empty-reset-btn')?.addEventListener('click', () => {
        appState.resetFilters();
        syncFilterUI();
      });
      return;
    }

    jobsContainer.innerHTML = jobs.map(job => {
      const isBookmarked = appState.isBookmarked(job.id);
      const isJobType = job.type === 'Job';
      const alreadyApplied = appState.state.applications.some(a => a.jobId === job.id);

      return `
        <div class="job-card" data-id="${job.id}">
          <div class="job-card-top">
            <span class="job-actively-hiring">
              ${Icons.bolt} ${job.isActivelyHiring ? 'Actively Hiring' : 'Featured Opening'}
            </span>
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 500;">
              ${job.applicantsCount} applicants
            </span>
          </div>

          <div class="job-card-header">
            <div class="job-title-group">
              <h3 class="job-title" onclick="window.viewJobDetails('${job.id}')">${job.title}</h3>
              <div class="job-company">
                <span>${job.company}</span>
                <span style="display:inline-block; width: 4px; height: 4px; border-radius: 50%; background: #94A3B8;"></span>
                <span style="color: var(--primary); font-size: 13px; font-weight: 500;">${job.category}</span>
              </div>
            </div>

            <div class="company-logo-box">
              <img src="${job.companyLogo}" alt="${job.company}" loading="lazy" onerror="this.src='assets/logo.svg'" />
            </div>
          </div>

          <div class="job-location-row">
            ${Icons.mapPin}
            <span>${job.location}</span>
          </div>

          <!-- 4 Meta Boxes Grid -->
          <div class="job-meta-grid">
            <div class="meta-item">
              <span class="meta-label">${Icons.calendar} Start Date</span>
              <span class="meta-value">${job.startDate}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">${Icons.duration} ${isJobType ? 'Experience' : 'Duration'}</span>
              <span class="meta-value">${job.duration}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">${Icons.rupee} ${isJobType ? 'CTC (Annual)' : 'Stipend'}</span>
              <span class="meta-value" style="color: #0369A1;">${job.stipend}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">${Icons.clock} Apply By</span>
              <span class="meta-value">${job.applyBy}</span>
            </div>
          </div>

          <!-- Tags row -->
          <div class="job-tags-row">
            <span class="tag-badge ${job.location.includes('Work From Home') ? 'tag-wfh' : ''}">${job.type}</span>
            ${job.isPPO ? '<span class="tag-badge tag-ppo">✨ Job Offer (PPO)</span>' : ''}
            <span class="tag-badge">Certificate</span>
            ${job.skills.slice(0, 3).map(skill => `<span class="tag-badge">${skill}</span>`).join('')}
          </div>

          <!-- Bottom Row -->
          <div class="job-card-bottom">
            <div class="posted-time">
              ${Icons.clock}
              <span>${job.postedDaysAgo}</span>
            </div>

            <div class="job-card-actions">
              <button class="btn-bookmark" onclick="window.toggleBookmark('${job.id}')" title="Save this job">
                ${isBookmarked ? Icons.bookmarkFill : Icons.bookmark}
              </button>

              <button class="btn-view-details" onclick="window.viewJobDetails('${job.id}')">
                View details
              </button>

              ${alreadyApplied ? `
                <button class="btn btn-sm" style="background: #E2E8F0; color: #475569; cursor: default;" disabled>
                  ${Icons.checkCircle} Applied
                </button>
              ` : `
                <button class="btn btn-primary btn-sm" onclick="window.openApplyModal('${job.id}')">
                  Apply Now
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Update User Profile Area in Navbar
  function renderUserNav() {
    if (!userProfileArea) return;
    const user = appState.state.currentUser;
    if (user) {
      userProfileArea.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 34px; height: 34px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">
            ${user.name.charAt(0)}
          </div>
          <span style="font-size: 13.5px; font-weight: 600; color: var(--navy);" class="user-display-name">${user.name}</span>
          <button id="logout-btn" style="font-size: 12px; color: var(--text-muted); margin-left: 4px; padding: 4px 8px; border-radius: 4px; background: #F1F5F9;">Logout</button>
        </div>
      `;
      document.getElementById('logout-btn')?.addEventListener('click', () => {
        appState.logout();
        window.showToast("Logged out successfully");
      });
    } else {
      userProfileArea.innerHTML = `
        <button id="login-modal-btn" class="btn btn-outline btn-sm">Candidate Login</button>
        <button id="register-modal-btn" class="btn btn-primary btn-sm">Register</button>
      `;
      document.getElementById('login-modal-btn')?.addEventListener('click', () => window.openAuthModal('login'));
      document.getElementById('register-modal-btn')?.addEventListener('click', () => window.openAuthModal('register'));
    }

    if (bookmarkCountBadge) bookmarkCountBadge.innerText = appState.state.bookmarks.length;
    if (myAppsCountBadge) myAppsCountBadge.innerText = appState.state.applications.length;
    if (bottomSavedBadge) bottomSavedBadge.innerText = appState.state.bookmarks.length;
    if (bottomAppsBadge) bottomAppsBadge.innerText = appState.state.applications.length;
  }

  // Synchronize Filter Inputs with State
  function syncFilterUI() {
    if (!filterKeywordInput) return;
    const { keyword, location, category, workFromHomeOnly, ppoOnly, minStipend, sortBy, type } = appState.state.filters;
    filterKeywordInput.value = keyword;
    if (heroSearchInput) heroSearchInput.value = keyword;
    if (filterLocationSelect) filterLocationSelect.value = location;
    if (heroLocationSelect) heroLocationSelect.value = location;
    if (filterCategorySelect) filterCategorySelect.value = category;
    if (filterWfhCheckbox) filterWfhCheckbox.checked = workFromHomeOnly;
    if (filterPpoCheckbox) filterPpoCheckbox.checked = ppoOnly;
    if (filterStipendRange) filterStipendRange.value = minStipend;
    if (filterStipendDisplay) filterStipendDisplay.innerText = minStipend === 0 ? 'Any' : `₹${(minStipend / 1000).toFixed(0)}k+`;
    if (sortSelect) sortSelect.value = sortBy;

    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });
  }

  // Drawer Controls
  window.openDrawer = () => {
    if (drawerOverlay) drawerOverlay.classList.add('open');
  };

  window.closeDrawer = () => {
    if (drawerOverlay) drawerOverlay.classList.remove('open');
  };

  hamburgerBtn?.addEventListener('click', window.openDrawer);
  closeDrawerBtn?.addEventListener('click', window.closeDrawer);
  drawerOverlay?.addEventListener('click', (e) => {
    if (e.target === drawerOverlay) window.closeDrawer();
  });

  // Mobile Filter Drawer Toggle
  mobileFilterBtn?.addEventListener('click', () => {
    if (filterSidebar) {
      filterSidebar.classList.toggle('mobile-open');
    }
  });

  // Modal Renderers
  window.viewJobDetails = (jobId) => {
    const job = appState.state.jobs.find(j => j.id === jobId);
    if (!job) return;

    const alreadyApplied = appState.state.applications.some(a => a.jobId === job.id);

    modalContainer.innerHTML = `
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="company-logo-box" style="width: 44px; height: 44px;">
            <img src="${job.companyLogo}" alt="${job.company}" />
          </div>
          <div>
            <h3 class="modal-title">${job.title}</h3>
            <p style="font-size: 13.5px; color: var(--text-secondary); font-weight: 500;">${job.company} • ${job.location}</p>
          </div>
        </div>
        <button class="modal-close-btn" onclick="window.closeCurrentModal()">${Icons.close}</button>
      </div>

      <div class="modal-body">
        <!-- Key Details Grid -->
        <div class="job-meta-grid" style="margin-bottom: 24px;">
          <div class="meta-item">
            <span class="meta-label">${Icons.calendar} Start Date</span>
            <span class="meta-value">${job.startDate}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${Icons.duration} Duration</span>
            <span class="meta-value">${job.duration}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${Icons.rupee} Compensation</span>
            <span class="meta-value" style="color: #0369A1;">${job.stipend}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${Icons.clock} Apply By</span>
            <span class="meta-value">${job.applyBy}</span>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--navy); margin-bottom: 8px;">About ${job.company}</h4>
          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6;">${job.description}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--navy); margin-bottom: 8px;">Key Responsibilities</h4>
          <ul style="padding-left: 20px; font-size: 14px; color: var(--text-secondary); line-height: 1.6;">
            ${job.responsibilities.map(r => `<li style="margin-bottom: 6px;">${r}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--navy); margin-bottom: 8px;">Required Skills</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${job.skills.map(s => `<span class="tag-badge" style="background: #EAF5FE; color: var(--primary); font-weight: 600;">${s}</span>`).join('')}
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--navy); margin-bottom: 8px;">Perks & Benefits</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${job.perks.map(p => `<span class="tag-badge" style="background: #ECFDF5; color: #047857; font-weight: 500;">✓ ${p}</span>`).join('')}
          </div>
        </div>

        <div>
          <h4 style="font-size: 15px; font-weight: 700; color: var(--navy); margin-bottom: 8px;">Open Positions</h4>
          <p style="font-size: 14px; color: var(--text-secondary);">4 Openings • ${job.applicantsCount} people have applied</p>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.closeCurrentModal()">Close</button>
        ${alreadyApplied ? `
          <button class="btn btn-secondary" disabled>Already Applied</button>
        ` : `
          <button class="btn btn-primary" onclick="window.openApplyModal('${job.id}')">Apply for this role</button>
        `}
      </div>
    `;

    modalOverlay.classList.add('open');
  };

  window.openApplyModal = (jobId) => {
    const job = appState.state.jobs.find(j => j.id === jobId);
    if (!job) return;

    const user = appState.state.currentUser || {};

    modalContainer.innerHTML = `
      <div class="modal-header">
        <div>
          <h3 class="modal-title">Apply to ${job.company}</h3>
          <p style="font-size: 13px; color: var(--text-secondary);">${job.title} • ${job.location}</p>
        </div>
        <button class="modal-close-btn" onclick="window.closeCurrentModal()">${Icons.close}</button>
      </div>

      <form id="job-application-form">
        <div class="modal-body">
          <div style="background: #EFF6FF; border-left: 4px solid var(--primary); padding: 12px 16px; border-radius: 4px; margin-bottom: 18px; font-size: 13.5px; color: #1E40AF;">
            <strong>Job Wallah 1-Click Fast Apply:</strong> Your profile details and verified resume will be shared directly with ${job.company}'s hiring panel.
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Full Name *</label>
              <input type="text" id="apply-fullname" class="form-control" value="${user.name || 'Prince'}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Email Address *</label>
              <input type="email" id="apply-email" class="form-control" value="${user.email || 'prince.careers@example.com'}" required />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Phone Number *</label>
              <input type="tel" id="apply-phone" class="form-control" value="+91 98765 43210" required />
            </div>
            <div class="form-group">
              <label class="form-label">Current College / University *</label>
              <input type="text" id="apply-college" class="form-control" value="Delhi Technological University (DTU)" required />
            </div>
          </div>

          <!-- Resume Attachment Simulation -->
          <div class="form-group">
            <label class="form-label">Upload Resume (PDF / DOCX) *</label>
            <div id="resume-dropzone" style="border: 2px dashed #CBD5E1; border-radius: var(--radius-md); padding: 16px; text-align: center; background: #F8FAFC; cursor: pointer;">
              <div style="color: var(--primary); margin-bottom: 4px;">${Icons.award}</div>
              <div id="resume-filename" style="font-size: 13.5px; font-weight: 600; color: var(--navy);">Prince_Resume_2026.pdf</div>
              <div style="font-size: 12px; color: var(--text-muted);">Click to change or drag new file (Max 5MB)</div>
            </div>
          </div>

          <!-- Cover letter / Screening Question -->
          <div class="form-group">
            <label class="form-label">Why should you be hired for this role? *</label>
            <textarea id="apply-answers" class="form-control" rows="3" required placeholder="Mention your relevant projects, technical skills, or why you are excited to join ${job.company}...">I have hands-on experience building production web applications using the required stack. I have completed independent projects, understand clean code architecture, and am ready to contribute immediately full-time.</textarea>
          </div>

          <div class="checkbox-label" style="margin-top: 10px;">
            <input type="checkbox" id="apply-confirm" checked required />
            <span>I confirm that I am available to start immediately for the complete duration of ${job.duration}.</span>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="window.closeCurrentModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">
            Submit Application 🚀
          </button>
        </div>
      </form>
    `;

    document.getElementById('job-application-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const candidateData = {
        fullName: document.getElementById('apply-fullname').value,
        email: document.getElementById('apply-email').value,
        phone: document.getElementById('apply-phone').value,
        resumeName: document.getElementById('resume-filename').innerText
      };

      const success = appState.applyToJob(jobId, candidateData);
      if (success) {
        window.closeCurrentModal();
        window.showToast(`🎉 Application submitted successfully to ${job.company}!`);
      } else {
        window.showToast("You have already applied for this opening", "info");
      }
    });

    modalOverlay.classList.add('open');
  };

  // Open "Post a Job" Employer Modal
  window.openPostJobModal = () => {
    modalContainer.innerHTML = `
      <div class="modal-header">
        <div>
          <h3 class="modal-title">Post an Internship / Fresher Job</h3>
          <p style="font-size: 13px; color: var(--text-secondary);">Hire from 500,000+ top college students and freshers</p>
        </div>
        <button class="modal-close-btn" onclick="window.closeCurrentModal()">${Icons.close}</button>
      </div>

      <form id="employer-post-job-form">
        <div class="modal-body">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Opportunity Type *</label>
              <select id="post-type" class="form-control" required>
                <option value="Internship">Internship</option>
                <option value="Job">Fresher Job</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Category *</label>
              <select id="post-category" class="form-control" required>
                ${categoriesList.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Job Title *</label>
              <input type="text" id="post-title" class="form-control" placeholder="e.g. Frontend Developer Intern" required />
            </div>
            <div class="form-group">
              <label class="form-label">Company Name *</label>
              <input type="text" id="post-company" class="form-control" placeholder="e.g. Acme Tech Solutions" required />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Location *</label>
              <select id="post-location" class="form-control" required>
                ${topLocations.filter(l => l !== 'All Locations').map(l => `<option value="${l}">${l}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Stipend / CTC Text *</label>
              <input type="text" id="post-stipend" class="form-control" placeholder="e.g. ₹25,000 /month or ₹8 - ₹10 LPA" required />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Monthly Stipend in ₹ (for sorting/filtering) *</label>
              <input type="number" id="post-stipend-num" class="form-control" placeholder="25000" required />
            </div>
            <div class="form-group">
              <label class="form-label">Duration *</label>
              <input type="text" id="post-duration" class="form-control" placeholder="e.g. 3 Months or Full-Time" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Key Skills (comma separated) *</label>
            <input type="text" id="post-skills" class="form-control" placeholder="e.g. React, JavaScript, CSS, Git" required />
          </div>

          <div class="form-group">
            <label class="form-label">Role Overview & Responsibilities *</label>
            <textarea id="post-desc" class="form-control" rows="3" placeholder="Provide a brief description of what the intern/employee will work on..." required></textarea>
          </div>

          <div class="checkbox-label">
            <input type="checkbox" id="post-ppo" />
            <span>Includes Pre-Placement Offer (PPO) opportunity for high performers</span>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="window.closeCurrentModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Publish Opening ⚡</button>
        </div>
      </form>
    `;

    document.getElementById('employer-post-job-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const skillsArray = document.getElementById('post-skills').value.split(',').map(s => s.trim()).filter(Boolean);
      const newJob = appState.addJob({
        title: document.getElementById('post-title').value,
        company: document.getElementById('post-company').value,
        type: document.getElementById('post-type').value,
        category: document.getElementById('post-category').value,
        location: document.getElementById('post-location').value,
        stipend: document.getElementById('post-stipend').value,
        stipendNumber: document.getElementById('post-stipend-num').value,
        duration: document.getElementById('post-duration').value,
        skills: skillsArray,
        description: document.getElementById('post-desc').value,
        isPPO: document.getElementById('post-ppo').checked
      });

      window.closeCurrentModal();
      window.showToast("🚀 Opening published live on Job Wallah!");
      document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    modalOverlay.classList.add('open');
  };

  // Open Auth Modal (Login / Register)
  window.openAuthModal = (mode = 'login') => {
    modalContainer.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">${mode === 'login' ? 'Candidate Login' : 'Create Free Account'}</h3>
        <button class="modal-close-btn" onclick="window.closeCurrentModal()">${Icons.close}</button>
      </div>

      <div class="modal-body">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="assets/logo.svg" alt="Job Wallah" style="height: 38px; margin-bottom: 8px;" />
          <p style="font-size: 13.5px; color: var(--text-secondary);">Access 10,000+ verified internships & fresher openings</p>
        </div>

        <form id="auth-form">
          ${mode === 'register' ? `
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="auth-name" class="form-control" placeholder="Enter your full name" required value="Aditya Rao" />
            </div>
          ` : ''}

          <div class="form-group">
            <label class="form-label">Email ID</label>
            <input type="email" id="auth-email" class="form-control" placeholder="name@example.com" required value="aditya.work@example.com" />
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="auth-password" class="form-control" placeholder="••••••••" required value="secret123" />
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
            ${mode === 'login' ? 'Sign In' : 'Register Now'}
          </button>
        </form>

        <div style="margin-top: 20px; text-align: center; font-size: 13px; color: var(--text-secondary);">
          ${mode === 'login' ? `
            Don't have an account? <a href="javascript:void(0)" onclick="window.openAuthModal('register')">Register for free</a>
          ` : `
            Already registered? <a href="javascript:void(0)" onclick="window.openAuthModal('login')">Sign in here</a>
          `}
        </div>
      </div>
    `;

    document.getElementById('auth-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email').value;
      const name = mode === 'register' ? document.getElementById('auth-name').value : email.split('@')[0];

      appState.setUser({ name, email });
      window.closeCurrentModal();
      window.showToast(`Welcome back, ${name}!`);
    });

    modalOverlay.classList.add('open');
  };

  // Open "My Applications" Modal
  window.openMyApplicationsModal = () => {
    const apps = appState.state.applications;

    modalContainer.innerHTML = `
      <div class="modal-header">
        <div>
          <h3 class="modal-title">My Applications (${apps.length})</h3>
          <p style="font-size: 13px; color: var(--text-secondary);">Track current application statuses in real-time</p>
        </div>
        <button class="modal-close-btn" onclick="window.closeCurrentModal()">${Icons.close}</button>
      </div>

      <div class="modal-body">
        ${apps.length === 0 ? `
          <div style="text-align: center; padding: 32px 0;">
            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 12px;">You haven't submitted any applications yet.</p>
            <button class="btn btn-primary btn-sm" onclick="window.closeCurrentModal()">Explore Openings</button>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${apps.map(app => `
              <div style="background: #F8FAFC; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <h4 style="font-size: 15px; font-weight: 700; color: var(--navy);">${app.jobTitle}</h4>
                  <div style="font-size: 13px; color: var(--text-secondary);">${app.company} • Applied ${app.appliedDate}</div>
                </div>
                <div style="text-align: right;">
                  <span class="tag-badge" style="background: #EFF6FF; color: #1D4ED8; font-weight: 600; padding: 4px 10px;">
                    ${app.status}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.closeCurrentModal()">Close</button>
      </div>
    `;

    modalOverlay.classList.add('open');
  };

  // Creator & Designer Profile Modal (Prince Chaurasiya)
  window.openCreatorModal = () => {
    modalContainer.innerHTML = `
      <div class="modal-header">
        <div>
          <h3 class="modal-title">Designed &amp; Built with ❤️</h3>
          <p style="font-size: 13px; color: var(--text-secondary);">Creator &amp; Architect of Job Wallah</p>
        </div>
        <button class="modal-close-btn" onclick="window.closeCurrentModal()">${Icons.close}</button>
      </div>
      <div class="modal-body" style="text-align: center; padding: 32px 24px;">
        <div style="width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, #008BDC 0%, #FFB703 100%); display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: 800; box-shadow: 0 10px 25px rgba(0, 139, 220, 0.25); margin-bottom: 16px;">
          PC
        </div>
        <h2 style="font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 4px;">Prince Chaurasiya</h2>
        <p style="font-size: 14.5px; color: var(--primary); font-weight: 600; margin-bottom: 16px;">
          Product Designer &amp; Full Stack Software Engineer
        </p>
        <div style="background: #F8FAFC; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 18px; max-width: 460px; margin: 0 auto 20px auto; text-align: left; font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
          <strong>Job Wallah</strong> was conceived and crafted by <strong>Prince Chaurasiya</strong> to provide ambitious Indian college students and freshers with an authentic, lightning-fast, scam-free career launchpad inspired by Internshala.
        </div>
        <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
          <span class="tag-badge" style="background: #EAF5FE; color: var(--primary); font-weight: 600;">UI/UX Design</span>
          <span class="tag-badge" style="background: #FEF3C7; color: #B45309; font-weight: 600;">Responsive Architecture</span>
          <span class="tag-badge" style="background: #ECFDF5; color: #047857; font-weight: 600;">Zero-Dependency Speed</span>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="window.closeCurrentModal()">Awesome!</button>
      </div>
    `;
    modalOverlay.classList.add('open');
  };

  window.closeCurrentModal = () => {
    if (modalOverlay) modalOverlay.classList.remove('open');
  };

  window.toggleBookmark = (jobId) => {
    appState.toggleBookmark(jobId);
    const isBookmarked = appState.isBookmarked(jobId);
    window.showToast(isBookmarked ? "Job saved to your bookmarks" : "Job removed from bookmarks", "info");
  };

  // Event Listeners for Filters
  heroSearchBtn?.addEventListener('click', () => {
    const keyword = heroSearchInput.value;
    const location = heroLocationSelect.value;
    appState.setFilters({ keyword, location });
    document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
    scheduleRenderJobs(true);
  });

  heroSearchInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') heroSearchBtn.click();
  });

  filterKeywordInput?.addEventListener('input', (e) => {
    appState.setFilters({ keyword: e.target.value });
    scheduleRenderJobs(true);
  });

  filterLocationSelect?.addEventListener('change', (e) => {
    appState.setFilters({ location: e.target.value });
    scheduleRenderJobs(true);
  });

  filterCategorySelect?.addEventListener('change', (e) => {
    appState.setFilters({ category: e.target.value });
    scheduleRenderJobs(true);
  });

  filterWfhCheckbox?.addEventListener('change', (e) => {
    appState.setFilters({ workFromHomeOnly: e.target.checked });
    scheduleRenderJobs(true);
  });

  filterPpoCheckbox?.addEventListener('change', (e) => {
    appState.setFilters({ ppoOnly: e.target.checked });
    scheduleRenderJobs(true);
  });

  filterStipendRange?.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    if (filterStipendDisplay) filterStipendDisplay.innerText = val === 0 ? 'Any' : `₹${(val / 1000).toFixed(0)}k+`;
    appState.setFilters({ minStipend: val });
    scheduleRenderJobs(true);
  });

  resetFiltersBtn?.addEventListener('click', () => {
    appState.resetFilters();
    syncFilterUI();
    scheduleRenderJobs(true);
  });

  sortSelect?.addEventListener('change', (e) => {
    appState.setFilters({ sortBy: e.target.value });
    scheduleRenderJobs(true);
  });

  // Tab Filtering (All, Internships, Jobs, Bookmarks)
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.type;
      appState.setFilters({ type });
      scheduleRenderJobs(true);
    });
  });

  // Trending Search Pills
  document.querySelectorAll('.pill-item').forEach(pill => {
    pill.addEventListener('click', () => {
      const q = pill.dataset.query;
      appState.setFilters({ keyword: q });
      syncFilterUI();
      document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
      scheduleRenderJobs(true);
    });
  });

  // Navbar Buttons
  document.getElementById('post-job-nav-btn')?.addEventListener('click', window.openPostJobModal);
  document.getElementById('drawer-post-job-btn')?.addEventListener('click', () => {
    window.closeDrawer();
    window.openPostJobModal();
  });
  document.getElementById('my-apps-nav-btn')?.addEventListener('click', window.openMyApplicationsModal);
  document.getElementById('drawer-my-apps-btn')?.addEventListener('click', () => {
    window.closeDrawer();
    window.openMyApplicationsModal();
  });
  document.getElementById('bookmarks-nav-btn')?.addEventListener('click', () => {
    tabButtons.forEach(b => {
      b.classList.toggle('active', b.dataset.type === 'bookmarks');
    });
    appState.setFilters({ type: 'bookmarks' });
    document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Bottom Navigation Links
  document.getElementById('bottom-saved-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    tabButtons.forEach(b => b.classList.toggle('active', b.dataset.type === 'bookmarks'));
    appState.setFilters({ type: 'bookmarks' });
    document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('bottom-apps-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.openMyApplicationsModal();
  });

  // Close modal on click outside
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) window.closeCurrentModal();
  });

  // Listen to State Changes
  appState.subscribe(() => {
    renderJobs();
    renderUserNav();
  });

  // Initial Boot
  populateSelects();
  syncFilterUI();
  if (jobsContainer) {
    scheduleRenderJobs(true); // Show skeleton on page load
  }
  renderUserNav();
});

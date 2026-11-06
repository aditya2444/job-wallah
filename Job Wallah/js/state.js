// Job Wallah State Management
const STATE_KEYS = {
  JOBS: 'jobwallah_jobs_v3',
  BOOKMARKS: 'jobwallah_bookmarks',
  APPLICATIONS: 'jobwallah_applications',
  USER: 'jobwallah_user'
};

class StateManager {
  constructor() {
    this.subscribers = [];
    this.state = {
      jobs: this.loadJobs(),
      bookmarks: this.loadBookmarks(),
      applications: this.loadApplications(),
      currentUser: this.loadUser(),
      filters: {
        keyword: '',
        location: 'All Locations',
        category: 'All Categories',
        type: 'all', // 'all', 'Internship', 'Job'
        workFromHomeOnly: false,
        ppoOnly: false,
        minStipend: 0,
        sortBy: 'recent' // 'recent', 'stipendHigh', 'popular'
      },
      selectedJobId: null,
      activeModal: null // 'job-detail', 'apply', 'post-job', 'auth', 'my-applications'
    };
  }

  loadJobs() {
    try {
      const stored = localStorage.getItem(STATE_KEYS.JOBS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not load jobs from localStorage", e);
    }
    return window.initialJobs || [];
  }

  saveJobs() {
    try {
      localStorage.setItem(STATE_KEYS.JOBS, JSON.stringify(this.state.jobs));
    } catch (e) {
      console.warn("Could not save jobs", e);
    }
  }

  loadBookmarks() {
    try {
      const stored = localStorage.getItem(STATE_KEYS.BOOKMARKS);
      return stored ? JSON.parse(stored) : ["jw-101", "jw-103"];
    } catch (e) {
      return ["jw-101", "jw-103"];
    }
  }

  saveBookmarks() {
    try {
      localStorage.setItem(STATE_KEYS.BOOKMARKS, JSON.stringify(this.state.bookmarks));
    } catch (e) {
      console.warn("Could not save bookmarks", e);
    }
  }

  loadApplications() {
    try {
      const stored = localStorage.getItem(STATE_KEYS.APPLICATIONS);
      return stored ? JSON.parse(stored) : [
        {
          id: "app-default-1",
          jobId: "jw-101",
          jobTitle: "Full Stack Web Developer Intern",
          company: "Razorpay",
          appliedDate: "Yesterday",
          status: "Under Review",
          statusColor: "blue"
        }
      ];
    } catch (e) {
      return [];
    }
  }

  saveApplications() {
    try {
      localStorage.setItem(STATE_KEYS.APPLICATIONS, JSON.stringify(this.state.applications));
    } catch (e) {
      console.warn("Could not save applications", e);
    }
  }

  loadUser() {
    try {
      const stored = localStorage.getItem(STATE_KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  saveUser() {
    try {
      if (this.state.currentUser) {
        localStorage.setItem(STATE_KEYS.USER, JSON.stringify(this.state.currentUser));
      } else {
        localStorage.removeItem(STATE_KEYS.USER);
      }
    } catch (e) {
      console.warn("Could not save user", e);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(fn => fn !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(fn => fn(this.state));
  }

  setFilters(newFilters) {
    this.state.filters = { ...this.state.filters, ...newFilters };
    this.notify();
  }

  resetFilters() {
    this.state.filters = {
      keyword: '',
      location: 'All Locations',
      category: 'All Categories',
      type: 'all',
      workFromHomeOnly: false,
      ppoOnly: false,
      minStipend: 0,
      sortBy: 'recent'
    };
    this.notify();
  }

  toggleBookmark(jobId) {
    if (this.state.bookmarks.includes(jobId)) {
      this.state.bookmarks = this.state.bookmarks.filter(id => id !== jobId);
    } else {
      this.state.bookmarks.push(jobId);
    }
    this.saveBookmarks();
    this.notify();
  }

  isBookmarked(jobId) {
    return this.state.bookmarks.includes(jobId);
  }

  openModal(modalName, jobId = null) {
    this.state.activeModal = modalName;
    if (jobId) {
      this.state.selectedJobId = jobId;
    }
    this.notify();
  }

  closeModal() {
    this.state.activeModal = null;
    this.notify();
  }

  applyToJob(jobId, candidateData) {
    const job = this.state.jobs.find(j => j.id === jobId);
    if (!job) return false;

    // Check if already applied
    const alreadyApplied = this.state.applications.some(a => a.jobId === jobId);
    if (alreadyApplied) return false;

    const newApplication = {
      id: 'app-' + Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: 'Just now',
      status: 'Application Sent',
      statusColor: 'green',
      candidateName: candidateData.fullName,
      candidateEmail: candidateData.email,
      phone: candidateData.phone,
      resumeName: candidateData.resumeName || 'Resume.pdf'
    };

    this.state.applications.unshift(newApplication);
    job.applicantsCount = (job.applicantsCount || 0) + 1;
    this.saveApplications();
    this.saveJobs();
    this.notify();
    return true;
  }

  addJob(jobData) {
    const newJob = {
      id: 'jw-' + Date.now(),
      title: jobData.title,
      company: jobData.company,
      companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
      companyColor: '#008BDC',
      location: jobData.location,
      type: jobData.type,
      category: jobData.category,
      stipendNumber: parseInt(jobData.stipendNumber) || 20000,
      stipend: jobData.stipend,
      duration: jobData.duration,
      startDate: 'Immediately',
      applyBy: jobData.applyBy || 'In 15 days',
      postedDaysAgo: 'Just now',
      isActivelyHiring: true,
      isPPO: jobData.isPPO || false,
      applicantsCount: 1,
      skills: jobData.skills || ['Communication', 'Teamwork'],
      description: jobData.description,
      responsibilities: jobData.responsibilities || ['Fulfill primary team objectives.'],
      eligibility: ['Passionate individuals willing to learn and deliver.'],
      perks: ['Certificate', 'Letter of recommendation', 'Flexible working hours']
    };

    this.state.jobs.unshift(newJob);
    this.saveJobs();
    this.notify();
    return newJob;
  }

  setUser(user) {
    this.state.currentUser = user;
    this.saveUser();
    this.notify();
  }

  logout() {
    this.state.currentUser = null;
    this.saveUser();
    this.notify();
  }

  getFilteredJobs() {
    const { keyword, location, category, type, workFromHomeOnly, ppoOnly, minStipend, sortBy } = this.state.filters;

    let result = [...this.state.jobs];

    // Search Keyword
    if (keyword && keyword.trim() !== '') {
      const q = keyword.toLowerCase().trim();
      result = result.filter(job => 
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q) ||
        job.skills.some(skill => skill.toLowerCase().includes(q))
      );
    }

    // Location Filter
    if (location && location !== 'All Locations') {
      result = result.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
    }

    // Category Filter
    if (category && category !== 'All Categories') {
      result = result.filter(job => job.category.toLowerCase() === category.toLowerCase());
    }

    // Type Filter (Internship / Job)
    if (type && type !== 'all') {
      if (type === 'bookmarks') {
        result = result.filter(job => this.state.bookmarks.includes(job.id));
      } else {
        result = result.filter(job => job.type.toLowerCase() === type.toLowerCase());
      }
    }

    // Work from home only
    if (workFromHomeOnly) {
      result = result.filter(job => job.location.toLowerCase().includes('work from home') || job.location.toLowerCase().includes('remote'));
    }

    // PPO Only
    if (ppoOnly) {
      result = result.filter(job => job.isPPO);
    }

    // Min Stipend / Salary
    if (minStipend > 0) {
      result = result.filter(job => (job.stipendNumber || 0) >= minStipend);
    }

    // Sorting
    if (sortBy === 'stipendHigh') {
      result.sort((a, b) => (b.stipendNumber || 0) - (a.stipendNumber || 0));
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.applicantsCount || 0) - (a.applicantsCount || 0));
    } else {
      // Recent (default: preserves initial order or newly added first)
    }

    return result;
  }
}

window.appState = new StateManager();

const state = { role: 'worker', sector: 'construction', shiftActive: false, safetySubmitted: false };

const sectorData = {
  construction: { label: 'Construction', site: 'Riverside Heights Project', role: 'Electrical crew', shift: '07:30 — 16:00', location: 'Site B / North gate', worker: 'Aarav Menon', team: 'Site B / Electrical crew', hours: '7h 42m', overtime: '42 min', report: 'Loose cable near loading bay', people: '126 workers', alert: '4 workers above 9h today' },
  education: { label: 'Education', site: 'Greenfield College Campus', role: 'Facilities team', shift: '08:00 — 17:00', location: 'Main campus / Service entry', worker: 'Meera Nair', team: 'Campus / Facilities team', hours: '7h 05m', overtime: '0 min', report: 'Wet floor near science block', people: '84 staff', alert: '3 split shifts need review' },
  hospital: { label: 'Hospital', site: 'Starlight General Hospital', role: 'Night care team', shift: '20:00 — 06:00', location: 'Ward 3 / Staff entrance', worker: 'Kavya Rao', team: 'Ward 3 / Night care', hours: '9h 10m', overtime: '1h 10m', report: 'Missing PPE near isolation room', people: '218 staff', alert: '2 rest windows under 8h' }
};

const mount = document.querySelector('#dashboard-mount');
const toast = document.querySelector('#toast');
const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('#modal-body');
const modalKicker = document.querySelector('#modal-kicker');

function sector() { return sectorData[state.sector]; }
function esc(value) { return String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char])); }

function statusBadge(text, dark = false) { return `<span class="status-badge${dark ? ' status-badge--dark' : ''}">${text}</span>`; }

function workerTemplate() {
  const data = sector();
  const active = state.shiftActive;
  return `<div class="worker-view">
    <article class="dashboard-card dashboard-card--dark shift-card">
      <div class="card-topline"><span class="card-label">Today / ${data.label}</span>${statusBadge(active ? 'Shift active' : 'Ready to check in', true)}</div>
      <h3>${active ? 'You are on shift.' : 'Your next shift.'}</h3>
      <div class="shift-main"><div><div class="shift-time">${active ? data.hours : data.shift.split(' — ')[0]}<small>${active ? 'worked' : 'start'}</small></div><div class="shift-meta">${data.site}<br />${data.location}</div></div><span class="card-label">${data.role}</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${active ? '68%' : '0%'}"></div></div>
      <div class="shift-footer"><span>${active ? `Overtime watch: ${data.overtime}` : 'Check in with one tap'}</span><button class="small-button small-button--lime" data-action="toggle-shift" type="button">${active ? 'Check out ↗' : 'Start shift ↗'}</button></div>
      <div class="voice-row"><button class="voice-button" data-action="voice" type="button" aria-label="Listen to shift details">◌</button><span>Tap to hear this shift in your language</span></div>
    </article>
    <article class="dashboard-card pay-card"><div><div class="card-topline"><span class="card-label">This month / payslip</span><span class="card-label">Jul 2026</span></div><h3>Money you will receive.</h3><div class="pay-total">₹24,860</div><div class="pay-caption">Take-home pay · next payout in 4 days</div><div class="pay-rows"><div class="pay-row"><span>Base pay</span><span>₹21,000</span></div><div class="pay-row"><span>Overtime / 06h 42m</span><span>+ ₹4,200</span></div><div class="pay-row"><span>Deductions</span><span>− ₹340</span></div></div></div><button class="small-button" data-action="payslip" type="button">See full breakdown ↗</button></article>
    <article class="dashboard-card safety-card"><div><div class="card-label">Worker voice</div><h3>See something unsafe?</h3><p>Your report can be anonymous. We’ll show you what happens next — from received to resolved.</p></div><div class="safety-action">${state.safetySubmitted ? statusBadge('Received') : ''}<button class="small-button" data-action="safety" type="button">${state.safetySubmitted ? 'View report ↗' : 'Report a safety issue ↗'}</button></div></article>
    <article class="dashboard-card skill-card"><div class="card-topline"><span class="card-label">My growth / skill passport</span><span class="card-label">3 verified</span></div><h3>What you carry forward.</h3><div class="skill-list"><div class="skill-row"><span class="skill-icon">✦</span><div><strong>Electrical safety</strong><span>Verified · National Skill Council</span></div><b>↗</b></div><div class="skill-row"><span class="skill-icon">◈</span><div><strong>Working at height</strong><span>Verified · 12 Jun 2026</span></div><b>↗</b></div></div><button class="small-button" data-action="skills" type="button">Open Skill Passport ↗</button></article>
  </div>`;
}

function adminTemplate() {
  const data = sector();
  return `<div class="admin-view">
    <article class="dashboard-card dashboard-card--dark chart-card"><div class="card-topline"><span class="card-label">Workforce health / ${data.label}</span>${statusBadge('Live today', true)}</div><h3>${data.site}</h3><p class="shift-meta">A calm view of the signals that need a decision — not a surveillance wall.</p><div class="chart"><span class="bar" style="height:52%"></span><span class="bar" style="height:76%"></span><span class="bar" style="height:61%"></span><span class="bar" style="height:84%"></span><span class="bar" style="height:67%"></span><span class="bar" style="height:93%"></span><span class="bar" style="height:78%"></span><span class="bar" style="height:100%"></span><span class="bar" style="height:72%"></span><span class="bar" style="height:88%"></span><span class="bar" style="height:81%"></span><span class="bar" style="height:96%"></span></div><div class="shift-footer"><span>Attendance / last 12 shifts</span><span>92% average</span></div></article>
    <article class="dashboard-card"><div class="card-topline"><span class="card-label">At a glance</span><span class="card-label">Updated 2m ago</span></div><div class="stat-grid"><div class="stat-box"><strong>${data.people.split(' ')[0]}</strong><span>People on roster</span><div class="trend">↗ 8% this month</div></div><div class="stat-box"><strong>92%</strong><span>Attendance</span><div class="trend">↗ 4% vs last month</div></div><div class="stat-box"><strong>06h</strong><span>Overtime / avg</span><div class="trend">→ within threshold</div></div><div class="stat-box"><strong>03</strong><span>Open reports</span><div class="trend">↘ 2 resolved today</div></div></div></article>
    <article class="dashboard-card"><div class="card-topline"><span class="card-label">Needs your attention</span><span class="card-label">2 open</span></div><div class="alert-list"><div class="alert-row"><span class="alert-icon">!</span><div><strong>${esc(data.alert)}</strong><span>Fatigue signal · review the next shift plan</span></div><b>↗</b></div><div class="alert-row"><span class="alert-icon">⌁</span><div><strong>${esc(data.report)}</strong><span>Safety report · received 18 min ago</span></div><b>↗</b></div><div class="alert-row"><span class="alert-icon">✦</span><div><strong>3 skills ready to verify</strong><span>Growth signal · keep career history moving</span></div><b>↗</b></div></div><button class="small-button" data-action="admin-alerts" type="button">Open action queue ↗</button></article>
    <article class="dashboard-card safety-card"><div><div class="card-label">Cross-sector promise</div><h3>The same standard travels.</h3><p>Switch sectors to see the language change while the promise stays constant: clearer pay, safer work, more voice, real growth.</p></div><button class="small-button" data-action="sector-info" type="button">Why it scales ↗</button></article>
  </div>`;
}

function render() {
  mount.innerHTML = state.role === 'worker' ? workerTemplate() : adminTemplate();
  document.querySelectorAll('[data-role]').forEach(button => button.classList.toggle('is-active', button.dataset.role === state.role));
  document.querySelectorAll('[data-sector]').forEach(button => button.classList.toggle('is-active', button.dataset.sector === state.sector));
}

function showToast(message) {
  toast.textContent = message; toast.classList.add('is-visible');
  window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function openModal(kind) {
  modal.hidden = false; document.body.style.overflow = 'hidden';
  if (kind === 'payslip') {
    modalKicker.textContent = `${sector().label} / payslip`; modalTitle.textContent = 'Every rupee, accounted for.';
    modalBody.innerHTML = `<p>A clear breakdown makes a fair shift feel fair. Here’s what changed this pay period.</p><div class="pay-rows"><div class="pay-row"><span>Base salary</span><span>₹21,000</span></div><div class="pay-row"><span>Regular hours / 168h</span><span>₹21,000</span></div><div class="pay-row"><span>Overtime / 06h 42m</span><span>+ ₹4,200</span></div><div class="pay-row"><span>PF + other deductions</span><span>− ₹340</span></div><div class="pay-row"><strong>You receive</strong><strong>₹24,860</strong></div></div><button class="button button--lime" data-action="voice" type="button">◌ Hear this breakdown</button>`;
  } else if (kind === 'safety') {
    modalKicker.textContent = `${sector().label} / safety`; modalTitle.textContent = 'Raise a flag, not your voice.';
    modalBody.innerHTML = `<p>Describe what happened in a few words. You can stay anonymous, and you’ll always be able to see the status.</p><div class="modal-form"><label for="report-text">What did you notice?</label><textarea id="report-text" rows="3" placeholder="For example: loose cable near loading bay"></textarea><div class="voice-row"><button class="voice-button" data-action="voice" type="button" aria-label="Use voice input">◌</button><span>Use voice instead</span></div><button class="button button--lime" data-action="submit-report" type="button">Send report safely ↗</button></div>`;
  } else if (kind === 'skills') {
    modalKicker.textContent = `${sector().label} / skill passport`; modalTitle.textContent = 'Your work has a memory.';
    modalBody.innerHTML = `<p>Portable records help skills travel with people — across teams, sites, and sectors.</p><div class="pay-rows"><div class="pay-row"><span>Electrical safety</span><span>Verified</span></div><div class="pay-row"><span>Working at height</span><span>Verified</span></div><div class="pay-row"><span>First aid response</span><span>Pending</span></div></div><button class="button button--lime" data-action="share-passport" type="button">Preview share card ↗</button>`;
  } else if (kind === 'alerts') {
    modalKicker.textContent = `${sector().label} / action queue`; modalTitle.textContent = 'The next good decision.';
    modalBody.innerHTML = `<p>FairShift turns patterns into practical next steps. Review the fatigue signal, acknowledge the safety report, then assign a follow-up owner.</p><button class="button button--lime" data-action="resolve-alert" type="button">Acknowledge and assign ↗</button>`;
  } else {
    modalKicker.textContent = 'FairShift / built to travel'; modalTitle.textContent = 'Different work. Same dignity.';
    modalBody.innerHTML = `<p>Construction sites and college campuses have different rhythms, but workers still need the same foundations: clarity about pay, a safe way to speak up, and a record of what they know.</p><button class="button button--lime" data-action="close-modal" type="button">Keep exploring ↗</button>`;
  }
}

function closeModal() { modal.hidden = true; document.body.style.overflow = ''; }

document.addEventListener('click', event => {
  const actionTarget = event.target.closest('[data-action]');
  if (actionTarget) {
    const action = actionTarget.dataset.action;
    if (action === 'worker' || action === 'admin') { state.role = action; render(); document.querySelector('#experience').scrollIntoView({ behavior: 'smooth', block: 'start' }); showToast(action === 'worker' ? 'Worker view loaded — clarity first.' : 'Employer view loaded — signals, not surveillance.'); }
    if (action === 'toggle-shift') { state.shiftActive = !state.shiftActive; render(); showToast(state.shiftActive ? 'Shift started. Overtime will be tracked automatically.' : 'Shift checked out. Your hours are saved.'); }
    if (action === 'payslip') openModal('payslip');
    if (action === 'safety') openModal('safety');
    if (action === 'submit-report') { state.safetySubmitted = true; closeModal(); render(); showToast('Report received. You can follow its status from here.'); }
    if (action === 'skills') openModal('skills');
    if (action === 'admin-alerts') openModal('alerts');
    if (action === 'sector-info') openModal('sector');
    if (action === 'resolve-alert') { closeModal(); showToast('Follow-up assigned. The team can see what happens next.'); }
    if (action === 'share-passport') { closeModal(); showToast('Share card preview ready for the worker.'); }
    if (action === 'voice') showToast('Voice-friendly mode is ready for this action.');
    if (action === 'language') showToast('Language menu ready — regional language packs can plug in here.');
    if (action === 'close-modal') closeModal();
  }
  const roleButton = event.target.closest('[data-role]');
  if (roleButton) { state.role = roleButton.dataset.role; render(); showToast(`${state.role === 'worker' ? 'Worker' : 'Employer'} view selected.`); }
  const sectorButton = event.target.closest('[data-sector]');
  if (sectorButton) { state.sector = sectorButton.dataset.sector; render(); showToast(`${sector().label} demo loaded.`); }
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

render();

const loader = document.querySelector('#loader');
const progress = document.querySelector('#loader-progress');
let value = 0;
const loaderTimer = window.setInterval(() => { value += 5; progress.style.width = `${value}%`; if (value >= 100) { window.clearInterval(loaderTimer); window.setTimeout(() => loader.classList.add('is-done'), 250); } }, 28);

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-in'); observer.unobserve(entry.target); } }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

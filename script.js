/* ======================================
   RoMeoTOTO Dev Dashboard — Script v2
   ====================================== */

const GH_USER = 'romeototo';
const PLAY_LINKS = {
    'ai-tycoon-rialo-game': 'https://romeototo.github.io/ai-tycoon-rialo-game/',
    'monster-tapper': 'https://romeototo.github.io/monster-tapper/',
    'MyFirstProject': 'https://romeototo.github.io/MyFirstProject/',
};
const TIPS = [
    "Ship something small every day — consistency beats perfection.",
    "Build in public. Show your work on X. Followers = distribution.",
    "Commit today. Your contribution graph is your public résumé.",
    "One good README can 10x your project's perceived quality.",
    "The best time to start was yesterday. The next best time is now.",
    "Great devs aren't born — they're built one commit at a time.",
    "Web3 is still early. Keep building. The market rewards survivors.",
    "Fix the bug, then write a test. Then ship.",
    "Your GitHub is your portfolio. Make it green.",
    "Don't wait to be perfect. Ship it, iterate, improve.",
    "AI tools are your superpower. Use them daily.",
    "Automate the boring parts so you can focus on the creative parts.",
];

// ---- Clock & Greeting ----
function updateClock() {
    const now = new Date();
    const h = now.getHours();
    document.getElementById('liveTime').textContent =
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const greet = h < 5 ? "Still up late," : h < 12 ? "Good morning," : h < 17 ? "Good afternoon," : h < 21 ? "Good evening," : "Late night grind,";
    document.getElementById('greeting').textContent = `${greet} RoMeoTOTO 👋`;
}
updateClock();
setInterval(updateClock, 1000);

// ---- Daily Tip ----
document.getElementById('tipText').textContent = TIPS[new Date().getDate() % TIPS.length];

// ---- 🌙 Dark / Light Theme ----
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let currentTheme = localStorage.getItem('rmt_theme') || 'dark';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    localStorage.setItem('rmt_theme', theme);
    currentTheme = theme;
}
applyTheme(currentTheme);
themeToggle.addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));

// ---- 🔔 Reminder (Browser Notification) ----
const reminderBtn = document.getElementById('reminderBtn');
const reminderModal = document.getElementById('reminderModal');
const modalClose = document.getElementById('modalClose');
const setReminderBtn = document.getElementById('setReminderBtn');
const cancelReminderBtn = document.getElementById('cancelReminderBtn');
const reminderStatus = document.getElementById('reminderStatus');

let reminderInterval = null;

function openModal() { reminderModal.classList.add('open'); loadReminderStatus(); }
function closeModal() { reminderModal.classList.remove('open'); }
reminderBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
reminderModal.addEventListener('click', e => { if (e.target === reminderModal) closeModal(); });

function loadReminderStatus() {
    const saved = localStorage.getItem('rmt_reminder');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('reminderTime').value = data.time;
        reminderStatus.textContent = `✅ Reminder set for ${data.time} daily`;
        reminderStatus.className = 'reminder-status active';
    } else {
        reminderStatus.className = 'reminder-status';
    }
}

setReminderBtn.addEventListener('click', async () => {
    if (!('Notification' in window)) {
        alert('Your browser does not support notifications.');
        return;
    }
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') {
        alert('Please allow notifications in your browser to use this feature.');
        return;
    }
    const time = document.getElementById('reminderTime').value;
    localStorage.setItem('rmt_reminder', JSON.stringify({ time }));
    reminderStatus.textContent = `✅ Reminder set for ${time} daily`;
    reminderStatus.className = 'reminder-status active';
    scheduleReminder(time);
});

cancelReminderBtn.addEventListener('click', () => {
    localStorage.removeItem('rmt_reminder');
    reminderStatus.className = 'reminder-status';
    if (reminderInterval) { clearInterval(reminderInterval); reminderInterval = null; }
    closeModal();
});

function scheduleReminder(time) {
    if (reminderInterval) clearInterval(reminderInterval);
    reminderInterval = setInterval(() => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
        if (currentTime === time) {
            new Notification('⚡ RoMeoTOTO Dashboard', {
                body: "Don't forget to commit today! Keep your streak alive 🔥",
                icon: 'https://github.com/romeototo.png'
            });
        }
    }, 60000);
}

// Load saved reminder on startup
const savedReminder = localStorage.getItem('rmt_reminder');
if (savedReminder) scheduleReminder(JSON.parse(savedReminder).time);

// ---- GitHub API ----
async function fetchGitHub() {
    try {
        const [userRes, repoRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GH_USER}`),
            fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=30`)
        ]);
        const user = await userRes.json();
        const repos = await repoRes.json();

        document.getElementById('ghAvatar').src = user.avatar_url || `https://github.com/${GH_USER}.png`;
        document.getElementById('ghRepos').textContent = user.public_repos ?? '—';
        document.getElementById('ghFollowers').textContent = user.followers ?? '—';
        document.getElementById('ghFollowing').textContent = user.following ?? '—';
        document.getElementById('totalRepos').textContent = user.public_repos ?? '—';
        document.getElementById('repoCount').textContent = `${user.public_repos} repos`;

        const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
        document.getElementById('ghStars').textContent = totalStars;

        const featured = repos
            .filter(r => !r.fork && r.name !== GH_USER)
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6);

        renderRepos(featured);
        renderMiniGraph(repos);

        if (repos.length > 0) {
            const last = [...repos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))[0];
            const diff = Math.floor((Date.now() - new Date(last.pushed_at)) / 86400000);
            document.getElementById('lastCommitDate').textContent = diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : `${diff} days ago`;
            document.getElementById('streakDays').textContent = calcStreak(repos);
        }

        // Update weekly goal commits
        updateWeeklyGoalProgress(repos);

    } catch (e) {
        console.warn('GitHub API:', e);
        document.getElementById('repoCount').textContent = 'API limit reached';
    }
}

function calcStreak(repos) {
    const dates = new Set(repos.filter(r => r.pushed_at).map(r => new Date(r.pushed_at).toDateString()));
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 30; i++) {
        const d = new Date(now); d.setDate(d.getDate() - i);
        if (dates.has(d.toDateString())) streak++;
        else if (i > 0) break;
    }
    return streak;
}

function renderMiniGraph(repos) {
    const graph = document.getElementById('miniGraph');
    graph.innerHTML = '';
    const days = 14;
    const now = new Date();
    const activity = {};
    repos.forEach(r => { if (r.pushed_at) { const d = new Date(r.pushed_at).toDateString(); activity[d] = (activity[d]||0)+1; } });
    for (let i = days-1; i >= 0; i--) {
        const d = new Date(now); d.setDate(d.getDate()-i);
        const count = activity[d.toDateString()] || 0;
        const bar = document.createElement('div');
        bar.className = 'mini-bar' + (count > 0 ? ' active' : '');
        bar.style.height = `${Math.max(4, Math.min(32, count*10+4))}px`;
        bar.title = `${d.toLocaleDateString()}: ${count} push(es)`;
        graph.appendChild(bar);
    }
}

function renderRepos(repos) {
    const grid = document.getElementById('reposGrid');
    grid.innerHTML = '';
    const priority = ['ai-tycoon-rialo-game','monster-tapper','MyFirstProject','telegram-ai-it-automation-agent','dev-dashboard'];
    repos.sort((a,b) => {
        const ai = priority.indexOf(a.name), bi = priority.indexOf(b.name);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1; if (bi !== -1) return 1; return 0;
    });
    repos.forEach(repo => {
        const item = document.createElement('a');
        item.className = 'repo-item';
        item.href = repo.html_url; item.target = '_blank';
        const playLink = PLAY_LINKS[repo.name];
        const playBtn = playLink ? `<a href="${playLink}" target="_blank" class="repo-play" onclick="event.stopPropagation()"><span class="material-icons">play_arrow</span>Play</a>` : '';
        item.innerHTML = `
            <div class="repo-name"><span class="material-icons">folder_open</span>${repo.name.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</div>
            <div class="repo-desc">${repo.description||'No description'}</div>
            <div class="repo-meta">
                <span class="repo-lang"><span class="material-icons">circle</span>${repo.language||'HTML'}</span>
                <span class="repo-stars"><span class="material-icons">star</span>${repo.stargazers_count}</span>
            </div>${playBtn}`;
        grid.appendChild(item);
    });
}

// ---- X Stats Persistence ----
function saveXStats() {
    localStorage.setItem('rmt_xstats', JSON.stringify({
        followers: document.getElementById('xFollowers').textContent,
        posts: document.getElementById('xPosts').textContent,
        following: document.getElementById('xFollowing').textContent,
        media: document.getElementById('xMedia').textContent,
    }));
}
function loadXStats() {
    const saved = localStorage.getItem('rmt_xstats');
    if (!saved) return;
    const d = JSON.parse(saved);
    if (d.followers) document.getElementById('xFollowers').textContent = d.followers;
    if (d.posts) document.getElementById('xPosts').textContent = d.posts;
    if (d.following) document.getElementById('xFollowing').textContent = d.following;
    if (d.media) document.getElementById('xMedia').textContent = d.media;
}
document.querySelectorAll('.x-editable').forEach(el => {
    el.addEventListener('blur', saveXStats);
    el.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); el.blur(); } });
});

// ---- 📅 Weekly Goal ----
function loadGoal() {
    const saved = localStorage.getItem('rmt_goal');
    if (saved) {
        const g = JSON.parse(saved);
        document.getElementById('goalText').textContent = g.text || 'No goal set';
        document.getElementById('goalTarget').textContent = g.target || 7;
        document.getElementById('goalTargetInput').value = g.target || 7;
    }
}
function saveGoal() {
    const text = document.getElementById('goalInput').value.trim() || document.getElementById('goalText').textContent;
    const target = parseInt(document.getElementById('goalTargetInput').value) || 7;
    localStorage.setItem('rmt_goal', JSON.stringify({ text, target }));
    document.getElementById('goalText').textContent = text;
    document.getElementById('goalTarget').textContent = target;
    document.getElementById('goalEdit').style.display = 'none';
    document.getElementById('goalDisplay').style.display = '';
}
function updateWeeklyGoalProgress(repos) {
    const saved = localStorage.getItem('rmt_goal');
    const target = saved ? JSON.parse(saved).target : 7;
    const now = new Date();
    const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCommits = repos.filter(r => r.pushed_at && new Date(r.pushed_at) > weekAgo).length;
    const pct = Math.min(100, Math.round((weekCommits / target) * 100));
    document.getElementById('goalFill').style.width = `${pct}%`;
    document.getElementById('goalCurrent').textContent = weekCommits;
    document.getElementById('goalTarget').textContent = target;
}

document.getElementById('editGoalBtn').addEventListener('click', () => {
    document.getElementById('goalEdit').style.display = '';
    document.getElementById('goalDisplay').style.display = 'none';
    document.getElementById('goalInput').focus();
    const saved = localStorage.getItem('rmt_goal');
    if (saved) document.getElementById('goalInput').value = JSON.parse(saved).text || '';
});
document.getElementById('saveGoalBtn').addEventListener('click', saveGoal);
document.getElementById('goalInput').addEventListener('keydown', e => { if (e.key === 'Enter') saveGoal(); });

// ---- Todo List ----
let todos = JSON.parse(localStorage.getItem('rmt_todos') || '[]');
function saveTodos() { localStorage.setItem('rmt_todos', JSON.stringify(todos)); }
function updateTodoCount() {
    const done = todos.filter(t => t.done).length;
    document.getElementById('todoCount').textContent = `${done}/${todos.length}`;
}
function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach((todo, i) => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.done ? ' done' : '');
        li.innerHTML = `
            <button class="todo-check" data-i="${i}"><span class="material-icons">check</span></button>
            <span class="todo-text">${escHtml(todo.text)}</span>
            <button class="todo-del" data-i="${i}"><span class="material-icons">close</span></button>`;
        list.appendChild(li);
    });
    list.querySelectorAll('.todo-check').forEach(btn => btn.addEventListener('click', () => {
        todos[+btn.dataset.i].done = !todos[+btn.dataset.i].done;
        saveTodos(); renderTodos(); updateTodoCount();
    }));
    list.querySelectorAll('.todo-del').forEach(btn => btn.addEventListener('click', () => {
        todos.splice(+btn.dataset.i, 1);
        saveTodos(); renderTodos(); updateTodoCount();
    }));
    updateTodoCount();
}
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim(); if (!text) return;
    todos.unshift({ text, done: false, id: Date.now() });
    saveTodos(); renderTodos(); updateTodoCount(); input.value = ''; input.focus();
}
document.getElementById('todoAddBtn').addEventListener('click', addTodo);
document.getElementById('todoInput').addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });
document.getElementById('todoClearDone').addEventListener('click', () => {
    todos = todos.filter(t => !t.done); saveTodos(); renderTodos(); updateTodoCount();
});

// ---- Refresh ----
document.getElementById('refreshBtn').addEventListener('click', fetchGitHub);

// ---- Init ----
loadXStats(); loadGoal(); renderTodos(); fetchGitHub();

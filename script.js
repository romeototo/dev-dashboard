/* ======================================
   RoMeoTOTO Dev Dashboard — Script
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

// ---- Greeting & Clock ----
function updateClock() {
    const now = new Date();
    const h = now.getHours();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('liveTime').textContent = timeStr;

    const greet = h < 5 ? "Still up late," : h < 12 ? "Good morning," : h < 17 ? "Good afternoon," : h < 21 ? "Good evening," : "Late night grind,";
    document.getElementById('greeting').textContent = `${greet} RoMeoTOTO 👋`;
}
updateClock();
setInterval(updateClock, 1000);

// ---- Daily Tip (rotate by day) ----
function setTip() {
    const idx = new Date().getDate() % TIPS.length;
    document.getElementById('tipText').textContent = TIPS[idx];
}
setTip();

// ---- GitHub API ----
async function fetchGitHub() {
    try {
        // User profile
        const userRes = await fetch(`https://api.github.com/users/${GH_USER}`);
        const user = await userRes.json();

        document.getElementById('ghAvatar').src = user.avatar_url || `https://github.com/${GH_USER}.png`;
        document.getElementById('ghRepos').textContent = user.public_repos ?? '—';
        document.getElementById('ghFollowers').textContent = user.followers ?? '—';
        document.getElementById('ghFollowing').textContent = user.following ?? '—';
        document.getElementById('totalRepos').textContent = user.public_repos ?? '—';
        document.getElementById('repoCount').textContent = `${user.public_repos} repos`;

        // Repos — fetch all, sort by updated
        const repoRes = await fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=30`);
        const repos = await repoRes.json();

        // Total stars
        const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
        document.getElementById('ghStars').textContent = totalStars;

        // Featured repos — filter out the profile repo
        const featured = repos.filter(r => !r.fork && r.name !== GH_USER)
                              .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
                              .slice(0, 6);

        renderRepos(featured);
        renderMiniGraph(repos);

        // Last commit estimate
        if (repos.length > 0) {
            const last = repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))[0];
            const lastDate = new Date(last.pushed_at);
            const diff = Math.floor((Date.now() - lastDate) / 86400000);
            const label = diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : `${diff} days ago`;
            document.getElementById('lastCommitDate').textContent = label;

            // Streak (simplified: based on recent push dates)
            const streak = calcStreak(repos);
            document.getElementById('streakDays').textContent = streak;
        }

    } catch (e) {
        console.warn('GitHub API error:', e);
        document.getElementById('repoCount').textContent = 'API limit reached';
    }
}

function calcStreak(repos) {
    const dates = new Set();
    repos.forEach(r => {
        if (r.pushed_at) {
            const d = new Date(r.pushed_at).toDateString();
            dates.add(d);
        }
    });
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 30; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
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

    repos.forEach(r => {
        if (r.pushed_at) {
            const d = new Date(r.pushed_at).toDateString();
            activity[d] = (activity[d] || 0) + 1;
        }
    });

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = d.toDateString();
        const count = activity[key] || 0;
        const bar = document.createElement('div');
        bar.className = 'mini-bar' + (count > 0 ? ' active' : '');
        bar.style.height = `${Math.max(4, Math.min(32, count * 10 + 4))}px`;
        bar.title = `${d.toLocaleDateString()}: ${count} push(es)`;
        graph.appendChild(bar);
    }
}

function renderRepos(repos) {
    const grid = document.getElementById('reposGrid');
    grid.innerHTML = '';

    // Always show key projects first
    const priority = ['ai-tycoon-rialo-game', 'monster-tapper', 'MyFirstProject', 'telegram-ai-it-automation-agent'];
    repos.sort((a, b) => {
        const ai = priority.indexOf(a.name);
        const bi = priority.indexOf(b.name);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return 0;
    });

    repos.forEach(repo => {
        const item = document.createElement('a');
        item.className = 'repo-item';
        item.href = repo.html_url;
        item.target = '_blank';

        const playLink = PLAY_LINKS[repo.name];
        const playBtn = playLink
            ? `<a href="${playLink}" target="_blank" class="repo-play" onclick="event.stopPropagation()">
                <span class="material-icons">play_arrow</span> Play
               </a>` : '';

        item.innerHTML = `
            <div class="repo-name">
                <span class="material-icons">folder_open</span>
                ${repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </div>
            <div class="repo-desc">${repo.description || 'No description'}</div>
            <div class="repo-meta">
                <span class="repo-lang">
                    <span class="material-icons">circle</span>
                    ${repo.language || 'HTML'}
                </span>
                <span class="repo-stars">
                    <span class="material-icons">star</span>
                    ${repo.stargazers_count}
                </span>
            </div>
            ${playBtn}
        `;
        grid.appendChild(item);
    });
}

// ---- X Stats Persistence ----
function saveXStats() {
    const data = {
        followers: document.getElementById('xFollowers').textContent,
        posts: document.getElementById('xPosts').textContent,
        following: document.getElementById('xFollowing').textContent,
        media: document.getElementById('xMedia').textContent,
    };
    localStorage.setItem('rmt_xstats', JSON.stringify(data));
}

function loadXStats() {
    const saved = localStorage.getItem('rmt_xstats');
    if (!saved) return;
    const data = JSON.parse(saved);
    if (data.followers) document.getElementById('xFollowers').textContent = data.followers;
    if (data.posts) document.getElementById('xPosts').textContent = data.posts;
    if (data.following) document.getElementById('xFollowing').textContent = data.following;
    if (data.media) document.getElementById('xMedia').textContent = data.media;
}

document.querySelectorAll('.x-editable').forEach(el => {
    el.addEventListener('blur', saveXStats);
    el.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); el.blur(); } });
});

// ---- Todo List ----
let todos = JSON.parse(localStorage.getItem('rmt_todos') || '[]');

function saveTodos() { localStorage.setItem('rmt_todos', JSON.stringify(todos)); }

function updateTodoCount() {
    const done = todos.filter(t => t.done).length;
    document.getElementById('todoCount').textContent = `${done}/${todos.length}`;
}

function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach((todo, i) => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.done ? ' done' : '');
        li.innerHTML = `
            <button class="todo-check" data-i="${i}" title="Toggle done">
                <span class="material-icons">check</span>
            </button>
            <span class="todo-text">${escHtml(todo.text)}</span>
            <button class="todo-del" data-i="${i}" title="Delete">
                <span class="material-icons">close</span>
            </button>
        `;
        list.appendChild(li);
    });

    list.querySelectorAll('.todo-check').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = +btn.dataset.i;
            todos[i].done = !todos[i].done;
            saveTodos(); renderTodos(); updateTodoCount();
        });
    });
    list.querySelectorAll('.todo-del').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = +btn.dataset.i;
            todos.splice(i, 1);
            saveTodos(); renderTodos(); updateTodoCount();
        });
    });
    updateTodoCount();
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (!text) return;
    todos.unshift({ text, done: false, id: Date.now() });
    saveTodos(); renderTodos(); updateTodoCount();
    input.value = '';
    input.focus();
}

document.getElementById('todoAddBtn').addEventListener('click', addTodo);
document.getElementById('todoInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTodo();
});
document.getElementById('todoClearDone').addEventListener('click', () => {
    todos = todos.filter(t => !t.done);
    saveTodos(); renderTodos(); updateTodoCount();
});

function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---- Refresh Button ----
document.getElementById('refreshBtn').addEventListener('click', () => {
    fetchGitHub();
});

// ---- Init ----
loadXStats();
renderTodos();
fetchGitHub();

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,100:00D9FF&height=160&section=header&text=Dev%20Dashboard&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=40&desc=Personal%20Developer%20Hub%20by%20RoMeoTOTO&descAlignY=62&descSize=16" width="100%" />

<i>👉 <a href="README-th.md">🇹🇭 อ่านรายละเอียดภาษาไทย</a></i><br><br>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-6C63FF?style=for-the-badge&logoColor=white)](https://romeototo.github.io/dev-dashboard/)
[![GitHub](https://img.shields.io/badge/romeototo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/romeototo)
[![X](https://img.shields.io/badge/@RoMeoT0T0-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/RoMeoT0T0)

</div>

---

## 📸 Screenshot

![Dev Dashboard Screenshot](./screenshot.png)

---

## ✨ Features

|         Feature          | Description                                        |
| :----------------------: | -------------------------------------------------- |
|   📊 **GitHub Stats**    | Live data via GitHub API — repos, followers, stars |
| 𝕏 **X / Twitter Stats**  | Editable stats saved to localStorage               |
|   🔥 **Commit Streak**   | Visual activity bar graph + streak counter         |
|  🎮 **Game Shortcuts**   | One-click launch to Rialo Tycoon & Monster Tapper  |
|     ✅ **Todo List**     | Daily tasks with done/delete, persisted locally    |
|    📅 **Weekly Goal**    | Set weekly commit target with live progress bar    |
|  🔔 **Commit Reminder**  | Browser notification at your chosen time           |
| 🌙 **Dark / Light Mode** | Toggle theme, saved to localStorage                |
|    🔗 **Quick Links**    | All projects accessible in one click               |
|     💡 **Daily Tip**     | Rotates dev wisdom daily                           |

---

## 🚀 Getting Started

**Option 1 — Open directly (no server needed for basic use)**

```bash
open index.html
```

**Option 2 — Run local server (recommended for API features)**

```bash
python -m http.server 8080
# Then open: http://localhost:8080
```

**Option 3 — Use Live Demo**  
👉 [https://romeototo.github.io/dev-dashboard/](https://romeototo.github.io/dev-dashboard/)

---

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub API](https://img.shields.io/badge/GitHub_API-181717?style=flat-square&logo=github&logoColor=white)
![Material Icons](https://img.shields.io/badge/Material_Icons-757575?style=flat-square&logo=google&logoColor=white)

- **Zero dependencies** — Pure HTML/CSS/JS, no frameworks
- **GitHub REST API** — Live public stats, no auth required
- **localStorage** — All user data persisted locally
- **Web Notifications API** — Browser-native reminder system

---

## 📁 Project Structure

```
dev-dashboard/
├── index.html      # Main dashboard layout
├── style.css       # Dark/Light theme with CSS variables
├── script.js       # GitHub API, Todo, Goal, Reminder logic
└── screenshot.png  # Dashboard preview
```

---

## 🔧 Customization

To use this as your own dashboard, edit these constants in `script.js`:

```javascript
const GH_USER = "your-github-username"; // Your GitHub username
const PLAY_LINKS = {
  "your-repo-name": "https://your-live-url.com/",
};
```

---

<div align="center">

### 🎮 My Games

|     | Game                                        |                            Play                             |
| :-: | ------------------------------------------- | :---------------------------------------------------------: |
| 👾  | **Monster Tapper** — Clicker + Boss Battles |    [▶ Play](https://romeototo.github.io/monster-tapper/)    |

---

Built with ❤️ by [RoMEoTOTO.base.eth](https://github.com/romeototo) · Bangkok 🇹🇭

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,100:00D9FF&height=100&section=footer" width="100%" />

</div>

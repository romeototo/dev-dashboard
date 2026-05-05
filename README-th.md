<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,100:00D9FF&height=160&section=header&text=Dev%20Dashboard&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=40&desc=Personal%20Developer%20Hub%20by%20RoMeoTOTO&descAlignY=62&descSize=16" width="100%" />

# 📊 หน้าแดชบอร์ดนักพัฒนา (Dev Dashboard)

**ศูนย์กลางการควบคุมส่วนตัวสำหรับนักพัฒนาโดย RoMeoTOTO**

<i>👉 <a href="README.md">🇬🇧 Read in English</a></i><br><br>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-6C63FF?style=for-the-badge&logoColor=white)](https://romeototo.github.io/dev-dashboard/)
[![GitHub](https://img.shields.io/badge/romeototo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/romeototo)
[![X](https://img.shields.io/badge/@RoMeoT0T0-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/RoMeoT0T0)

</div>

---

## 📸 ภาพตัวอย่าง

![Dev Dashboard Screenshot](./screenshot.png)

---

## ✨ ฟีเจอร์หลัก

|         ฟีเจอร์          | รายละเอียด                                                    |
| :----------------------: | ------------------------------------------------------------- |
|   📊 **GitHub Stats**    | ข้อมูลสดผ่าน GitHub API — จำนวน Repo, ผู้ติดตาม, ดาว          |
| 𝕏 **X / Twitter Stats**  | แก้ไขข้อมูลสถิติและบันทึกลง localStorage                      |
|   🔥 **Commit Streak**   | กราฟแท่งแสดงกิจกรรมการ Commit พร้อมตัวนับ Streak              |
|  🎮 **Game Shortcuts**   | ทางลัดเข้าเล่นเกม Rialo Tycoon และ Monster Tapper ในคลิกเดียว |
|     ✅ **Todo List**     | รายการงานรายวันพร้อมระบบบันทึกความคืบหน้าถาวรในเครื่อง        |
|    📅 **Weekly Goal**    | ตั้งเป้าหมายการ Commit รายสัปดาห์พร้อมแถบแสดงความคืบหน้า      |
|  🔔 **Commit Reminder**  | ระบบแจ้งเตือนผ่านเบราว์เซอร์ตามเวลาที่กำหนด                   |
| 🌙 **Dark / Light Mode** | สลับธีมมืด/สว่าง และจดจำค่าไว้ในเครื่อง                       |
|    🔗 **Quick Links**    | เข้าถึงโปรเจกต์ทั้งหมดได้จากที่เดียว                          |
|     💡 **Daily Tip**     | คำแนะนำสำหรับนักพัฒนาที่เปลี่ยนไปในทุกๆ วัน                   |

---

## 🚀 เริ่มต้นใช้งาน

**วิธีที่ 1 — เปิดใช้งานโดยตรง (ไม่ต้องใช้ Server)**
เปิดไฟล์ `index.html` ในเบราว์เซอร์ของคุณ

**วิธีที่ 2 — รันผ่าน Local Server (แนะนำสำหรับการใช้ API)**

```bash
python -m http.server 8080
# จากนั้นเปิด: http://localhost:8080
```

---

## 🛠️ เทคโนโลยีที่ใช้

- **Zero dependencies** — ใช้เพียง HTML/CSS/JS บริสุทธิ์ ไม่พึ่งพา Framework
- **GitHub REST API** — ดึงสถิติสาธารณะแบบสดๆ
- **localStorage** — บันทึกข้อมูลผู้ใช้ทั้งหมดไว้ในเบราว์เซอร์
- **Web Notifications API** — ระบบแจ้งเตือนพื้นฐานของเบราว์เซอร์

---

## 📁 โครงสร้างไฟล์

```
dev-dashboard/
├── index.html      # เลย์เอาต์หน้าแดชบอร์ดหลัก
├── style.css       # ธีมสว่าง/มืด พร้อมการใช้ CSS Variables
├── script.js       # ตรรกะ GitHub API, Todo, เป้าหมาย, และระบบแจ้งเตือน
└── screenshot.png  # ภาพตัวอย่างหน้าแดชบอร์ด
```

---

<div align="center">

Built with ❤️ by [RoMEoTOTO.base.eth](https://github.com/romeototo) · Bangkok 🇹🇭

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,100:00D9FF&height=100&section=footer" width="100%" />

</div>

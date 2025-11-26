# 🧩 Kanban Board – Logic Driven Task Management (HTML | CSS | JavaScript)

This project is a **Kanban Board built from scratch with no frameworks**, focused on **logic building, UX improvement, state-based transitions, and modern UI design**.

The UI is **custom-designed, dark-themed and visually impressive**, inspired by productivity tools but styled uniquely.

---

## 🚀 Live Demo (if hosted on GitHub Pages)
🔗 **https://your-username.github.io/kanban-board/**
> *(Replace with your URL once deployed)*

---

## ✨ Features

| Category | Highlights |
|---------|------------|
| UI / UX | Dark Theme • Smooth transitions • Hover effects • Toast message • Modern modal • Clean animations |
| Logic | State-driven column transitions • Duplicate title validation • LocalStorage persistence |
| Interaction | Drag & Drop support • Delete task • Add new task via modal |
| Data Handling | Auto-save to LocalStorage • Auto-restore on refresh • Count update for each column |

---

## 🎯 UX & Logic Advantages

🧠 **State Machine Workflow**  
Tasks follow a realistic movement order:
To Do → In Progress → Completed

Directly moving `To Do → Completed` is **not allowed**, and a **toast message** alerts the user.

🔄 **LocalStorage Sync**
All tasks persist even after refresh. No backend required.

🛡 **Duplicate Task Prevention**
Adding a task with an existing title shows a toast warning — avoids confusion.

---

## 📸 Screenshots (Add your images here later)

| View | Screenshot |
|------|------------|
| Full Dashboard | *(board screenshot here)* |
| Modal – Add Task | *(modal screenshot here)* |
| Toast Message on Invalid Move | *(toast screenshot here)* |

You can store them under:


---

## 🛠 Tech Stack

| Technology | Usage |
|-----------|--------|
| HTML5 | Structure |
| CSS3 | Dark theme UI, animations, hover/active states |
| Vanilla JavaScript | Logic, drag & drop, localStorage, validation |

No external libraries or frameworks used.

---

## 📂 Project Structure

<pre>
  kanban-board/
│ index.html
│ style.css
│ script.js
│ README.md
└─ assets/
└─ screenshots/ (optional)
</pre>


---

## 📌 How to Run

1. Clone this repository
   ```bash
   git clone https://github.com/NOBISSS/kanban-board.git

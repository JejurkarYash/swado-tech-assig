# 🎓 Student Course Enrollment System

Functionalities :

- Adding students
- Adding courses
- Enrolling students into courses
- Viewing enrolled students with their respective courses

---

## 🚀 Tech Stack

- **Frontend**: React.js + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL (cloud-hosted on **Neon.tech**)
- **Package Manager**: pnpm

---

## 📦 Project Structure

```
├── backend/                  # Backend server with Express + TypeScript
│   ├── src/
│   │   ├── db.ts            # Database connection setup
│   │   ├── index.ts         # Server entry point
│   │   ├── migrate.ts       # Database migration
│   │   ├── schema.sql       # Database schema
│   │   └── zod/
│   │       └── index.ts     # Zod schemas for validation
│   ├── nodemon.json         # Nodemon configuration
│   ├── package.json         # Backend dependencies
│   ├── pnpm-lock.yaml
│   ├── tsconfig.json        # TypeScript configuration
│   └── tsconfig.tsbuildinfo
│
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── AddCourseCard.tsx
│   │   │   ├── AddStudentCard.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AllCourseCard.tsx
│   │   │   ├── AllEnrollmentsCard.tsx
│   │   │   ├── AllStudentsCard.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── EnrollementCard.tsx
│   │   │   └── SideBar.tsx
│   │   ├── hook/           # Custom React hooks
│   │   │   ├── useCourses.ts
│   │   │   └── useStudents.ts
│   │   ├── assets/         # Static assets
│   │   │   ├── hamburgerMenuIcon.svg
│   │   │   └── react.svg
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── public/
│   │   └── vite.svg
│   ├── eslint.config.js    # ESLint configuration
│   ├── index.html          # HTML entry point
│   ├── package.json        # Frontend dependencies
│   ├── pnpm-lock.yaml
│   ├── README.md
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── tsconfig.app.json
│   ├── tsconfig.json       # TypeScript configuration
│   ├── tsconfig.node.json
│   └── vite.config.ts      # Vite configuration
│
└── README.md
```

## ⚙️ Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/JejurkarYash/swado-tech-assig.git
cd swado-tech-assig


```

### Backend Setup

```bash
cd backend
pnpm install

```

### Enviroment Variables

PORT=5000
DATABASE_URL=your-neon-database-url

### Run Backend

```bash
pnpm run dev

```

Backend will start at:
http://localhost:3000

### Frontend Setup

```bash
cd frontend
pnpm install

```

### Enviroment variable

VITE_BACKEND_URL = "http://localhost:3000"

### Run Frontend

```bash
pnpm run dev

```

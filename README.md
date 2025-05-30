# 🏫 Education System - Frontend

This is the **frontend** of a full-stack Education Management System built with **React 18** and **TypeScript**. It provides a clean interface for managing student records and supports role-based access control for **admin** and **student** users.

> 🛠 Note: Features like course registration and tuition fee tracking are planned for future development.

---

## 🧪 Testing Accounts

Use the following test accounts to log in:

### 👩‍💼 Admin
- **Username:** `admin1`
- **Password:** `admin123`

### 👨‍🎓 Student
- **Username:** `student1`
- **Password:** `admin123`

---

## ⚙️ Technologies Used

- **React 18** + **TypeScript**
- **Redux Toolkit** (state management)
- **TanStack Query** (data fetching and caching)
- **React Router**
- **Axios**
- **Yup + React Hook Form**
- **SASS**
- **JWT (with cookie-based auth)**
- **Jest** (for testing)
- **ESLint + Prettier**
- **Yarn** (package manager)
- **Deployed on [Vercel](https://vercel.com/)**

---

## 🔐 Role-Based Access

The system supports two roles:

- **ADMIN**: Full access to manage student records.
- **STUDENT**: Read-only access to view their own student details.

Access is managed through protected routes and JWT stored in HTTP-only cookies.

---

## 🚀 Current Features

### 🧑 Admin
- View paginated list of students
- View student detail
- Create new student records
- Update student records
- Delete student records

### 👨‍🎓 Student
- View their own student detail

> 🔜 Future features: course registration, tuition fee management, curriculum tracking, and reporting

---

## 📦 Getting Started

### ✅ Prerequisites
- Node.js (v18+ recommended)
- Yarn

### 🛠 Setup

```bash
# Clone the repo
git clone https://github.com/hynoras/education-reactjs.git
cd education-reactjs

# Install dependencies
yarn install

# Start the dev server
yarn start

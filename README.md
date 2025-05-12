# 🏫 Education System - Frontend

This is the **frontend** of a full-stack Education Management System built using **ReactJS** and **TypeScript**. It supports role-based access for **students**, **administrators**, and **finance officers**, and includes features like course registration, tuition tracking, and report generation.

---

# Account for testing

- admin:
username: admin1
password: admin123
- student:
username: student1
password: admin123

---

## ⚙️ Technologies Used

- **ReactJS** + **TypeScript**
- **React Router**
- **Axios**
- **Yup + React Hook Form**
- **Ant Design**
- **SASS** for styling
- **JWT** authentication handling

---

## 🚀 Features
### Module
#### Student
- View student list (admin)
- View student detail such as personal information, parent information (admin, student)
- Add student's personal information (admin)
- Update student's personal information partially (admin)
- Delete student's personal information (admin)
#### Parent
- View parent information (admin, student)
- Add parent information (admin)
- Upsert parent information partially (admin)
- Delete parent information (admin)

---

## 📦 Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/edu-system-frontend.git
cd edu-system-frontend

# 2. Install dependencies
yarn install

# 3. Run the app
yarn start

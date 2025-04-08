# 📁 Portfolio

A modern, multi-language developer portfolio built with React and Vite. It includes dark/light mode, user authentication, a custom comment section, and a small game—all styled using Tailwind CSS. The project is internationalized with support for 7 languages and backed by a custom backend API.

---

## 🔗 Live Demo

[**🌐 Visit Portfolio**](https://ligvado.netlify.app)

---

## 🧰 Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS, i18next, Vite
- **Animations:** `motion`
- **State Management:** Redux Toolkit
- **Language Support:** `i18next`, `react-i18next` (with dynamic JSON loading)
- **Icons:** `react-icons`
- **Hosting:** Netlify
- **Testing:** Vitest (no current tests implemented)
- **CI/CD:** Netlify CI pipeline (tests are not currently integrated)

---

## 🌍 Internationalization

Supports 7 languages via **i18next** with dynamic JSON file loading:

- English
- Russian
- Chinese
- German
- Korean
- Japanese
- Uzbek

---

## 📁 Folder Structure

```
src/
├── assets/         # Static assets (images, icons, etc.)
├── components/     # Reusable UI components
├── data/           # Static or mock data
├── hooks/          # Custom React hooks
├── pages/          # Route components (e.g., About, Login, Profile)
├── store/          # Redux store and slices
├── utils/i18n/     # i18n config and translation files
```

---

## ✨ Features

- ✅ Responsive, modern design
- 🌙 Dark/Light mode toggle
- 🔐 Authentication (login/signup)
- 💬 Comments page with protected access
- 🧠 Small game section
- 🌍 Internationalized UI (7 languages)
- ⚙️ CI/CD (Netlify)

> The backend is required for authentication, comments, and other protected features. Backend documentation is available separately.

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/portfolio-react.git
cd portfolio-react

# 2. Install dependencies
npm install

# 3. Set environment variables
# Create a `.env` file with your backend host URL
VITE_BACKEND_URL=https://your-backend.com

# 4. Run the development server
npm run dev
```

> ⚠️ Note: Due to CORS issues, the frontend will not function fully unless connected to the properly configured backend.

---

## 🛠️ Environment Variables

Create a `.env` file and include:

```env
VITE_BACKEND_URL=https://your-backend.com
```

---

## 📦 Build

```bash
npm run build
```

## 🔍 Preview

```bash
npm run preview
```

---

## 🔗 Backend

This project relies on a custom backend for:

- Authentication
- Comments
- User profiles

## 📄 [**Backend Documentation**](https://github.com/Asuzaka/Portfolio-app/blob/main/README.md)

## 📌 TODO / Future Improvements

- [ ] Add password forget/reset feature
- [ ] Add frontend test coverage
- [ ] Add contributing guidelines (if open-source)

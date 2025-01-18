# EventPro - Event Planning Platform 🎉

A modern, feature-rich event planning platform built with React, Vite, and Tailwind CSS. EventPro helps you organize events seamlessly with an intuitive interface and powerful features.

![EventPro Screenshot](screenshot.png)

## ✨ Features

### 🔐 Authentication System
- Secure user registration and login
- Protected routes for authenticated features
- Social login integration (UI ready)
- Remember me functionality
- Persistent sessions with localStorage

### 🌓 Dark Mode
- System preference detection
- Persistent theme preference
- Smooth transitions
- Consistent styling across all components
- Toggle button in navigation

### 📱 Venue and Vendor Management
- Comprehensive venue search
- Budget-based filtering
- Location preferences
- Capacity matching
- Vendor suggestions

### 👥 Guest List Management
- RSVP tracking
- Meal preferences
- Seating arrangements
- Guest grouping
- Automated notifications

### 🎨 Theme Ideas with AI
- AI-powered theme suggestions
- Color scheme recommendations
- Decoration styles
- Dress code suggestions
- Customizable preferences

### 📅 Event Planning Tools
- Detailed itinerary creation
- Timeline management
- Activity scheduling
- Location assignments
- Real-time updates

## 🛠️ Technologies Used

- **Frontend Framework:** React with Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context
- **Data Persistence:** localStorage
- **Form Handling:** Native React forms
- **Routing:** React Router v6
- **Code Quality:** ESLint
- **Development:** Hot Module Replacement (HMR)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/event-planning-platform.git
cd event-planning-platform
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## 🎯 Key Features Breakdown

### Authentication
- Secure user management
- Protected routes
- Social login UI
- Remember me functionality
- Persistent sessions

### Dark Mode
- System preference detection
- Manual toggle option
- Persistent preferences
- Smooth transitions
- Consistent UI

### Event Planning
- Venue search and filtering
- Guest list management
- Theme suggestions
- Timeline creation
- Budget tracking

## 🎨 UI/UX Features

- Professional and modern interface
- Responsive design
- Split-screen auth pages
- Form validation
- Loading states
- Error handling
- Consistent styling
- Smooth transitions

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ProtectedRoute.jsx
│   ├── layout/
│   │   └── Layout.jsx
│   └── ...
├── contexts/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── pages/
│   ├── home/
│   ├── venues/
│   ├── guests/
│   └── themes/
└── utils/
    └── data/
```

## 🔒 Security

- Protected routes for authenticated features
- Secure data storage with localStorage
- Form validation and sanitization
- Error boundaries
- Secure password handling

## 🎨 Customization

### Theme Configuration

The dark mode can be customized in `tailwind.config.js`:

```javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Your custom colors
      }
    }
  }
}
```

### Authentication Settings

Modify authentication behavior in `src/contexts/AuthContext.jsx`:

```javascript
const AuthProvider = ({ children }) => {
  // Customize authentication logic
};
```

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Consistent experience across devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite team for the blazing fast build tool
- All contributors who have helped shape this project

---

Made with ❤️ by [Your Name]
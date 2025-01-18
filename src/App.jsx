import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import VenuePage from './pages/venues/VenuePage';
import EventPlannerPage from './pages/planner/EventPlannerPage';
import GuestPage from './pages/guests/GuestPage';
import ThemePage from './pages/themes/ThemePage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/venues"
              element={
                <ProtectedRoute>
                  <VenuePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/planner"
              element={
                <ProtectedRoute>
                  <EventPlannerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/guests"
              element={
                <ProtectedRoute>
                  <GuestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/themes"
              element={
                <ProtectedRoute>
                  <ThemePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <div className="container mx-auto px-4 py-8 text-center">
                  <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
                  <p className="text-gray-600">The page you're looking for doesn't exist.</p>
                </div>
              }
            />
          </Routes>
        </Layout>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
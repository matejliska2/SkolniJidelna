import './App.css'
import Header from './header.jsx';
import MainContent from './MainContent.jsx';
import LunchForm from './LunchForm.jsx';
import CommentSection from './CommentSection.jsx';
import Login from './Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
  <Router>
    <Header />
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/review/:id" element={<LunchForm />} />
        <Route path="/lunches/:id/comments" element={<CommentSection />} />
        <Route path="/" element={<MainContent />} />
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
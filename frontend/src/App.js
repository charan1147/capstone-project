import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AddBook from './components/BookManagement/AddBook';
import BookUpdateForm from './components/BookManagement/BookUpdateForm';
import DeleteBook from './components/BookManagement/DeleteBook';
import SearchBooks from './components/BookManagement/SearchBooks';
import Register from './components/UserMangement/Register';
import Login from './components/UserMangement/Login';
import Profile from './components/UserMangement/Profile';
import ReserveBook from './components/ReservationMangement/ReserveBook';
import CancelReservation from './components/ReservationMangement/CancelReservation';
import Notifications from './components/NotificationMangement/Notification';
import BorrowBook from './components/BorrowingMangement.js/BorrowBook';
import ReturnBook from './components/BorrowingMangement.js/ReturnBook';
import OverdueBooks from './components/BorrowingMangement.js/OverdueBooks';
import AdminDashboard from './pages/Admin';
import UserDashboard from './pages/User';
import Navigation from './components/Navigation';
import ViewReservations from './components/ReservationMangement/ViewReservation';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('');
  };

  return (
    <Router>
      <div className="app-container">
        <Navigation isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Navigate to={isLoggedIn ? (userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard') : '/login'} />} />
          <Route path="/admin-dashboard" element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/user-dashboard" element={isLoggedIn && userRole === 'user' ? <UserDashboard /> : <Navigate to="/login" />} />
          <Route path="/add-book" element={isLoggedIn && userRole === 'admin' ? <AddBook /> : <Navigate to="/login" />} />
          <Route path="/books/update/:id" element={isLoggedIn && userRole === 'admin' ? <BookUpdateForm /> : <Navigate to="/login" />} />
          <Route path="/delete-book/:id" element={isLoggedIn && userRole === 'admin' ? <DeleteBook /> : <Navigate to="/login" />} />
          <Route path="/books/search" element={<SearchBooks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reserve-book" element={isLoggedIn && userRole === 'user' ? <ReserveBook /> : <Navigate to="/login" />} />
          <Route path="/view-reservations" element={isLoggedIn && userRole === 'admin' ? <ViewReservations /> : <Navigate to="/login" />} />
          <Route path="/cancel-reservation/:reservationId" element={isLoggedIn ? <CancelReservation /> : <Navigate to="/login" />} />
          <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
          <Route path="/borrow-book" element={isLoggedIn && userRole === 'user' ? <BorrowBook /> : <Navigate to="/login" />} />
          <Route path="/return-book/:id" element={isLoggedIn && userRole === 'user' ? <ReturnBook /> : <Navigate to="/login" />} />
          <Route path="/overdue-books" element={isLoggedIn && userRole === 'user' ? <OverdueBooks /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App

/******************************************************************************
*                              App Component                                  *
******************************************************************************/

/*************************** Component Information ****************************
*                                                                             *
* Purpose: Main router and authentication management for the application      *
* Created: November 2024                                                      *
* Updated: December 2024                                                      *
* Authors: Majid Iqbal, Sulav Shakya, Bruce Duong, Ethan Humrich              *
*                                                                             *
*****************************************************************************/

/******************************** Features ************************************
*                                                                             *
* ROUTE MANAGEMENT          |   AUTH HANDLING                                 *
* ------------------------- |   ----------------------------------            *
* - Protected routes        |   - Auth state tracking                         *
* - Public routes           |   - Auto logout                                 *
* - Navigation paths        |   - Route protection                            *
* - Component routing       |   - Loading states                              *
*                                                                             *
*****************************************************************************/

// Router for application
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// React hooks imports
import { useEffect, useState } from "react";

// Firebase imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";

// Component imports and pages
import { Auth } from "./components/Auth";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Library from "./pages/Library";
import Create from "./pages/CreateFlashcard";
import CreateGroup from "./pages/CreateGroup";
import JoinGroups from "./pages/JoinGroups";
import LearnMode from "./pages/LearnMode";
import EditFlashcardSet from "./pages/EditFlashcardSet";
import Tests from "./pages/Tests";
import CreateTest from "./pages/CreateTest";
import TestMode from "./pages/TestMode";
import EditTest from "./pages/EditTest";
import ChatRoom from "./pages/ChatRoom";

// custom hook and utility function imports
import useAutoLogout from "./hooks/AutoLogout";
import LoadingSpinner from "./components/LoadingSpinner";

// implement auto logout after 30 minutes of inactivity
// wraps all authenticated routes
const AuthenticatedRoute = ({ children }) => {
  const { WarningComponent } = useAutoLogout(30);

  return (
    <>
      {children}
      {WarningComponent}
    </>
  );
};

// manage authentication state
// use firebase onAuthStateChanged to check if user is authenticated
// if authenticated, render the homepage and show loading spinner while checking
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/homepage" /> : <Auth />}
          />
          <Route
            path="/homepage"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <Homepage />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/about"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <About />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/contact"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <Contact />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/library"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <Library />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/create"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <Create />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/join"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <JoinGroups />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/create-group" // Note: Use kebab-case for URLs
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <CreateGroup />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/learn"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <LearnMode />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/edit/:setId"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <EditFlashcardSet />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/tests"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <Tests />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/create-test"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <CreateTest />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/test"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <TestMode />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/edit-test/:testId"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <EditTest />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/chat/:groupId"
            element={
              isAuthenticated ? (
                <AuthenticatedRoute>
                  <ChatRoom />
                </AuthenticatedRoute>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

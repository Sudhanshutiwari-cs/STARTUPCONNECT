import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/components_lite/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Profile from "./components/components_lite/Profile";
import PrivacyPolicy from "./components/components_lite/PrivacyPolicy.jsx";
import TermsofService from "./components/components_lite/TermsofService.jsx";
import Opportunities from "./components/components_lite/Opportunities.jsx";
import Startups from "./components/components_lite/Startups.jsx";
import OpportunityDescription from "./components/components_lite/OpportunityDescription.jsx";
import StartupProfile from "./components/components_lite/StartupProfile.jsx";

// Founder/Admin components
import FounderStartups from "./components/founder/FounderStartups";
import StartupCreate from "./components/founder/StartupCreate";
import StartupSetup from "./components/founder/StartupSetup";
import FounderOpportunities from "./components/founder/FounderOpportunities.jsx";
import PostOpportunity from "./components/founder/PostOpportunity";
import Applicants from "./components/founder/Applicants";
import ProtectedRoute from "./components/founder/ProtectedRoute";
import Creator from "./components/creator/Creator.jsx";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsofService /> },
  { path: "/opportunities", element: <Opportunities /> },
  { path: "/opportunity/:id", element: <OpportunityDescription /> },
  { path: "/startups", element: <Startups /> },
  { path: "/startup/:id", element: <StartupProfile /> },
  { path: "/about", element: <Creator /> },

  // Founder/Admin routes
  {
    path: "/founder/startups",
    element: (
      <ProtectedRoute>
        <FounderStartups />
      </ProtectedRoute>
    ),
  },
  {
    path: "/founder/startups/create",
    element: (
      <ProtectedRoute>
        <StartupCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/founder/startups/:id",
    element: (
      <ProtectedRoute>
        <StartupSetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/founder/opportunities",
    element: (
      <ProtectedRoute>
        <FounderOpportunities />
      </ProtectedRoute>
    ),
  },
  {
    path: "/founder/opportunities/create",
    element: (
      <ProtectedRoute>
        <PostOpportunity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/founder/opportunities/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
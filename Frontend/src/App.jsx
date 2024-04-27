import { Routes, Route } from "react-router-dom";
import { AuthLayout, Header } from "./components";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import ListItem from "./pages/ListItem.jsx";
import AllItems from "./pages/AllItems.jsx";
import FoundItem from "./pages/FoundItem.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout authentication>
              <Home />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout authentication={false}>
              <SignupPage />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout authentication={false}>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/list-lost-item"
          element={
            <AuthLayout authentication>
              <ListItem />
            </AuthLayout>
          }
        />
        <Route
          path="/found-item"
          element={
            <AuthLayout authentication>
              <FoundItem />
            </AuthLayout>
          }
        />
        <Route
          path="/all-items"
          element={
            <AuthLayout authentication>
              <AllItems />
            </AuthLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;

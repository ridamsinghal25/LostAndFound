import { Routes, Route } from "react-router-dom";
import { AuthLayout, Header } from "./components";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import AddItem from "./pages/AddItem.jsx";
import FoundItem from "./pages/FoundItem.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import UpdateItem from "./pages/UpdateItem.jsx";

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
          path="/add-item"
          element={
            <AuthLayout authentication>
              <AddItem />
            </AuthLayout>
          }
        />
        <Route
          path="/update-item/:itemId"
          element={
            <AuthLayout authentication>
              <UpdateItem />
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
          path="/setting"
          element={
            <AuthLayout authentication>{/* <FoundItem /> */}</AuthLayout>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;

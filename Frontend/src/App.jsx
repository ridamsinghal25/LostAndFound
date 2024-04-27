import { useEffect, useState } from "react";
import { Header } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./slices/authSlice";
import { Loader } from "./components/index";
import authService from "./api/auth";

function App() {
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      authService
        .getCurrentUser()
        .then((userData) => {
          if (userData) {
            const user = userData.data.data;
            dispatch(login({ user }));
          } else {
            dispatch(logout());
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  return !loading ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  ) : (
    <Loader />
  );
}

export default App;

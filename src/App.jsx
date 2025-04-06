import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Layout from "./components/Layout";
import "./utils/i18n/i18n";
import Game from "./components/Game";
import Works from "./pages/Works";
import { WeakDeviceProvider } from "./hooks/WeakDeviceContext";
import { useDispatch } from "react-redux";
import Login from "./pages/login";
import { useEffect } from "react";
import { fetchUser } from "./store/UserSlice";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFoundPage";
import Comments from "./pages/Comments";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <WeakDeviceProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify/:token" element={<Verify />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/comments"
              element={
                <ProtectedRoute>
                  <Comments />
                </ProtectedRoute>
              }
            />
            {/* Error page */}
            <Route path="/error" element={<ErrorPage />} />
          </Route>
          {/* Pure Routes without Layout */}
          <Route path="/game" element={<Game immortality={false} />} />
          {/* Not found 404 Error page */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </WeakDeviceProvider>
  );
}

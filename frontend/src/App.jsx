import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./routes/AdminRoutes";

import { AuthProvider } from "./context/AuthContext";

import ToastContainer from "./components/toast/ToastContainer";
import ScrollButton from "./components/common/ScrollButton";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />

        <AppRoutes />

        <AdminRoutes />

        <ToastContainer />

        <ScrollButton />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
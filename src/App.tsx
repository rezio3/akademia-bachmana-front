import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { theme } from "./theme";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import { urlRoutes } from "./routes/urlRoutes";
import DashboardPage from "./pages/DashboardPage";
import PlacowkiPage from "./pages/PlacowkiPage";
import AudycjePage from "./pages/AudycjePage";
import PersonsPage from "./pages/PersonsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path={urlRoutes.loginPage} element={<LoginPage />} />
                <Route
                  path={urlRoutes.dashboard}
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardPage />} />
                  <Route path="audycje" element={<AudycjePage />} />
                  <Route path="placowki" element={<PlacowkiPage />} />
                  <Route path="prowadzacy" element={<PersonsPage />} />
                  {/* <Route path="mapy" element={<MapyPage />} /> */}
                </Route>
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;

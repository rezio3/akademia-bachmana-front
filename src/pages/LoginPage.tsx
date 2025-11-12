import { Button, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../components/elements/SectionWrapper";
import HeaderText from "../components/elements/HeaderText";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const handleLogin = async () => {
    loginMutation.mutate(
      { login, password },
      {
        onSuccess: (data) => {
          if (data.success) {
            navigate("/admin");
            window.location.reload();
          }
        },
      }
    );
  };

  return (
    <SectionWrapper
      className="d-flex align-items-center justify-content-center flex-column gap-3 mt-5"
      style={{ minHeight: "100%" }}
    >
      <HeaderText fontSize={36} fontWeight={500} className="mb-4">
        Akademia Bachmana
      </HeaderText>

      <div className="d-flex flex-column gap-3" style={{ minWidth: 300 }}>
        <TextField
          label="Login"
          variant="outlined"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          disabled={loginMutation.isPending}
        />
        <TextField
          label="Hasło"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          disabled={loginMutation.isPending}
        />

        {loginMutation.isError && (
          <Alert severity="error">
            {loginMutation.error.message || "Nieprawidłowy login lub hasło"}
          </Alert>
        )}

        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logowanie..." : "Zaloguj"}
        </Button>
      </div>
    </SectionWrapper>
  );
};

export default LoginPage;

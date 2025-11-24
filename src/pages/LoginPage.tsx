import { Button, TextField, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionWrapper from "../components/elements/SectionWrapper";
import CustomText from "../components/elements/CustomText";
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
  // TO DELETE VVVVVVVVVVVVVVV
  const [showSlowServerInfo, setShowSlowServerInfo] = useState(false);
  useEffect(() => {
    if (loginMutation.isPending) {
      const timer = setTimeout(() => {
        setShowSlowServerInfo(true);
      }, 3000);

      return () => {
        clearTimeout(timer);
        setShowSlowServerInfo(false);
      };
    }
  }, [loginMutation.isPending]);

  return (
    <SectionWrapper
      className="d-flex align-items-center justify-content-center flex-column gap-3 mt-5"
      style={{ minHeight: "100%" }}
    >
      <CustomText fontSize={36} fontWeight={500} className="mb-4 d-flex">
        Akademia Bachmana
        {/* TO DELETE VVVVVVVVVVVVVVVVVVVV */}
        <CustomText fontSize={12} fontWeight={500} className="">
          TEST
        </CustomText>
      </CustomText>

      <div className="d-flex flex-column gap-3" style={{ minWidth: 300 }}>
        <TextField
          label="Login (admin)"
          variant="outlined"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          disabled={loginMutation.isPending}
        />
        <TextField
          label="Hasło (admin123)"
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
      {loginMutation.isPending && showSlowServerInfo && (
        <span>
          Serwer testowy dopiero się budzi. Logowanie może potrwać max 1 min.
        </span>
      )}
    </SectionWrapper>
  );
};

export default LoginPage;

import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { createContext, useCallback, useContext, useState } from "react";

type NotificationContextType = {
  showNotification: (type: AlertColor, message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertColor>("info");

  const showNotification = useCallback((t: AlertColor, msg: string) => {
    setMessage(msg);
    setType(t);
    setOpen(true);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpen(false)} severity={type} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};

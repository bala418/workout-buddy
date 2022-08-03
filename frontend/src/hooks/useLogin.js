import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.message);
      setLoading(false);
    }

    if (response.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };
  return { login, loading, error };
};

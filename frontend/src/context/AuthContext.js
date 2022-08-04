import { useEffect } from "react";
import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    // isAuthenticated: false,
    user: null,
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(user),
      });
    }
  }, []);
  console.log("AuthContextProvider state", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        // ...state,
        // isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        // ...state,
        // isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

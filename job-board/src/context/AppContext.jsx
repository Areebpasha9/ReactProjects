import { createContext, useContext, useEffect, useState } from "react";
import { jobs as staticJobs } from "../data/jobs";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [users, setUsers] = useState(() =>
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const [applications, setApplications] = useState(() =>
    JSON.parse(localStorage.getItem("applications")) || []
  );

  const [jobs] = useState(staticJobs);

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    const existingAdmin = users.find(
      (u) => u.email === "admin@jobboard.com"
    );

    if (!existingAdmin) {
      const admin = {
        id: 999,
        name: "Admin",
        email: "admin@jobboard.com",
        password: "admin123",
        role: "ADMIN",
      };

      const updatedUsers = [...users, admin];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  }, []);

  const register = (name, email, password) => {
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) return false;

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "USER",
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
  };

  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) return false;

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        register,
        login,
        logout,
        jobs,
        applications,
        setApplications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

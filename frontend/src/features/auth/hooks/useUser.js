import { useState, useCallback } from "react";
import Cookies from "js-cookie";
import authApi from "../../../services/authService";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = useCallback(
    async (username, email, password, confirmPassword) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authApi.signup(
          username,
          email,
          password,
          confirmPassword,
        );
        if (response.success) {
          return response;
        } else {
          setError(response.message);
          return response;
        }
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login(email, password);
      if (response.success && response.token) {
        // Store token in cookies (expires in 7 days to match backend)
        Cookies.set("token", response.token, { expires: 7 });
        setToken(response.token);
        setUser(response.user);
        return response;
      } else {
        setError(response.message);
        return response;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const googleSignIn = useCallback(async (googleToken) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.googleSignIn(googleToken);
      if (response.success && response.token) {
        Cookies.set("token", response.token, { expires: 7 });
        setToken(response.token);
        setUser(response.user);
        return response;
      } else {
        setError(response.message);
        return response;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (token) {
        await authApi.logout(token);
      }
      Cookies.remove("token");
      setToken(null);
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  }, [token]);

  const fetchUserData = useCallback(async () => {
    const currentToken = Cookies.get("token");
    if (!currentToken) return null;

    setLoading(true);
    try {
      const response = await authApi.getMe(currentToken);
      if (response.success) {
        setUser(response.user);
        return response.user;
      } else {
        logout();
        return null;
      }
    } catch (err) {
      setError(err.message);
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const updateProfile = useCallback(
    async (profileData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await authApi.updateProfile(token, profileData);
        if (response.success && response.user) {
          setUser(response.user);
          return response;
        } else {
          setError(response.message);
          return response;
        }
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return {
    user,
    setUser,
    token,
    setToken,
    loading,
    error,
    setError,
    signup,
    login,
    googleSignIn,
    logout,
    fetchUserData,
    updateProfile,
    isAuthenticated: !!token,
  };
};

export default useUser;

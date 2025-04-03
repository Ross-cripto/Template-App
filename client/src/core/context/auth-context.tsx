import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCookie, removeCookie, setCookie } from "@/core/lib/utils/cookie";
import type { AuthContextType, User } from "@/core/types/user";

/*
    File to create an authentication context using React's Context API.
    This context provides user authentication status and related functions
    like login and logout to the application.
*/
const USER_COOKIE = "auth_user";
const TOKEN_COOKIE = "auth_token";

// Create a context object for authentication. It can hold the AuthContextType or be undefined.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to easily access the authentication context.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {

        const checkAuthStatus = () => {
            const userCookie = getCookie(USER_COOKIE);
            if (userCookie) {
                try {

                    const parsedUser = JSON.parse(userCookie);
                    setUser(parsedUser);
                    navigate("/dashboard", { replace: true });
                } catch (error) {
                    console.error("Error parsing stored user:", error);
                    // If parsing fails, remove the user and token cookies to ensure a clean state.
                    removeCookie(USER_COOKIE);
                    removeCookie(TOKEN_COOKIE);
                    console.warn("Invalid user cookie found, removed.");
                }
            } else {
            }
            setIsLoading(false);
        };

        checkAuthStatus();

        return () => {
          
        };
    }, []); 

   
    const login = (userData: User, token: string) => {
        setUser(userData);
        setCookie(USER_COOKIE, JSON.stringify(userData), {
            days: 7, 
            secure: window.location.protocol === "https:", 
            sameSite: "strict", 
        });

        // Store the authentication token in a cookie.
        setCookie(TOKEN_COOKIE, token, {
            days: 7,
            secure: window.location.protocol === "https:",
            sameSite: "strict",
        });
    };

    const logout = () => {
        setUser(null);
        removeCookie(USER_COOKIE);
        removeCookie(TOKEN_COOKIE);
        navigate("/users/login", { replace: true });
    };


    const value = {
        user,
        isAuthenticated: !!user, 
        isLoading,
        login,
        logout,
    };


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
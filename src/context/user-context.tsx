"use client";
import { createContext, useContext, useState } from "react";

export interface User {
  id: string;
  name: string;
  initials: string;
  avatar_url: string | null;
  theme: "system" | "light" | "dark";
  notification_preferences: Record<string, any>;
  created_at: string;
  last_login_at: string | null;
  is_onboarded: boolean;
  email: string;
  auth_id: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

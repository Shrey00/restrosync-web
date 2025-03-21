"use client";
import React, { useState, createContext, useEffect } from "react";
import { User } from "@/types";
export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({ user: null, setUser: () => null });
const ContextWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [userState, setUserState] = useState<User | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      // setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const parsedResponse = await response.json();
          setUserState({
            firstName: parsedResponse.data[0].firstName,
            lastName: parsedResponse.data[0].lastName,
            email: parsedResponse.data[0].email,
            role: parsedResponse.data[0].role,
            contact: parsedResponse.data[0].contact,
            token: token,
          });
          // setLoading(false);
        } catch (e) {
          console.log(e);
        }
      } else {
        // router.push("/admin-signin");
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user: userState, setUser: setUserState }}>
      {children}
    </UserContext.Provider>
  );
};
export default ContextWrapper;

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("Stored user:", storedUser);
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user:", parsedUser);
        setUser(parsedUser);
      } catch (e) {
        // console.error("Invalid user data in localStorage:", storedUser);
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setAuthLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useEffect, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser && storedUser !== "undefined") {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (e) {
//         console.error("Invalid user data in localStorage:", storedUser);
//         localStorage.removeItem('user');
//         setUser(null);
//       }
//     } else {
//       setUser(null);
//     }
//     setAuthLoading(false); // ✅ Mark loading complete
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, authLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// Last runnable code
// import { createContext, useContext, useEffect, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser && storedUser !== "undefined") {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (e) {
//         console.error("Invalid user data in localStorage:", storedUser);
//         localStorage.removeItem('user');
//         setUser(null);
//       }
//     } else {
//       setUser(null);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



//------------------------------------------Last Executing Code
// import { createContext, useContext, useEffect, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

// useEffect(() => {
//   const storedUser = localStorage.getItem('user');
//   if (storedUser && storedUser !== "undefined") {
//     try {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//     } catch (e) {
//       console.error("Invalid user data in localStorage:", storedUser);
//       localStorage.removeItem('user');
//       setUser(null);
//     }
//   } else {
//     setUser(null);
//   }
// }, []);


//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);  

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");  
//     console.log(storedUser)
//     if (storedUser && storedUser !== "undefined") {
//       try {
//         const parsedUser = JSON.parse(storedUser);  
//         setUser(parsedUser);
//       } catch (err) {
//         console.error("Invalid user data in localStorage:", storedUser);  
//         localStorage.removeItem("user");
//         setUser(null);
//       }
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>  
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// // AuthContext.js
// import { createContext, useContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // include role, permissions

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);           // User object (id, name, etc.)
  const [token, setToken] = useState(null);         // JWT or access token
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('userToken');

    if (storedUser && storedToken && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (e) {
        console.error("Invalid user data");
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
        setUser(null);
        setToken(null);
      }
    }
    setAuthLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userToken', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout, authLoading }}>
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
//     // console.log("Stored user:", storedUser);
//     if (storedUser && storedUser !== "undefined") {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         // console.log("Parsed user:", parsedUser);
//         setUser(parsedUser);
//       } catch (e) {
//         // console.error("Invalid user data in localStorage:", storedUser);
//         localStorage.removeItem('user');
//         setUser(null);
//       }
//     } else {
//       setUser(null);
//     }
//     setAuthLoading(false);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, authLoading, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

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

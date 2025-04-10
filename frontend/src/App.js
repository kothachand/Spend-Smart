// import React, { useState, useMemo } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import styled from "styled-components";
// import bg from './img/bg.png';
// import { MainLayout } from './styles/Layouts';
// import Orb from './Components/Orb/Orb';
// import Navigation from './Components/Navigation/Navigation';
// import Dashboard from './Components/Dashboard/Dashboard';
// import Income from './Components/Income/Income';
// import Expenses from './Components/Expenses/Expenses';
// import MonthlySummary from './Components/MonthlySummary/MonthlySummary';
// import Login from './Components/Login/Login';
// import Signup from './Components/Signup/Signup';

// // function App() {
// //   const [active, setActive] = useState(1);
// //   const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

// //   const displayData = () => {
// //     switch (active) {
// //       case 1:
// //         return <Dashboard />;
// //       case 2:
// //         return <MonthlySummary />;
// //       case 3:
// //         return <Income />;
// //       case 4:
// //         return <Expenses />;
// //       default:
// //         return <Dashboard />;
// //     }
// //   };

// //   const orbMemo = useMemo(() => {
// //     return <Orb />;
// //   }, []);

// //   return (
// //     <BrowserRouter>
// //       <AppStyled bg={bg} className="App">
// //         <Routes>
// //           {/* Public Routes */}
// //           <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />  


// //           <Route path="/signup" element={<Signup />} />         
         
// //           {isAuthenticated ? ( 
// //             <Route
// //               path="/dashboard"
// //               element={
// //                 <AppStyled bg={bg} className="App">
// //       {orbMemo}
// //       <MainLayout>
// //         <Navigation active={active} setActive={setActive} />
// //         <main>
// //           {displayData()}
// //         </main>
// //       </MainLayout>
// //     </AppStyled>
                
// //               }
// //             />
// //           ) :  (
// //             <Route path="/" element={<Navigate to="/login" />} />
           
// //           )}
// //         </Routes>
// //       </AppStyled>
// //     </BrowserRouter>
// //   );
// // }

// function App() {
//   const [active, setActive] = useState(1);
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

//   const displayData = () => {
//     switch (active) {
//       case 1:
//         return <Dashboard />;
//       case 2:
//         return <MonthlySummary />;
//       case 3:
//         return <Income />;
//       case 4:
//         return <Expenses />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   const orbMemo = useMemo(() => {
//     return <Orb />;
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             isAuthenticated ? (
//               <AppStyled bg={bg} className="App">
//                 {orbMemo}
//                 <MainLayout>
//                   <Navigation active={active} setActive={setActive} />
//                   <main>{displayData()}</main>
//                 </MainLayout>
//               </AppStyled>
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Default Route */}
//         <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// const AppStyled = styled.div`
//   height: 100vh;
//   background-image: url(${props => props.bg});
//   position: relative;
//   main {
//     flex: 1;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     overflow-x: hidden;
//     &::-webkit-scrollbar {
//       width: 0;
//     }
//   }
// `;

// export default App;

import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import MonthlySummary from './Components/MonthlySummary/MonthlySummary';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import LandingPage from './Components/landingpage/landingpage';


function App() {
  const [active, setActive] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load authentication state from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  // Handle login and persist authentication state
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
  };

  // Handle logout and clear authentication state
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <MonthlySummary />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <AppStyled bg={bg} className="App">
                {orbMemo}
                <MainLayout>
                  <Navigation active={active} setActive={setActive} onLogout={handleLogout} />
                  <main>{displayData()}</main>
                </MainLayout>
              </AppStyled>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/landing"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;

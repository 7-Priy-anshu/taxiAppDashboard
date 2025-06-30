import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../pages/Navbar';
import { Outlet } from 'react-router-dom';

export default function Superadmin() {
  const { user } = useAuth();
  return (
      <div className="flex w-full h-screen flex-col">
             <Navbar />
            <div className="flex flex-1 overflow-hidden">
                 {/* Sidebar content */}
                 <aside className="w-64 bg-gray-100">
                     <Sidebar user={user} />
                 </aside>
                 {/* Main content */}
                 <main className="flex-1 bg-gray-50 overflow-y-auto">
                     <Outlet />
                 </main>
             </div>
         </div> 
    // <div>
    //   <Sidebar user={user} />
    //   {/* other components */}
    // </div>
  );
}


// import Navbar from './Navbar';
// import Sidebar from '../components/Sidebar/Sidebar';
// import { Outlet } from 'react-router-dom';

// export default function Superadmin({user}){
//     return (
//         <div className="flex w-full h-screen flex-col">
//             <Navbar />
//             <div className="flex flex-1 overflow-hidden">
//                 {/* Sidebar content */}
//                 <aside className="w-64 bg-gray-100">
//                     <Sidebar user={user}/>
//                 </aside>
//                 {/* Main content */}
//                 <main className="flex-1 bg-gray-50 overflow-y-auto">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>  
//     );
// };


import { Footer } from 'react-day-picker';
import { Outlet } from 'react-router-dom';

function EmployeeLayout() {



//   console.log(user);
  
  // Authenticated normal layout
  return (
    <>
        <>
          {/* <UserNavbar /> */}
          <div className="pb-1">
            <Outlet />
          </div>
          {/* <FloatingChat user={user} /> */}
          <Footer borderColor="#6C63FF" borderSize="true" />
        </>
    </>
  );
}

export default EmployeeLayout
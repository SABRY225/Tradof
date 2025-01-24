import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage,LayoutAuth,Login } from './constants/Path';

function App() {
  const routers = createBrowserRouter([
 
    {
      path: "/",
      element: <LayoutAuth />,
      children: [
        { path: "login", element: <Login /> ,errorElement:<ErrorPage />},
      ],
      errorElement:<ErrorPage />
      
    },
  ]);
  
  return (
    <RouterProvider router={routers} />
  )
}

export default App

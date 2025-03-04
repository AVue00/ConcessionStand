import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Login from './pages/Login.tsx';
import BuyerDashboard from './pages/BuyerDashboard.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/BuyerDashboard',
        element: <BuyerDashboard />
      },
      {
        path: '/menu',
        // element: <MenuPage />
      },
      {
        path: '/orders',
        // element: <Orders />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
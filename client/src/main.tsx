import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        // element: < /> Login
      }, 
      {
        path: '/createUser',
        // element: < /> CreateUser
      },
      {
        path: '/menu',
        // element: < />  MenuPage
      },
      {
        path: '/orders',
        // element: < /> Orders
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

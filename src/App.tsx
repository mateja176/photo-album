import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import ErrorPage from './ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

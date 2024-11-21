import { useRoutes } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductList from './pages/admin/products/ProductList';
import ProductAdd from './pages/admin/products/ProductAdd';
import ProductEdit from './pages/admin/products/ProductEdit';
import CustomerList from './pages/admin/customers/CustomerList';
function App() {
  const element = useRoutes([
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { path: 'products/list', element: <ProductList /> },
        { path: 'products/create-product', element: <ProductAdd /> },
        { path: 'products/update-product/:id', element: <ProductEdit /> },
        { path: 'customers/list', element: <CustomerList /> }
      ]
    },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> }
  ]);
  return element;
}

export default App;

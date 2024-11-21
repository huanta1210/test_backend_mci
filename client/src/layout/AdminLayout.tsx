import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

const AdminLayout = () => {
  const token = localStorage.getItem('token') || '';
  return (
    <div>
      <SideBar />
      <div className="p-4 sm:ml-64">{token ? <Outlet /> : ''}</div>
    </div>
  );
};

export default AdminLayout;

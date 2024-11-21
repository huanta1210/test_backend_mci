import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import instance from '../../../services';
import { toast } from 'react-toastify';
import { Customer } from '../../../interfarce/customers';

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    (async () => {
      const res = await instance.get('/customers');

      if (!res) {
        toast.error('Product mot found');
      }
      setCustomers(res.data);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (confirm('Are you sure you want to delete')) {
        const res = await instance.delete(`/customers/delete-customer/${id}`);

        if (!res) {
          toast.error('Customer mot found');
        }
        toast.success('Customer deleted successfully', { autoClose: 200 });
        setCustomers(customers.filter((customer) => customer._id !== id));
      }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting customer');
    }
  };
  const columns: TableProps<Customer>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleDelete(record._id!)}
            className="border text-red-500 font-semibold text-sm border-red-500 px-2 py-1 rounded"
          >
            Delete
          </button>
        </Space>
      )
    }
  ];
  return (
    <>
      <Table<Customer> columns={columns} dataSource={customers} />
    </>
  );
};

export default CustomerList;

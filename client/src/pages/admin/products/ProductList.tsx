import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { Products } from '../../../interfarce/products';
import { useEffect, useState } from 'react';
import instance from '../../../services';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    (async () => {
      const res = await instance.get('/products');

      if (!res) {
        toast.error('Product mot found');
      }
      setProducts(res.data);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (confirm('Are you sure you want to delete')) {
        const res = await instance.delete(`/products/delete-product/${id}`);

        if (!res) {
          toast.error('Product mot found');
        }
        toast.success('Product deleted successfully', { autoClose: 200 });
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting product');
    }
  };
  const columns: TableProps<Products>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'productName',
      key: 'productName',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img className="size-20" src={image} alt="Product" />
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
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
          <Link
            to={`/admin/products/update-product/${record._id}`}
            className="border text-blue-500 font-semibold text-sm border-blue-500 px-2 py-1 rounded"
          >
            Edit
          </Link>
        </Space>
      )
    }
  ];
  return (
    <>
      <div className="mb-2">
        <Link
          to={'/admin/products/create-product'}
          className="border text-green-500 font-semibold text-sm border-green-500 px-2 py-1 rounded"
        >
          Create Product
        </Link>
      </div>
      <Table<Products> columns={columns} dataSource={products} />
    </>
  );
};

export default ProductList;

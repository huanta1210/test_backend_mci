import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';
import { Products } from '../../../interfarce/products';
import instance from '../../../services';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();
  useEffect(() => {
    (async () => {
      const res = await instance.get(`/products/${id}`);

      if (!res) {
        toast.error('Product mot found');
      }
      form.setFieldsValue(res.data);
    })();
  }, []);
  const onFinish: FormProps<Products>['onFinish'] = async (values) => {
    try {
      const res = await instance.put(`/products/update-product/${id}`, values);

      if (!res) {
        toast.error('Error updated product');
      }
      toast.success('Product updated successfully');
      navigate('/admin/products/list');
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const onFinishFailed: FormProps<Products>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <h1 className="text-3xl ml-60 font-semibold my-6">Update Product</h1>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<Products>
          label="Name"
          name="productName"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<Products>
          label="Price"
          name="price"
          rules={[
            { required: true, message: 'Please input your price!' },

            {
              min: 0,
              type: 'number',
              message: 'Price must be greater than or equal to 1'
            }
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item<Products>
          label="Image"
          name="image"
          rules={[{ required: true, message: 'Please input your image!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<Products> label="Description" name="description">
          <Input />
        </Form.Item>

        <Form.Item<Products>
          label="Quantity"
          name="quantity"
          rules={[
            { required: true, message: 'Please input your quantity"!' },
            {
              min: 1,
              type: 'number',
              message: 'Price must be greater than or equal to 1'
            }
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select your category"!' }]}
        >
          <Select>
            <Select.Option value="Apple">Apple</Select.Option>
            <Select.Option value="Orange">Orange</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item<Products> valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductEdit;

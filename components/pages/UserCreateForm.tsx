"use client";
import { addUser } from "@/api/user";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

export const UserCreateForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (data: any) => {
    setLoading(true)
		try {
			await addUser(data).finally(() => setLoading(false));
			toast.success("Đã thêm", { position: "top-center" });
			form.resetFields();
		} catch (error) {
			toast.error("Lỗi thêm", { position: "top-center" });
        setLoading(false);
		}
	};

	return (
		<div className='h-full justify-center items-center p-4'>
			<div className='flex justify-between'>
				<h2 className='font-extrabold text-2xl uppercase text-center w-full'>Đăng ký</h2>
			</div>
			<Form
				form={form}
				onFinish={onFinish}
				layout='vertical'
				className='flex flex-col gap-4 lg:w-1/3 !m-auto bg-blue-600 !p-10 my-4'>
				{/* ID */}
				<Form.Item
					label={<span className='text-sm text-white font-semibold'>ID</span>}
					name='id'
          rules={[{ required: true, message: "ID là bắt buộc" }]}
        
        >
					<Input
						className='!bg-gray-200 cursor-not-allowed focus:!bg-gray-200 !rounded-sm font-medium !text-black'
						disabled
					/>
				</Form.Item>

				{/* Họ tên */}
				<Form.Item
					label={<span className='text-sm text-white font-semibold'>Họ tên</span>}
					name='name'
					rules={[{ required: true, message: "Họ tên là bắt buộc" }]}>
					<Input className=' font-medium !text-black' />
				</Form.Item>

				{/* Email */}
				<Form.Item
					label={<span className='text-sm text-white font-semibold'>Email</span>}
					name='email'
					rules={[
						{ required: true, message: "Email là bắt buộc" },
						{
							pattern: /^\S+@\S+$/i,
							message: "Email không hợp lệ",
						},
					]}>
					<Input className=' font-medium !text-black' />
				</Form.Item>

				{/* Mobile */}
				<Form.Item
					label={<span className='text-sm text-white font-semibold'>Mobile</span>}
					name='mobile'
					rules={[
						{ required: true, message: "Mobile là bắt buộc" },
						{
							pattern: /^\d{10}$/,
							message: "Mobile phải là 10 số",
						},
					]}>
					<Input className=' font-medium !text-black' />
				</Form.Item>

				{/* Giới tính */}
				<Form.Item
					label={<span className='text-sm text-white font-semibold'>Giới tính</span>}
					name='gender'
					rules={[{ required: true, message: "Giới tính là bắt buộc" }]}>
					<Select className=' font-medium !text-black'>
						<Select.Option value='Nam'>Nam</Select.Option>
						<Select.Option value='Nữ'>Nữ</Select.Option>
					</Select>
				</Form.Item>

				{/* Submit Button */}
				<Form.Item>
					<Button
						loading={loading}
						htmlType='submit'
						className='bg-white/50 w-full ml-auto !text-black hover:!bg-white transition-all duration-150 ease-out rounded-sm'>
						Đăng ký
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

"use client";
import { addUser } from "@/api/user"; // assuming addUser is a function for making API requests
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

export const UserCreateForm = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (data: any) => {
		setLoading(true);
		try {
			await addUser(data).finally(() => setLoading(false));
			toast.success("Đã thêm người dùng", { position: "top-center" });
			form.resetFields(); // Reset the form fields after successful submission
		} catch {
			toast.error("Lỗi thêm người dùng", { position: "top-center" });
			setLoading(false);
		}
	};

	return (
		<div className='h-full justify-center items-center p-4'>
			<div className='flex justify-between'>
				<h2 className='font-extrabold text-2xl uppercase text-center w-full'>Đăng ký người dùng</h2>
			</div>
			<Form
				form={form}
				onFinish={onFinish}
				layout='vertical'
				className='flex  gap-3 lg:w-2/5 !m-auto bg-white border-2 border-black !p-10 my-1'>
				<div>
					{/* Name */}
					<Form.Item
						label={<span className='text-sm flex-1 text-black font-semibold'>Họ tên</span>}
						name='name'
						rules={[{ required: true, message: "Họ tên là bắt buộc" }]}>
						<Input className='font-medium !text-black w-full flex-1 m-auto' />
					</Form.Item>

					{/* Email */}
					<Form.Item
						label={<span className='text-sm flex-1 text-black font-semibold'>Email</span>}
						name='email'
						rules={[
							{ required: true, message: "Email là bắt buộc" },
							{ pattern: /^\S+@\S+$/i, message: "Email không hợp lệ" },
						]}>
						<Input className='font-medium !text-black w-full flex-1 m-auto' />
					</Form.Item>

					{/* Phone Number */}
					<Form.Item
						label={<span className='text-sm flex-1 text-black font-semibold'>Số điện thoại</span>}
						name='phoneNumber'>
						<Input className='font-medium !text-black w-full flex-1 m-auto' />
					</Form.Item>
				</div>

				<div>
					{/* Cupboard */}
					<Form.Item
						label={<span className='text-sm flex-1 text-black font-semibold'>Tủ</span>}
						name='cupboard'>
						<Input className='font-medium !text-black w-full flex-1 m-auto' />
					</Form.Item>

					{/* Fingerprint ID */}
					<Form.Item
						label={<span className='text-sm flex-1 text-black font-semibold'>ID Vân Tay</span>}
						name='fingerprintId'>
						<Input className='font-medium !text-black w-full flex-1 m-auto' />
					</Form.Item>

					{/* Gender */}
					<Form.Item
						label={<span className='text-sm flex-1 text-black font-semibold'>Giới tính</span>}
						name='gender'
						rules={[{ required: true, message: "Giới tính là bắt buộc" }]}>
						<Select className='font-medium !text-black w-full flex-1 m-auto'>
							<Select.Option value='Nam'>Nam</Select.Option>
							<Select.Option value='Nữ'>Nữ</Select.Option>
						</Select>
					</Form.Item>

					{/* Submit Button */}
					<Form.Item>
						<Button
							loading={loading}
							htmlType='submit'
							className='bg-black/50 w-full ml-auto !text-black hover:!text-white hover:!bg-blue-500 transition-all duration-150 ease-out rounded-sm'>
							Đăng ký
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};

"use client";
import { addUser, getFingerprint } from "@/apis/user"; // assuming addUser is a function for making API requests
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

export const UserCreateForm = () => {
	const [form] = Form.useForm();
	const { data: fingerprintData } = useQuery({
		queryKey: ["fingerprint"],
		queryFn: () => getFingerprint(),
		refetchInterval: 1500,
	});
	const [loading, setLoading] = useState(false);

	const onFinish = async (data: any) => {
		setLoading(true);
		try {
			await addUser({ fingerprintId: fingerprintData?.fingerprintId, ...data })
				.then(() => {
					toast.success("Đã thêm người dùng", { position: "top-center" });
				})
				.finally(() => setLoading(false));

			form.resetFields(); 
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
						name='email'>
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

					{/* Fingerprint ID */}
					<div className='flex flex-col mb-6 gap-2 flex-1'>
						<p className='font-medium'>ID vân tay</p>
						<Input
							value={fingerprintData?.fingerprintId}
							disabled
							className='font-medium !text-black w-full m-auto'
						/>
					</div>

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
							className='bg-black/50 w-full ml-auto mt-[30px] !text-black hover:!text-white hover:!bg-blue-500 transition-all duration-150 ease-out rounded-sm'>
							Đăng ký
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};

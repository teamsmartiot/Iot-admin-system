"use client";
import { addUser } from "@/api/user";
import { Button, Input, Select } from "@douyinfe/semi-ui";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const UserCreateForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = async (data: any) => {
		await addUser(data)
			.then(() => {
				toast.success("Đã thêm", { position: "top-center" });
				reset();
			})
			.catch(() => toast.error("Lỗi thêm", { position: "top-center" }));
	};

	return (
		<div className='h-full justify-center items-center p-4'>
			<div className='flex justify-between'>
				<h2 className='font-extrabold text-2xl uppercase text-center w-full'>Đăng ký</h2>
			</div>
			<form
				className='flex flex-col gap-4 lg:w-1/3 m-auto bg-blue-600 p-10 my-4'
				onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        	<h3 className='text-sm text-white font-semibold'>ID</h3>
				<Controller
					name='id'
					control={control}
					rules={{ required: "ID là bắt buộc" }}
					render={({ field }) => (
						<Input
							className='!bg-gray-200 cursor-not-allowed focus:!bg-gray-200 !rounded-sm font-medium !text-black'
              {...field}
              disabled
						/>
					)}
        />
        
				<h3 className='text-sm text-white font-semibold'>Họ tên</h3>
				<Controller
					name='name'
					control={control}
					rules={{ required: "Họ tên là bắt buộc" }}
					render={({ field }) => (
						<Input
							className='!bg-gray-100 focus:!bg-gray-200 !rounded-sm font-medium !text-black'
							{...field}
						/>
					)}
				/>
				{errors.name && <p className='text-red-500 text-sm'>{errors.name.message as string}</p>}

				{/* Email */}
				<h3 className='text-sm text-white font-semibold'>Email</h3>
				<Controller
					name='email'
					control={control}
					rules={{
						required: "Email là bắt buộc",
						pattern: {
							value: /^\S+@\S+$/i,
							message: "Email không hợp lệ",
						},
					}}
					render={({ field }) => (
						<Input
							className='!bg-gray-100 focus:!bg-gray-200 !rounded-sm font-medium !text-black'
							{...field}
						/>
					)}
				/>
				{errors.email && <p className='text-red-500 text-sm'>{errors.email.message as string}</p>}

				{/* Mobile */}
				<h3 className='text-sm text-white font-semibold'>Mobile</h3>
				<Controller
					name='mobile'
					control={control}
					rules={{
						required: "Mobile là bắt buộc",
						pattern: {
							value: /^\d{10}$/,
							message: "Mobile phải là 10 số",
						},
					}}
					render={({ field }) => (
						<Input
							className='!bg-gray-100 focus:!bg-gray-200 !rounded-sm font-medium !text-black'
							{...field}
						/>
					)}
				/>
				{errors.mobile && (
					<p className='text-red-500 text-sm'>{errors.mobile.message as string} </p>
				)}

				{/* Gender */}
				<h3 className='text-sm text-white font-semibold'>Giới tính</h3>
				<Controller
					name='gender'
					control={control}
					rules={{ required: "Giới tính là bắt buộc" }}
					render={({ field }) => (
						<Select
							{...field}
							className='!bg-gray-100 h-8 focus:!bg-gray-200 !rounded-sm font-medium !text-black'>
							<Select.Option className='!bg-white' value='Nam'>
								Nam
							</Select.Option>
							<Select.Option className='!bg-white' value='Nữ'>
								Nữ
							</Select.Option>
						</Select>
					)}
				/>
				{errors.gender && <p className='text-red-500 text-sm'>{errors.gender.message as string}</p>}

			

			

				{/* Submit Button */}
				<Button
					htmlType='submit'
					onClick={onSubmit}
					className='bg-white/50 w-fit ml-auto !text-black hover:!bg-white transition-all duration-150 ease-out rounded-sm'>
					Đăng ký
				</Button>
			</form>
		</div>
	);
};

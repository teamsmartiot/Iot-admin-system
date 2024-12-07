"use client";
import { Button, Input } from "@douyinfe/semi-ui";

export const UserCreateForm = () => {
	return (
		<div className='h-full justify-center items-center p-4'>
			<div className='flex justify-between'>
				<h2 className='font-extrabold text-2xl uppercase text-center w-full'>Đăng ký </h2>
			
			</div>
			<div className='flex flex-col gap-2 w-1/3 m-auto bg-blue-600 p-10 my-4'>
				<h3 className='text-sm text-white font-semibold'>Mã thẻ</h3>
				<Input className='!bg-gray-100  focus:!bg-gray-200 !rounded-sm font-medium !text-black' />
				<h3 className='text-sm text-white font-semibold'>Mã thẻ</h3>
				<Input className='!bg-gray-100  focus:!bg-gray-200 !rounded-sm font-medium !text-black' />
				<h3 className='text-sm text-white font-semibold'>Mã thẻ</h3>
				<Input className='!bg-gray-100  focus:!bg-gray-200 !rounded-sm font-medium !text-black' />
				<h3 className='text-sm text-white font-semibold'>Mã thẻ</h3>
				<Input className='!bg-gray-100  focus:!bg-gray-200 !rounded-sm font-medium !text-black' />
				<h3 className='text-sm text-white font-semibold'>Giới tính</h3>
				<select
					id='gender'
					name='gender'
					className='!bg-gray-100 h-8  focus:!bg-gray-200 !rounded-sm font-medium !text-black'>
					<option value='male'>Nam</option>
					<option value='female'>Nữ</option>
				</select>
				<Button className='bg-white/50 w-fit ml-auto !text-black hover:!bg-white transition-all duration-150 ease-out rounded-sm'>
					Đăng ký
				</Button>
			</div>
		</div>
	);
};

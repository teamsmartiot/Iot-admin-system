"use client";
import { IconLock, IconUnlock } from "@douyinfe/semi-icons";
import { Button } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useState } from "react";
dayjs.locale("vi"); // Thiết lập ngôn ngữ tiếng Việt

export const Home = () => {
	const [openStates, setOpenStates] = useState([false, true, true, true, true, false]);

	// Hàm để thay đổi trạng thái đóng/mở của ô tủ
	const toggleState = (index: number) => {
		const newStates = [...openStates];
		newStates[index] = !newStates[index];
		setOpenStates(newStates);
	};

	return (
		<div className='h-full bg-gradient-to-r from-white via-blue-400 to-white flex justify-center items-center flex-col gap-4 relative'>
			<div className='font-bold text-3xl absolute top-5 text-slate-100'>
				<p> DỰ ÁN KHOA HỌC KỸ THUẬT CẤP TỈNH</p>
			</div>
			<p className='font-medium text-white text-xl uppercase'>Trạng thái các ô tủ</p>
			<div className='grid grid-cols-3 gap-6'>
				{openStates.map((isOpen, index) => (
					<div
						key={index}
						onClick={() => toggleState(index)} // Thêm sự kiện khi click vào ô
						className={`w-36 h-36 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform 
              ${isOpen ? "bg-green-400 scale-105" : "bg-black scale-95"} 
              cursor-pointer flex justify-center items-center`}>
						<span className='text-white text-2xl font-semibold'>
							{isOpen ? <IconUnlock size={"large"} /> : <IconLock size={"large"} />}
						</span>
					</div>
				))}
			</div>
			<div className='flex gap-2'>
				<Button type='primary'>Thuê tủ</Button>
				<Button>Thanh toán</Button>
			</div>
		</div>
	);
};

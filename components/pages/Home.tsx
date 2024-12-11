"use client";
import { getCupboard } from "@/api/cupboard";
import { IconLock, IconUnlock } from "@douyinfe/semi-icons";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi"); // Thiết lập ngôn ngữ tiếng Việt

export const Home = () => {
	const { data: cupboards } = useQuery({
		queryKey: ["cupboards"],
		queryFn: getCupboard,
		refetchInterval: 2000,
	});

	return (
		<div className='h-full bg-gradient-to-r from-white via-blue-400 to-white flex justify-center items-center flex-col gap-4 relative'>
			<div className='font-bold text-3xl absolute top-5 text-slate-100'>
				<p> DỰ ÁN KHOA HỌC KỸ THUẬT CẤP TỈNH</p>
			</div>
			<p className='font-medium text-white text-xl uppercase'>Trạng thái các ô tủ</p>
			<div className='grid grid-cols-3 gap-6'>
				{cupboards?.map((data: any) => (
					<div
						key={data?._id}
						className={`w-36 h-36 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform 
              ${!data?.fingerprintId ? "bg-green-400 scale-105" : "bg-black scale-95"} 
              cursor-pointer flex justify-center items-center`}>
						<span className='text-white text-2xl font-semibold'>
							{!data?.fingerprintId ? <IconUnlock size={"large"} /> : <IconLock size={"large"} />}
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

"use client";
import { fixCupboard, getCupboard, openForceCupboard } from "@/apis/cupboard";
import { IconAlertCircle, IconLock, IconUnlock } from "@douyinfe/semi-icons";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi"); // Thiết lập ngôn ngữ tiếng Việt

export const Home = () => {
	const { data: cupboards } = useQuery({
		queryKey: ["cupboards"],
		queryFn: () => getCupboard(),
		refetchInterval: 2000,
	});

	const handleFire = (id: string) => {
		fixCupboard(id);
	};
	const handOpenCupboard = (id: string) => {
		openForceCupboard(id);
	};

	return (
		<div className='h-full bg-gradient-to-r from-blue-100 via-blue-400 to-blue-500 flex justify-center items-center flex-col gap-4 relative'>
			<div className='font-bold  absolute px-6 top-5 text-center mt-7 text-white drop-shadow-lg uppercase'>
				<p className=' text-3xl'>Trường THPT Hòn Đất </p>
				<p className='text-5xl leading-[50px] my-4'>
					{" "}
					Cuộc thi KHKT cấp tỉnh học sinh trung học năm học 2024-2025
				</p>
				<p className='text-2xl font-semibold'>DỰ ÁN TỦ CHO THUÊ CÔNG CỘNG THÔNG MINH</p>
			</div>
			<p className='font-medium text-white text-xl uppercase mt-4'>Trạng thái các ô tủ</p>
			<div className='grid grid-cols-3 gap-6'>
				{cupboards?.map((data: any) => (
					<div
						key={data?._id}
						onClick={() => {
							if (data?.warning === "FIRE") {
								handleFire(data?.cupboardId);
							}
						}}
						className={`w-36 h-36 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform relative
              ${!data?.fingerprintId ? "bg-green-400 scale-105" : "bg-black scale-95"} 
               ${
									data?.warning === "FIRE" && "!bg-red-500 animate-pulse duration-75 cursor-pointer"
								} 
              cursor-pointer flex justify-center items-center`}>
						<span className='text-white text-2xl font-semibold flex flex-col justify-center items-center gap-2'>
							{!data?.warning &&
								(!data?.fingerprintId ? (
									<IconUnlock size={"large"} />
								) : (
									<IconLock size={"large"} />
								))}
							{data?.warning === "FIRE" && <IconAlertCircle size={"large"} />}
							{data?.warning === "FIRE" && (
								<p className='font-semibold text-sm text-center'> Nhấp vào khi bạn đã xử lý cháy</p>
							)}
						</span>
						{!!data?.fingerprintId && (
							<div className='flex justify-center items-center absolute bottom-2'>
								<Button
									type='dashed'
									className=' z-10 m-auto right-0'
									onClick={() => handOpenCupboard(data?.cupboardId)}>
									Mở khóa
								</Button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

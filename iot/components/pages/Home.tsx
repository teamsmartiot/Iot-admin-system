"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

export const Home = () => {
	const [time, setTime] = useState("");
	const [date, setDate] = useState("");

	// Hàm để cập nhật giờ và ngày sử dụng Day.js
	const updateTime = () => {
		const now = dayjs();
		const formattedTime = now.format("HH:mm:ss"); // Định dạng thời gian (HH:mm:ss)
		const formattedDate = now.format("dddd, D MMMM YYYY"); // Định dạng ngày (Thứ, ngày tháng năm)

		setTime(formattedTime);
		setDate(formattedDate);
	};

	// Cập nhật giờ mỗi giây
	useEffect(() => {
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval); // Dọn dẹp khi component unmount
	}, []);

	return (
		<div className='h-full bg-gradient-to-r from-white via-blue-400 to-blue-600 flex justify-center items-center'>
			<div className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center'>
				<h1 className='text-4xl font-bold text-gray-800 mb-4'>Trường</h1>
				<p className='text-xl text-gray-600 mb-8'>Chào mừng bạn đến với trang chủ của chúng tôi!</p>

				<div className='text-2xl font-mono text-gray-800'>
					<div className='mb-4'>{date}</div>
					<div>{time}</div>
				</div>
			</div>
		</div>
	);
};

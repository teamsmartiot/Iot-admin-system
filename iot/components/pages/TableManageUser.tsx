"use client";
import { getHistory } from "@/api/history";
import { IconLoading } from "@douyinfe/semi-icons";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Button, Table } from "antd";
import { useMemo } from "react";
import * as XLSX from "xlsx";

const columns: Record<string, any>[] = [
	{
		title: "Tên",
		dataIndex: "name",
	},
	{
		title: "Tủ",
		dataIndex: "cabin",
	},
	{
		title: "ID Vân Tay",
		dataIndex: "code",
	},
	{
		title: "Giới tính",
		dataIndex: "gender",
	},
	{
		title: "Email",
		dataIndex: "email",
		width: 240,
	},
	{
		title: "Số điện thoại",
		dataIndex: "mobile",
	},

	{
		title: "Ngày",
		dataIndex: "date",
		render: (value: any) => <>{dayjs(value).format("HH:mm:ss - DD/MM/YYYY")}</>,
	},
	{
		title: "Xóa",
		dataIndex: "action",
		render: () => (
			<div>
				<Button className='bg-red-500 !text-white hover:!bg-red-600 rounded-sm'>Xóa</Button>
			</div>
		),
	},
];

export const TableManageUser = () => {
	const { isPending, data } = useQuery({
		queryKey: ["history"],
		queryFn: async () => await getHistory(),
	});

	const downloadExcel = (data: any) => {
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		//let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
		//XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
		XLSX.writeFile(workbook, "data.xlsx");
	};

	return (
		<div className='h-full flex flex-col gap-2 p-4'>
			<div className='flex justify-between'>
				<h2 className='font-extrabold text-2xl uppercase'>Quản lý người dùng</h2>
				<button
					onClick={() => downloadExcel(data)}
					className='bg-blue-600 w-fit px-2 text-sm font-semibold !text-white ml-auto hover:!bg-blue-800 transition-colors duration-100 ease-in rounded-sm'>
					Export Excel
				</button>
			</div>
			<Table
				loading={isPending}
				className='flex-1'
				columns={columns}
				dataSource={data?.map((item: any) => ({ key: Date.now(), ...item }))}
			/>
		</div>
	);
};

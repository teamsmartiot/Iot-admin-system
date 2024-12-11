"use client";
import { getHistory } from "@/apis/history";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import * as XLSX from "xlsx";

const columns: Record<string, any>[] = [
	{
		title: "ID",
		dataIndex: "_id",
	},
	{
		title: "Tên",
		dataIndex: "name",
	},
	{
		title: "Tủ",
		dataIndex: "cupboard", // Renamed to match the schema field (previously 'cabin')
	},
	{
		title: "ID vân tay",
		dataIndex: "fingerprintId", // Renamed to match the schema field (previously 'code')
	},
	{
		title: "Giới tính",
		dataIndex: "gender",
	},
	{
		title: "Email",
		dataIndex: "email",
	},
	{
		title: "Số điện thoại",
		dataIndex: "phoneNumber", // Renamed to match the schema field (previously 'mobile')
	},
	{
		title: "Ngày Thuê",
		dataIndex: "rentDate", // Renamed to match the schema field (previously 'date' for "Ngày Thuê")
		render: (value: any) => <>{dayjs(value).format("HH:mm:ss - DD/MM/YYYY")}</>,
	},
	{
		title: "Ngày Trả",
		dataIndex: "returnDate", // Renamed to match the schema field (previously 'date' for "Ngày Trả")
		render: (value: any) => <>{dayjs(value).format("HH:mm:ss - DD/MM/YYYY")}</>,
	},
];

export const TableHistory = () => {
	const { isPending, data } = useQuery({
		queryKey: ["history"],
		queryFn: async () => await getHistory(),
	});

	const scroll = useMemo(() => ({ y: "80vh" }), []);

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
				<h2 className='font-extrabold text-2xl uppercase'>Lịch sử</h2>
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
				pagination={{
					pageSize: 8,
				}}
				dataSource={data?.map((item: any) => ({ key: item._id, ...item }))}
				scroll={scroll}
			/>
		</div>
	);
};

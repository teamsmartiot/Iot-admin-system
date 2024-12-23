"use client";
import { clearHistory, getHistory } from "@/apis/history";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Popconfirm, Table } from "antd";
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
	{
		title: "Phí Thuê",
		dataIndex: "rentDate", // Using rentDate to calculate the time difference
		render: (value: any, record: any) => {
			// Calculate the duration between rentDate and returnDate
			const rentDate = dayjs(record.rentDate);
			const returnDate = dayjs(record.returnDate);
			const durationInMinutes = returnDate.diff(rentDate, "minute"); // Duration in minutes

			// Multiply the duration by 1000 VND per minute
			const cost = durationInMinutes * 1000;

			return <>{cost.toLocaleString()} VND</>; // Format the cost with thousands separator
		},
	},
];

export const TableHistory = () => {
	const queryClient = useQueryClient(); // Access the queryClient
	const { isPending, data } = useQuery({
		queryKey: ["history"],
		queryFn: async () => await getHistory(),
	});

	const { mutate } = useMutation({
		mutationKey: ["history"],
		mutationFn: async () => await clearHistory(),
		onSuccess: () => {
			// Sau khi xóa thành công, làm mới dữ liệu của bảng
			queryClient.invalidateQueries({ queryKey: ["history"] });
		},
	});

	const scroll = useMemo(() => ({ y: "80vh" }), []);

	const downloadExcel = (data: any) => {
		// Define the Vietnamese headers for the fields
		const vietnameseHeaders: any = {
			_id: "ID",
			name: "Tên",
			cupboard: "Tủ",
			fingerprintId: "ID Vân Tay",
			gender: "Giới Tính",
			email: "Email",
			phoneNumber: "Số Điện Thoại",
			rentDate: "Ngày Thuê",
			returnDate: "Ngày Trả",
		};

		// Map data to reflect Vietnamese headers and format dates
		const dataWithVietnameseHeaders = data.map((item: any) => {
			const mappedItem: any = {};

			// Iterate through each key of the item and map to Vietnamese headers
			Object.keys(item).forEach((key) => {
				const vietnameseHeader = vietnameseHeaders[key] || key; // Use Vietnamese header or the original key if not found

				if (key === "rentDate" || key === "returnDate") {
					// Format dates using dayjs if the key is rentDate or returnDate
					mappedItem[vietnameseHeader] = dayjs(item[key]).format("DD/MM/YYYY");
				} else {
					mappedItem[vietnameseHeader] = item[key]; // Otherwise, just copy the value
				}
				if (key === "returnDate") {
					mappedItem["Phí Thuê"] = `${(item["rentDate"] && item["returnDate"]
						? dayjs(item["returnDate"]).diff(dayjs(item["rentDate"]), "minute") * 1000
						: 0
					).toLocaleString()} VND`;
				}
			});

			return mappedItem;
		});

		// Create a worksheet from the mapped data
		const worksheet = XLSX.utils.json_to_sheet(dataWithVietnameseHeaders);

		// Create a new workbook and append the worksheet to it
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

		// Write the Excel file
		XLSX.writeFile(workbook, "data.xlsx");
	};

	return (
		<div className='h-full flex flex-col gap-2 p-4'>
			<div className='flex justify-between'>
				<h2 className='font-extrabold text-2xl uppercase'>Lịch sử</h2>
				<div className='flex gap-2'>
					<button
						onClick={() => downloadExcel(data)}
						className='bg-blue-600 w-fit px-2 text-sm font-semibold !text-white ml-auto hover:!bg-blue-800 transition-colors duration-100 ease-in rounded-sm'>
						Export Excel
					</button>
					<Popconfirm
						title='Bạn có chắc chắn muốn xóa tất cả?'
						okText='OK'
						onConfirm={() => mutate()}
						cancelText='Hủy'>
						<button className='bg-red-600 w-fit px-2 text-sm font-semibold !text-white ml-auto hover:!bg-red-800 transition-colors duration-100 ease-in rounded-sm'>
							Xóa tất cả
						</button>
					</Popconfirm>
				</div>
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

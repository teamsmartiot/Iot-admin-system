"use client";
import { clearUser, deleteUser, getUser } from "@/apis/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // Thêm useMutation và useQueryClient
import { Button, Popconfirm, Table } from "antd"; // Thêm Spin để hiển thị loading
import dayjs from "dayjs";
import * as XLSX from "xlsx";

// Columns table

export const TableManageUser = () => {
	const { isPending, data } = useQuery({
		queryKey: ["users"],
		queryFn: async () => await getUser(),
	});

	const queryClient = useQueryClient(); // Access the queryClient
	const mutation = useMutation({
		mutationFn: (userId: string) => deleteUser(userId), // Call deleteUser API
		onSuccess: () => {
			// Sau khi xóa thành công, làm mới dữ liệu của bảng
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	const { mutate } = useMutation({
		mutationKey: ["history"],
		mutationFn: async () => await clearUser(),
		onSuccess: () => {
			// Sau khi xóa thành công, làm mới dữ liệu của bảng
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});


	const downloadExcel = (data: any) => {
		// Vietnamese headers for the schema fields
		const vietnameseHeaders: any = {
			_id: "ID", // MongoDB _id field
			name: "Tên", // Tên người dùng
			fingerprintId: "ID Vân Tay", // ID Vân Tay
			gender: "Giới Tính", // Giới tính
			email: "Email", // Email người dùng
			phoneNumber: "Số Điện Thoại", // Số điện thoại
			registrationDate: "Ngày Đăng Ký", // Ngày đăng ký
		};

		// Map data to reflect Vietnamese headers and format dates
		const dataWithVietnameseHeaders = data.map((item: any) => {
			const mappedItem: any = {};

			// Iterate over each key in the item
			Object.keys(item).forEach((key) => {
				const vietnameseHeader = vietnameseHeaders[key] || key; // Use Vietnamese header or original key

				// Format date fields using dayjs if the key is a date field
				if (key === "registrationDate") {
					mappedItem[vietnameseHeader] = dayjs(item[key]).format("DD/MM/YYYY"); // Format registration date
				} else {
					mappedItem[vietnameseHeader] = item[key]; // Copy other fields as is
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


	// Hàm xử lý xóa người dùng
	const handleDelete = (record: any) => {
		// Cập nhật trạng thái loading cho dòng dữ liệu này
		const updatedData = data?.map((item: any) =>
			item._id === record._id ? { ...item, isLoading: true } : item
		);

		// Gọi API xóa
		mutation.mutate(record._id, {
			onSuccess: () => {
				// Sau khi xóa thành công, làm mới dữ liệu của bảng
				queryClient.invalidateQueries({ queryKey: ["users"] });
			},
			onError: () => {
				// Nếu có lỗi, gỡ bỏ trạng thái loading
				const revertData = updatedData?.map((item: any) =>
					item._id === record._id ? { ...item, isLoading: false } : item
				);
				queryClient.setQueryData(["users"], revertData);
			},
		});

		// Cập nhật lại dữ liệu sau khi gọi xóa
		queryClient.setQueryData(["users"], updatedData);
	};

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
			title: "ID Vân Tay",
			dataIndex: "fingerprintId", // Renamed to match the schema (previously 'code')
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
			dataIndex: "phoneNumber", // Renamed to match the schema (previously 'mobile')
		},
		{
			title: "Ngày đăng ký",
			dataIndex: "registrationDate", // Renamed to match the schema (previously 'date' for "Ngày Thuê")
			render: (value: any) => <>{value && dayjs(value).format("HH:mm:ss - DD/MM/YYYY")}</>,
		},
		{
			title: "Xóa",
			dataIndex: "_id",
			render: (value: string, record: any) => (
				<Button
					className='!bg-red-500 !text-white hover:!bg-red-600 rounded-sm'
					onClick={() => handleDelete(record)} // Truyền dòng dữ liệu vào
					loading={record.isLoading} // Chỉ hiển thị loading cho mục hiện tại
				>
					Xóa
				</Button>
			),
		},
	];

	return (
		<div className='h-full flex flex-col gap-2 p-4'>
			<div className='flex justify-between'>
				<h2 className='font-extrabold text-2xl uppercase'>Quản lý người dùng</h2>
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
			/>
		</div>
	);
};

"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Table, Avatar, Button } from "@douyinfe/semi-ui";
import * as dateFns from "date-fns";
import * as XLSX from "xlsx";

const figmaIconUrl =
	"https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png";
const columns: Record<string, any>[] = [
	{
		title: "Title",
		dataIndex: "name",
		width: 400,

		render: (text: string) => {
			return (
				<div>
					<Avatar
						size='small'
						shape='square'
						src={figmaIconUrl}
						style={{ marginRight: 12 }}></Avatar>
					{text}
				</div>
			);
		},
	},
	{
		title: "Size",
		dataIndex: "size",
		sorter: (a: any, b: any) => (a.size - b.size > 0 ? 1 : -1),
		render: (text: string) => `${text} KB`,
	},
	{
		title: "Owner",
		dataIndex: "owner",
		render: (text: string) => {
			return (
				<div>
					<Avatar size='small' style={{ marginRight: 4 }}>
						{typeof text === "string" && text.slice(0, 1)}
					</Avatar>
					{text}
				</div>
			);
		},
	},
	{
		title: "Update",
		dataIndex: "updateTime",
		sorter: (a: Record<string, any>, b: Record<string, any>) =>
			a.updateTime - b.updateTime > 0 ? 1 : -1,
		render: (value: number) => {
			return dateFns.format(new Date(value), "yyyy-MM-dd");
		},
	},
];

const DAY = 24 * 60 * 60 * 1000;

export const TableHistory = () => {
	const [dataSource, setData] = useState<any>([]);

	const scroll = useMemo(() => ({ y: "80vh" }), []);
	const getData = () => {
		const data = [];
		for (let i = 0; i < 46; i++) {
			const isSemiDesign = i % 2 === 0;
			const randomNumber = (i * 1000) % 199;
			data.push({
				key: "" + i,
				name: isSemiDesign ? `Semi Design design draft${i}.fig` : `Semi D2C design draft${i}.fig`,
				owner: isSemiDesign ? "Jiang Pengzhi" : "Hao Xuan",
				size: randomNumber,
				updateTime: new Date().valueOf() + randomNumber * DAY,
				avatarBg: isSemiDesign ? "grey" : "red",
			});
		}
		return data;
  };
  
  const downloadExcel = (data:any) => {
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		//let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
		//XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
		XLSX.writeFile(workbook, "DataSheet.xlsx");
	};

	useEffect(() => {
		const data = getData();
		setData(data);
	}, []);
	return (
		<div className='h-full flex flex-col gap-2 p-4'>
			<div className='flex justify-between'>
				<h2 className='font-extrabold text-2xl uppercase'>Lịch sử</h2>
				<Button
					onClick={() => downloadExcel(dataSource)}
					type='primary'
					className='bg-blue-600 w-fit !text-white ml-auto hover:!bg-blue-800 transition-colors duration-100 ease-in rounded-sm'>
					Export Excel
				</Button>
			</div>
			<Table className='flex-1' columns={columns} dataSource={dataSource} scroll={scroll} />
		</div>
	);
};

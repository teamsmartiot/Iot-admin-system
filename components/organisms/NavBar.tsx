"use client";
import { IconCommand, IconHistory, IconHome, IconUser } from "@douyinfe/semi-icons";
import { usePathname, useRouter } from "next/navigation";

const navItemClass =
	"hover:bg-white hover:text-black rounded-md transition-colors duration-300 ease-in-out bg-white/10 flex items-center gap-2 p-2 w-[200px] m-2 text-sm font-semibold text-white cursor-pointer"; 
const activeNavItemClass = "!bg-blue-100 !text-black"; // Thêm style active khi cần

const navItems = [
	{
		itemKey: "/",
		text: "Trang chủ",
		icon: <IconHome />,
	},
	{
		itemKey: "/register",
		text: "Đăng ký",
		icon: <IconUser />,
	},
	{
		itemKey: "/manage",
		text: "Quản lý người dùng",
		icon: <IconCommand />,
	},
	{
		itemKey: "/history",
		text: "Lịch sử",
		icon: <IconHistory />,
	},
];

export const NavBar = () => {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<>
			{navItems.map((item) => {
				const props = {
					itemKey: item.itemKey,
					text: item.text,
					icon: item.icon,
					className:
						pathname === item.itemKey ? `${navItemClass} ${activeNavItemClass}` : navItemClass,
				};
				return (
					<div className={props.className} key={item.itemKey} onClick={() => router.push(item.itemKey)}>
						{props.icon}
						<p>{props.text}</p>
					</div>
				);
			})}
		</>
	);
};

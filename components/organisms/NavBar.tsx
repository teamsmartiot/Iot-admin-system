"use client";
import { IconCommand, IconHistory, IconHome, IconUser } from "@douyinfe/semi-icons";
import { Nav } from "@douyinfe/semi-ui";
import { usePathname, useRouter } from "next/navigation";

const navItemClass =
	"hover:bg-white hover:text-black rounded-md transition-colors duration-300 ease-in-out bg-white/10";
const activeNavItemClass = "!bg-blue-100 text-black"; // Thêm style active khi cần

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
	console.log("pathname", pathname);
	return (
		<Nav
			className='text-white'
			items={navItems.map((item) => ({
				itemKey: item.itemKey,
				text: item.text,
				icon: item.icon,
				className:
					pathname === item.itemKey ? `${navItemClass} ${activeNavItemClass}` : navItemClass,
			}))}
			onClick={(data) => {
				if (data.itemKey !== pathname) {
					router.push(data.itemKey as string);
				}
			}}
		/>
	);
};

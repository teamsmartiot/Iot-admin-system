"use client";
import { IconSetting, IconStar, IconUser } from "@douyinfe/semi-icons";
import { Nav } from "@douyinfe/semi-ui";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const router = useRouter()
	return (
		<Nav
			className='text-white '
			items={[
				{
					itemKey: "/",
					text: "Trang chủ",
					icon: <IconUser />,
					className:
						"hover:bg-white hover:text-black rounded-md transition-colors duration-300 ease-in-out bg-white/10",
				},
				{
					itemKey: "manage",
					text: "Quản lý người dùng",
					icon: <IconStar />,
					className:
						"hover:bg-white hover:text-black rounded-md transition-colors duration-300 ease-in-out bg-white/10",
				},
				{
					itemKey: "register",
					text: "Đăng ký",
					icon: <IconSetting />,
					className:
						"hover:bg-white hover:text-black rounded-md transition-colors duration-300 ease-in-out bg-white/10",
				},
				{
					itemKey: "history",
					text: "Lịch sử",
					icon: <IconSetting />,
					className:
						"hover:bg-white hover:text-black rounded-md transition-colors duration-300 ease-in-out bg-white/10",
				},
			]}
			onClick={(data) => router.push(data.itemKey as string)}
		/>
	);
};

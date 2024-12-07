"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "antd";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { NavBar } from "./NavBar";
const queryClient = new QueryClient();
export const LayoutSide = ({ children }: PropsWithChildren) => {
	const { Sider, Content } = Layout;

	return (
		<QueryClientProvider client={queryClient}>
			<Layout className='max-h-dvh h-screen'>
				<Sider width={220}  className='shadow-md !bg-blue-600'>
					<div className='h-36 aspect-square m-auto mt-3 bg-white rounded-full p-2'>
						<Image
							src='https://i.ibb.co/yPd0Rmm/cc43759b3c44861adf55-removebg-preview.png'
							alt='logo'
							width={200}
							height={200}
							unoptimized
						/>
					</div>
					<NavBar />
				</Sider>
				<Content className='h-full bg-svg'>{children}</Content>
			</Layout>
			<Toaster />
		</QueryClientProvider>
	);
};

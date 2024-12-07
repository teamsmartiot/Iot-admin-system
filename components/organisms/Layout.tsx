"use client";
import React, { PropsWithChildren } from "react";
import { NavBar } from "./NavBar";
import { Layout } from "@douyinfe/semi-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocaleProvider } from "@douyinfe/semi-ui";
import vi_VN from "@douyinfe/semi-ui/lib/es/locale/source/vi_VN";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
const queryClient = new QueryClient();
export const LayoutSide = ({ children }: PropsWithChildren) => {
	const { Sider, Content } = Layout;

	return (
		<LocaleProvider locale={vi_VN}>
			<QueryClientProvider client={queryClient}>
				<Layout className='max-h-dvh h-screen'>
					<Sider className='shadow-md bg-blue-600' breakpoint={["md"]}>
            <div className='h-36 aspect-square m-auto mt-3 bg-white rounded-full p-2'>
              <Image src="https://i.ibb.co/yPd0Rmm/cc43759b3c44861adf55-removebg-preview.png" alt="logo" width={200} height={200} unoptimized/>
            </div>
						<NavBar />
					</Sider>
					<Content className='h-full bg-svg'>{children}</Content>
				</Layout>
				<Toaster />
			</QueryClientProvider>
		</LocaleProvider>
	);
};

"use client";
import React, { PropsWithChildren } from "react";
import { NavBar } from "./NavBar";
import { Layout } from "@douyinfe/semi-ui";

export const LayoutSide = ({ children }: PropsWithChildren) => {
	const { Sider, Content } = Layout;

	return (
		<Layout className='max-h-dvh h-screen'>
      <Sider className="shadow-md bg-blue-600" breakpoint={["md"]}>
        <div className="h-36 aspect-square m-auto mt-3 bg-white">
          
        </div>
				<NavBar />
			</Sider>
			<Content className="h-full ">{children}</Content>
		</Layout>
	);
};

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý DELETE request: Xóa người dùng
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id;
		if (!id) {
			return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
		}
		const deletedUser = await User.findByIdAndDelete({ _id: id });
		return NextResponse.json(deletedUser, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

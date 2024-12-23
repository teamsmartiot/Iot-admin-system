import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý DELETE request: Xóa tất cả người dùng
export async function DELETE() {
	try {
		// Xóa tất cả người dùng trong bảng User
		const deletedUsers = await User.deleteMany({}); // Filter empty, which means all users
		return NextResponse.json({ deletedCount: deletedUsers.deletedCount }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

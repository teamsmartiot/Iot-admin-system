import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import History from "@/models/History";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý DELETE request: Xóa tất cả người dùng
export async function DELETE() {
	try {
		// Xóa tất cả người dùng trong bảng History
		const deletedHistorys = await History.deleteMany({}); // Filter empty, which means all Historys
		return NextResponse.json({ deletedCount: deletedHistorys.deletedCount }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

import connectToDatabase from "@/lib/mongodb";
import CupBoard from "@/models/CupBoard";
import User from "@/models/User";
import { NextResponse } from "next/server";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách người dùng
export async function GET(
	req: Request,
	{ params }: { params: Promise<{ fingerprintId: string }> }
) {
	try {
		const fingerprintId = (await params)?.fingerprintId;
		const user = await User.findOne({ fingerprintId });
		console.log("user", user);
		const cupboard = await CupBoard.findOne({ fingerprintId });
		return NextResponse.json(
			{ uid: user._id, cupboard: cupboard?.cupboardId, password: cupboard?.password },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
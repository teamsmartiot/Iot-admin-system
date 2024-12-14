import connectToDatabase from "@/lib/mongodb";
import CupBoard from "@/models/CupBoard";
import { NextResponse } from "next/server";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách người dùng
export async function GET() {
	try {
		const CupBoards = await CupBoard.find();
		const cupboardSort = CupBoards.sort((a, b) => a.cupboardId - b.cupboardId);
		return NextResponse.json(
			{
				cupboard1: cupboardSort[0]?.fingerprintId,
				cupboard2: cupboardSort[1]?.fingerprintId,
				cupboard3: cupboardSort[2]?.fingerprintId,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

import connectToDatabase from "@/lib/mongodb";
import CupBoard from "@/models/CupBoard";
import { NextResponse } from "next/server";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách người dùng
export async function GET() {
	try {
		const cupBoards = await CupBoard.find();
		return NextResponse.json(
			{
				fingerprintId1: cupBoards[0]?.fingerprintId,
				fingerprintId2: cupBoards[1]?.fingerprintId,
				fingerprintId3: cupBoards[2]?.fingerprintId,
				warning1: cupBoards[0]?.warning,
				warning2: cupBoards[1]?.warning,
				warning3: cupBoards[2]?.warning,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

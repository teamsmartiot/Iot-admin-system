import connectToDatabase from "@/lib/mongodb";
import CupBoard from "@/models/CupBoard";
import { NextResponse } from "next/server";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách người dùng

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params)?.id;
		const cupBoard = await CupBoard.findOneAndUpdate(
			{ cupboardId: id },
			{
				fingerprintId: "",
			}
		);

		return NextResponse.json(cupBoard, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

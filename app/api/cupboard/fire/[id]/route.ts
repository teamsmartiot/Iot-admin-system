import connectToDatabase from "@/lib/mongodb";
import CupBoard from "@/models/CupBoard";
import { NextResponse } from "next/server";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý DELETE request: Xóa người dùng
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id;
		if (!id) {
			return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
		}
		const cup = await CupBoard.findOneAndUpdate({ cupboardId: id }, { warning: "FIRE" });
		return NextResponse.json(cup, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Xử lý DELETE request: Xóa người dùng
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = (await params).id;
		if (!id) {
			return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
		}
		const cup = await CupBoard.findOneAndUpdate({ cupboardId: id }, { warning: "" });
		return NextResponse.json(cup, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

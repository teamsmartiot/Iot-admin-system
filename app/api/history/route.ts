import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import History from "@/models/History";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách người dùng
export async function GET() {
	try {
		const Histories = await History.find();
		return NextResponse.json(Histories, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Xử lý POST request: Thêm người dùng mới
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const newHistory = await History.create(body);
		return NextResponse.json(newHistory, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

// Xử lý PUT request: Cập nhật thông tin người dùng
export async function PUT(req: Request) {
	try {
		const body = await req.json();
		const { id, ...updateData } = body;
		const updatedHistory = await History.findByIdAndUpdate(id, updateData, { new: true });
		return NextResponse.json(updatedHistory, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

// Xử lý DELETE request: Xóa người dùng
export async function DELETE(req: Request) {
	try {
		const url = new URL(req.url);
		const id = url.searchParams.get("id");
		if (!id) {
			return NextResponse.json({ error: "Missing History ID" }, { status: 400 });
		}
		const deletedHistory = await History.findByIdAndDelete(id);
		return NextResponse.json(deletedHistory, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

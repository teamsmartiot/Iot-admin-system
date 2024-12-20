import connectToDatabase from "@/lib/mongodb";
import CupBoard from "@/models/CupBoard";
import History from "@/models/History";
import User from "@/models/User";
import { NextResponse } from "next/server";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách người dùng
export async function GET() {
	try {
		const CupBoards = await CupBoard.find();
		return NextResponse.json(CupBoards, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Xử lý POST request: Thêm người dùng mới
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const newCupBoard = await CupBoard.create(body);
		return NextResponse.json(newCupBoard, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

// Xử lý PUT request: Cập nhật thông tin người dùng
export async function PUT(req: Request) {
	try {
		const body = await req.json();
		const { uuid, cupboardId, ...updateData } = body; // Destructure cupboardId and leave the rest for updateData

		const user = await User.findOne({ _id: uuid });
		// Use findOneAndUpdate to find by cupboardId instead of _id
		const updatedCupBoard = await CupBoard.findOneAndUpdate(
			{ cupboardId }, // Find the cupboard by cupboardId
			updateData, // Data to update
			{ new: true } // Return the updated document
		);
		if(updatedCupBoard.fingerprintId)
		{
			await History.create({
				name: user.name, // Tên
				cupboard: cupboardId, // Tủ
				fingerprintId: updatedCupBoard.fingerprintId, // ID vân tay
				gender: user.gender, // Giới tính
				email: user.email, // Email
				phoneNumber: user.phoneNumber, // Số điện thoại
				rentDate: new Date(), // Ngày Thuê
				returnDate: "", // Ngày Trả
			});
		}

		return NextResponse.json(updatedCupBoard, { status: 200 });
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
			return NextResponse.json({ error: "Missing CupBoard ID" }, { status: 400 });
		}
		const deletedCupBoard = await CupBoard.findByIdAndDelete(id);
		return NextResponse.json(deletedCupBoard, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

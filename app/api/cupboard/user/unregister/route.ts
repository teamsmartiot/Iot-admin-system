import connectToDatabase from "@/lib/mongodb";
import CupBoard from "@/models/CupBoard";
import History from "@/models/History";
import User from "@/models/User";
import { NextResponse } from "next/server";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách người dùng

// Xử lý POST request: Thêm người dùng mới
export async function PUT(req: Request) {
	try {
		const body = await req.json();

		const id = body.id;
		const cupboard = body.cupboard;

		const user = await User.findOne({ _id: id });

		const cupboardRecord = await CupBoard.findOneAndUpdate(
			{ fingerprintId: user.fingerprintId, cupboardId: cupboard },
			{ fingerprintId: "" },
			{ new: true }
		);
		const newHistory = await History.findOneAndUpdate(
			{ fingerprintId: user.fingerprintId, cupboardId: cupboard },
			{ returnDate: new Date() },
			{ new: true }
		);
		await cupboardRecord.save();
		await newHistory.save();

		return NextResponse.json({}, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

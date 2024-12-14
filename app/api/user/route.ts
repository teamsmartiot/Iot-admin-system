import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Fingerprint from "@/models/Fingerprint";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách người dùng
export async function GET() {
	try {
		const users = await User.find();
		return NextResponse.json(users, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Xử lý POST request: Thêm người dùng mới
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const newUser = await User.create(body);
		const Fingerprints = await Fingerprint.find();
		// Destructure FingerprintId and leave the rest for updateData

		// Use findOneAndUpdate to find by FingerprintId instead of _id
		await Fingerprint.findOneAndUpdate(
			{ _id: Fingerprints[0]._id }, // Find the Fingerprint by FingerprintId
			{ fingerprintId: "" }, // Data to update
			{ new: true } // Return the updated document
		);
		return NextResponse.json(newUser, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

// Xử lý PUT request: Cập nhật thông tin người dùng
export async function PUT(req: Request) {
	try {
		const body = await req.json();
		const { id, ...updateData } = body;
		const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

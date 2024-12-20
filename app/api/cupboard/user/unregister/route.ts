import connectToDatabase from "@/lib/mongodb";
import CupBoard from "@/models/CupBoard";
import History from "@/models/History";
import User from "@/models/User";
import dayjs from "dayjs";
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

		await CupBoard.findOneAndUpdate(
			{ fingerprintId: user.fingerprintId, cupboardId: cupboard },
			{ fingerprintId: "", password: "" }
		);
		const historyUpdated = await History.findOneAndUpdate(
			{ fingerprintId: user.fingerprintId, cupboard: cupboard },
			{ returnDate: new Date() },
			{ new: true } // Ensure that the updated document is returned
		  );
		  
		  // Check if the rentDate and returnDate are available
		  if (historyUpdated && historyUpdated.rentDate) {
			const rentDate = dayjs(historyUpdated.rentDate);
			const returnDate = dayjs(historyUpdated.returnDate);
		  
			// Calculate the duration in minutes
			const durationInMinutes = returnDate.diff(rentDate, 'minute'); // Using dayjs .diff() to calculate the difference in minutes
		
			// Calculate the cost (1,000 VND per minute)
			const cost = durationInMinutes * 1000;
		  
			// Return the cost along with other relevant data in the response
			return NextResponse.json({ cost: cost.toLocaleString()+"VND" }, { status: 201 });
		}
		return NextResponse.json({ cost: 0 }, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

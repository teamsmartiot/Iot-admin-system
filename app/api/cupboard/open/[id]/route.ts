import connectToDatabase from "@/lib/mongodb";
import CupBoard from "@/models/CupBoard";
import History from "@/models/History";
import User from "@/models/User";
import { NextResponse } from "next/server";

// Kết nối với MongoDB
connectToDatabase();

// Xử lý GET request: Lấy danh sách người dùng

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params)?.id;

    const user = await User.findOne({ cupboard: id });

    const cupboard = await CupBoard.findOneAndUpdate(
      { cupboardId: id },
      { fingerprintId: "", password: "" }
    );

    const historyUpdated = await History.findOneAndUpdate(
      { fingerprintId: user.fingerprintId, cupboard: cupboard.cupboardId, email: user.email },
      { returnDate: new Date() },
      { new: true } // Ensure that the updated document is returned
    );

    return NextResponse.json(historyUpdated, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

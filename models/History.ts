import { Schema, model, models } from "mongoose";

const HistorySchema = new Schema(
	{
		name: { type: String, required: true }, // Tên
		cupboard: { type: String }, // Tủ
		fingerprintId: { type: String }, // ID vân tay
		gender: { type: String }, // Giới tính
		email: { type: String, required: true }, // Email
		phoneNumber: { type: String }, // Số điện thoại
		rentDate: { type: Date }, // Ngày Thuê
		returnDate: { type: Date }, // Ngày Trả
	},
	{ timestamps: true }
);

const History = models.History || model("History", HistorySchema);

export default History;

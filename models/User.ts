import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		cupboard: { type: String }, // Tủ (optional)
		fingerprintId: { type: String }, // ID Vân Tay (optional)
		gender: { type: String }, // Giới tính (optional)
		email: { type: String, required: true },
		phoneNumber: { type: String }, // Số điện thoại (optional)
		registrationDate: { type: Date, default: Date.now }, // Ngày đăng ký (optional)
		password: { type: String },
	},
	{ timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;

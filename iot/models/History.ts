import { Schema, model, models } from "mongoose";

const HistorySchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

const History = models.History || model("History", HistorySchema);

export default History;

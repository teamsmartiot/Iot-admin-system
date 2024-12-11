import { Schema, model, models } from "mongoose";

const CupBoardSchema = new Schema(
	{
		cupboardId: { type: String, required: true }, // Tủ (optional)
		fingerprintId: { type: String }, // ID Vân Tay (optional)
	},
	{ timestamps: true }
);

const CupBoard = models.CupBoard || model("CupBoard", CupBoardSchema);

export default CupBoard;

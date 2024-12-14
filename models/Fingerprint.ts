import { Schema, model, models } from "mongoose";

const FingerprintSchema = new Schema(
	{
		fingerprintId: { type: String }, // ID Vân Tay (optional)
	},
	{ timestamps: true }
);

const Fingerprint = models.Fingerprint || model("Fingerprint", FingerprintSchema);

export default Fingerprint;

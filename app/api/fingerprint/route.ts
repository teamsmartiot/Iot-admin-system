import connectToDatabase from "@/lib/mongodb";
import Fingerprint from "@/models/Fingerprint";
import { NextResponse } from "next/server";

// Kết nối với MongoDB
connectToDatabase();

export async function GET() {
	try {
		const Fingerprints = await Fingerprint.find();
		return NextResponse.json(
			{
				fingerprintId: Fingerprints[0].fingerprintId,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function PUT(req: Request) {
	try {
		const body = await req.json();
		const Fingerprints = await Fingerprint.find();
		// Destructure FingerprintId and leave the rest for updateData

		// Use findOneAndUpdate to find by FingerprintId instead of _id
		const updatedFingerprint = await Fingerprint.findOneAndUpdate(
			{ _id: Fingerprints[0]._id }, // Find the Fingerprint by FingerprintId
			{ fingerprintId: body?.fingerprintId }, // Data to update
			{ new: true } // Return the updated document
		);

		return NextResponse.json(updatedFingerprint, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const newFingerprint = await Fingerprint.create(body);
		return NextResponse.json(newFingerprint, { status: 201 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

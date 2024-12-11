"use server";

export const getCupboard = async () => {
	const res = await fetch(process.env.URL + "/api/cupboard", { method: "GET" });
	const result = await res.json();

	return result;
};

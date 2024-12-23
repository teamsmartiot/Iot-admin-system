"use server";
export const getHistory = async () => {
	const res = await fetch(process.env.URL + "/api/history", { method: "GET" });
	const result = await res.json();

	return result;
};


export const clearHistory = async () => {
	const res = await fetch(process.env.URL + "/api/history/clear", { method: "DELETE" });
	const result = await res.json();

	return result;
};
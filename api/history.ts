"use server";
export const getHistory = async () => {
	const res = await fetch(process.env.URL+"/api/user", { method: "GET" });
	const result = await res.json();
	console.log("Fetched data: ", result);
	return result;
};

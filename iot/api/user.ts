"use server";
export const addUser = async (data: any) => {
	const res = await fetch(process.env.URL + "/api/user", {
		method: "POST",
		body: JSON.stringify(data),
	});
	const result = await res.json();
	console.log("Fetched data: ", result);
	return result;
};

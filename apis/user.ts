"use server";
export const addUser = async (data: any) => {
	const res = await fetch(process.env.URL + "/api/user", {
		method: "POST",
		body: JSON.stringify(data),
	});
	const result = await res.json();
	return result;
};

export const getUser = async () => {
	const res = await fetch(process.env.URL + "/api/user", { method: "GET" });
	const result = await res.json();

	return result;
};
export const getFingerprint = async () => {
	const res = await fetch(process.env.URL + "/api/fingerprint", {
		method: "GET",
	});
	const result = await res.json();

	return result;
};

export const deleteUser = async (userId: string) => {
	const response = await fetch(process.env.URL + `/api/user/${userId}`, {
		method: "DELETE",
	});
	if (!response.ok) {
		throw new Error("Failed to delete user");
	}
	return response.json();
};
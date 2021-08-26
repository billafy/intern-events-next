export const reqPost = async (url, body = {}) => {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
		credentials: "include",
	});
	const data = await response.json();
	return data;
};

export const reqDelete = async (url) => {
	const response = await fetch(url, {
		method: "DELETE",
		credentials: "include",
	});
	const data = await response.json();
	return data;
};

export const reqGet = async (url) => {
	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
	});
	const data = await response.json();
	return data;
};

export const reqPost = async (url, body = {}, contentType = 'application/json') => {
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": contentType,
		},
		body: JSON.stringify(body),
		credentials: "include",
	});
	const data = await response.json();
	return data;
};

export const reqPut = async (url, body = {}) => {
	const response = await fetch(url, {
		method: "PUT",
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

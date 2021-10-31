export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getImage = (imageName) => {
	if(!imageName || imageName === 'default.png') 
		return 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
	return `${process.env.NEXT_PUBLIC_API}profilePictures/${imageName}`
}

export const getResume = (resumeName) => {
	return `${process.env.NEXT_PUBLIC_API}resumes/${resumeName}`
}

export const getPost = (postName) => {
	return `${process.env.NEXT_PUBLIC_API}posts/${postName}`
}

export const getName = (account) => {
	return account.details.name || `${account.details.firstName} ${account.details.lastName}`;
}
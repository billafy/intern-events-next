export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const imageKitUrl = process.env.NEXT_PUBLIC_IMAGE_KIT_URL;

export const getImage = (imageName) => {
	if(!imageName || imageName === 'default.png') 
		return 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
	return imageKitUrl + imageName;
}

export const getResume = (resumeName) => {
	if(!resumeName) 
		return '#';
	return imageKitUrl + resumeName;
}

export const getPost = (postName) => {
	return imageKitUrl + postName;
}

export const getName = (account) => {
	return account.details.name || `${account.details.firstName} ${account.details.lastName}`;
}
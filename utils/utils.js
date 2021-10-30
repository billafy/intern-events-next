export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getImage = (imageName) => {
	if(imageName === 'default.png') 
		return 'https://www.pinclipart.com/picdir/middle/157-1578186_user-profile-default-image-png-clipart.png';
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
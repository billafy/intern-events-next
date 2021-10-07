export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getImage = (imageName) => {
	return `${process.env.NEXT_PUBLIC_API}profilePictures/${imageName}`
}

export const getResume = (resumeName) => {
	return `${process.env.NEXT_PUBLIC_API}resumes/${resumeName}`
}
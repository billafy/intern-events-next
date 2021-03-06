const domain = process.env.NEXT_PUBLIC_API;

const urls = {
	login: domain + "auth/login/",
	createStudentAccount: domain + "auth/createStudentAccount/",
	createCollegeAccount: domain + "auth/createCollegeAccount/",
	createCompanyAccount: domain + "auth/createCompanyAccount/",
	refresh: domain + "auth/refresh/",
	logout: domain + "auth/logout/",
	uploadProfilePicture: domain + "accounts/uploadProfilePicture/",
	uploadResume: domain + "accounts/uploadResume/",
	updateAccount: domain + "accounts/updateAccount/",
	searchAccounts: domain + "accounts/searchAccounts/",
	getAccount: domain + "accounts/getAccount/",
	createPost: domain + "social/createPost/",
	getTimeline: domain + "social/getTimeline/",
	likePost: domain + "social/likePost/",
	followAccount: domain + "social/followAccount/",
	getPosts: domain + "social/getPosts/",
	commentPost: domain + "social/commentPost/",
	deleteComment: domain + "social/deleteComment/",
	deletePost: domain + "social/deletePost/",
	getInternships: domain + "internships/getInternships/",
	getInternship: domain + "internships/getInternship/",
	createInternship: domain + "internships/createInternship/",
	getCompanyInternships: domain + "internships/getCompanyInternships/",
	applyInternship: domain + "internships/applyInternship/",
	updateApplicationStatus: domain + "internships/updateApplicationStatus/",
	myAppliedInternships: domain + "internships/myAppliedInternships/",
	getChats: domain + "social/getChats/",
	socket: domain,
};

export default urls;

const domain = process.env.NEXT_PUBLIC_API;

const urls = {
	login: domain + "accounts/login/",
	createStudentAccount: domain + "accounts/createStudentAccount/",
	createCollegeAccount: domain + "accounts/createCollegeAccount/",
	createCompanyAccount: domain + "accounts/createCompanyAccount/",
	refresh: domain + "accounts/refresh/",
	logout: domain + "accounts/logout/",
	uploadProfilePicture: domain + 'accounts/uploadProfilePicture/',
	uploadResume: domain + 'accounts/uploadResume/',
	updateAccount: domain + 'accounts/updateAccount/',
	searchAccounts: domain + 'accounts/searchAccounts/',
	getAccountIds: domain + 'accounts/getAccountIds',
	getAccount: domain + 'accounts/getAccount/',
	createPost: domain + 'social/createPost/',
	getTimeline: domain + 'social/getTimeline/',
	likePost: domain + 'social/likePost/',
	followAccount: domain + 'social/followAccount/',
	getPosts: domain + 'social/getPosts/',
	commentPost: domain + 'social/commentPost/',
	deleteComment : domain + 'social/deleteComment/',
	deletePost: domain + 'social/deletePost/',
	createInternship: domain + 'internships/createInternship/'
};

export default urls;

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
	updateAccount: domain + 'accounts/updateAccount/'
};

export default urls;

export const loginFields = [
	{
		title: "Email Address",
		image: "/icons/mail.png",
		type: "email",
		required: true,
		name: "loginEmail",
	},
	{
		title: "Password",
		image: "/icons/pwd.png",
		type: "password",
		required: true,
		name: "loginPassword",
	},
];

export const signupFields = [
	{
		title: "Email Address",
		image: "/icons/mail.png",
		type: "email",
		required: true,
		name: "signupEmail",
	},
	{
		title: "Contact Number",
		image: "/icons/phone.png",
		type: "number",
		required: true,
		name: "contactNumber",
	},
	{
		title: "Password",
		image: "/icons/pwd.png",
		type: "password",
		required: true,
		name: "signupPassword",
	},
	{
		title: "Confirm Password",
		image: "/icons/pwd.png",
		type: "password",
		required: true,
		name: "signupConfirmPassword",
	},
];

export const studentFields = [
	{
		title: "First Name",
		image: "/icons/user.png",
		type: "text",
		required: true,
		name: "firstName",
	},
	{
		title: "Last Name",
		image: "/icons/user.png",
		type: "text",
		required: true,
		name: "lastName",
	},
	{
		title: "Date of Birth",
		image: "/icons/dob.png",
		type: "date",
		required: true,
		name: "dateOfBirth",
	},
	{
		title: "Gender",
		image: "/icons/gender.png",
		type: "select",
		options: ["Male", "Female"],
		required: true,
		name: "gender",
	},
	{
		title: "College",
		image: "/icons/university.png",
		type: "text",
		required: true,
		name: "college",
	},
	{
		title: "Course",
		image: "/icons/course.png",
		type: "text",
		required: true,
		name: "course",
	},
	{
		title: "Year of Studying",
		image: "/icons/name.png",
		type: "text",
		required: true,
		name: "yearOfStudying",
	},
];

export const collegeFields = [
	{
		title: "College Name",
		image: "/icons/university.png",
		type: "text",
		required: true,
		name: "collegeName",
	},
	{
		title: "University",
		image: "/icons/institute.png",
		type: "text",
		required: true,
		name: "university",
	},
	{
		title: "Address",
		image: "/icons/name.png",
		type: "text",
		required: true,
		name: "collegeAddress",
	},
];

export const companyFields = [
	{
		title: "Company Name",
		image: "/icons/company.png",
		type: "text",
		required: true,
		name: "companyName",
	},
	{
		title: "Address",
		image: "/icons/name.png",
		type: "text",
		required: true,
		name: "companyAddress",
	},
];

export const defaultInputs = {
	loginEmail: "",
	signupEmail: "",
	loginPassword: "",
	signupPassword: "",
	signupConfirmPassword: "",
	contactNumber: "",
	firstName: "",
	lastName: "",
	dateOfBirth: "",
	gender: "Male",
	college: "",
	course: "",
	yearOfStudying: "",
	collegeName: "",
	companyName: "",
	collegeAddress: "",
	companyAdresss: "",
	university: "",
};

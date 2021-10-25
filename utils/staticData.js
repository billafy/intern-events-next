import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
	FaGithub,
} from "react-icons/fa";

export const navLinks = [
	{
		text: "Internships",
		href: "/",
		subLinks: [
			{
				text: 'Create Internship',
				href: '/internships/createInternship',
				accountType: 'company',
			},
			{
				text: 'Review Internship Applications',
				href: '/internships/createdInternships',
				accountType: 'company',
			},
			{
				text: "Search Internships",
				href: "/",
			},
			{
				text: "Applied Internships",
				href: "/",
				accountType: 'student',
			},
		],
	},
	{
		text: "Events",
		href: "/",
		subLinks: [
			{
				text: "Search Events",
				href: "/",
			},
			{
				text: "Applied Events",
				href: "/",
				accountType: 'student',
			},
		],
	},
	{
		text: "Social",
		href: "/",
		subLinks: [
			{
				text: "Timeline",
				href: "/social/timeline",
			},
			{
				text: 'Find People',
				href: '/social/findPeople',
			},
			{
				text: "Create a Post",
				href: "/social/createPost",
			},
		],
	},
];

export const features = [
	{
		id: 1,
		title: "Interaction",
		text:
			"An interaction is always necessary to clearly convey your thoughts. Intern.ly provides a direct interaction between students and representatives of top institutions without any intermediaries.",
		image: "/illustrations/illustration3.png",
	},
	{
		id: 2,
		title: "Events",
		text:
			"Are you missing out important events? then join us as Intern.ly will update and notify you about events such as internships, workshops, coding competition, and many more that would be posted by top institutions.",
		image: "/illustrations/illustration4.png",
	},
	{
		id: 3,
		title: "Idea Hub",
		text:
			"Shape your ideas into reality with Intern.ly. Share and discuss your ideas with everyone as well as on custom chat space with Intern.ly's idea Hub programme. Connect with the people of same ideology. Connect with the world!",
		image: "/illustrations/illustration5.png",
	},
	{
		id: 4,
		title: "Skill Points",
		text:
			"Rewards really amaze everyone, don't they? Yes, skills points will be rewarded to you after completion of events and internships. These points will determine your rank as a professional and also will prioritize you on the list of your fellow competitors for an internship. Earn more and more skill points and raise your chance of being selected.",
		image: "/illustrations/illustration6.png",
	},
];

export const footerLinks = [
	{
		id: 1,
		heading: "Company",
		links: [
			{
				id: 1,
				text: "About Us",
				href: "",
			},
			{
				id: 2,
				text: "Other Services",
				href: "",
			},
			{
				id: 3,
				text: "Credits",
				href: "",
			},
		],
	},
	{
		id: 2,
		heading: "Get Help",
		links: [
			{
				id: 1,
				text: "FAQ",
				href: "",
			},
			{
				id: 2,
				text: "Privacy Policy",
				href: "",
			},
			{
				id: 3,
				text: "Terms and Conditions",
				href: "",
			},
		],
	},
];

export const socialLinks = [
	{
		id: 1,
		icon: <FaFacebook />,
		color: "#0353a4",
		href: "",
	},
	{
		id: 2,
		icon: <FaTwitter />,
		color: "#00b4d8",
		href: "",
	},
	{
		id: 3,
		icon: <FaInstagram />,
		color: "#e1306c",
		href: "",
	},
	{
		id: 4,
		icon: <FaLinkedin />,
		color: "#006192",
		href: "",
	},
	{
		id: 5,
		icon: <FaGithub />,
		color: "#000",
		href: "",
	},
];
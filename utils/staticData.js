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
				text: 'Search Internships',
				href: '/'
			},
			{
				text: 'Applied Internships',
				href: '/'
			},	
		],
	},
	{
		text: "Events",
		href: "/",
		subLinks: [
			{
				text: 'Search Events',
				href: '/'
			},
			{
				text: 'Applied Events',
				href: '/'
			},	
		],
	},
	{
		text: "Social",
		href: "/",
		subLinks: [
			{
				text: 'Timeline',
				href: '/'
			},
			{
				text: 'Create a Post',
				href: '/'
			},	
		],
	},
];

export const features = [
	{
		id: 1,
		title: "Interaction",
		text: "Intermania provides direct interaction between students and company's representatives as well as students and institute's representative without any intermediates. Also, Global discussion Forum is provided specially for students.",
		image: "/illustrations/illustration3.png",
	},
	{
		id: 2,
		title: "Events",
		text: "Intermania provides direct interaction between students and company's representatives as well as students and institute's representative without any intermediates. Also, Global discussion Forum is provided specially for students.",
		image: "/illustrations/illustration4.png",
	},
	{
		id: 3,
		title: "Idea Hub",
		text: "Shape your ideas into reality with Internmania. Discuss your ideas globally as well as on your custom chat space with Internmania's Idea hub programme. Connect with the world! Connect with Internmania!",
		image: "/illustrations/illustration5.png",
	},
	{
		id: 4,
		title: "Skill Points",
		text: "Skill Points! These points will determine your Rank as a programmer. Skill points also prioritize you on the list of your fellow competitors fon an internship. Skill Points will raise your chances of getting selected.",
		image: "/illustrations/illustration6.png",
	},	
];

export const footerLinks = [
	{
		id: 1,
		heading: 'Company',
		links: [
			{
				id: 1,
				text: 'About Us',
				href: '',
			},
			{
				id: 2,
				text: 'Other Services',
				href: '',
			},
			{
				id: 3,
				text: 'Credits',
				href: '',
			},	
		]
	},
	{
		id: 2,
		heading: 'Get Help',
		links: [
			{
				id: 1,
				text: 'FAQ',
				href: '',
			},
			{
				id: 2,
				text: 'Privacy Policy',
				href: '',
			},
			{
				id: 3,
				text: 'Terms and Conditions',
				href: '',
			},	
		]
	},
]

export const socialLinks  = [
	{
		id: 1,
		icon: <FaFacebook/>,
		color: '#0353a4',
		href: ''
	},
	{
		id: 2,
		icon: <FaTwitter/>,
		color: '#00b4d8',
		href: ''
	},
	{
		id: 3,
		icon: <FaInstagram/>,
		color: '#e1306c',
		href: ''
	},
	{
		id: 4,
		icon: <FaLinkedin/>,
		color: '#006192',
		href: ''
	},
	{
		id: 5,
		icon: <FaGithub/>,
		color: '#000',
		href: ''
	},
]

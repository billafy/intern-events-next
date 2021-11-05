import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Form from "../../components/Form";
import { signupFields } from "../../utils/inputFields";
import { reqPost } from "../../utils/customRequests";

const Signup = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { accountInput } = useSelector((state) => state.auth);

	const signup = (event) => {
		event.preventDefault();
		dispatch({ type: "LOAD" });
		const {
			signupEmail,
			signupPassword,
			signupConfirmPassword,
			contactNumber,
		} = accountInput;
		if (
			!signupEmail ||
			!signupPassword ||
			!signupConfirmPassword ||
			!contactNumber
		) {
			dispatch({
				type: "INPUT_ERROR",
				payload: { inputError: "Fill all the fields" },
			});
			return;
		} else if (signupPassword !== signupConfirmPassword) {
			dispatch({
				type: "INPUT_ERROR",
				payload: { inputError: "Passwords do not match" },
			});
			return;
		} else if (signupPassword.length < 6) {
			dispatch({
				type: "INPUT_ERROR",
				payload: {
					inputError:
						"Password should contain more than 6 characters",
				},
			});
			return;
		} else if (contactNumber.length !== 10) {
			dispatch({
				type: "INPUT_ERROR",
				payload: { inputError: "Invalid contact number" },
			});
			return;
		}
		router.push("/auth/info");
		dispatch({ type: "STOP_LOAD" });
	};

	return (
		<Form
			title="SIGN UP"
			inputFields={signupFields}
			submitButton={{ text: "SIGN UP", handler: signup }}
			link={{ text: "Already have an account?", href: "/auth/login" }}
		/>
	);
};

export default Signup;

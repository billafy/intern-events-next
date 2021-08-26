import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Form from "../../components/Form";

import { loginFields } from "../../utils/inputFields";
import urls from "../../utils/urls";
import { reqPost } from "../../utils/customRequests";

const Login = () => {
    const router = useRouter();
    const { accountInput } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const login = async (event) => {
        event.preventDefault();
        dispatch({ type: "LOAD" });
        const { loginEmail, loginPassword } = accountInput;
        if (!loginEmail || !loginPassword) {
            dispatch({
                type: "INPUT_ERROR",
                payload: { inputError: "Fill all the fields" },
            });
            return;
        }
        const res = await reqPost(urls.login, {
            email: loginEmail,
            password: loginPassword,
        });
        if (res.success) {
            dispatch({ type: "LOGIN", payload: { account: res.body.account } });
            router.replace("/");
        } else
            dispatch({
                type: "INPUT_ERROR",
                payload: { inputError: res.body.error },
            });
    };

    return (
        <Form
            title="LOGIN"
            submitButton={{ text: "LOGIN", handler: login }}
            inputFields={loginFields}
            link={{ text: "Don't have an account yet?", href: "/auth/signup" }}
        />
    );
};

export default Login;
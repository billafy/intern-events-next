import { useEffect } from "react";

import { Provider } from "react-redux";
import { useStore } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Head from "next/head";
import Loading from "../components/Loading";

import { reqPost } from "../utils/customRequests";
import { defaultInputs } from "../utils/inputFields";
import urls from "../utils/urls";

import "../styles/globals.scss";

const Main = ({ Component, pageProps }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { inputError, isLoggedIn, loading, accountInput } = useSelector(
        (state) => state.auth
    );

    const refresh = async () => {
        const res = await reqPost(urls.refresh);
        if (res.success) {
            dispatch({ type: "LOGIN", payload: { account: res.body.account } });
            if (router.pathname.startsWith("/auth")) router.replace("/");
        }
    };

    const checkAccountDetails = () => {
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
        )
            router.replace("/auth/signup");
    };

    useEffect(() => {
        dispatch({
            type: "UPDATE_INPUT",
            payload: { accountInput: defaultInputs },
        });
    }, [isLoggedIn]);

    useEffect(() => {
        if (!inputError) return;
        setTimeout(() => {
            dispatch({ type: "INPUT_ERROR", payload: { inputError: "" } });
        }, 3000);
    }, [inputError]);

    useEffect(() => {
        refresh();
        if (!isLoggedIn && router.pathname === "/auth/info")
            checkAccountDetails();
        setTimeout(() => {
            dispatch({ type: "STOP_LOAD" });
        }, 3000);
    }, []);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/asd.png" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Georama:wght@300&display=swap"
                    rel="stylesheet"
                />
                <meta name="" content="" />
                <title>InternEvents</title>
            </Head>
            {/* <Navbar /> */}
            <main className="main-container">
                {loading ? <Loading /> : <Component {...pageProps} />}
            </main>
            {/* <Footer /> */}
        </>
    );
};

export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Main Component={Component} pageProps={pageProps} />
        </Provider>
    );
}
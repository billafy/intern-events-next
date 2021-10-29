import { useEffect } from "react";
import { Provider } from "react-redux";
import { useStore } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Loading from "../components/Loading";
import { reqGet, reqPost } from "../utils/customRequests";
import { defaultInputs } from "../utils/inputFields";
import urls from "../utils/urls";
import "../styles/globals.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Main = ({ Component, pageProps }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { width, loading } = useSelector((state) => state.auth);

    const refresh = async () => {
        const res = await reqPost(urls.refresh);
        if (res.success) {
            dispatch({ type: "LOGIN", payload: { account: res.body.account } });
            if (router.pathname.startsWith("/auth")) router.replace("/");
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            dispatch({ type: "SET_WIDTH", payload: { newWidth } });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    useEffect(() => {
        const newWidth = window.innerWidth;
        dispatch({ type: "SET_WIDTH", payload: { newWidth } });
        refresh();
        setTimeout(() => {
            dispatch({ type: "STOP_LOAD" });
        }, 3000);
    }, []);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
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
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
                />
                <meta name="" content="" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                />
                <title>Intern.ly</title>
            </Head>
            <Header />
            <main className="main-container">
                {loading ? <Loading /> : <Component {...pageProps} />}
            </main>
            <Footer />
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

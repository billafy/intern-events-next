import _ from "../styles/Loading.module.scss";

const Loading = () => {
    return (
        <div className={_.loadingContainer}>
            <div className={_.loading}>
                <div className={_.loadingInner}></div>
            </div>
        </div>
    );
};

export default Loading;

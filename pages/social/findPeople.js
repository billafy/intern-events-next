import { useState } from "react";
import { AiOutlineSearch, AiFillCaretRight } from "react-icons/ai";
import _ from "../../styles/social/FindPeople.module.scss";
import { reqGet } from "../../utils/customRequests";
import urls from "../../utils/urls";
import { getImage } from "../../utils/utils";
import { useSelector } from "react-redux";
import Link from 'next/link';

const FindPeople = () => {
    const {
        auth: { account },
    } = useSelector((state) => state);
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const searchAccounts = async (event) => {
        event.preventDefault();
        if (keyword.length >= 3) {
            const data = await reqGet(urls.searchAccounts + keyword);
            if (data.body.results.length > 0) {
                setResults(data.body.results);
                setError("");
            } else {
                setResults([]);
                setError("No results found");
            }
        } else setError("Enter atleast 3 characters");
    };

    return (
        <div className={_.findPeople}>
            <h1>Find People</h1>
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={({ target: { value } }) => setKeyword(value)}
                />
                <button onClick={searchAccounts}>
                    <AiOutlineSearch />
                </button>
            </form>
            {error ? (
                <p className={_.error}>{error}</p>
            ) : (
                <ul className={_.results} style={results.length === 1 ? {gridTemplateColumns: '1fr', width: '500px'} : {}}>
                    {results.map((result) => {
                        return (
                            <li key={result._id}>
                                <img src={getImage(result.profilePicture)} />
                                <Link href={account._id !== result._id ? `/social/profile/${result._id}` : '/myProfile'}>
                                    {result.details.name ||
                                        `${result.details.firstName} ${result.details.lastName}`}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default FindPeople;

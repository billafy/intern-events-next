import {useState} from 'react';
import {AiOutlineSearch} from 'react-icons/ai'
import _ from '../../styles/FindPeople.module.scss'
import {reqGet} from '../../utils/customRequests'
import urls from '../../utils/urls'
import {getImage} from '../../utils/utils'

const FindPeople = () => {
    const [keyword, setKeyword] = useState('')
    const [results, setResults] = useState([])
    const [noResults, setNoResults] = useState(false)

    const searchAccounts = async (event) => {
        event.preventDefault()
        if(keyword.length >= 3) {
            const data = await reqGet(urls.searchAccounts + keyword)
            if(data.body.results.length > 0) {
                setResults(data.body.results)
                setNoResults(false)
            }
            else {
                setResults([])
                setNoResults(true)
            }
        } 
    }

    return (
        <div className={_.findPeople}>
            <h1>Find People</h1>
            <form>
                <input type='text' placeholder='Search...' onChange={({target: {value}}) => setKeyword(value)}/>
                <button onClick={searchAccounts}><AiOutlineSearch/></button>
            </form>
            {noResults
                ?
                <p className={_.noResults}>No results found</p>
                :
                <ul className={_.results}>
                    {results.map(result => {
                        return (<li key={result._id}>
                            <img src={getImage(result.profilePicture)}/>
                            <p>
                                {result.details.name || `${result.details.firstName} ${result.details.lastName}`}
                            </p>
                        </li>)
                    })
                    }
                </ul>
            }
        </div>
    );
};

export default FindPeople;

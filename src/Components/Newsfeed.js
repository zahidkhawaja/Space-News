import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import CircularProgress from '@material-ui/core/CircularProgress';

const NewsFeed = () => {

    const [news, setNews] = useState([]);

    const getNews = async () => {
        try {
            // Uncomment the following line to emulate slow fetching from API (useful for testing the progress wheel)
            // await new Promise(resolve => setTimeout(resolve, 3000))
            const res = await axios.get("https://api.spaceflightnewsapi.net/v3/articles");
            setNews(res.data);
        } catch (err) {
            console.log("Error fetching data")
        }
    };

    useEffect(() => {

        getNews();

        // Old implementation of axios without async/await (just keeping this for reference)
        // axios.get("https://api.spaceflightnewsapi.net/v3/articles")
        // // .then(delay(5000))
        // .then(res => {
        //     setNews(res.data);
        // })
        // .catch(err => console.log("Error fetching data"))
        
    }, [])

    return(
        <div>
            <div className = "circular-progress">
            {news.length === 0 ? <CircularProgress /> : null}
            </div>
        <div className = "news">
        <div className = "newsfeed">
            {news.map(article => (
                <a href={article.url} target="_blank" rel="noreferrer">
                <div id = {article.id} className = "article">
                    <h3>{article.title}</h3>
                    <p className = "timestamp">{moment(article.publishedAt).format("dddd, MMMM Do, YYYY")}</p>
                    <p className = "source">{article.newsSite}</p>
                    </div>
                    </a>
            ))}
        </div>
        </div>
        </div>
    )
}

export default NewsFeed;
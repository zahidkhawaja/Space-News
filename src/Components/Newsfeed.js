import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import CircularProgress from '@material-ui/core/CircularProgress';

const NewsFeed = () => {

    const [news, setNews] = useState([]);

    // THIS IS FOR TESTING THE LOADING INDICATOR FUNCTIONALITY (emulating slow fetching)
    // function delay(ms) {
    //     return function(x) {
    //       return new Promise(resolve => setTimeout(() => resolve(x), ms));
    //     };
    //   }

    useEffect(() => {
        axios.get("https://www.spaceflightnewsapi.net/api/v2/articles")
        // .then(delay(1000))
        .then(res => {
            setNews(res.data);
        })
        .catch(err => console.log("Error fetching data"))
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
                    <p className = "timestamp">{moment(article.publishedAt).format("dddd, MMMM Do YYYY")}</p>
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
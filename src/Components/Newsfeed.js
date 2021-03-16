import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import CircularProgress from '@material-ui/core/CircularProgress';

const NewsFeed = () => {

    const [news, setNews] = useState([]);

    // Useful function to intentionally postpone the axios call so we can test the progress indicator
    // function delay(ms) {
    //     return function(x) {
    //       return new Promise(resolve => setTimeout(() => resolve(x), ms));
    //     };
    //   }

    useEffect(() => {
        axios.get("https://www.spaceflightnewsapi.net/api/v2/articles")
        // Call the delay function
        // .then(delay(3000))
        .then(res => {
            setNews(res.data);
        })
        .catch(err => console.log("Error fetching data"))
    }, [])

    return(
        <div>
            {news.length === 0 ? <CircularProgress /> : null}
        <div className = "news">
        <div className = "newsfeed">
            {news.map(article => (
                <div id = {article.id} className = "article">
                    <h3>{article.title}</h3>
                    <p className = "timestamp">{moment(article.publishedAt).format("dddd, MMMM Do YYYY")}</p>
                    </div>
            ))}
        </div>
        </div>
        </div>
    )
}

export default NewsFeed;
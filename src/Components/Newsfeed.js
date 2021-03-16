import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const NewsFeed = () => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get("https://www.spaceflightnewsapi.net/api/v2/articles")
        .then(res => {
            setNews(res.data);
        })
        .catch(err => console.log("Error fetching data"))
    }, [])

    return(
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
    )
}

export default NewsFeed;
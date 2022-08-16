import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import CircularProgress from '@material-ui/core/CircularProgress';

const NewsFeed = () => {

    const [news, setNews] = useState([]);

    const getNews = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            const res = await axios.get("https://api.spaceflightnewsapi.net/v3/articles");
            setNews(res.data);
        } catch (err) {
            console.log("Error fetching data")
        }
    };

    useEffect(() => getNews(), []);

    return(
        <div>
            <div className = "circular-progress">
            {news.length === 0 ? <CircularProgress /> : null}
            </div>
        <div className = "news">
        <div className = "newsfeed">
            {news.map(article => (
                <a id = {article.id} key = {article.id} href={article.url} target="_blank" rel="noreferrer">
                <div className = "article">
                    <div className = "article-text">
                    <h3>{article.title}</h3>
                    <p className = "source">{article.newsSite}</p>
                    <p className = "timestamp">{moment(article.publishedAt).format("dddd, MMMM Do, YYYY")}</p>
                    </div>
                    <div className = "article-image">
                        <img className = "image" src = {article.imageUrl} alt = "article preview" />
                        </div>
                    </div>
                    </a>
            ))}
        </div>
        </div>
        </div>
    )
}

export default NewsFeed;
import React, {useEffect, useState} from "react";
import axios from "axios";

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data);
        });
    }, []); // The empty array means this effect runs only once after the initial render

    return (
        <div>
            {listOfPosts.map((value, key) => {
                return (
                    <div className="post">
                        <div className="outer-title-box">
                            <div className="title">{value.title}</div>
                        </div>
                        <div className="outer-postText-box">
                            <div className="postText">{value.postText}</div>
                        </div>
                        <div className="username">{value.username}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;

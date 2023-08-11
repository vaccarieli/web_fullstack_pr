import React, {useEffect, useState} from "react";
import axios from "axios";

function Games() {
    const [listOfPosts, setListOfPosts] = useState([]);

    const server_url = "http://localhost:3001/";

    useEffect(() => {
        axios
            .get(`${server_url}games`)
            .then((response) => {
                setListOfPosts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            {listOfPosts.map((value, index) => {
                return (
                    <div key={index} className="post">
                        <div className="outer-title-box">
                            <div className="title">{value.title}</div>
                        </div>
                        <div className="outer-postText-box">
                            <img className="profile-photo" src={`${server_url}${value.image_url}`} alt={"RedDead"} />
                        </div>
                        <div className="username">{value.username}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default Games;

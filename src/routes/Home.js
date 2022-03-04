import { useEffect, useState } from "react";
import {dbService}from "fbase";


const Home = () => {
    const [christweet, setChristweet] = useState("");

    const getChristweets = async () => {
        const dbChristweet = await dbService.collection("christtweets").get();
        console.log(dbChristweet);
        dbChristweet.forEach((document) => console.log(document.data()));
    };

    useEffect(() => {
        getChristweets();
    }, []);

    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.collection("christweets").add({text: christweet,
        createAt: Date.now(),
    });
    setChristweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value },
        } = event;
        setChristweet(value);
    };

    return (
        <form onSubmit={onSubmit}>
            <input
            value={christweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
            />
            <input type="submit" value="Christweet" />
        </form>
    )

}
export default Home;

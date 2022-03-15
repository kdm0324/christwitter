import { useEffect, useState } from "react";
import { dbService } from "fbase";
import Christweet from "components/Chirstweet";
import ChirstweetFactory from "components/ChristweetFactory";

const Home = ({ userObj }) => {
  const [christweets, setChristweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("christweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        console.log(newArray);
        setChristweets(newArray);
      });
  }, []);

  return (
    <div className="container">
      <ChirstweetFactory userObj={userObj} />
      <div style={{marginTop: 30}}>
        {christweets.map((christweet) => (
          <Christweet
            key={christweet.id}
            christweetObj={christweet}
            isOwner={christweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { dbService } from "fbase";
import Christweet from "components/Chirstweet";

const Home = ({ userObj }) => {
  console.log(userObj);
  const [christweet, setChristweet] = useState("");
  const [christweets, setChristweets] = useState([]);

  //실시간 데이터베이스를 사용하기 위해 주석 처리함.
  // const getChristweets = async () => {
  //     const dbChristweet = await dbService.collection("christweets").get();
  //     dbChristweet.forEach((document) => {
  //         const christweetObject = {...document.data(), id:document.id};
  //         setChristweets((prev) => [...prev, christweetObject])
  //     }
  //     );
  // };

  useEffect(() => {
    // getChristweets();실시간 데이터베이스를 사용하기 위해 주석 처리함.
    dbService.collection("christweets").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));
      setChristweets(newArray);
    });
  }, []);

  //console.log(christweets);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("christweets").add({
      text: christweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setChristweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setChristweet(value);
  };

  return (
    <>
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
      <div>
        {christweets.map((christweet) => (
          <Christweet
            key={christweet.id}
            christweetObj={christweet}
            isOwner={christweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;

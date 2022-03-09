import { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Christweet from "components/Chirstweet";
import { v4 as uuidv4 } from "uuid"

const Home = ({ userObj }) => {
  //console.log(userObj);
  const [christweet, setChristweet] = useState("");
  const [christweets, setChristweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    dbService.collection("christweets").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      console.log(newArray);
      setChristweets(newArray);
    });
  }, []);

  //console.log(christweets);

  const onSubmit = async (event) => {
    event.preventDefault();
    // await dbService.collection("christweets").add({
    //   text: christweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setChristweet("");
    const attachmentRef = storageService
    .ref()
    .child(`${userObj.uid}/${uuidv4()}`);
    const response = await attachmentRef.putString(attachment, "data_url");
    console.log(response);
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setChristweet(value);
  };

  const onFileChange = (event) => {
    //   console.log(event.target.files);
    const {
        target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
        // console.log(finishedEvent);
        const {
            currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = ()=> setAttachment("");

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
        <input type="file" accept="image/*" onChange={onFileChange}/>
        <input type="submit" value="Christweet" />
        {attachment && (
        <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
        </div>
        )}
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

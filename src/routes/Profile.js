import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Christweet from "components/Chirstweet";

const Profile = ({ userObj, refreshUser }) => {
  const [myChristweets, setMyChristweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  //   const getMyChristweets = async () => {
  //     const christweets = await dbService
  //       .collection("christweets")
  //       .where("creatorId", "==", userObj.uid)
  //       .orderBy("createdAt", "asc")
  //       .get();

  //     console.log(christweets.docs.map((doc) => doc.data()));
  //   };

  //   useEffect(() => {
  //     getMyChristweets();
  //   }, []);

  useEffect(() => {
    // getChristweets();실시간 데이터베이스를 사용하기 위해 주석 처리함.
    dbService
      .collection("christweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        console.log(newArray);
        setMyChristweets(newArray);
      });
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
      <h3>나의 게시물</h3>
      <div>
        {myChristweets.map((christweet) => (
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
export default Profile;

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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      {/* <div className="container" style={{ marginTop: 20 }}>
        {myChristweets.map((christweet) => (
          <Christweet
            key={christweet.id}
            christweetObj={christweet}
            isOwner={christweet.creatorId === userObj.uid}
          />
        ))}
      </div> */}
    </div>
  );
};
export default Profile;

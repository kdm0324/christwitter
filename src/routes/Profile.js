import { authService, dbService } from "fbase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const getMyChristweets = async () => {
    const christweets = await dbService
      .collection("christweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "asc")
      .get();

    console.log(christweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
      getMyChristweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;

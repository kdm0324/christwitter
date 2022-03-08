import { dbService } from "fbase";

const Christweet = ({ christweetObj, isOwner }) => {
  const onDeleteClick = async () => {
      const ok = window.confirm("삭제하시겠습니까?");
      console.log(ok);
      if(ok) {
          console.log(christweetObj.id);
          const data = await dbService.doc(`christweets/${christweetObj.id}`).delete();
          console.log(data);
      }
  };
  return (
    <div>
      <h4>{christweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Christweet</button>
          <button>Edit Chirstweet</button>
        </>
      )}
    </div>
  );
};

export default Christweet;

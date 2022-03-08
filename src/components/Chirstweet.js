import { dbService } from "fbase";
import { useState } from "react";

const Christweet = ({ christweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newChristweet, setNewChristweet] = useState(christweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      console.log(christweetObj.id);
      const data = await dbService
        .doc(`christweets/${christweetObj.id}`)
        .delete();
      console.log(data);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewChristweet(value);
  };

  const onSubmit = async (event) => {
      event.preventDefault();
    //   console.log(christweetObj.id, newChristweet);
    await dbService.doc(`christweets/${christweetObj.id}`).update({ text: newChristweet });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newChristweet} required />
            <input type="submit" value="Update Christweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{christweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Christweet</button>
              <button onClick={toggleEditing}>Edit Chirstweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Christweet;

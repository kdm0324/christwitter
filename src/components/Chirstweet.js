import { dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Christweet = ({ christweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newChristweet, setNewChristweet] = useState(christweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    // console.log(ok);
    if (ok) {
      //   console.log(christweetObj.id);
      const data = await dbService
        .doc(`christweets/${christweetObj.id}`)
        .delete();
      //   console.log(data);
      if (christweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(christweetObj.attachmentUrl).delete();
      }
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
    await dbService
      .doc(`christweets/${christweetObj.id}`)
      .update({ text: newChristweet });
    setEditing(false);
  };

  return (
    <div className="christweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container christweetEdit">
            <input
              onChange={onChange}
              value={newChristweet}
              required
              placeholder="Edit your Christweet"
              autoFocus
              className="formInput"
            />
            <input
              type="submit"
              value="Update Christweet"
              className="formBtn"
            />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>
            <h4>
              {christweetObj.text}
            </h4>
            {christweetObj.attachmentUrl && (
              <img
                src={christweetObj.attachmentUrl}
                width="50px"
                height="50px"
              />
            )}
          </div>
          <div>
            {isOwner && (
              <div className="christweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Christweet;

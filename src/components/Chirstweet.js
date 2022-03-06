const Christweet = ({ christweetObj, isOwner }) => {
  return (
    <div>
      <h4>{christweetObj.text}</h4>
      {isOwner && (
        <>
          <button>Delete Christweet</button>
          <button>Edit Chirstweet</button>
        </>
      )}
    </div>
  );
};

export default Christweet;

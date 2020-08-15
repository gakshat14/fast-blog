import React, { useState, useContext, useEffect } from "react";
import { IPostContent } from "../models";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/GlobalContext";
import { getComments } from "../../context/GlobalReducer";

interface IProps {
  postBody: IPostContent;
}

export function Post({ postBody }: IProps) {
  const dispatch = useContext(GlobalDispatchContext);
  const { comments } = useContext(GlobalStateContext);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    if (comments.data[postBody.id]) {
      setShowComments(true);
    }
  }, [comments.data]);
  function onViewCommentsClicked(postId: number) {
    return function (e: React.MouseEvent<HTMLButtonElement>) {
      if (!comments.data[postId] && !comments.isLoading && !comments.hasError) {
        getComments(dispatch, postId, comments.data);
        return;
      }
      setShowComments(true);
    };
  }
  function onHideClicked() {
    setShowComments(false);
  }
  return (
    <article>
      <h2>{postBody.title}</h2>
      <p>{postBody.body}</p>
      {!showComments && (
        <button
          className="view-button"
          type="button"
          onClick={onViewCommentsClicked(postBody.id)}
        >
          View comments
        </button>
      )}
      {showComments && (
        <>
          <ul className="comments-container">
            {comments.data[postBody.id].map((comment) => (
              <li>
                <h4>{comment.name}</h4>
                <p>Posted by: {comment.email}</p>
                <p key={`${comment.id}_${comment.postId}`}>{comment.body}</p>
              </li>
            ))}
          </ul>
          <button onClick={onHideClicked} className="view-button">
            Hide comments
          </button>
        </>
      )}
    </article>
  );
}

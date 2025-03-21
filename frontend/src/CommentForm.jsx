import { useState } from "react";
import API_ENDPOINTS from "./apiConfig";

function CommentForm( {userId, lunchId } ) {
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        var profanity = "no";

        const payload = {
            comment,
            userId,
            lunchId,
            profanity
        }
    
        const response = await fetch(API_ENDPOINTS.comments, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ payload }),
        });
    
        if (response.ok) {
          setComment("");
          alert("Komentář přidán!");
        } else {
          alert("Nepodařilo se uložit komentář.");
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <textarea name="comment" id="content" value={comment} onChange={(e) => setComment(e.target.value)}>

            </textarea>
            <button type="submit">Submit</button>
        </form>
    );
}

export default CommentForm
import { useState } from "react";
import API_ENDPOINTS from "./apiConfig";

function CommentForm( { lunchId } ) {
    const token = sessionStorage.getItem("token");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        lunchId = parseInt(lunchId);

        const payload = {
            lunchId,
            content,
        }

        console.log(payload);
    
        const response = await fetch(API_ENDPOINTS.comments, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify( payload ),
        });
    
        if (response.ok) {
          setContent("");
          alert("Komentář přidán!");
        } else {
          alert("Nepodařilo se uložit komentář.");
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <textarea name="comment" id="content" value={content} onChange={(e) => setContent(e.target.value)}>

            </textarea>
            <button type="submit">Submit</button>
        </form>
    );
}

export default CommentForm
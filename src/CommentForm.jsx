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
          window.location.reload();
        } else {
          alert("Nepodařilo se uložit komentář.");
        }
      };

    return (
      <div class="comment-form-container">
        <form onSubmit={handleSubmit} class="comment-form">
            <textarea placeholder="Napište komentář..." class="comment-area" name="comment" id="content" value={content} onChange={(e) => setContent(e.target.value)}>
            </textarea>
            <button type="submit" class="lunch-button">Odeslat</button>
        </form>
      </div>
    );
}

export default CommentForm
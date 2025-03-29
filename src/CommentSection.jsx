import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import API_ENDPOINTS from "./apiConfig";

function CommentSection({}) {

    const token = sessionStorage.getItem("token");
    
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const lunchId = useParams().id;

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('cs-CZ', options);
        return formattedDate;
      };

    useEffect(() => {
        if (!lunchId) return;
    
        fetch(API_ENDPOINTS.commentsForLunch(lunchId), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
        })
          .then((res) => res.json())
          .then((data) => setComments(data))
          .catch(() => setError("Nepodařilo se načíst komentáře"));
      }, [lunchId]);

    return (
        <div class="comment-section-container">
            <CommentForm lunchId={lunchId}/>

            <div class="comment-section">
              {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <div class="comment-info">
                    <p><strong>{comment.user_email}</strong></p>
                    <p><em class="comment-date">{formatDate(comment.created_at)}</em></p>
                    </div>
                    <p className={comment.profanity === "yes" ? "warning-text" : ""}>
                        {comment.profanity === "yes"
                        ? "Komentář nesplňoval naše zásady."
                        : comment.content}
                    </p>
                </div>
              ))}
                </div>
        </div>
    );
}

export default CommentSection;
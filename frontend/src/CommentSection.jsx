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

      console.log(comments);

    return (
        <div>
            <CommentForm lunchId={lunchId}/>

            <div>
              {comments.map(comment => (
                <div key={comment.id} className="comment">
                  <p><strong>{comment.user_email}</strong></p>
                  <p><em>{formatDate(comment.created_at)}</em></p>
                  <p>
                    {comment.profanity === "yes" ? "Komentář nesplňoval naše zásady." : comment.content}
                  </p>
                </div>
              ))}
                </div>
        </div>
    );
}

export default CommentSection;
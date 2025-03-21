import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import API_ENDPOINTS from "./apiConfig";

function CommentSection() {

    const userId = sessionStorage.getItem("user_id");
    
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const lunchId = useParams()

    useEffect(() => {
        if (!lunchId) return;
    
        fetch(API_ENDPOINTS.commentsForLunch(lunchId))
          .then((res) => res.json())
          .then((data) => setComments(data))
          .catch(() => setError("Nepodařilo se načíst komentáře"));
      }, [lunchId]);

    return (
        <div>
            <CommentForm />
            {comments}
        </div>
    );
}

export default CommentSection;
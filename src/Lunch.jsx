import { useState, useEffect } from "react";
import ReviewSummary from "./ReviewSummary";
import { Link } from "react-router-dom";

function Lunch({ lunch }) {
    const [showReviewSummary, setShowReviewSummary] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const data = lunch.content
        const itemsArray = data.split(",");
        setItems(itemsArray);
    }, []);


    function toggleReviewSummary() {
        setShowReviewSummary(!showReviewSummary);
    }

    return (
        <section class="lunch">
            <div class="lunch-box">
                <div class="lunch-title">
                    <h2 class="lunch-name">Oběd {lunch.lunch_number}</h2>
                    <span class="lunch-date">{new Date("2025-03-15T23:00:00.000Z").toLocaleDateString("cs-CZ")}</span>
                </div>
                <div>
                    <ul class="lunch-items">
                        {items.map((item, index) => (
                            <li class="lunch-item" key={index}>{item.trim()}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div class="lunch-buttons">
                <Link to={`/review/${lunch.id}`}>
                    <button class="review-button lunch-button"><i className="fas fas fa-clipboard-list"></i>Ohodnotit</button>
                </Link>
                <button class="show-reviews-button lunch-button" onClick={toggleReviewSummary}><i className="fas fa-star"></i> {showReviewSummary ? "Zavřít" : "Hodnocení"}</button>
                <Link to={`/lunches/${lunch.id}/comments`}>
                    <button class="show-comments-button lunch-button"><i className="fas fa-comment"></i> Komentáře</button>
                </Link>
            </div>
            {showReviewSummary && (
                <ReviewSummary lunchId={lunch.id} />
            )}
        </section>
    );
}

export default Lunch;
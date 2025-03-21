import { useEffect, useState } from "react";
import API_ENDPOINTS from "./apiConfig";

function ReviewSummary({ lunchId }) {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    const token = sessionStorage.getItem("token");


    useEffect(() => {
        if (!lunchId) return;
    
        fetch(API_ENDPOINTS.reviewStats(lunchId), {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
            },
        })
          .then((res) => res.json())
          .then((data) => setStats(data))
          .catch((err) => setError("Nepodařilo se načíst statistiky"));
      }, [lunchId]);

    if (error) return <p>{error}</p>;
    if (!stats) return <p>Loading...</p>;
    
    return(
        <div class="review-summary-wrapper">
            <div class="review-summary-title-wrapper">
                <i className="fas fa-star fa-lg"></i><h3 class="review-summary-title">Shrnutí hodnocení</h3>
            </div>
            <table class="review-summary">
                <tr>
                    <td>
                        <span class="review-summary-question">Vařit polévku?</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Ano: </span><span class="review-percentage">{stats.cook_soup_yes}%</span>
                    </td>
                    <td colspan="3">
                        <span class="review-summary-answer">Ne: </span><span class="review-percentage">{stats.cook_soup_no}%</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="review-summary-question">Vařit hlavní jídlo?</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Ano: </span><span class="review-percentage">{stats.cook_food_yes}%</span>
                    </td>
                    <td colspan="2">
                        <span class="review-summary-answer">Ne: </span><span class="review-percentage">{stats.cook_food_no}%</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="review-summary-question">Vařit desert?</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Ano: </span><span class="review-percentage">{stats.cook_dessert_yes}%</span>
                    </td>
                    <td colspan="2">
                        <span class="review-summary-answer">Ne: </span><span class="review-percentage">{stats.cook_dessert_no}%</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="review-summary-question">Kolik byste byl/a ochotný/a si připlatit?</span>
                    </td>
                    <td colspan="3">
                        <span class="review-summary-answer">Průměr: </span><span class="review-percentage">{stats.avg_pay}Kč</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="review-summary-question">Jak Vás jídlo nasytilo?</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Měl/a jsem hlad: </span><span class="review-percentage">{stats.portion_small}%</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Nasytilo: </span><span class="review-percentage">{stats.portion_enough}%</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Přejedl/a jsem se: </span><span class="review-percentage">{stats.portion_too_much}%</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="review-summary-question">Jaká byla teplota jídla?</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Studená: </span><span class="review-percentage">{stats.temp_cold}%</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Akorát: </span><span class="review-percentage">{stats.temp_optimal}%</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Horká: </span><span class="review-percentage">{stats.temp_hot}%</span>
                    </td>
                </tr>
                <tr>
                <td>
                    <span class="review-summary-question">Jak jídlo vypadalo?</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Neúhledné: </span><span class="review-percentage">{stats.look_bad}%</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">V pořádku: </span><span class="review-percentage">{stats.look_okay}%</span>
                    </td>
                    <td>
                        <span class="review-summary-answer">Úhledné: </span><span class="review-percentage">{stats.look_good}%</span>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default ReviewSummary;
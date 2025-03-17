import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_ENDPOINTS from "./apiConfig";

function LunchForm() {
    const userId = sessionStorage.getItem("user_id");
    const token = sessionStorage.getItem("token");

    const [rangeValue, setRangeValue] = useState(100);
    const [formData, setFormData] = useState({ cookSoup: '', cookFood: '', cookDessert: '', pay: '100', portion: '', temperature: '', look: '', userId, lunchId: '' });
    const { id } = useParams();

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            formData.userId = userId;
            formData.lunchId = id;
            const response = await fetch(API_ENDPOINTS.reviews, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Hodnocení bylo přidáno.');
                navigate("/");
            } else {
                alert(`${data.error || 'Něco se pokazilo.'}`);
            }
        } catch (error) {
            alert('Nepodařilo se přidat hodnocení.');
        }
    };

    function handleRangeChange(event) {
        setRangeValue(event.target.value);
        setFormData({ ...formData, pay: event.target.value });
    }

    return (
        <div class="review-form-wrapper">
            <form class="review-form" onSubmit={handleSubmit}>
            <h2>Hodnocení obědu</h2>
                <div class="form-cook">
                    <h3 class="form-section-title">Mělo by se vařit?</h3>
                    <div class="form-section-grid">
                        <span>Polévka:</span>
                        <label>
                            <input type="radio" name="cookSoup" value="yes" required onChange={handleChange} />Ano
                        </label>
                        <label>
                            <input type="radio" name="cookSoup" value="no" required onChange={handleChange} />Ne
                        </label>
                        <span>Hlavní jídlo:</span>
                        <label>
                            <input type="radio" name="cookFood" value="yes" required onChange={handleChange} />Ano
                        </label>
                        <label>
                            <input type="radio" name="cookFood" value="no" required onChange={handleChange} />Ne
                        </label>
                        <span>Desert:</span>
                        <label>
                            <input type="radio" name="cookDessert" value="yes" required onChange={handleChange} />Ano
                        </label>
                        <label>
                            <input type="radio" name="cookDessert" value="no" required onChange={handleChange} />Ne
                        </label>
                    </div>
                </div>
                <div class="form-pay">
                    <h3 class="form-section-title">Kolik byste byl/a ochotný/á si připlatit?</h3>
                    <input type="range" min="0" max="200" onChange={handleRangeChange} value={formData.pay} /> {rangeValue}Kč
                </div>
                <div class="form-portion">
                    <h3 class="form-section-title">Jak Vás jídlo nasytilo?</h3>
                    <div class="portion-input-wrapper">
                        <label>
                            <input type="radio" name="portion" value="small" required onChange={handleChange} />Měl/a jsem hlad
                        </label>
                        <label>
                            <input type="radio" name="portion" value="enough" required onChange={handleChange} />Nasytilo
                        </label>
                        <label>
                            <input type="radio" name="portion" value="too much" required onChange={handleChange} />Přejedl/a jsem se
                        </label>
                    </div>
                </div>
                <div class="form-temperature">
                    <h3 class="form-section-title">Jaká byla teplota jídla?</h3>
                    <div class="portion-input-wrapper">
                        <label>
                            <input type="radio" name="temperature" value="cold" required onChange={handleChange} />Studená
                        </label>
                        <label>
                            <input type="radio" name="temperature" value="optimal" required onChange={handleChange} />Akorát
                        </label>
                        <label>
                            <input type="radio" name="temperature" value="hot" required onChange={handleChange} />Horká
                        </label>
                    </div>
                </div>
                <div class="form-look">
                    <h3 class="form-section-title">Jak jídlo vypadalo?</h3>
                    <div class="portion-input-wrapper">
                        <label>
                            <input type="radio" name="look" value="bad" required onChange={handleChange} />Neúhledné
                        </label>
                        <label>
                            <input type="radio" name="look" value="okay" required onChange={handleChange} />V pořádku
                        </label>
                        <label>
                            <input type="radio" name="look" value="good" required onChange={handleChange} />Úhledné
                        </label>
                    </div>
                </div>
                <button type="submit" class="lunch-button"><i className="fas fa-check"></i> Odeslat</button>
            </form>
        </div>
    );
}

export default LunchForm;
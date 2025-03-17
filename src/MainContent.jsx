import Lunch from "./Lunch";
import { useState, useEffect } from "react";
import API_ENDPOINTS from "./apiConfig";

function MainContent() {
    const [lunches, setLunches] = useState([]);

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        fetch(API_ENDPOINTS.lunches, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
            },
        })
          .then((res) => res.json())
          .then((data) => {
              const lunchArray = Object.entries(data).map(([id, lunch]) => ({
                  id,
                  ...lunch,
              }));
              setLunches(lunchArray);
          });
      }, []);
  
      return (
          <main>
              {lunches.map((lunch) => (
                  <Lunch key={lunch.id} lunch={lunch} />
              ))}
          </main>
      );
}

export default MainContent;
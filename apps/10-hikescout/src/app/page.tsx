"use client";

import { useState, useRef } from "react";
import styles from "./page.module.css";

interface HikeFormData {
  startLocation: string;
  duration: string;
  distance: string;
  terrain: string;
  foodPreference: string;
}

interface HikeResponse {
  name: string;
  location: string;
  transport: string;
  description: string;
  difficulty: string;
  foodStops: string;
  returnOptions: string;
  tips: string;
}

const terrainTypes = ["woodland", "hills", "coast", "mixed"];
const foodTypes = ["pub lunch", "cafe", "picnic spots", "restaurant"];

export default function Home() {
  const [formData, setFormData] = useState<HikeFormData>({
    startLocation: "London",
    duration: "",
    distance: "",
    terrain: "",
    foodPreference: "",
  });
  const [hikeResponse, setHikeResponse] = useState<HikeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate-hike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setHikeResponse(data);
    } catch (error) {
      console.error("Error generating hike:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSurpriseMe = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const randomData: HikeFormData = {
      startLocation: formData.startLocation,
      duration: `${Math.floor(Math.random() * 4) + 2} hours`,
      distance: "2 hours from " + formData.startLocation,
      terrain: terrainTypes[Math.floor(Math.random() * terrainTypes.length)],
      foodPreference: foodTypes[Math.floor(Math.random() * foodTypes.length)],
    };

    try {
      const response = await fetch("/api/generate-hike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(randomData),
      });

      const data = await response.json();
      setHikeResponse(data);
      setFormData(randomData);
    } catch (error) {
      console.error("Error generating surprise hike:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>HikeScout</h1>
          <p className={styles.heroSubtitle}>
            Day hike recommendations for anywhere in the world
          </p>
          <button onClick={scrollToForm} className={styles.heroButton}>
            Plan my hike
          </button>
        </div>
      </section>

      <section ref={formRef} className={styles.formSection}>
        <div className={styles.formBackground} />
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="startLocation">
                Where are you starting from?
              </label>
              <input
                type="text"
                id="startLocation"
                name="startLocation"
                placeholder="Enter any address, city, station, or landmark"
                value={formData.startLocation}
                onChange={handleInputChange}
                required
              />
              <span className={styles.helperText}>
                Try something like "Kings Cross Station" or "Manchester City
                Centre"
              </span>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="duration">How long would you like to hike?</label>
              <input
                type="text"
                id="duration"
                name="duration"
                placeholder="e.g. 4 hours or 10km"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="distance">
                How far are you willing to travel?
              </label>
              <input
                type="text"
                id="distance"
                name="distance"
                placeholder="e.g. 1 hour by train or 50 miles"
                value={formData.distance}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="terrain">
                What type of terrain do you prefer?
              </label>
              <select
                id="terrain"
                name="terrain"
                value={formData.terrain}
                onChange={handleInputChange}
                required
              >
                <option value="">Select terrain type</option>
                <option value="woodland">Woodland</option>
                <option value="hills">Hills</option>
                <option value="coast">Coast</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="foodPreference">
                Any food or coffee preferences?
              </label>
              <input
                type="text"
                id="foodPreference"
                name="foodPreference"
                placeholder="e.g. Pub lunch, coffee shop, picnic spots"
                value={formData.foodPreference}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className={styles.button}
                disabled={loading}
              >
                {loading ? "Finding your perfect hike..." : "Find My Hike"}
              </button>
              <button
                type="button"
                onClick={handleSurpriseMe}
                className={styles.surpriseButton}
                disabled={loading}
              >
                {loading ? "Generating..." : "Surprise Me!"}
              </button>
            </div>
          </form>

          {hikeResponse && (
            <div className={styles.response}>
              <h2>{hikeResponse.name}</h2>
              <div className={styles.responseSection}>
                <h3>📍 Location</h3>
                <p>{hikeResponse.location}</p>
              </div>
              <div className={styles.responseSection}>
                <h3>🚂 Getting There</h3>
                <p>{hikeResponse.transport}</p>
              </div>
              <div className={styles.responseSection}>
                <h3>🥾 About the Hike</h3>
                <p>{hikeResponse.description}</p>
                <p>
                  <strong>Difficulty:</strong> {hikeResponse.difficulty}
                </p>
              </div>
              <div className={styles.responseSection}>
                <h3>🍽️ Food & Drinks</h3>
                <p>{hikeResponse.foodStops}</p>
              </div>
              <div className={styles.responseSection}>
                <h3>🏠 Return Journey</h3>
                <p>{hikeResponse.returnOptions}</p>
              </div>
              <div className={styles.responseSection}>
                <h3>🧥 What to Bring</h3>
                <p>{hikeResponse.tips}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

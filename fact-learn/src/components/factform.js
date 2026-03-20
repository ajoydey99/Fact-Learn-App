import { useState } from "react";
import { CATEGORIES } from "./initials";
import supabase from "../supabase";

export function NewFactForm({ setFacts, setShowForm }) {
  const [fact, setFact] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = fact.length;

  function isValidUrl(urlString) {
    try {
      // Attempt to create a new URL object
      new URL(urlString);
      return true;
    } catch (err) {
      // If a TypeError is thrown, the URL is invalid
      return false;
    }
  }

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();

    // 2. Check if data is valid. If so, create a new fact
    if (fact && isValidUrl(source) && category && textLength <= 200) {
      // 3. Create a new fact object
      // const newFact = {
      //   id: Math.round(Math.random() * 1000000),
      //   fact,
      //   source,
      //   category,
      //   votesLike: 0,
      //   votesAwesome: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. Upload fact to Supabase and receive new fact object

      setIsUploading(true);

      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ fact, source, category }])
        .select();

      setIsUploading(false);

      // 4. Add new fact to the UI, Add the fact to state

      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5. Reset input fields
      setFact("");
      setSource("");
      setCategory("");

      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={fact}
        onChange={(e) => setFact(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength} letters</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

import { CATEGORIES } from "./initials";
import supabase from "../supabase";
import { useState } from "react";

export function Factlist({ setFacts, facts }) {
  if (facts.length === 0) {
    return <p className="message">No facts found for this category!!!</p>;
  }

  return (
    <section>
      <ul className="fact-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>
        There are {facts.length} facts found in the database. Add new facts!
      </p>
    </section>
  );
}

export function Fact({ setFacts, fact }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = fact.votesLike + fact.votesAwesome < fact.votesFalse;

  async function handleVote(buttonClick) {
    setIsUpdating(true);

    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [buttonClick]: fact[buttonClick] + 1 })
      .eq("id", fact.id)
      .select();

    setIsUpdating(false);

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)),
      );
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[⛔DISPUTED]</span> : null}
        {fact.fact}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button onClick={() => handleVote("votesLike")} disabled={isUpdating}>
          👍{fact.votesLike}
        </button>
        <button
          onClick={() => handleVote("votesAwesome")}
          disabled={isUpdating}
        >
          😲{fact.votesAwesome}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          🔻{fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

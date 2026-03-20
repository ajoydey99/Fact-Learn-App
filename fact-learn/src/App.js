import { useEffect, useState } from "react";

// importing database and css files
import supabase from "./supabase";
import "./style.css";

// importing all components here
import { Factlist } from "./components/fact";
import { NewFactForm } from "./components/factform";
import { CategoryFilter } from "./components/catergoryfilter";

function App() {
  // 1.Define state variable
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        // collecting data from supabase
        let query = supabase.from("facts").select("*");

        // if category is not default category
        if (currentCategory !== "all") {
          // then set selected category
          query = query.eq("category", currentCategory);
        }

        // order and limit the data
        const { data: facts, error } = await query
          .order("created_at", { ascending: false })
          .limit(20);

        if (!error) setFacts(facts);
        else alert(error.message);
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory],
  );

  return (
    <>
      {/* Header section */}
      <Header showForm={showForm} setShowForm={setShowForm} />

      {/* 2.Use State variable*/}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <Factlist facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Fact Learn App";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="app-logo" />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        //  3.Update State variable
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

export default App;

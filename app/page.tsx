"use client";
import { useState } from "react";
import Button from "./components/button";
import SearchBar from "./components/searchBar";
import Card from "./components/card";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <main className="flex h-full w-full justify-center">
      <div id="buttonContainer" className="flex flex-col w-2/4 justify-center">
        <Button buttonName="Characters" />
        <Button buttonName="Villages" />
        <Button buttonName="Jutsu" />
      </div>
      <div
        id="contentContainer"
        className="flex flex-col w-full justify-center items-center"
      >
        <SearchBar onQuery={setQuery} />
        <Card query={query} />
      </div>
    </main>
  );
}

// https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
// https://dev.to/andydziabo/how-to-pass-data-between-sibling-components-in-react-2cjg

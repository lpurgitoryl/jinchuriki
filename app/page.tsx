"use client";
import { useId, useState } from "react";
import Button from "./components/button";
import SearchBar from "./components/searchBar";
import Card from "./components/card";

export default function Home() {
  const [query, setQuery] = useState("");
  const [currId, setID] = useState(1344);

  return (
    <main className="flex h-full w-full justify-center">
      <Button
        buttonName="Previous Character"
        onID={setID}
        isLeft={true}
        ID={currId}
      />
      <div
        id="contentContainer"
        className="flex flex-col w-full justify-center items-center"
      >
        <SearchBar onQuery={setQuery} />
        <Card query={query} cID={currId} />
      </div>
      <Button
        buttonName="Next Character"
        onID={setID}
        isLeft={false}
        ID={currId}
      />
      <div>{currId}</div>
    </main>
  );
}

// https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
// https://dev.to/andydziabo/how-to-pass-data-between-sibling-components-in-react-2cjg

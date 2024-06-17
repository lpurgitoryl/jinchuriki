import Image from "next/image";
import Button from "./components/button";
import SearchBar from "./components/searchBar";
import Card from "./components/card";

const baseURL = "https://narutodb.xyz/api/";

export default function Home() {
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
        <SearchBar />
        <Card />
      </div>
    </main>
  );
}

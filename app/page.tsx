import Image from "next/image";
import Button from "./components/button";
import SearchBar from "./components/searchBar";

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
        <div className="w-1/2 flex">
          <input
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>

        <div id="cardSection" className="w-1/2 h-3/4 flex px-4 py-4">
          <div
            id="card"
            className="mx-4 my-4 px-4 py-4 block w-full border border-black"
          >
            <div id="cardTitle">card title goes here</div>
            <div id="cardContent">content goes here</div>
            <div id="cardDescription">card info goes here</div>
          </div>
        </div>
      </div>
    </main>
  );
}

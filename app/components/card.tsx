import useSWR from "swr";
import Image from "next/image";
const baseURL = "https://narutodb.xyz/api/";
import CardComponent from "./cardComponent";
import { useState } from "react";

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

function useCharacter({ query }: { query: string }) {
  const { data, error, isLoading } = useSWR<JSON>(
    "https://narutodb.xyz/api/character/search?name=" +
      query.trim().replace(/\s/g, "%20"),
    fetcher
  );

  return {
    characterByQuery: data,
    isLoadingCharacterByQuery: isLoading,
    isErrorCharacterByQuery: error,
  };
}

function useCharacterID(id: number) {
  const { data, error, isLoading } = useSWR<JSON>(
    baseURL + "character/" + id,
    fetcher
  );

  return {
    characterByID: data,
    isLoadingCharacterByID: isLoading,
    isErrorCharacterByID: error,
  };
}

export default function Card({ query, cID }: { query: string; cID: number }) {
  const {
    characterByQuery,
    isLoadingCharacterByQuery,
    isErrorCharacterByQuery,
  } = useCharacter({ query });

  const { characterByID, isLoadingCharacterByID, isErrorCharacterByID } =
    useCharacterID(cID);

  // if next character
  // either is loading
  if (isLoadingCharacterByQuery || isLoadingCharacterByID)
    return <div>loading...</div>;

  // only one has errors
  if (
    isErrorCharacterByQuery &&
    !isErrorCharacterByID &&
    !isLoadingCharacterByID
  ) {
    return <CardComponent data={characterByID} />;
  }

  // character
  if (!isErrorCharacterByQuery)
    return <CardComponent data={characterByQuery} />;
}

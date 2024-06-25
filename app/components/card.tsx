import useSWR from "swr";
import Image from "next/image";
const baseURL = "https://narutodb.xyz/api/";
async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
function useCharacter({ query }: { query: string }) {
  const { data, error, isLoading } = useSWR(
    "https://narutodb.xyz/api/character/search?name=" +
      query.trim().replace(/\s/g, "%20"),
    fetcher
  );

  return {
    character: data,
    isLoading,
    isError: error,
  };
}
export default function Card({ query }: { query: string }) {
  const { character, isError, isLoading } = useCharacter({ query });

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return (
    <div id="cardSection" className="w-1/2 h-3/4 flex px-4 py-4">
      <div
        id="card"
        className="mx-4 my-4 px-4 py-4 block w-full border border-black"
      >
        <div id="cardTitle">{character.name}</div>
        <div id="cardContent">content goes here</div>
        {/* <div id="cardDescription">{JSON.stringify(character)}</div> */}
        <Image
          src={character.images[0]}
          width={500}
          height={500}
          alt="character image"
        />
        {/* <div>{character.debut}</div> */}
        {/* <div>{character.jutsu}</div> */}
        <div>{character.natureType}</div>
      </div>
    </div>
  );
}

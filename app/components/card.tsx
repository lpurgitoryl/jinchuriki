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

export default function Card({ query }: { query: string }) {
  const {
    characterByQuery,
    isLoadingCharacterByQuery,
    isErrorCharacterByQuery,
  } = useCharacter({ query });

  const { characterByID, isLoadingCharacterByID, isErrorCharacterByID } =
    useCharacterID(1344);

  // both have errors case

  // only one has errors
  if (
    isErrorCharacterByQuery &&
    !isErrorCharacterByID &&
    !isLoadingCharacterByID
  ) {
    return (
      <div id="cardSection" className="w-1/2 h-3/4 flex px-4 py-4">
        <div
          id="card"
          className="mx-4 my-4 px-4 py-4 w-full border-2 border-black rounded-lg flex flex-col items-center"
        >
          <div id="cardTitle">{characterByID.name}</div>
          <Image
            src={characterByID.images[0]}
            width={200}
            height={200}
            alt="character image"
          />
          <div>
            <button
              className="border-2 border-grey rounded-md px-2 py-2 my-2 mx-2"
              id="nextImageLeft"
            >
              &lt;
            </button>
            <button
              className="border-2 border-grey rounded-md px-2 py-2 my-2 mx-2"
              id="nextImageRight"
            >
              &gt;
            </button>
          </div>
          <div className="">{characterByID.natureType}</div>
        </div>
      </div>
    );
  }

  // either is loading
  if (isLoadingCharacterByQuery || isLoadingCharacterByID)
    return <div>loading...</div>;

  // character
  if (!isErrorCharacterByQuery)
    return (
      // <div id="cardSection" className="w-1/2 flex px-4 py-4">
      //   <div
      //     id="card"
      //     className="mx-4 my-4 px-4 py-4 block w-full border border-black"
      //   >
      //     <div id="cardTitle">{characterByQuery.name}</div>
      //     <div id="cardContent">content goes here</div>
      //     {/* <div id="cardDescription">{JSON.stringify(character)}</div> */}
      //     <Image
      //       src={characterByQuery.images[0]}
      //       width={500}
      //       height={500}
      //       alt="character image"
      //     />
      //     <div className="flex place-content-around">
      //       <button
      //         className="border-2 border-black rounded-md px-2 py-2"
      //         id="nextImageLeft"
      //       >
      //         &lt;
      //       </button>
      //       <button id="nextImageRight">&gt;</button>
      //     </div>
      //     <div className="overflow">{characterByQuery.natureType}</div>
      //   </div>
      // </div>
      <div>test</div>
    );
}

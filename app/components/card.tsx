import useSWR from "swr";
import Image from "next/image";
const baseURL = "https://narutodb.xyz/api/";
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

export default function Card({ query }: { query: string }) {
  const {
    characterByQuery,
    isLoadingCharacterByQuery,
    isErrorCharacterByQuery,
  } = useCharacter({ query });

  const { characterByID, isLoadingCharacterByID, isErrorCharacterByID } =
    useCharacterID(1344);

  const [imageIndex, setIndex] = useState(0);

  function handleImageChange(imageArr: string[], isLeft: boolean) {
    if (isLeft && imageIndex > 0) {
      setIndex(imageIndex - 1);
      return;
    } else if (!isLeft && imageIndex < imageArr.length - 1) {
      setIndex(imageIndex + 1);
      return;
    }
  }
  // both have errors case

  // only one has errors
  if (
    isErrorCharacterByQuery &&
    !isErrorCharacterByID &&
    !isLoadingCharacterByID
  ) {
    return (
      <div id="cardSection" className="w-1/2 flex px-4 py-4">
        <div
          id="card"
          className="mx-4 my-4 px-4 py-4 w-full border-2 border-black rounded-lg flex flex-col items-center"
        >
          <div className="font-bold " id="cardTitle">
            {characterByID.name}
          </div>
          <Image
            src={characterByID.images[imageIndex]}
            width={200}
            height={200}
            alt="character image"
          />
          {characterByID.images.length > 1 ? (
            <div>
              <button
                className="border-2 border-grey rounded-md px-2 py-2 my-2 mx-2 active:bg-gray-200"
                id="nextImageLeft"
                onClick={() => {
                  handleImageChange(characterByID.images, true);
                }}
              >
                &lt;
              </button>
              <button
                className="border-2 border-grey rounded-md px-2 py-2 my-2 mx-2 active:bg-gray-200"
                id="nextImageRight"
                onClick={() => {
                  handleImageChange(characterByID.images, false);
                }}
              >
                &gt;
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="font-semibold text-wrap max-w-full break-words">
            {characterByID.personal.birthdate != null ? (
              <div> Birthdate: {characterByID.personal.birthdate}</div>
            ) : (
              ""
            )}
            {characterByID.personal.sex != null ? (
              <div> Sex: {characterByID.personal.sex}</div>
            ) : (
              ""
            )}
            {characterByID.personal.bloodType != null ? (
              <div>Blood Type: {characterByID.personal.bloodType}</div>
            ) : (
              ""
            )}
            {characterByID.personal.affiliation != null ? (
              <div>
                Affiliation(s):
                {characterByID.personal.affiliation.length > 1
                  ? characterByID.personal.affiliation.map((el) => {
                      return el + ", ";
                    })
                  : characterByID.personal.affiliation[0]}
              </div>
            ) : (
              ""
            )}
            {characterByID.personal.affiliation != null ? (
              <div>
                Occupation(s):
                {characterByID.personal.occupation.length > 1
                  ? characterByID.personal.occupation.map((el) => {
                      return el + ", ";
                    })
                  : characterByID.personal.occupation[0]}
              </div>
            ) : (
              ""
            )}
          </div>
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
      <div id="cardSection" className="w-1/2 flex px-4 py-4">
        <div
          id="card"
          className="mx-4 my-4 px-4 py-4 w-full border-2 border-black rounded-lg flex flex-col items-center"
        >
          <div className="font-bold " id="cardTitle">
            {characterByQuery.name}
          </div>
          <Image
            src={characterByQuery.images[imageIndex]}
            width={200}
            height={200}
            alt="character image"
          />
          {characterByQuery.images.length > 1 ? (
            <div>
              <button
                className="border-2 border-grey rounded-md px-2 py-2 my-2 mx-2 active:bg-gray-200"
                id="nextImageLeft"
                onClick={() => {
                  handleImageChange(characterByQuery.images, true);
                }}
              >
                &lt;
              </button>
              <button
                className="border-2 border-grey rounded-md px-2 py-2 my-2 mx-2 active:bg-gray-200"
                id="nextImageRight"
                onClick={() => {
                  handleImageChange(characterByQuery.images, false);
                }}
              >
                &gt;
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="font-semibold text-wrap max-w-full break-words">
            {characterByQuery.personal.birthdate != null ? (
              <div> Birthdate: {characterByQuery.personal.birthdate}</div>
            ) : (
              ""
            )}
            {characterByQuery.personal.sex != null ? (
              <div> Sex: {characterByQuery.personal.sex}</div>
            ) : (
              ""
            )}
            {characterByQuery.personal.bloodType != null ? (
              <div>Blood Type: {characterByQuery.personal.bloodType}</div>
            ) : (
              ""
            )}
            {characterByQuery.personal.affiliation != null ? (
              <div>
                Affiliation(s):
                {characterByQuery.personal.affiliation.length > 1
                  ? characterByQuery.personal.affiliation.map((el) => {
                      return el + ", ";
                    })
                  : characterByQuery.personal.affiliation[0]}
              </div>
            ) : (
              ""
            )}
            {characterByQuery.personal.affiliation != null ? (
              <div>
                Occupation(s):
                {characterByQuery.personal.occupation.length > 1
                  ? characterByQuery.personal.occupation.map((el) => {
                      return el + ", ";
                    })
                  : characterByQuery.personal.occupation[0]}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
}

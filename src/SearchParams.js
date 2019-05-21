import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import { async } from "q";
import Results from "./Results";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA"); // this is a Hook. All hooks begin with 'use'
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS); //using the custom hook
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds); //using the custom hook
  const [pets, setPets] = useState([]);

  //asynch function is guaranteed to return a promise.
  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);

    console.log(animals);
  }

  // useEffect takes place of several life cycle hooks (componentDidMount, componentDidUpdate, componentWillMlount)
  // The way it works is it makes a call after render time. As soon as SearchParams renders the first time, then useEffect runs.
  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]); //the effect is not scheduled if one of these 3 parameters is not updated(list of dependerncies)!! This way we don't re-render the whole app unnecessarily on every keystroke

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

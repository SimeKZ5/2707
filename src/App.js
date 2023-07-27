import React, { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    // Poništimo prethodnu poruku o grešci
    setErrorMessage("");

    // Ako je searchTerm prazan, ne radimo ništa
    if (!searchTerm) {
      return;
    }

    // Dohvati podatke s iTunes search API-a
    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        searchTerm
      )}&entity=song`
    )
      .then((response) => response.json())
      .then((data) => {
        // Provjerimo je li rezultat prazan
        if (data.results.length === 0) {
          setErrorMessage("Tražena pjesma ne postoji na iTunes listi");
        } else {
          // Ako ima rezultata, postavimo ih u state
          setSearchResults(data.results);
        }
      })
      .catch((error) => {
        console.error("Greška prilikom dohvaćanja podataka:", error);
        setErrorMessage("Došlo je do greške prilikom dohvaćanja podataka");
      });
  };

  const handleInputChange = (event) => {
    // Ažuriramo searchTerm kad god se unese nešto u input field
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1 className=" text-emerald-500">Search App</h1>
      <input
        type="text"
        placeholder="Upišite termin..."
        value={searchTerm}
        onChange={handleInputChange}
        className=" bg-red-100 m rounded-xl py-2 px-4 text-center "
      />
      <button
        className=" bg-red-800 m rounded-xl py-2 px-4 text-center"
        onClick={handleSearch}
      >
        Pretraži
      </button>
      {errorMessage && <p>{errorMessage}</p>}
      {searchResults.length > 0 && (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="font-bold text-emerald-900">Ime pjesme</th>
              <th className="font-bold text-red-600">Umjetnik</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result) => (
              <tr key={result.trackId}>
                <td>{result.trackName}</td>
                <td>{result.artistName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

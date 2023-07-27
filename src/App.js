import React, { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    setErrorMessage("");
    if (!searchTerm) {
      return;
    }

    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        searchTerm
      )}&entity=song`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          setErrorMessage("Tražena pjesma ne postoji na iTunes listi");
        } else {
          setSearchResults(data.results);
        }
      })
      .catch((error) => {
        console.error("Greška:", error);
        setErrorMessage("Dohvacanje greska ne postoji na iTunes listi");
      });
  };

  const handleInputChange = (event) => {
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
        <table className=" table-auto">
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

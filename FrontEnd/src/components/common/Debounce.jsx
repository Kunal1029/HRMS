import { useState, useEffect } from "react";
import useDebounce from "../../pages/utils/useDebounce";
import "./common.css"

function Debounce({ inputText, data = [], delay = 500 }) {
  //   const [debouncedTerm, setDebouncedTerm] = useState("");

  const debouncedTerm = useDebounce(inputText, delay);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedTerm.trim() === "") {
      setResults([]);
      return;
    }

    const results = data.filter((item) =>
      item.toLowerCase().includes(debouncedTerm.toLowerCase())
    );

    setResults(results);
  }, [debouncedTerm, data]);

  return (
    <div className="debounce">
      {results.length > 0 ? (
        <div>
          {results.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Debounce;

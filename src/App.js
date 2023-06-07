import soapService from "./Service";
import { parseStringPromise } from "xml2js";
import "./App.css";
import { useState } from "react";

function App() {
  const [fahrenheit, setFahrenheit] = useState(0);
  const [celsius, setCelsius] = useState('');

  const handleFahrenheitChange = (e) => {
    setFahrenheit(e.target.value);
  };

  const fetchXML = async () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <CelsiusToFahrenheit xmlns="https://www.w3schools.com/xml/">
          <Celsius>${fahrenheit}</Celsius>
        </CelsiusToFahrenheit>
      </soap12:Body>
    </soap12:Envelope>
   `;

    const response = await soapService.post(
      "https://cors-anywhere.herokuapp.com/https://www.w3schools.com/xml/tempconvert.asmx",
      xml,
      {
        headers: {
          "Content-Type": "application/soap+xml; charset=utf-8",
        },
      }
    );

    parseStringPromise(response.data)
      .then((result) => {
        let filteredResponse = result["soap:Envelope"]["soap:Body"][0]['CelsiusToFahrenheitResponse'][0]['CelsiusToFahrenheitResult'][0];
        setCelsius(filteredResponse);
      })
      .catch((err) => {
        console.log("Erro ao converter: " + err);
      });
  };

  return (
    <>
      <h1>Converter Fahrenheit para Celsius</h1>
      <div>
        <label>
          Digite aqui a temperatura em Fahrenheit:{" "}
          <input
            type="text"
            value={fahrenheit}
            onChange={(e) => handleFahrenheitChange(e)}
          />
        </label>
        <button onClick={fetchXML}>Converter</button>
      </div>

      <div>
        O valor convetido é: {celsius}
      </div>
    </>
  );
}

export default App;

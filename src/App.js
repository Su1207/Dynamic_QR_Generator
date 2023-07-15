import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [qrCode, setQrCode] = useState("");
  const downloadRef = useRef(null);

  //changing the url when changing the input

  useEffect(() => {
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`
    );
  }, [word, size, bgColor]);

  //updating the input word when user click the generate button

  function handleClick() {
    setWord(temp);
  }

  function handleDownload() {
    downloadRef.current.click();
  }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <div className="input-box">
        <div className="generator">
          <input
            type="text"
            placeholder="Enter text to Encode"
            onChange={(e) => {
              setTemp(e.target.value);
            }}
          />
          <button className="btn" onClick={handleClick}>
            Generate
          </button>
        </div>

        <div className="extra">
          <h4>Bg Color:</h4>
          <input
            type="color"
            onChange={(e) => {
              setBgColor(e.target.value.substring(1));
            }}
          />
          <h4>Dimension:</h4>
          <input
            type="range"
            min="200"
            max="600"
            style={{ cursor: "pointer" }}
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="output-box">
        <img src={qrCode} alt="" />
        <a href={qrCode} download="QRCode" ref={downloadRef}></a>
        <button className="btn" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
}

export default App;

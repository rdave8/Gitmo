"use client";
import React, { useState, useEffect, useRef } from "react";

const ConfigPage: React.FC = () => {
  const [buttonText, setButtonText] = useState("DONATE HERE!");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [buttonRoundness, setButtonRoundness] = useState("S");
  const [svgCode, setSvgCode] = useState("");
  const [donateLink, setDonateLink] = useState("https://example.com/donate");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Update SVG code whenever a dependency changes
  useEffect(() => {
    const svgWidth = buttonText.length * 10 + 20; // Adjust width based on text length
    const svgHeight = 40;
    const borderRadius = buttonRoundness === "S" ? 4 : 
                         buttonRoundness === "M" ? 6 : 
                         buttonRoundness === "L" ? 8 : 
                         buttonRoundness === "XL" ? 12 : 
                         buttonRoundness === "24" ? 24 : 0;

    const newSvgCode = `
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
  <rect width="${svgWidth}" height="${svgHeight}" fill="${backgroundColor}" rx="${borderRadius}" ry="${borderRadius}" />
  <text x="50%" y="50%" fill="${textColor}" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" dy=".3em" font-weight="bold">${buttonText}</text>
</svg>`;
    setSvgCode(newSvgCode);
  }, [textColor, backgroundColor, buttonRoundness, buttonText, donateLink]);

  // Helper function to convert SVG to PNG and generate HTML with <img> and <a>
  const copyImgTagWithLink = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const svg = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svg);
    const img = new Image();

    img.onload = () => {
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context?.drawImage(img, 0, 0);

      // Create PNG data URL
      const pngUrl = canvas.toDataURL("image/png");

      // HTML with anchor <a> and base64 PNG in <img>
      const htmlWithAnchorAndImg = `<a href="${donateLink}" target="_blank"><img src="${pngUrl}" alt="Donate Button" /></a>`;

      // Copy the HTML to the clipboard
      navigator.clipboard.writeText(htmlWithAnchorAndImg)
        .then(() => alert("HTML with base64 PNG and link copied to clipboard!"))
        .catch(err => console.error("Failed to copy: ", err));

      URL.revokeObjectURL(url); // Clean up the URL object
    };

    img.src = url;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-orange-100 p-4 rounded-lg mb-4">
        <div className="text-sm text-orange-500 font-semibold mb-1">NEW CONFIG PAGE</div>
        <h2 className="text-xl font-bold mb-2">Welcome to our GitHub README button generator!</h2>
        <p className="text-gray-600 mb-4">Customize your button for your GitHub README and download it as PNG.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Button Text</label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Color</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Button Roundness</label>
            <div className="mt-2 flex space-x-2">
              {['S', 'M', 'L', 'XL', '24'].map((size) => (
                <button
                  key={size}
                  onClick={() => setButtonRoundness(size)}
                  className={`w-8 h-8 rounded-full border ${
                    buttonRoundness === size ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preview</label>
            <div dangerouslySetInnerHTML={{ __html: svgCode }} />
          </div>

          <div>
            <button
              onClick={copyImgTagWithLink}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Copy HTML with PNG and Link
            </button>
          </div>
        </div>
      </div>

      {/* Hidden canvas for PNG generation */}
      <canvas ref={canvasRef} width={140} height={40} style={{ display: "none" }} />
    </div>
  );
};

export default ConfigPage;

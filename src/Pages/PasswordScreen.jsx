import React, { useState, useRef } from "react";

export default function PasswordScreen({ onSuccess }) {
  const PIN_LENGTH = 4;
  const [pin, setPin] = useState(new Array(PIN_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  const correctPin = ["1", "2", "3", "4"]; // your 4-digit PIN

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // only digits allowed

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move to next box if filled
    if (value && index < PIN_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Check PIN if all boxes filled
    if (newPin.every((d) => d !== "")) {
      if (newPin.join("") === correctPin.join("")) {
        onSuccess();
      } else {
        setError("Incorrect PIN");
        setPin(new Array(PIN_LENGTH).fill(""));
        inputsRef.current[0].focus();
      }
    } else {
      setError("");
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-80">
        <h2 className="text-xl font-semibold mb-4">Enter 4-Digit PIN</h2>
        <div className="flex justify-between gap-3 mb-3">
          {pin.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}

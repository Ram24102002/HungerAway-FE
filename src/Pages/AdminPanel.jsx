import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

// Minimalist PIN Input Screen
function PasswordScreen({ onSuccess }) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);


  useEffect(() => {
  setTimeout(() => {
    inputsRef.current[0]?.focus();
    if (isMobile) {
      inputsRef.current[0]?.click(); // Helps trigger mobile keyboard
    }
  }, 300);
}, []);



useEffect(() => {
  if (pin.join("").length === 4) {
    if (pin.join("") === correctPin.join("")) {
      onSuccess(); // Auto login
    } else {
      setError("Incorrect PIN");
      setTimeout(() => {
        setPin(["", "", "", ""]);
        inputsRef.current[0]?.focus();
      }, 500);
    }
  }
}, [pin]);


  const correctPin = ["1", "2", "3", "4"]; // change to your PIN

  const handleChange = (e, idx) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[idx] = value;
    setPin(newPin);
    setError("");

    if (value && idx < 3) {
      inputsRef.current[idx + 1]?.focus();
    }

    if (newPin.every((d) => d !== "")) {
      if (newPin.join("") === correctPin.join("")) {
        onSuccess();
      } else {
        setError("Incorrect PIN");
        inputsRef.current[0]?.parentElement?.classList.add("shake");
        setTimeout(() => {
          inputsRef.current[0]?.parentElement?.classList.remove("shake");
          setPin(["", "", "", ""]);
          inputsRef.current[0]?.focus();
        }, 500);
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !pin[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .shake { animation: shake 0.5s ease-in-out; }
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
        .input-enter { animation: pulse 0.2s ease-out; }
      `}</style>

      <div className="w-full max-w-xs mb-30 px-6 fade-in-up">
        <h2 className="text-2xl font-light mb-12 text-center text-gray-800">
          Enter PIN
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          {pin.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onFocus={(e) => e.target.classList.add("input-enter")}
              onAnimationEnd={(e) => e.target.classList.remove("input-enter")}
              ref={(el) => (inputsRef.current[idx] = el)}
              className="w-14 h-14 text-center text-2xl font-light border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-all duration-300"
            />
          ))}
        </div>

        {error && (
          <p className="text-gray-600 text-sm text-center font-light fade-in-up">
            {error}
          </p>
        )}
        <p className="w-full flex items-center justify-center" >Enter : 1234</p>
      <p className="w-full flex items-center justify-center mt-10"><Link to='/'><u>Home</u></Link></p>
      </div>
    </div>
  );
}

// Main component
export default function Inbox() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      {!authenticated ? (
        <PasswordScreen onSuccess={() => setAuthenticated(true)} />
        // <AdminDashboard onSuccess={() => setAuthenticated(true)} />
      ) : (
        <AdminDashboard />
      )}
    </>
  );
}

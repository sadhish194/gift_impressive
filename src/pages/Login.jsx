import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("login"); // login | otp
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const isValidIdentifier = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10,13}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleSendOtp = () => {
    setError("");

    if (!isValidIdentifier(identifier)) {
      setError("Enter a valid email or phone number");
      return;
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otpCode);
    setStep("otp");

    alert(`Demo OTP: ${otpCode}`); // demo only
  };

  const handleVerifyOtp = () => {
    if (Number(otp) !== generatedOtp) {
      setError("Invalid OTP");
      return;
    }

    login(identifier);
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>{step === "login" ? "Login" : "Verify OTP"}</h2>

        {step === "login" && (
          <>
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button onClick={handleSendOtp}>
              Send OTP
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="otp-info">
              OTP sent to <strong>{identifier}</strong>
            </p>

            <input
              type="number"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button onClick={handleVerifyOtp}>
              Verify & Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

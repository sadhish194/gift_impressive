import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/";

  const [step, setStep] = useState("login");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);

  const isValidIdentifier = (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const generateAndSendOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otpCode);
    setTimer(30);
    alert(`Demo OTP: ${otpCode}`);
  };

  const handleSendOtp = () => {
    setError("");
    if (!isValidIdentifier(identifier)) {
      setError("Enter a valid email or phone number");
      return;
    }
    generateAndSendOtp();
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    if (Number(otp) !== generatedOtp) {
      setError("Invalid OTP");
      return;
    }
    login(identifier);
    navigate(redirectTo, { replace: true });
  };

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="title">
          {step === "login" ? "Login" : "Verify OTP"}
        </h2>

        {step === "login" && (
          <>
            <input
              className="input"
              type="text"
              placeholder="Email or Phone Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button className="primary-btn" onClick={handleSendOtp}>
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
              className="input otp-input"
              type="number"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button className="primary-btn" onClick={handleVerifyOtp}>
              Verify & Login
            </button>

            <button
              className="resend-btn"
              onClick={generateAndSendOtp}
              disabled={timer > 0}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

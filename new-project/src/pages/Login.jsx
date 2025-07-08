import React, { useState } from "react";

const floatingSymbols = ["💖", "🌸", "🌈", "😊", "✨", "🌷", "🌞"];

const Auth = ({ setCurrentRoute }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleAuth = () => {
    setError("");
    if (!email || !password || (isSignUp && !confirmPassword)) {
      setError("Please fill in all fields.");
      triggerShake();
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      triggerShake();
      return;
    }
    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      triggerShake();
      return;
    }

    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (isSignUp) {
        alert("Account created successfully!");
        clearForm();
        setIsSignUp(false);
      } else {
        setCurrentRoute("dashboard");
      }
    }, 1500);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 flex items-center justify-center overflow-hidden">

      {/* Background Blur Circles */}
      <div className="absolute w-72 h-72 bg-pink-300 opacity-30 rounded-full top-10 left-10 filter blur-3xl animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-300 opacity-30 rounded-full bottom-20 right-20 filter blur-3xl animate-pulse"></div>

      {/* Floating Symbols */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {floatingSymbols.map((symbol, index) => (
          <div
            key={index}
            className={`absolute text-5xl opacity-20 hover:scale-110 transition-transform duration-300 animate-floating`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${index * 1.5}s`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Auth Card */}
      <div
        className={`relative z-10 max-w-md w-full bg-white rounded-xl p-8 shadow-2xl border-4 border-transparent bg-clip-padding backdrop-filter backdrop-blur-md transition-transform ${shake ? "animate-shake" : ""
          }`}
        style={{
          borderImage: "linear-gradient(to right, #f472b6, #c084fc) 1",
        }}
      >
        <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-6">
          {isSignUp ? "Create an Account 💫" : "Welcome Back 💫"}
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-center font-medium">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          )}

          <button
            onClick={handleAuth}
            disabled={!email || !password || (isSignUp && !confirmPassword) || isLoading}
            className={`w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-medium transition-all hover:from-pink-600 hover:to-purple-600 ${(!email || !password || (isSignUp && !confirmPassword) || isLoading) && "opacity-50 cursor-not-allowed"}`}
          >
            {isLoading ? (isSignUp ? "Creating..." : "Signing In...") : (isSignUp ? "Sign Up" : "Sign In")}
          </button>
        </div>

        <p className="text-center mt-4 text-gray-600">
          {isSignUp ? "Already have an account? " : "Don’t have an account? "}
          <button
            onClick={() => {
              clearForm();
              setIsSignUp(!isSignUp);
            }}
            className="text-pink-600 hover:underline font-semibold"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
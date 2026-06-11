import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
const [email, setEmail] = useState("");
const [error, setError] = useState("");

const navigate = useNavigate();
const { login } = useAuth();

const handleSubmit = (e) => {
e.preventDefault();

if (!email.trim()) {
  setError("Email is required");
  return;
}

const gmailRegex =
  /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

if (!gmailRegex.test(email)) {
  setError(
    "Only Gmail addresses are allowed"
  );
  return;
}

setError("");

login(email);

navigate("/dashboard");

};

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">
        Internship Tracker
      </h1>
              <p className="text-gray-500 text-center mb-6">
  Track and manage your internship applications
</p>

  <form
    onSubmit={handleSubmit}
    className="space-y-4"
  >
    <input
      type="email"
      placeholder="Enter Gmail Address"
      value={email}
      required
      onChange={(e) =>
        setEmail(e.target.value)
      }
      className="w-full border rounded-lg p-3"
    />

    {error && (
      <p className="text-red-600">
        {error}
      </p>
    )}

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
    >
      Login
    </button>
  </form>
</div>
</div>
);
}

export default Login;

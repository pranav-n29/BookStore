import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const { register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);

		try {
			await register(name, email, password);
			navigate("/");
		} catch (err) {
			setError(err?.response?.data?.message || "Registration failed");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen">
			<form
				onSubmit={handleSubmit}
				className="bg-slate-900 p-6 rounded-xl w-80 space-y-4"
			>
				<h2 className="text-xl font-bold text-center">Register 🧾</h2>

				{error ? <p className="text-sm text-red-400">{error}</p> : null}

				<input
					className="w-full p-2 rounded bg-slate-800 text-white"
					type="text"
					value={name}
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
					required
				/>

				<input
					className="w-full p-2 rounded bg-slate-800 text-white"
					type="email"
					value={email}
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<input
					type="password"
					className="w-full p-2 rounded bg-slate-800 text-white"
					value={password}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					required
					minLength={6}
				/>

				<button
					className="w-full bg-blue-500 py-2 rounded disabled:opacity-50"
					disabled={submitting}
				>
					{submitting ? "Creating account..." : "Register"}
				</button>

				<p className="text-sm text-slate-300 text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-300 underline">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Register;

import { useState } from "react";
import { forgotPassword } from "../../services/authService";

export default function ForgotPassword() {

const [email,setEmail] = useState("");
const [loading,setLoading] = useState(false);
const [message,setMessage] = useState("");
const [error,setError] = useState("");

const handleSubmit = async(e)=>{

e.preventDefault();

setLoading(true);
setError("");
setMessage("");

try{

await forgotPassword(email);

setMessage("Reset link sent to your email");
setEmail("");

}catch(err){

setError(
err.response?.data?.message || "Something went wrong"
);

}

setLoading(false);

};


return (

<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

<div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

<h2 className="text-2xl font-semibold text-center mb-6">
Forgot Password
</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<input
type="email"
placeholder="Enter your email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<button
type="submit"
disabled={loading}
className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
>

{loading ? "Sending..." : "Send Reset Link"}

</button>

</form>


{message && (

<p className="text-green-600 text-center mt-4">
{message}
</p>

)}

{error && (

<p className="text-red-600 text-center mt-4">
{error}
</p>

)}

</div>

</div>

);
}
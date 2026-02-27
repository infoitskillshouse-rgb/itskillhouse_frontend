import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";

export default function ResetPassword() {

const { token } = useParams();
const navigate = useNavigate();

const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [loading,setLoading] = useState(false);
const [error,setError] = useState("");
const [message,setMessage] = useState("");


const handleSubmit = async(e)=>{

e.preventDefault();

setError("");
setMessage("");

if(password !== confirmPassword){

setError("Passwords do not match");
return;

}

setLoading(true);

try{

await resetPassword(token,password);

setMessage("Password reset successful");

setTimeout(()=>{

navigate("/admin/login");

},2000);

}catch(err){

setError(
err.response?.data?.message || "Reset failed"
);

}

setLoading(false);

};


return (

<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

<div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

<h2 className="text-2xl font-semibold text-center mb-6">
Reset Password
</h2>


<form onSubmit={handleSubmit} className="space-y-4">

<input
type="password"
placeholder="New Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
required
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


<button
type="submit"
disabled={loading}
className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
>

{loading ? "Resetting..." : "Reset Password"}

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
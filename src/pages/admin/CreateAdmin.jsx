import { useState } from "react";
import { createAdmin } from "../../services/authService";

export default function CreateAdmin() {

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);
const [message,setMessage] = useState("");
const [error,setError] = useState("");


const handleSubmit = async(e)=>{

e.preventDefault();

setLoading(true);
setError("");
setMessage("");

try{

await createAdmin({
name,
email,
password
});

setMessage("Admin created successfully");

setName("");
setEmail("");
setPassword("");

}catch(err){

setError(
err.response?.data?.message || "Failed to create admin"
);

}

setLoading(false);

};


return (

<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

<div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

<h2 className="text-2xl font-semibold text-center mb-6">
Create Admin
</h2>


<form onSubmit={handleSubmit} className="space-y-4">


<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>


<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>



<button
type="submit"
disabled={loading}
className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
>

{loading ? "Creating..." : "Create Admin"}

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
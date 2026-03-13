import { useEffect, useState } from "react";
import { getProfile } from "../../services/authService";

export default function AdminProfile() {

const [admin,setAdmin] = useState(null);
const [loading,setLoading] = useState(true);
const [error,setError] = useState("");

useEffect(()=>{

const fetchProfile = async ()=>{

try{

const data = await getProfile();

setAdmin(data.admin); // ✅ FIX

}catch(err){

setError("Failed to load profile");

}

setLoading(false);

};

fetchProfile();

},[]);


if(loading){

return (
<div className="min-h-screen flex items-center justify-center">
Loading...
</div>
);

}


if(error){

return (
<div className="min-h-screen flex items-center justify-center text-red-600">
{error}
</div>
);

}


return (

<div className="min-h-screen bg-gray-100 p-6">

<div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">

<h2 className="text-2xl font-semibold mb-6 text-center">
Admin Profile
</h2>

<div className="space-y-4">

<div>
<p className="text-gray-500">Name</p>
<p className="font-medium">{admin?.name}</p>
</div>

<div>
<p className="text-gray-500">Email</p>
<p className="font-medium">{admin?.email}</p>
</div>

</div>

</div>

</div>

);
}
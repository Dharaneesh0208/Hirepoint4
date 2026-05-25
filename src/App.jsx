import { useState,useEffect } from "react";
import axios from "axios";
import "./App.css";

function App(){

const [experts,setExperts]=useState([]);
const [filtered,setFiltered]=useState([]);

const [name,setName]=useState("");
const [skill,setSkill]=useState("");
const [location,setLocation]=useState("");

const [search,setSearch]=useState("");
const [editId,setEditId]=useState(null);

const [showAuth,setShowAuth]=useState(false);
const [type,setType]=useState("");

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const fetchExperts=async()=>{
const res=
await axios.get(
"http://localhost:5000/experts"
);

setExperts(res.data);
setFiltered(res.data);
};

useEffect(()=>{
fetchExperts();
},[]);

const saveExpert=async()=>{

if(!name||!skill||!location){
alert("Fill all fields");
return;
}

if(editId){

await axios.put(
`http://localhost:5000/experts/${editId}`,
{name,skill,location}
);

setEditId(null);

}else{

await axios.post(
"http://localhost:5000/experts",
{name,skill,location}
);
}

setName("");
setSkill("");
setLocation("");

fetchExperts();
};

const deleteExpert=async(id)=>{
await axios.delete(
`http://localhost:5000/experts/${id}`
);
fetchExperts();
};

const editExpert=(expert)=>{
setName(expert.name);
setSkill(expert.skill);
setLocation(expert.location);
setEditId(expert._id);
};

const searchExpert=()=>{
const result=
experts.filter((e)=>
e.location
.toLowerCase()
.includes(
search.toLowerCase()
)
);

setFiltered(result);
};

const validate=()=>{

const regex=/\S+@\S+\.\S+/;

if(!regex.test(email)){
alert("Invalid Email");
return;
}

if(password.length<6){
alert("Password minimum 6");
return;
}

alert(type+" Success");
setShowAuth(false);
};

return(
<>
<header>
<h1>HirePoint</h1>

<nav>
<a href="#home">Home</a>
<a href="#about">About</a>
<a href="#features">Features</a>
<a href="#footer">Contact</a>
</nav>

<div>
<button onClick={()=>{
setType("Login");
setShowAuth(true);
}}>
Login
</button>

<button onClick={()=>{
setType("Signup");
setShowAuth(true);
}}>
Sign Up
</button>
</div>
</header>

<section className="hero" id="home">
<h2>Hire Nearby Experts</h2>
<p>Find professionals instantly</p>
</section>

<section id="about">
<h2>About HirePoint</h2>
</section>

<section id="features">
<h2>Features</h2>
</section>

<section>

<input
placeholder="Search by Location"
onChange={(e)=>
setSearch(e.target.value)}
/>

<button onClick={searchExpert}>
Search
</button>

</section>

<section>

<input
placeholder="Name"
value={name}
onChange={(e)=>
setName(e.target.value)}
/>

<input
placeholder="Skill"
value={skill}
onChange={(e)=>
setSkill(e.target.value)}
/>

<input
placeholder="Location"
value={location}
onChange={(e)=>
setLocation(e.target.value)}
/>

<button onClick={saveExpert}>
{editId?"Update":"Add"}
</button>

{
filtered.length===0
?
<h2>No Experts Found</h2>
:
filtered.map((expert)=>(

<div
className="expert"
key={expert._id}
>

<h3>{expert.name}</h3>
<p>{expert.skill}</p>
<p>{expert.location}</p>

<button
onClick={()=>
editExpert(expert)
}>
Edit
</button>

<button
onClick={()=>
deleteExpert(
expert._id
)
}>
Delete
</button>

</div>

))
}

</section>

<footer id="footer">
Contact HirePoint
</footer>

{
showAuth&&(
<div className="modal">

<div className="modalBox">

<input
placeholder="Email"
onChange={(e)=>
setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>
setPassword(e.target.value)}
/>

<button onClick={validate}>
Submit
</button>

</div>
</div>
)
}

</>
)
}

export default App;
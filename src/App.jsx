import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExpertForm from "./components/ExpertForm";
import ExpertList from "./components/ExpertList";
import AuthModal from "./components/AuthModal";

function App() {

const [experts, setExperts] = useState([]);
const [filtered, setFiltered] = useState([]);

const [name, setName] = useState("");
const [skill, setSkill] = useState("");
const [location, setLocation] = useState("");

const [search, setSearch] = useState("");

const [editId, setEditId] = useState(null);

const [showAuth, setShowAuth] = useState(false);
const [type, setType] = useState("");

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const fetchExperts = async () => {
const res = await axios.get(
"http://localhost:5000/experts"
);

setExperts(res.data);
setFiltered(res.data);
};

useEffect(() => {
fetchExperts();
}, []);

const saveExpert = async () => {

if (!name || !skill || !location) {
alert("Fill all fields");
return;
}

if (editId) {

await axios.put(
`http://localhost:5000/experts/${editId}`,
{name, skill, location}
);

setEditId(null);

} else {

await axios.post(
"http://localhost:5000/experts",
{name, skill, location}
);

}

setName("");
setSkill("");
setLocation("");

fetchExperts();
};

const deleteExpert = async (id) => {
await axios.delete(
`http://localhost:5000/experts/${id}`
);

fetchExperts();
};

const editExpert = (expert) => {
setName(expert.name);
setSkill(expert.skill);
setLocation(expert.location);
setEditId(expert._id);
};

const searchExpert = () => {

const result = experts.filter((e) =>
e.location
.toLowerCase()
.includes(search.toLowerCase())
);

setFiltered(result);
};

const openLogin = () => {
setType("Login");
setShowAuth(true);
};

const openSignup = () => {
setType("Signup");
setShowAuth(true);
};

const close = () => {
setShowAuth(false);
};

const validate = () => {

const regex = /\S+@\S+\.\S+/;

if (!regex.test(email)) {
alert("Invalid Email");
return;
}

if (password.length < 6) {
alert("Password minimum 6");
return;
}

alert(type + " Success");
close();
};

return (
<>

<Navbar
openLogin={openLogin}
openSignup={openSignup}
/>

<Hero />

{/* ABOUT */}

<section id="about">

<h2>About HirePoint</h2>

<p>
HirePoint is a smart expert hiring platform
that connects users with nearby skilled
professionals quickly and securely.
</p>

</section>

{/* FEATURES */}

<section id="features">

<h2>Features</h2>

<div className="expert">
Smart Location Search
</div>

<div className="expert">
Secure Login Validation
</div>

<div className="expert">
Add / Edit / Delete Experts
</div>

<div className="expert">
Fast Professional Hiring
</div>

</section>

{/* SEARCH */}

<section>

<input
placeholder="Search by Location"
onChange={(e)=>
setSearch(e.target.value)}
/>

<button onClick={searchExpert}>
Search Expert
</button>

</section>

{/* ADD EXPERT */}

<ExpertForm
name={name}
skill={skill}
location={location}
setName={setName}
setSkill={setSkill}
setLocation={setLocation}
saveExpert={saveExpert}
editId={editId}
/>

{/* LIST */}

<ExpertList
filtered={filtered}
editExpert={editExpert}
deleteExpert={deleteExpert}
/>

<footer id="footer">
<h2>HirePoint</h2>
<p>Professional Hiring Platform</p>
</footer>

{
showAuth && (
<AuthModal
type={type}
close={close}
validate={validate}
setEmail={setEmail}
setPassword={setPassword}
/>
)
}

</>
);
}

export default App;
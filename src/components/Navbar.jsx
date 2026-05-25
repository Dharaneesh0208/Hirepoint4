function Navbar({
openLogin,
openSignup
}) {

return (
<header>

<h1>HirePoint</h1>

<nav>
<a href="#home">Home</a>
<a href="#about">About</a>
<a href="#features">Features</a>
<a href="#footer">Contact</a>
</nav>

<div>
<button onClick={openLogin}>
Login
</button>

<button onClick={openSignup}>
Sign Up
</button>
</div>

</header>
);

}

export default Navbar;
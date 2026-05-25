function AuthModal({

type,
close,
validate,

setEmail,
setPassword

}){

return(

<div className="modal">

<div className="modalBox">

<h2>{type}</h2>

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

<button onClick={close}>
Close
</button>

</div>

</div>

);

}

export default AuthModal;
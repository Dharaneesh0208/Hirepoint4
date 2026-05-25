function ExpertList({

filtered,

editExpert,
deleteExpert

}){

if(filtered.length===0){
return <h2>No Experts Found</h2>
}

return(
<>

{
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

</>
);

}

export default ExpertList;
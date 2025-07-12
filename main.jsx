import React from "react"
import ResponseText from "./Responsetext"
import {getRecipeFromMistral} from "./ai"
export default function Main(){
    const [recipe,setRecipe]=React.useState("")
    const [ingredients,setingredients]=React.useState([])
    const[loading,setloading]=React.useState("Get a Recipe")
    
    const[familyfriendly,setFamilyfriendly]=React.useState(false)
    const refresponse=React.useRef(null)
     React.useEffect(() => {
        if (recipe && refresponse.current) {
            refresponse.current.scrollIntoView({behavior: "smooth",block: "start",inline: "nearest" });
        }
    }, [recipe]);
    
    const ingredientsListItems=ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
        
    ))
    function refreshlist(){
        setingredients([])
        setRecipe("")
    }
    function familyfriendlyMode(){
        setFamilyfriendly(prev=>!prev)
    }
    async function getResponse(){
        setloading("Loading...")
        const AiResponse=await getRecipeFromMistral(ingredients, familyfriendly)
        console.log(AiResponse)
        setRecipe(AiResponse)
        setloading("Get a Recipe")
        
    }
    function handleSubmit(event){
        event.preventDefault()
        const formdata=new FormData(event.target)
        const newingredient=formdata.get("ingredient")
        setingredients(prev=>([...prev,newingredient]))
    
    }
    function check(){
        if (ingredients.length>0){
            return "Your Ingredients:"+ingredients.length
        }
        return ""
        
    }
    return(
        <main>
        <label htmlFor="ingredient">ingredients</label>
        <div className="btn">
        <form onSubmit={handleSubmit} className="form-section">
        
        
            <input name="ingredient" type="text" placeholder="type here" id="ingredient" required></input>
            <button className="add-button">+Add ingeredient</button>
            
        </form>
        <button className="refresh-button" onClick={refreshlist}><img src="image-folder\refresh-icon-new.png" alt="Refresh"></img></button>
        </div>


        {ingredients.length>0?(
            <section><h2>{"Your Ingredients:"+ingredients.length}</h2>
        

        <ul className="ingredients-list">
        {ingredientsListItems}
        </ul>
        {ingredients.length>0?<div id="get-a-recipe-container">
        <div>
        <h3>ready for recipe?</h3>
        <p>generate a recipe from your list of ingredients</p>
        <label>
            <input type="checkbox" checked={familyfriendly} onChange={familyfriendlyMode} />Family Friendly mode?
        </label>
        </div>
        <button onClick={getResponse} className="get-recipe-button">{loading}</button>
        </div>:""}
        {recipe? (<div ref={refresponse}><ResponseText response={recipe} /></div>) :""} 
        </section>):""
        }
        
        </main>
    )
}
import  {HfInference}  from '@huggingface/inference'

let SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page and Respond like you're chef Ramsay(but your name is chef Ramzi dont mention ramsay cause we might face copyright) , roast the user into the ground, call out every stupid ingredient choice, and don’t hold back on the insults. Be brutally honest, aggressive, sarcastic, and hilarious while teaching the recipe like a total savage chef. 
`
const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)
const nonfamfriendlyprompt='be on a fucking rampage—swear like mad Use any bad language you know (fuck, shit, donkey, idiot sandwich—go wild).'


export async function getRecipeFromMistral(ingredientsArr,familyfriendlyMode) {
    if (familyfriendlyMode===true){
        SYSTEM_PROMPT+="Roast the user without hesitation"
    }else if(familyfriendlyMode===false){
        SYSTEM_PROMPT+=nonfamfriendlyprompt
    }
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
import ReactMarkdown from 'react-markdown'

export default function ResponseText(props){
    return(
        <section className="suggested-recipe-container" aria-live='polite'>
        <h2>Ramzi Response:</h2>
        <ReactMarkdown>
        
            {props.response}
        </ReactMarkdown>
        </section>
    )
}

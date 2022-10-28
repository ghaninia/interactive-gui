import React from "react" ;
import Query from "./query" ;
import Request from "../core/request" ;
import DataContext from "../contexts/DataContext" ;

const Line = React.forwardRef ( (props, ref) => {

    const [ queries , setQueries ] = React.useState([]) ;
    const [ sentence  , setSentence ]  = React.useState("");
    const [ loading , setLoading ] = React.useState(false) ;

    /**
     * request api 
     */
    const request = async ( uri ) => {

        /**
         * validation err 
         */
        if(! sentenceIsValid()) {
            setLoading(false);
            return emptyCurrentSentence() ;
        }

        /**
         * api request
         */
        await (new Request(uri , { sentence }))
            .post()
            .then(function(response){
                setQueries([
                    ... queries , 
                    {
                        query : sentence ,
                        result : response?.result
                    }
                ] );
                emptyCurrentSentence() ;
            })
            .catch(function(error){
                setQueries([
                    ... queries , 
                    {
                        query : sentence ,
                        message : error?.message ,
                        error : error?.code
                    }
                ]);
                emptyCurrentSentence() ;
            });
    } ;

    
    /**
     * 
     */
    const handleKeyDown = (event , data) => {
        switch (event.key) {
            case 'Enter': {

                if( ! loading ) 
                {
                    setLoading(true) ;
                    request(data?.uri?.set);
                }

                break;
            }
            default:
                break;
        }
    }

    /**
     * change input 
     */
     const handleOnInput = event => {
        setSentence(event.currentTarget.textContent);
    };

    /**
     * 
     */
    const emptyCurrentSentence = () => {
        var field = ref.current ;
        if(field) {
            field.innerText = "" ;
            setSentence("") ;
        }
    }

    /** 
     * 
     */
    const sentenceIsValid = () => {
        if( sentence === "")
        {
            alert("You should fill command line!")
            return false ;
        }
        return true ;
    }

    /**
     * 
     */
    return (
        <DataContext.Consumer>
            { 
                data => (
                    <>
                        { queries.map( (query, index) => <Query key={index} { ...query } /> ) }
                        <div className="terminal-line">
                            <span className="success">➜</span>
                            <span className="directory">~</span>
                            <span 
                                spellCheck={false}
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                className="user-input" 
                                ref={ ref } 
                                onInput={e =>  handleOnInput(e) }
                                onKeyDown={ e => handleKeyDown(e , data) } ></span>
                        </div>
                    </>     
                )
            }
        </DataContext.Consumer>
    );

})


export default Line ;
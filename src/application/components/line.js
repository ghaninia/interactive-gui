import React from "react" ;
import Query from "./query" ;
import Request from "../core/request" ;
import DataContext from "../contexts/DataContext" ;

const Line = React.forwardRef ( (props, ref) => {

    const [ queries , setQueries ] = React.useState([]) ;
    const [ sentence  , setSentence ]  = React.useState("");
    const [ loading , setLoading ] = React.useState(false) ;
    const [ pointer , setPointer ] = React.useState(0) ;

    /**
     * preccess sentence 
     */
    const request = async ( event , uri ) => {

        switch ( sentence )
        {
            case "" : {
                setLoading(false) ;
                event.preventDefault() ;
                break;
            }
            case "exit":
            case "cls" :
            case "clear" : {
                setLoading(false) ;
                setQueries([]) ;
                emptyCurrentSentence() ;

                break;
            }
            default : {
                /**
                 * when has value 
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
                    });
                break ;
            }
        }

    } ;

    
    /**
     * when user clicked button 
     */
    const handleKeyDown = (event , data) => {
        switch (event.key) {
            /**
             * clicked enter button 
             */
            case 'Enter': {
                if( ! loading ) 
                {
                    setLoading(true) ;
                    request(event ,data?.uri?.set);
                } else {
                    event.preventDefault() ;
                }
                break;
            }
            /**
             * clicked arrow up button 
             */
            case "ArrowUp" : {
                var currentPointer = pointer - 1 ;
                if( currentPointer < 0 ) return ;
                setPointer(currentPointer) ;
                var currentQuery = queries[ currentPointer ] ;
                changeFieldTo(currentQuery.query) ;
                break;
            }
            /**
             * clicked arrow down button 
             */
            case "ArrowDown" : {
                var currentPointer = pointer + 1 ;

                if( currentPointer > queries.length ) {

                } else if (currentPointer === queries.length) {
                    setPointer(currentPointer) ;
                } else {
                    setPointer(currentPointer) ;
                    var currentQuery = queries[ currentPointer ] ;
                    changeFieldTo(currentQuery.query) ;
                }
                break;
            }
            /**
             * press other button
             */
            default: {
                setSentence(event.currentTarget.textContent);
            }
        }
    }

    /**
     * change field state to new thing 
     */
    const changeFieldTo = (newSentence) => {
        var field = ref.current ;
        if( field ) 
        {
            field.innerText = newSentence ;
            setSentence(newSentence) ;
        }

    }

    /**
     * empty terminal line 
     */
    const emptyCurrentSentence = () => {
        changeFieldTo("") ;
    }


    React.useEffect(() => {
        setLoading(false) ;
        setPointer( queries.length ) ;
        emptyCurrentSentence() ;
    },[queries]) ;


    /**
     * render HTML 
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
                                onKeyUp={ e => handleKeyDown(e , data) } ></span>
                        </div>
                    </>     
                )
            }
        </DataContext.Consumer>
    );

})


export default Line ;
const Query = (props) => {

    if(props.error === undefined) {
        return (
            <div className="terminal-line">
                <span className="success">➜</span>
                <span className="directory">~</span>
                <span className="user-input">{ props?.query }</span>
                <span className="result success">{ JSON.stringify(props?.result) }</span>
            </div>
        ) ;
        
    } else {
        return (
            <div className="terminal-line">
                <span className="success">➜</span>
                <span className="directory">~</span>
                <span className="user-input">{ props?.query }</span>
                <span className="result error">{ props?.message }</span>
            </div>       
        ) ;
    }

} ;

export default Query ;

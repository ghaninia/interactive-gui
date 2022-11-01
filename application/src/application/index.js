import React from "react" ;
import { Nav, Line } from "./components" ;

// import '../assets/css/light.css'; 
import '../assets/css/dark.css'; 

const Application = () => {

    var sentenceRef = React.createRef() ;

    const inputFocus = () => {
        sentenceRef.current.focus() ;
    };

    React.useEffect(() =>  inputFocus() , []);

    return (
        <div className="terminal_window">
            <Nav />
            <div className="fakeScreen" onClick={ e => inputFocus() } >
                <div className="terminal-window primary-bg">
                    <div className="terminal-output" id="terminalOutput"></div>
                    <Line ref={ sentenceRef } />
                </div>
            </div>
        </div>
    );

}


export default Application ;        
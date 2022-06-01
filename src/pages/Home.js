import React, { useState } from "react";
import '../css/home.css';
import Dynamickeyboard from "../components/Dynamickeyboard";
import Problems from "../components/Problems";


const Home = () => {
    const [active, setActive] = useState(0);
    const [problem, setProblem] = useState({pid:1,question:''});
    const [target, setTarget] = useState(null);
    const tabClick = (e) => {
        const index = parseInt(e.target.id, 0);
        console.log(index)
        if (index !== active) {
            setActive(index);
        }
    }

    function onRecieveProblem(problem) {
        setProblem(problem);
    }
    function onReceiveTarget(t) {
        setTarget(t);
    }

    return(

        <div className="row m-0 justify-content-center">
            <div className="col-md-6 mt-5 mb-5">
                <Problems onChangeProblem={(problem)=>onRecieveProblem(problem)} onPassTarget={(t)=>onReceiveTarget(t)}/>
            </div>

            <div className="col-md-4 mt-5 mb-5">
                <Dynamickeyboard problem={problem} target={target}/>
            </div>
        </div>


    );
}


export default Home;
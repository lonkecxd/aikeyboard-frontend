import React, {useEffect, useState} from "react";
import '../css/problems.css';
import axios from "axios";

const Problems = (props) => {
    const {onChangeProblem, onPassTarget} = props;

    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loaded,setLoaded] = useState(false);
//页面加载
    useEffect(() => {
        if (loaded)
            return;
        axios
            .get("http://localhost:5000/problems")
            .then((response) => {
                console.log(response);
                setData(response.data);
                onChangeProblem({pid:1,question:data.subjectives[0].question});
                setLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
            })
            .finally(() => {
                console.log('finished');

            });
    }, [data]);


    const [active, setActive] = useState(0);
    const [show, setShow] = useState(false);
    const [customquestion, setCustomquestion] = useState('');
    const handleChange = (event) => {
        setCustomquestion(event.target.value);
    };
    const tabClick = (index=0) => {
        console.log(index)
        if (index !== active) {
            setActive(index);
        }
        console.log(data.subjectives[index].question);
        onChangeProblem({pid:index+1,question:data.subjectives[index].question});
    }

    const showAnswer = () => {
        setShow(!show);
    }
    const genSymbols = () => {
        onChangeProblem({pid:0,question:customquestion});
    }
    const onFocus = () =>(e)=> {
        onPassTarget(e.currentTarget);
    }
//页面
    return (
        <div className="form-area">
            {loaded?

                    <div className="form-inner">
                        <ul className="react-tab-link-group">
                            {data.subjectives.map((problem, i)=>{
                                return <li key={i} className={`${active === i ? 'active' : ''}`}><a className="react-tab-link" onClick={()=>tabClick(i)}
                                                                                            id={i}>{i+1}.</a></li>
                            })}
                            <li key={-1} className={`${active === -1 ? 'active' : ''}`}><a className="react-tab-link" onClick={()=>tabClick(-1)}>
                                                                                           自写题目</a></li>
                        </ul>
                        <div className="react-tab-content">
                            {data.subjectives.map((problem, i)=>{
                                return <div key={i} className={`react-tab-pane ${active === i ? 'show' : ''}`}>
                                    <h3>第{i+1}题</h3>
                                    <p className="question">{problem.question}</p>
                                </div>
                            })}
                            <div className={`react-tab-pane ${active === -1 ? 'show' : ''}`}>
                                <h3>自写题目</h3>
                                <textarea autoFocus name="textbox" cols="128" rows="10"
                                          className={`textbox answersheet show`}
                                          placeholder="在这里输入你的题目..."
                                          value={customquestion} onChange={handleChange}
                                ></textarea>
                                <button className="btn_gen" onClick={()=>genSymbols()}>
                                    生成动态键盘
                                </button>
                            </div>
                        </div>
                        {data.subjectives.map((problem, i)=>{
                            return <textarea autoFocus name="textbox" cols="128" rows="10"
                            className={`textbox answersheet ${active === i&&show ? 'show' : ''}`}
                            placeholder="在这里输入你的答案..."
                            value={problem.answer}
                            ></textarea>
                        })}
                        {data.subjectives.map((problem, i)=>{
                            return <textarea autoFocus name="textbox" cols="128" rows="10"
                                                   className={`textbox answersheet ${active === i&&!show ? 'show' : ''}`}
                                                   placeholder="在这里输入你的答案..."
                                                   onFocus={onFocus()}
                            ></textarea>
                        })}

                        {show?<button className="btn_answer" onClick={()=>showAnswer()}>
                            隐藏答案
                        </button>:<button className="btn_answer" onClick={()=>showAnswer()}>
                            显示答案
                        </button>}
                    </div>
            :<span>加载题目中...</span>}
        </div>
        );
}


export default Problems;
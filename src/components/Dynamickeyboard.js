import React, {useEffect, useState} from "react";
import '../css/dynamickeyboard.css';
import axios from 'axios';


const Dynamickeyboard:React.FC = (props) => {
    const {problem, target} = props;
    const {pid,question} = problem;

    useEffect(() => {
        if(question==='')
            return;
        axios
            .post('http://localhost:5000/api/predict', question)
            .then((response) => {
                const data = response.data;
                setKps(data.kps);
                setL1_data(data.l1_data);
                setAlll2data(data.l2_data);
                if (kps.length>0){
                    setCurkp(data.kps[0]);
                    setL2_data(data.l2_data[data.kps[0]]);
                    setL3_data(data.l3_data)
                    setL4_data(data.l4_data)
                }

                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {

            });
    }, [question]);

    const [subject, setSubject] = useState('离散数学',);
    const [kps, setKps] = useState(['证明', '集合'],);
    const [curkp, setCurkp] = useState('');
    const [alll2data, setAlll2data] = useState({});
    const [l1_data, setL1_data] = useState(['', '', '', '']);
    const [l2_data, setL2_data] = useState(['', '', '', '', '', '', '']);
    const [l3_data, setL3_data] = useState(['', '', '', '', '', '', '']);
    const [l4_data, setL4_data] = useState(['', '', '', '', '', '', '', '', '', '', '', '', '', '']);

    const copy = (symbol) => {
        var textareaC = document.createElement('textarea');
        textareaC.setAttribute('readonly', 'readonly');
        textareaC.setAttribute('opacity', 0);
        textareaC.value = symbol;
        document.body.appendChild(textareaC);
        textareaC.select();
        document.execCommand('copy');
        document.body.removeChild(textareaC);

        // let textInput = document.getElementById('mailTemplate');
        // let area = textInput.getElementsByClassName('ivu-input')[0];
        // // 获取光标初始索引
        // let insert = area.selectionStart;
        // // 拼接字符串的形式来得到需要的内容
        // area.value = area.value.substr(0, insert) + content + area.value.substr(insert);
        let cursorPos = target.selectionStart;
        let v = target.value;
        console.log(cursorPos);
        console.log(v);
        let textBefore = v.substring(0,  cursorPos );
        let textAfter  = v.substring( cursorPos, v.length );
        let old_start = cursorPos;
        target.value =  textBefore + symbol + textAfter ;
        console.log(target.selectionStart);
        let gap = v.length - old_start;
        target.selectionStart -= gap;
    }

    function meaning(symbol) {
        return '';
    }
    function onchangeKp(kp){
        setCurkp(kp);
        setL2_data(alll2data[kp]);
    }

    return (

        <div className="row m-0 justify-content-center">
            <div className="container">
                <div className="layout shadow">
                    <div className="banner">
                        <div className="banner_left">
                            <div className="title1">{pid==0?'自写题目':`第${pid}题`}</div>
                        </div>
                        <div className="banner_right">
                            <div className="btn_collapse"></div>
                        </div>
                    </div>
                    <br/>
                    <div className="Layer">
                        <div className="banner">
                            <div className="banner_left">推荐符号</div>
                        </div>
                        <input id="chck1" type="checkbox"/>
                        <label className={`banner_right btn_unfold ${l1_data.length>8?'active':''}`} htmlFor="chck1">展开</label>
                        <div className="symbols mh110">
                            {l1_data.map((s) => {
                                return <div className="symbol_" onClick={() => copy(s)}>
                                    <div className="s1">{s}</div>
                                    <div className="t1">{meaning(s)}</div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="Layer">
                        <div className="banner">
                            <div className="banner_left">
                                {kps.map((kp) => {
                                    return <div key={kp} className={`kp ${kp === curkp ? 'active' : ''}`} onClick={()=>onchangeKp(kp)}>{kp}</div>
                                })}
                            </div>
                        </div>

                        {l2_data==undefined?null:<div>
                            <input id="chck2" type="checkbox"/>
                        <label className={`banner_right btn_unfold ${l2_data.length>7?'active':''}`} htmlFor="chck2">展开</label>
                        <div className="symbols mh35">
                            {l2_data.map((s) => {
                                return <div className="symbol" onClick={() => copy(s)}>{s}</div>
                            })}
                        </div></div>}
                    </div>
                    <div className="Layer">
                        <div className="banner">
                            <div className="banner_left">
                                <div className="title2" title={`${subject}中的其他符号`}>{subject}</div>
                            </div>
                        </div>
                        <input id="chck3" type="checkbox"/>
                        <label className={`banner_right btn_unfold ${l3_data.length>7?'active':''}`} htmlFor="chck3">展开</label>
                        <div className="symbols mh35">
                            {l3_data.map((s) => {
                                return <div className="symbol" onClick={() => copy(s)}>{s}</div>
                            })}
                        </div>
                    </div>
                    <div className="Layer">
                        <div className="banner">
                            <div className="banner_left">
                                <div className="title2">常用符号</div>
                            </div>
                        </div>
                        <input id="chck4" type="checkbox"/>
                        <label className={`banner_right btn_unfold ${l4_data.length>14?'active':''}`} htmlFor="chck4">展开</label>
                        <div className="symbols mh70">
                            {l4_data.map((s) => {
                                return <div className="symbol" onClick={() => copy(s)}>{s}</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
        ;
}


export default Dynamickeyboard;
import React, {useState, useRef, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import './style.css'
import schema from '../public/schema.png'
import nodeOpen from '../public/nodeOpen.png'
import nodeClose from '../public/nodeClose.png'
import arrow from '../public/arrow.png'
import schema1 from '../public/schema1.png'
import './App.css'
import classNames from "classnames";

const Pnom = +(Math.random() * (78.0 - 60.0) + 60.0).toFixed(2)
const Unom = 220
const Inom = +(Pnom / Unom).toFixed(2)
const R1 = Math.random() * (50.0 - 30.0) + 30.0
const X1 = Math.random() * (80.0 - 50.0) + 50.0
const Rm = Math.random() * (1700.0 - 1300.0) + 1300.0
const Xm = Math.random() * (5000.0 - 4000.0) + 4000.0

const Rhh = +Rm.toFixed(2) + +R1.toFixed(2)
const Xhh = +Xm.toFixed(2) + +X1.toFixed(2)
const Rkz = +2*R1.toFixed(2)
const Xkz = +2*X1.toFixed(2)

const Zhh = +Math.sqrt(Rhh*Rhh + Xhh*Xhh).toFixed(2)
const Zkz = +Math.sqrt(Rkz*Rkz + Xkz*Xkz).toFixed(2)

const k = +(Math.random() * (0.7 - 0.5) + 0.5).toFixed(2)

console.log("R1 =", R1.toFixed(2));
console.log("X1 =", X1.toFixed(2));
console.log("Xm =", Xm.toFixed(2));
console.log("Rm =", +Rm.toFixed(2));
console.log("Rhh =", Rhh);
console.log("Rkz =", Rkz);
console.log("Xhh =", Xhh);
console.log("Xkz =", Xkz);
console.log("Zhh =", Zhh);
console.log("Zkz =", Zkz);
console.log("Inom =", Inom);
console.log("k =", k);

const App = () => {
    const [s1Open, setS1Open] = useState(true)
    const [s2Open, setS2Open] = useState(true)
    const arrowBlock = useRef()
    const [arrowTop, setArrowTop] = useState(170)
    const [checkButtonText, setCheckButtonText] = useState('Проверить')
    const [emergency, setEmergency] = useState(false)
    const [inputButtonDisabled, setInputButtonDisabled] = useState(false)
    const [resultAnswer, setRsultAnswer] = useState('')

    const [R1User, setR1User] = useState('')
    const [X1User, setX1User] = useState('')
    const [RmUser, setRmUser] = useState('')
    const [XmUser, setXmUser] = useState('')

    const U1 = +(230*(1-((arrowTop - 83) / (257 - 83)))).toFixed(2)

    function moveAt(pageY, shiftY) {
        arrowBlock.current.style.top = pageY - shiftY + 'px';
        setArrowTop(pageY - shiftY)
    }

    useEffect(() => {
        document.addEventListener('keydown' ,(e) => {
            let shiftY = e.clientY - arrowBlock.current.getBoundingClientRect().top;
            if (e.key === 'ArrowUp') {
                console.log(e);
            } else if (e.key === 'ArrowDown') {
                console.log(e);
            }
        })
    }, [])

    useEffect(() => {
        if (!s2Open && !s1Open) {
            if ((U1 / Zkz) / Inom >= 1.1) {
                setEmergency(true)
                setS1Open(true)
                setS2Open(true)
            }
        }
    }, [arrowTop, s1Open, s2Open])

    const mouseDownHandler = (e) => {
        e.preventDefault()
        let shiftY = e.clientY - arrowBlock.current.getBoundingClientRect().top;

        function onMouseMove(event) {
            if (event.pageY - shiftY >= 83 && event.pageY - shiftY <= 257) {
                moveAt(event.pageY, shiftY);
            }
        }
        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            arrowBlock.current.onmouseup = null;
        };
    }

    const handleCheckClick = () => {
        setInputButtonDisabled(true)
        if ((+R1User / R1 >= 0.98 && +R1User / R1 <= 1.02) &&
            (+X1User / X1 >= 0.98 && +X1User / X1 <= 1.02) &&
            (+RmUser / Rm >= 0.98 && +RmUser / Rm <= 1.02) &&
            (+XmUser / Xm >= 0.98 && +XmUser / Xm <= 1.02)) 
        {
            setCheckButtonText('Верно')
            setRsultAnswer('right')
        } else {
            setCheckButtonText('Не верно')
            setRsultAnswer('wrong')
        }
    }

    return (
        <div className="main-container">
            <div className="ineractive-container">
                <div className="schema-wrapper">
                    <img src={schema} />
                    <img src={nodeClose} className={classNames("a", {s1Open: s1Open, s1Close: !s1Open})} onClick={() => {
                                                                                                                            setS1Open(!s1Open)
                                                                                                                            setEmergency(false)
                                                                                                                        }
                                                                                                                    } />

                    <img src={nodeClose} className={classNames("a", {s2Open: s2Open, s2Close: !s2Open})} onClick={() => {
                                                                                                                            setS2Open(!s2Open)
                                                                                                                            setEmergency(false)
                                                                                                                        }
                                                                                                                    } />

                    <img ref={arrowBlock} src={arrow} className="a arrow" onMouseDown={mouseDownHandler}/>
                </div>
                <div className="data-output">
                    <div className="data-elem">
                        <div className="name-elem">P1=</div>
                        <div className="value-elem">{(!s1Open && s2Open) ? 
                                    (Rhh * ((U1 / Zhh) * (U1 / Zhh))).toFixed(2) : 
                                    (!s1Open && !s2Open) ? (Rkz * ((U1 / Zkz) * (U1 / Zkz))).toFixed(2) :
                                    "0.0"
                                    }</div>
                        <div className="name-elem">[Вт]</div>
                    </div>
                    <div className="data-elem">
                        <div className="name-elem">U1=</div>
                        <div className="value-elem">{!s1Open ? U1 : "0.0"}</div>
                        <div className="name-elem">[В]</div>
                    </div>
                    <div className="data-elem">
                        <div className="name-elem">I1=</div>
                        <div className="value-elem">{(!s1Open && s2Open) ? 
                                    (U1 / Zhh).toFixed(3) : 
                                    (!s1Open && !s2Open) ? (U1 / Zkz).toFixed(3) : 
                                    "0.0"
                                    }</div>
                        <div className="name-elem">[A]</div>
                    </div>
                    <div className="data-elem">
                        <div className="name-elem">U2=</div>
                        <div className="value-elem">{(!s1Open && s2Open) ? (U1 * k).toFixed(2) : "0.0"}</div>
                        <div className="name-elem">[В]</div>
                    </div>
                    <div className="data-elem">
                        <div className="name-elem">I2=</div>
                        <div className="value-elem">{((!s1Open && s2Open) || (s1Open && s2Open) || (s1Open && !s2Open)) ? "0.0" : "1.0" /*TODO: Логика для КЗ I2 */}</div>
                        <div className="name-elem">[A]</div>
                    </div>
                </div> 
            </div>
            <div className="interactive-info">
                <div className="data-info-wrapper">
                    <div className="info-reg">
                        Грубая регулировка напряжения движком ЛАТРа; точная ↑/↓.<br/>
                        Состояния ключей изменяют щелчком мыши на их изображении.
                    </div>
                    {
                        emergency && 
                        <div className="emergency">
                            Вы создали аварийный режим!
                        </div>
                    }
                </div>
                <div className="answer-scheme-container">
                    <img src={schema1} alt="Схема замещения" title="Схема замещения" width="310"/>
                    <div className="answer-and-data-info">
                        <div className="data-info">
                            По результатам опытов холостого хода и короткого замыкания определить с погрешностью не более ±2.0% параметры схемы замещения 
                            трансформатора мощностью {Pnom.toFixed(2)} ВА и номинальным напряжением питания 220 В, полагая R1=R2 и X1=X2.
                        </div>
                        <div className="breaker">
                            <div className="line-breaker" />
                            <div className="breaker-text">Результаты</div>
                            <div className="line-breaker" />
                        </div>
                        <div className="answers">
                            <div className="answer-elem">
                                <div className="answer-name">R1= </div>
                                <input className="answer-input" value={R1User} onChange={(e) => setR1User(e.target.value)} disabled={inputButtonDisabled} />
                                <div className="answer-name">[Ом]</div>
                            </div>
                            <div className="answer-elem">
                                <div className="answer-name">X1= </div>
                                <input className="answer-input" value={X1User} onChange={(e) => setX1User(e.target.value)} disabled={inputButtonDisabled} />
                                <div className="answer-name">[Ом]</div>
                            </div>
                            <div className="answer-elem">
                                <div className="answer-name">Rm= </div>
                                <input className="answer-input" value={RmUser} onChange={(e) => setRmUser(e.target.value)} disabled={inputButtonDisabled} />
                                <div className="answer-name">[Ом]</div>
                            </div>
                            <div className="answer-elem">
                                <div className="answer-name">Xm= </div>
                                <input className="answer-input" value={XmUser} onChange={(e) => setXmUser(e.target.value)} disabled={inputButtonDisabled} />
                                <div className="answer-name ">[Ом]</div>
                            </div>
                        </div>
                        <div className={classNames('check-button', {disabledButton: inputButtonDisabled, wrongAnswer: resultAnswer === 'wrong', rightAnswer: resultAnswer === 'right'})} onClick={inputButtonDisabled ? null : handleCheckClick}>
                            {checkButtonText}
                        </div>
                    </div>
                </div>
            </div>
            <div className="reference-container">
                <div className="alarm">
                    ВНИМАНИЕ!
                </div>
                
                <div className="alarm">
                    Редактирование полей ввода возможно многократно до нажатия кнопки проверки
                </div>
                
                <div className="reference">
                    Параметры схемы замещения трансформатора можно определить по измерениям активной мощности тока и напряжения в опытах холостого хада и короткого замыкания. Методика проведения этих опытов описана в учебниках по электрическим машинам (см., например, разд. 6.5 учеб. пособия Усольцев А.А., "Электрические машины" или разд. 9.5 и 9.6 учеб. пособия Усольцев А.А., "Общая электротехника").
                </div>
                <div className="reference">
                Необходимое для проведение опыта короткого замыкания номинальное значение тока первичной обмотки можно вычислить по известным величинам мощности и номинального напряжения питания.
                </div>
            </div>
        </div>    
    )
}

export default App

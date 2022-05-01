import React, {useState} from 'react';
import './AnswersBlock.css';
import classNames from "classnames";
import {Pnom, R1, X1, Rm, Xm, U2_ans} from '../../constants'


export const AnswersBlock = ({type}) => {
    const [R1User, setR1User] = useState('')
    const [X1User, setX1User] = useState('')
    const [RmUser, setRmUser] = useState('')
    const [XmUser, setXmUser] = useState('')

    const [U2User, setU2User] = useState('')

    const [checkButtonText, setCheckButtonText] = useState('Проверить')
    const [inputButtonDisabled, setInputButtonDisabled] = useState(false)
    const [resultAnswer, setRsultAnswer] = useState('')

    const handleCheckClick = () => {
        setInputButtonDisabled(true)
        if (type === 'task1') {
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
        } else {
            if (+U2User / U2_ans >= 0.98 && +U2User / U2_ans <= 1.02) {
                setCheckButtonText('Верно')
                setRsultAnswer('right')
            } else {
                setCheckButtonText('Не верно')
                setRsultAnswer('wrong')
            }
        }
        
    }

    return (
        <div className="answer-and-data-info">
            {
                type === 'task1' ?
                <div className="data-info">
                    По результатам опытов холостого хода и короткого замыкания определить с погрешностью не более ±2.0% параметры схемы замещения 
                    трансформатора мощностью {Pnom.toFixed(2)} ВА и номинальным напряжением питания 220 В, полагая R1=R2 и X1=X2.
                </div> :
                <div className="data-info">
                    По результатам опытов холостого хода и короткого замыкания определить с погрешностью не более ±2.0% напряжение на вторичной обмотке U2
                    при номинальной нагрузке, если мощность трансформатора с номинальным напряжением питания 220 В составляет {Pnom.toFixed(2)} ВА, 
                    а коэффициент мощности RL-нагрузки cosφ = 0.9.
                </div>
            }
            <div className="breaker">
                <div className="line-breaker" />
                <div className="breaker-text">Результаты</div>
                <div className="line-breaker" />
            </div>
            <div className={classNames("answers", {center: type !== 'task1'})}>
                {
                    type === 'task1' ?
                    <>
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
                    </> :
                    <div className="answer-elem">
                        <div className="answer-name">U2= </div>
                        <input className="answer-input" value={U2User} onChange={(e) => setU2User(e.target.value)} disabled={inputButtonDisabled} />
                        <div className="answer-name">[В]</div>
                    </div>
                }
                
                
            </div>
            <div className={classNames('check-button', {disabledButton: inputButtonDisabled, wrongAnswer: resultAnswer === 'wrong', rightAnswer: resultAnswer === 'right'})} onClick={inputButtonDisabled ? null : handleCheckClick}>
                {checkButtonText}
            </div>
        </div>
    )
}
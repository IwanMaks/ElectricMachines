import React, {useState, useEffect, useRef} from 'react';
import './Task1_2.css'
import { Schema } from "../Schema/Schema";
import { DataOutput } from "../DataOutput/DataOutput";
import { AnswersBlock } from "../AnswersBlock/AnswersBlock";
import { ReferenceBlock } from "../ReferenceBlock/ReferenceBlock";
import {Zkz, Inom} from '../../constants'
import schema1 from '../../../public/schema1.png'

export const Task1_2 = ({type}) => {
    const [s1Open, setS1Open] = useState(true)
    const [s2Open, setS2Open] = useState(true)
    const arrowBlock = useRef()
    const [arrowTop, setArrowTop] = useState(170)
    const [emergency, setEmergency] = useState(false)

    const U1 = +(230*(1-((arrowTop - 83) / (257 - 83)))).toFixed(2)

    useEffect(() => {
        if (!s2Open && !s1Open) {
            if ((U1 / Zkz) / Inom >= 1.1) {
                setEmergency(true)
                setS1Open(true)
                setS2Open(true)
            }
        }
    }, [arrowTop, s1Open, s2Open])

    return (
        <div className="main-container">
            <div className="ineractive-container">
                <Schema arrowBlock={arrowBlock} s1Open={s1Open} s2Open={s2Open} setS1Open={setS1Open} setS2Open={setS2Open} setEmergency={setEmergency} setArrowTop={setArrowTop} />
                <DataOutput arrowTop={arrowTop} s1Open={s1Open} s2Open={s2Open} />
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
                    <AnswersBlock type={type} />
                </div>
            </div>
            <ReferenceBlock />
        </div>    
    )
}
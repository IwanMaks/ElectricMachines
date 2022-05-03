import React from "react";
import './DataOutput.css';
import {Rhh, Zhh, Rkz, Zkz, k, U2_ans, cosPhi} from '../../constants'

export const DataOutput = ({arrowTop, s1Open, s2Open}) => {
    const U1 = +(230*(1-((arrowTop - 83) / (257 - 83)))).toFixed(2)

    return (
        <div className="data-output">
            <div className="data-elem">
                <div className="name-elem">P1=</div>
                <div className="value-elem">{(!s1Open && s2Open) ? 
                            (Rhh * ((U1 / Zhh) * (U1 / Zhh))).toFixed(2) : 
                            (!s1Open && !s2Open) ? (Rkz * ((U1 / Zkz) * (U1 / Zkz))).toFixed(2) :
                            "0.00"
                            }</div>
                <div className="name-elem">[Вт]</div>
            </div>
            <div className="data-elem">
                <div className="name-elem">U1=</div>
                <div className="value-elem">{!s1Open ? U1.toFixed(2) : "0.00"}</div>
                <div className="name-elem">[В]</div>
            </div>
            <div className="data-elem">
                <div className="name-elem">I1=</div>
                <div className="value-elem">{(!s1Open && s2Open) ? 
                            (U1 / Zhh).toFixed(3) : 
                            (!s1Open && !s2Open) ? (U1 / Zkz).toFixed(3) : 
                            "0.000"
                            }</div>
                <div className="name-elem">[A]</div>
            </div>
            <div className="data-elem">
                <div className="name-elem">U2=</div>
                <div className="value-elem">{(!s1Open && s2Open) ? (U1 * k).toFixed(2) : "0.00"}</div>
                <div className="name-elem">[В]</div>
            </div>
            <div className="data-elem">
                <div className="name-elem">I2=</div>
                <div className="value-elem">{((!s1Open && s2Open) || (s1Open && s2Open) || (s1Open && !s2Open)) ? "0.000" : ((U1 / Zkz) / (k + 0.02)).toFixed(3)}</div>
                <div className="name-elem">[A]</div>
            </div>
        </div> 
    )
}
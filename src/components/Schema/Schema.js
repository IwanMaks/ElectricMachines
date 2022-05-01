import React, {useEffect} from "react";
import './Schema.css';
import schema from '../../../public/schema.png'
import nodeClose from '../../../public/nodeClose.png'
import arrow from '../../../public/arrow.png'
import classNames from "classnames";

export const Schema = ({arrowBlock, s1Open, s2Open, setS1Open, setS2Open, setEmergency, setArrowTop}) => {
    useEffect(() => {
        document.addEventListener('keydown' ,(e) => {
            let shiftY = arrowBlock.current.getBoundingClientRect().top - 10;
            if (e.key === 'ArrowUp' && shiftY > 83 ) {
                arrowBlock.current.style.top = shiftY - 1 + 'px';
                setArrowTop(shiftY - 1)
            } else if (e.key === 'ArrowDown' && shiftY < 257) {
                arrowBlock.current.style.top = shiftY + 1 + 'px';
                setArrowTop(shiftY + 1)
            }
        })
    }, [])


    const mouseDownHandler = (e) => {
        e.preventDefault()
        let shiftY = e.clientY - arrowBlock.current.getBoundingClientRect().top + 10;

        function moveAt(pageY, shiftY) {
            arrowBlock.current.style.top = pageY - shiftY + 'px';
            setArrowTop(pageY - shiftY)
        }

        moveAt(e.pageY, shiftY);

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

    return (
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
    )
}
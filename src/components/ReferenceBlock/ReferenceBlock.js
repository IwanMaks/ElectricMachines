import React from 'react';
import './ReferenceBlock.css';

export const ReferenceBlock = () => {
    return (
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
    )
}
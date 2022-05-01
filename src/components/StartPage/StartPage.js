import React from 'react';
import './StartPage.css';
import { Link } from "react-router-dom";

export const StartPage = () => {
    return (
        <div className='start-container'>
            <div className='author'>Усольцев А.А.</div>
            <div className='task-heading'>Интерактивные задания</div>
            <div className='tasks-container'>
                <Link to="/1" className='task-element'>1) Параметры схемы замещения трансформатора</Link>
                <Link to="/2" className='task-element'>2) Внешняя характеристика трансформатора</Link>
            </div>
        </div>
    )
}
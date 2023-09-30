import { BsSun } from "react-icons/bs"
import { BiMoon } from "react-icons/bi"
import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from "../App";
import { Theme } from "./Theme";

export default function ToggleTheme() {

    const { isDark, setIsDark } = useContext(GeneralContext);

    useEffect(() => {
        const saveMode = localStorage.isDark
        if (saveMode) { setIsDark(JSON.parse(saveMode)) }
    }, [])

    const toggleTheme = () => {
        const newMode = isDark ? false : true;
        setIsDark(newMode)
        localStorage.isDark = JSON.stringify(newMode)
    };


    return (
        <div> 
            <Theme darkMode = {isDark} />
            {
                <button className='btnMode' onClick={toggleTheme}>
                    {isDark ? <BiMoon /> : <BsSun />}
                </button>
            }
        </div>
    )
}
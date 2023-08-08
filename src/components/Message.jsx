//Message.jsx

import { useEffect, useState } from "react";


export default function Message({ user = "Sergio", message }) {
    const [color, setColor] = useState("green");


    useEffect(() => {
        const colors = [
            "#FF5733", "#FFBD33", "#33FFA6", "#337DFF", "#B433FF", "#FF33E9",
            "#33FF33", "#33D4FF", "#FF33A3", "#FF5733", "#FFBD33", "#33FFA6",
            "#337DFF", "#B433FF", "#FF33E9", "#33FF33", "#33D4FF", "#FF33A3",
            "#FF5733", "#FFBD33", "#33FFA6", "#337DFF", "#B433FF", "#FF33E9",
            "#33FF33", "#33D4FF", "#FF33A3", "#FF5733", "#FFBD33", "#33FFA6",
            "#337DFF", "#B433FF", "#FF33E9", "#33FF33", "#33D4FF", "#FF33A3",
          ];
          
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(randomColor);
    }, []);


    return (
        <>
            <li className="flex gap-[5px]">
                <h3 style={{color: color}} >{user}:</h3>
                <p>{message}</p>
            </li>
        </>)
}

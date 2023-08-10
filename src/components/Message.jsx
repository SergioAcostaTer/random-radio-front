//Message.jsx


export default function Message({ user = "noname", message = "Hello World!", color = "black" }) {

    return (
        <>
            <li className="message">

                <p> <span style={{ color: color }} >{user}:</span> {message}</p>
            </li>
        </>)
}
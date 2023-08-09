//Message.jsx


export default function Message({ user = "noname", message = "Hello World!", color = "black" }) {

    return (
        <>
            <li className="message">
                <h3 style={{ color: color }} >{user}:</h3>
                <p>{message}</p>
            </li>
        </>)
}
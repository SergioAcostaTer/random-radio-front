import { useState } from "react"
import { useNavigate } from "react-router-dom";


const Cookies = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleAccept = () => {
    setShow(false);
    navigate(`/room${Math.ceil(Math.random() * 11) + 1}`);
  }

  return (
    <>
      {show && (<div className="cookies">
        <div>
          <h1>Cookie Policy</h1>
          <p>We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By continuing to use our website, you consent to the use of cookies in accordance with our Cookie Policy. </p>
          <button
            onClick={handleAccept}
          >Accept</button>
        </div>
      </div>)}
    </>
  )
}

export default Cookies
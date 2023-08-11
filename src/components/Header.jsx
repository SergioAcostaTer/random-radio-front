import { useNavigate } from "react-router-dom"
import "../styles/Header.css"
import getContrastColor from "../services/getContrastColor"
import { useEffect, useState } from "react"

const Header = ({ backColor }) => {
  const actualPath = window.location.pathname
  const navigate = useNavigate()
  const [color, setColor] = useState(null)

  const navigateToRandom = () => {
    const randomNumber = Math.ceil(Math.random() * 12)
    if (actualPath !== `/room${randomNumber}`) {
      navigate(`/room${randomNumber}`)
    } else {
      navigateToRandom()
    }
  }

  useEffect(() => {
    if (backColor) {
      const contrast = getContrastColor(backColor)
      setColor(contrast)
    }
  }, [backColor])

  return (
    <>

      <div style={{
        backgroundColor: backColor
      }} className="header-container">
        <h1 className="header-title" style={{
          color: color?.[0]
        }}>Spotify Player Live</h1>

        <div className="buttons">
          <button onClick={navigateToRandom} className="button" style={{
            backgroundColor: color?.[0],
            color: color?.[1]
          }}>Random

            <svg style={{
              fill: color?.[1]
            }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
              <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
            </svg>

          </button>
        </div>
      </div>

    </>
  )
}

export default Header
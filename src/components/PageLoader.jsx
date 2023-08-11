import "../styles/layout.css" 

const PageLoader = ({styles, className}) => {
  return (
    <div className={`page_loader ${className}`} style={styles}>
        
        <img src="/spotify.png" alt="logo" className="logo" />

    </div>
  )
}
 
export default PageLoader
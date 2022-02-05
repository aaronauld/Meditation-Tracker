import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
        <h4 style={{display: 'flex', alignItems:'center', justifyContent:'center'}}>Version 1.1.2</h4>
        <Link to="/" style={{display: 'flex', alignItems:'center', justifyContent:'center'}}>Go Back</Link>
    </div>
  )
}

export default About

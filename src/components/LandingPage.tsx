import landingImg from '../img/landing-img.png'
import { Link,useNavigate } from "react-router-dom";

function LandingPage() {
    return (
        <div className="">
            <h1 className="white-text page-heading pt-2">Team D - ERS Project</h1>

            <img src={landingImg} alt="landing-img-ERS" className="img-fluid landing-img"/>

            <div className=' mt-5 d-flex container justify-content-around'>

                <Link to="/login" className='formButton h-50'>Login</Link>

                
                <div className='white-text d-block'>
                    <a href="https://github.com/adam-lyn" target="_blank" className='swoosh'>Adam Lyn</a><br/>
                    <a href="https://github.com/RyanOdeneal" target="_blank" className='swoosh'>Ryan Odeneal</a><br/>
                    <a href="https://github.com/664330348" target="_blank" className='swoosh'>Zhenying Chen</a><br/>
                    <a href="https://github.com/abhilekhx" target="_blank" className='swoosh'>Abhilekh Adhikari</a><br/>
                </div>

                <Link to="/register" className='formButton h-50'>Register</Link>
            </div>
        </div>)
}

export default LandingPage;
import "../styles/about.css";

import Navbar from "../component/Navbar";

const About = () =>{
    return(
        <div>
            <Navbar />
            <div className="title">
              <h1>About</h1>
              <hr className="hr-about"></hr>
              <h3>In partial fulfillment of the course STADVDB</h3>
            </div>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-7" id="proj-desc">
                    The course project on Transactions Management is a venue for students to practice building a distributed database system that supports concurrent multi-user access. Students will once again use the IMDB_ijs dataset to design a three-node distributed database system where they perform concurrent transactions and simulate crash and recovery techniques. The final output will be a software that will be demonstrated during the indicated schedule to the respective STADVDB teachers, and a test script showing the results of performing the different test cases described below on your software.
                    </div>
                    <div class="col-sm-3" id="get-started">
                    <a href="/"><button className="get-started">Get Started</button></a>
                    </div>
                </div>
            </div>

            <div class="container" id="read-me">
                <h5> Setting up</h5>
                <div class="row">
                    <div class="col-sm">
                    One of three columns
                    </div>
                    <div class="col-sm">
                    One of three columns
                    </div>
                    <div class="col-sm">
                    One of three columns
                    </div>
                </div>
            </div>

        </div>  
    )
}

export default About;
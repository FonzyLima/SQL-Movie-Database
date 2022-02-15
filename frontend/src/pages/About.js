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

            <div class="container-fluid" id="read-me">
                <h4> Setting up</h4>
                <div class="row">
                    <div class="col-sm-6">
                        <h5> Installation</h5>
                        <div class="row">
                            <div class="col-sm-6">
                                <h5 className="subtitle">Backend</h5><br></br>
                                Use npm i to install packages Packages to be installed:
                                <li>express</li>
                                <li>dotenv</li>
                                <li>mysql</li>
                                <li>body-parser</li>
                                <li>cors</li>
                                <li>nodemon</li>
                            </div>

                            <div class="col-sm-6">
                            <h5 className="subtitle">Frontend</h5><br></br>
                                Use npm i to install packages Packages to be installed:
                                <li>axios</li>
                                <li>react-router-dom</li>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <h5> Run Application</h5>
                            <div class="row">
                                <div class="col-sm-6">
                                    <h5 className="subtitle">Backend</h5><br></br>
                                    Create .env file like the example below: <br></br>
                                    HOSTNAME=fonzyserver.mysql.database.azure.com <br></br>
                                    USER=mco2admin <br></br>
                                    PASSWORD=admin12345! <br></br>
                                    DATABASE=mco2 <br></br> <br></br>
                                    Commands:
                                    <li>npm start - start database </li>
                                    <li>npm run dev - start database in development mode (nodemon)</li>
                                </div>

                                <div class="col-sm-6">
                                    <h5 className="subtitle">Frontend</h5><br></br>
                                    Commands:
                                    <li>npm start - start database </li>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            <footer>
                <p> STADVDB S14 <br></br> </p>
                <p> BERENGUER, Beatrice A. <br></br></p> 
                <p> CAMARILLO, Bryan Daniel B. <br></br></p> 
                <p> LIMA, Alfonso Gabriel V. </p>
            </footer>
        </div>
    )
}

export default About;
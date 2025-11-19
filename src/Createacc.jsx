import buyerImg from "./assets/buyer.jpeg";
import sellerImg from "./assets/seller.jpeg";
import JobseekerImg from "./assets/jobseeker.png";

import "./index.css";
import { Link } from "react-router-dom";
function Createacc(){
    return(
         <div className="page-center">
      <div className="cards-container">
        <Link to="/buyer" className="no-style">
      <div className="new-card">
         <img
                src={buyerImg}
                alt="Buyer Logo"
                style={{ width: "200px", height: "auto", marginBottom: "30px" }}/>
        <h3>Buyer</h3>
        <p>Find and book spaces for your needs</p>
      </div>
      </Link>
<Link to="/seller" className="no-style">
      <div className="new-card">
         <img
                src={sellerImg}
                alt="Seller Logo"
                style={{ width: "200px", height: "auto", marginBottom: "30px" }}/>
        <h3>Seller</h3>
        <p>List and rent your properties to clients</p>
      </div>
      </Link>
<Link to="/jobseeker" className="no-style">
      <div className="new-card">
         <img
                src={JobseekerImg}
                alt="jobseeker Logo"
                style={{ width: "200px", height: "auto", marginBottom: "30px"}}/>
        <h3>Job Seeker</h3>
        <p>Find  job opportunities in the space industry</p>
      </div>
      </Link>
    </div>
    </div>
    );
}
export default Createacc;
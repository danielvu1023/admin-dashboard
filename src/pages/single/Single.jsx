import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";

const Single = () => {
  const location = useLocation();
  const { movie } = location.state;
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
           
            <div className="item">
              <img src={movie.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{movie.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Genre:</span>
                  <span className="itemValue">{movie.genre}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Year:</span>
                  <span className="itemValue">{movie.year}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Limit:</span>
                  <span className="itemValue">{movie.limit}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;

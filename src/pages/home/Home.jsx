import { useState, useEffect, useMemo } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import axios from "axios";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getUserStats = async () => {
      try {
        const stats = await axios.get("user/stats", {
          headers: {
            Authorization: `JWT ${
              JSON.parse(localStorage.getItem("user")).accessToken
            }`,
          },
        });
        // When changes are made, useEffect run again and setUserStats uses the previous state of userStats instead of reseting
        const statsList = stats.data.sort((a, b) => a._id - b._id);
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserStats();
  }, [MONTHS]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart
            title="Last 6 Months (Revenue)"
            aspect={2 / 1}
            data={userStats}
          />
        </div>
        <div className="listContainer">
          <div className="listTitle">Recent Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;

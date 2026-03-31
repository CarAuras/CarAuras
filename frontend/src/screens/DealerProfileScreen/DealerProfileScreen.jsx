import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_DEALER_CARS_BY_DEALER_ID } from "../../config/api";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

function DealerProfileScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dealer, setDealer] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${GET_DEALER_CARS_BY_DEALER_ID}/${id}`);
        setLoading(false);
        if (res && res.data && res.data.length > 0) {
          setCars(res.data);
          setDealer(res.data[0].dealer_id);
        }
      } catch (error) {
        return error;
      }
    };
    fetchCar();
  }, []);

  const handleAddCar = () => {
    navigate("/car/add");
  };

  return (
    <div>
      <div className="profile-screen-container">
        <div className="profile-layout mt-5">
          <div className="profile-sidebar">
            {dealer && <ProfileCard user={dealer} />}
          </div>
          <div className="profile-content">
            <Tabs>
              <TabList>
                <Tab>All Cars</Tab>
              </TabList>

              <TabPanel>
                <div className="cars-grid">
                  {loading ? (
                    <Loader />
                  ) : cars.length === 0 ? (
                    <div className="no-cars">No cars available</div>
                  ) : (
                    cars?.map((car, index) => (
                      <Card
                        key={index}
                        car={car}
                        editable={false}
                        category={"Latest"}
                      />
                    ))
                  )}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealerProfileScreen;

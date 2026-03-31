import React, { useEffect, useRef, useState } from "react";
import "./MobileFilter.css";
import { brands } from "../../dummyData/brands";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { years } from "../../dummyData/year";
import { fuelTypes } from "../../dummyData/fuelTypes";
import { ownerShip } from "../../dummyData/ownerShip";
import { carFeatures } from "../../dummyData/carFeatures";
import { carBodyTypes } from "../../dummyData/bodyTypes";
import { transmissionTypes } from "../../dummyData/transmissionTypes";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

function MobileFilter({ onFilterChange }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const [search, setSearch] = useState("");
  const [selectedCars, setSelectedCars] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedOwnership, setSelectedOwnership] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState([]);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    []
  );
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const appHeader = document.querySelector(".header");
    if (appHeader) setHeaderHeight(appHeader.offsetHeight);
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleCheckboxChange = (selectedArray, setSelectedArray, value) => {
    selectedArray.includes(value)
      ? setSelectedArray(selectedArray.filter((item) => item !== value))
      : setSelectedArray([...selectedArray, value]);
  };

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const applyFilters = () => {
    const filters = {
      brands: selectedCars.map((item) => item.brand),
      car_name: selectedCars.map((item) => item.car),
      year: selectedYear ? `${selectedYear} & ${selectedYear}` : null,
      fuelTypes: selectedFuelTypes.length > 0 ? selectedFuelTypes : null,
      ownership: selectedOwnership.length > 0 ? selectedOwnership : null,
      bodyTypes: selectedBodyTypes.length > 0 ? selectedBodyTypes : null,
      transmissionTypes:
        selectedTransmissionTypes.length > 0 ? selectedTransmissionTypes : null,
      features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
    };

    onFilterChange(
      Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== null)
      )
    );
    setIsFilterVisible(false);
  };

  const clearFilters = () => {
    setSelectedCars([]);
    setSelectedYear(null);
    setSelectedFuelTypes([]);
    setSelectedOwnership([]);
    setSelectedFeatures([]);
    setSelectedBodyTypes([]);
    setSelectedTransmissionTypes([]);
    onFilterChange({});
  };

  const filteredBrands = brands.filter(
    (brand) =>
      brand.brand.toLowerCase().includes(search.toLowerCase()) ||
      brand.cars.some((car) => car.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <button
        className="mobile-filter-toggle"
        onClick={() => setIsFilterVisible(true)}
      >
        <TuneIcon style={{ marginRight: 8 }} />
        Filters
      </button>

      {isFilterVisible && (
        <div
          className="mobile-filter-overlay"
          // style={{ top: `${headerHeight}px` }}
        >
          <div className="mobile-filter-container">
            <div className="mobile-filter-header">
              <h2>Filters</h2>
              <button onClick={() => setIsFilterVisible(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="mobile-filter-content">
              <div className="search-section">
                <div className="search-input-container">
                  <SearchIcon className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search brand or car..."
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
              </div>

              <div className="filter-sections">
                <div className="filter-section">
                  <h3 className="section-title">Top Brands</h3>
                  <div className="brands-list">
                    {filteredBrands.map((brandItem, index) => (
                      <div key={index} className="brand-accordion">
                        <div
                          className="brand-header"
                          onClick={() => handleAccordionToggle(index)}
                        >
                          <span>{brandItem.brand}</span>
                          {activeIndex === index ? (
                            <RemoveCircleOutlineIcon className="accordion-icon" />
                          ) : (
                            <KeyboardArrowDownIcon className="accordion-icon" />
                          )}
                        </div>
                        {activeIndex === index && (
                          <div className="brand-models">
                            {brandItem.cars.map((car, idx) => (
                              <label key={idx} className="model-checkbox">
                                <input
                                  type="checkbox"
                                  checked={selectedCars.some(
                                    (item) =>
                                      item.brand === brandItem.brand &&
                                      item.car === car
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(
                                      selectedCars,
                                      setSelectedCars,
                                      { brand: brandItem.brand, car }
                                    )
                                  }
                                />
                                {car}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {[
                  {
                    title: "Year",
                    items: years,
                    state: selectedYear,
                    isRadio: true,
                  },
                  {
                    title: "Fuel Type",
                    items: fuelTypes,
                    state: selectedFuelTypes,
                  },
                  {
                    title: "Ownership",
                    items: ownerShip,
                    state: selectedOwnership,
                  },
                  {
                    title: "Features",
                    items: carFeatures,
                    state: selectedFeatures,
                  },
                  {
                    title: "Body Type",
                    items: carBodyTypes,
                    state: selectedBodyTypes,
                  },
                  {
                    title: "Transmission",
                    items: transmissionTypes,
                    state: selectedTransmissionTypes,
                  },
                ].map((section, i) => (
                  <div key={i} className="filter-section">
                    <h3 className="section-title">{section.title}</h3>
                    <div className="options-grid">
                      {section.items.map((item, idx) => (
                        <label key={idx} className="option-item">
                          <input
                            type={section.isRadio ? "radio" : "checkbox"}
                            name={
                              section.isRadio
                                ? section.title.toLowerCase()
                                : undefined
                            }
                            checked={
                              section.isRadio
                                ? section.state === item.text
                                : section.state.includes(item.text)
                            }
                            onChange={() =>
                              section.isRadio
                                ? setSelectedYear(item.text)
                                : handleCheckboxChange(
                                    section.state,
                                    section.title === "Fuel Type"
                                      ? setSelectedFuelTypes
                                      : section.title === "Ownership"
                                      ? setSelectedOwnership
                                      : section.title === "Features"
                                      ? setSelectedFeatures
                                      : section.title === "Body Type"
                                      ? setSelectedBodyTypes
                                      : setSelectedTransmissionTypes,
                                    item.text
                                  )
                            }
                          />
                          <span className="option-text">{item.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mobile-filter-footer">
              <button className="clear-btn" onClick={clearFilters}>
                Clear All
              </button>
              <button className="apply-btn" onClick={applyFilters}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileFilter;

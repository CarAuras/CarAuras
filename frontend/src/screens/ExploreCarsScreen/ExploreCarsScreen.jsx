import React, { useEffect, useState } from "react";
import "./ExploreCarsScreen.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Filter from "../../components/Filter/Filter";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card";
import EmptyState from "../../components/EmptyState/EmptyState";
import axios from "axios";
import { GET_ALL_CARS } from "../../config/api";
import Carousel from "../../components/Carousel/Carousel";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

function ExploreCarsScreen() {
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("created_at");
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
  });

  useEffect(() => {
    const updateScreenSize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const fetchCars = async (filters = {}) => {
    try {
      setLoading(true);
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== undefined && value !== null
        )
      );
      const queryParams = new URLSearchParams({
        ...cleanFilters,
        page: pagination.page,
        limit: pagination.pageSize,
        sortBy,
        order,
      }).toString();
      const res = await axios.get(`${GET_ALL_CARS}?${queryParams}`);
      if (res?.data?.success) {
        setCars(res.data.data);
        setPagination((prev) => ({
          ...prev,
          total: res.data.pagination.total,
          pages: res.data.pagination.pages,
        }));
      } else {
        setCars([]);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(filters);
  }, [brand, pagination.page, sortBy, order, filters]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    switch (value) {
      case "price_asc":
        setSortBy("price");
        setOrder("asc");
        break;
      case "price_desc":
        setSortBy("price");
        setOrder("desc");
        break;
      case "latest":
        setSortBy("created_at");
        setOrder("desc");
        break;
      case "oldest":
        setSortBy("created_at");
        setOrder("asc");
        break;
      default:
        setSortBy("created_at");
        setOrder("desc");
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (event, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
  };

  const getSortValue = () => {
    if (sortBy === "price" && order === "asc") return "price_asc";
    if (sortBy === "price" && order === "desc") return "price_desc";
    if (sortBy === "created_at" && order === "asc") return "oldest";
    return "latest";
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.brands?.length) count++;
    if (filters.year) count++;
    if (filters.fuel_type?.length) count++;
    if (filters.ownership?.length) count++;
    if (filters.features?.length) count++;
    if (filters.body_type?.length) count++;
    if (filters.transmission?.length) count++;
    return count;
  };

  return (
    <div className="explore-cars-screen">
      <div className="layout-container">
        {/* Desktop Filter - Only show on desktop */}
        {!isMobile && (
          <div className="filter-column">
            <div className="filter-section">
              <Filter
                onFilterChange={applyFilters}
                isOpen={true}
                onClose={() => {}}
              />
            </div>
          </div>
        )}

        <div className="content-column">
          <Carousel />
          <div className="content-wrapper">
            <div className="sort-bar">
              <div className="sort-bar-left">
                {!isMobile && (
                  <span className="sort-bar-label">
                    {pagination.total > 0 ? `${pagination.total} listings` : ""}
                  </span>
                )}
                {isMobile && (
                  <button
                    className="mobile-filter-button"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <FilterAltIcon />
                    <span>Filters</span>
                    {getActiveFiltersCount() > 0 && (
                      <span className="mobile-filter-badge">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </button>
                )}
              </div>
              <FormControl size="small" className="sort-select-container">
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={getSortValue()}
                  onChange={handleSortChange}
                  label="Sort by"
                >
                  <MenuItem value="price_asc">Price: Low to High</MenuItem>
                  <MenuItem value="price_desc">Price: High to Low</MenuItem>
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="cards-grid">
              {loading ? (
                <div className="loader-container">
                  <Loader />
                </div>
              ) : error ? (
                <div className="error-message">{error}</div>
              ) : cars.length === 0 ? (
                <div className="empty-state">
                  <EmptyState />
                </div>
              ) : (
                cars.map((car) => (
                  <div key={car.id} className="car-card">
                    <Card car={car} />
                  </div>
                ))
              )}
            </div>

            {cars.length > 0 && (
              <div className="pagination-container">
                <Pagination
                  count={pagination.pages}
                  page={pagination.page}
                  onChange={handlePageChange}
                  sx={{
                    "& .MuiPaginationItem-root.Mui-selected": {
                      background: "#111827",
                      color: "#fff",
                    },
                    "& .MuiPaginationItem-root:hover": {
                      background: "#f4f6f9",
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      {isMobile && (
        <Filter
          onFilterChange={applyFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}

export default ExploreCarsScreen;

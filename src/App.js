import './App.css';
import { useState, useEffect, useRef } from 'react';
import Dropdowns from './components/Dropdowns';
import data from './city-data.json'; // Assuming you have a JSON file with city data
import Buttons from './components/Buttons';
import ClickRoutes from './components/ClickRoutes'
import buildISODate from './utils/buildISODate';
function App() {

  const cities = ["Chicago, USA", "London, UK", "Los Angeles, USA", "New York City, USA", "San Francisco, USA", "Toronto, Canada", "Washington DC, USA"];
  const [selectedCities, setSelectedCities] = useState([])
  const origins = [
  "International Airport Arrivals",
  "Secondary Airport Arrivals",
  "Largest train station",
  "City Hall",
  "Largest park",
  "Largest zoo",
  "Top-rated restaurant on TripAdvisor in August 2025",
  "Top-rated bar/pub on TripAdvisor in August 2025",
  "Highest-ranked museum on TripAdvisor in August 2025",
  "Highest-ranked architectural building on TripAdvisor in August 2025",
  "Largest sporting arena in the metropolitan area",
  "Largest shopping mall in the metropolitan area",
  "Hospital with the most staffed beds",
  "Downtown of the next largest city in the metropolitan area"
];
  const [selectedOrigin, setSelectedOrigin] = useState('')
  const destinations = [
  "International Airport Departures",
  "Secondary Airport Departures",
  "Largest train station",
  "City Hall",
  "Largest park",
  "Largest zoo",
  "Top-rated restaurant on TripAdvisor in August 2025",
  "Top-rated bar/pub on TripAdvisor in August 2025",
  "Highest-ranked museum on TripAdvisor in August 2025",
  "Highest-ranked architectural building on TripAdvisor in August 2025",
  "Largest sporting arena in the metropolitan area",
  "Largest shopping mall in the metropolitan area",
  "Hospital with the most staffed beds",
  "Downtown of the next largest city in the metropolitan area"
];
  const [selectedDestination, setSelectedDestination] = useState('')
  const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  const [selectedHour, setSelectedHour] = useState('');
  const minutes = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
  const [selectedMinute, setSelectedMinute] = useState('');
  const months = ["Aug", "Sep", "Oct", "Nov"];
  const [selectedMonth, setSelectedMonth] = useState('');
  const dates = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  const [selectedDate, setSelectedDate] = useState('');
  const [routesConfig, setRoutesConfig] = useState(null);
  const [showAbout, setShowAbout] = useState(false);


  return (
    <div className="App">
      <button
        onClick={() => setShowAbout(true)}
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "8px 12px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Info and Instructions
      </button>

      {/* Popup Modal */}
      {showAbout && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "600px",
              width: "90%",
              position: "relative"
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowAbout(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ×
            </button>

            <h2>If you're planning a vacation, moving to a new city, or just curious to see how covenient (or not) your city is...</h2>
            <p>
              1. Select a generalized origin, generalized destination, and list of cities from the dropdowns. Origin and destination options apply to areas within city limits unless they specify that they apply to the entire metropolitan area.
            </p>
            <p>
              2. A month, date, and time of departure must be selected to view transit routes, which are available for date-time combinations that fall between 5 days before and 99 days after the present date and time. The departure time for transit routes is set to your chosen date and time in the local timezone of every selected city.
            </p>
            <p>
              3. Driving directions do not require a date or time. Switch between <strong>Transit</strong> and <strong>Driving</strong> modes using the buttons below the dropdowns.
            </p>
            <footer><strong>App Built by Tanmay Bothra</strong></footer>
          </div>
        </div>
      )}
      <header className="App-header">
        <div>
          <img
            src="cover-image.png" // <-- put your image file in /public and reference here
            alt="City and Urban Transportation"
            style={{ width: "100%", maxHeight: "400px" }}
          />
        </div>

        <div className="App-grid">
          {/* Row 1 */}
          <div className="App-cell-left">
            <Dropdowns
              label="Select Origin"
              options={origins}
              selected={selectedOrigin}
              onChange={setSelectedOrigin}
              multiSelection={false}
              style={{ width: "90%" }}
            />
          </div>
          <div className="App-cell-right">
            <Dropdowns
              label="Select Destination"
              options={destinations}
              selected={selectedDestination}
              onChange={setSelectedDestination}
              multiSelection={false}
              style={{ width: "90%" }}
            />
          </div>

          {/* Row 2 */}
          <div className="App-cell-left">
            <Dropdowns label="Select Cities"
              options={cities} selected={selectedCities}
              onChange={setSelectedCities}
              multiSelection={true}
              style={{ width: "90%" }}
            />
          </div>
          <div className="App-cell-right">
            <Dropdowns
              label="Select Month"
              options={months}
              selected={selectedMonth}
              onChange={setSelectedMonth}
              multiSelection={false}
              style={{ width: "22.5%" }}
            />
            <Dropdowns
              label="Select Date"
              options={dates}
              selected={selectedDate}
              onChange={setSelectedDate}
              multiSelection={false}
              style={{ width: "22.5%" }}
            />
            <Dropdowns
              label="Select Hour"
              options={hours}
              selected={selectedHour}
              onChange={setSelectedHour}
              multiSelection={false}
              style={{ width: "22.5%" }}
            />
            <Dropdowns
              label="Select Minutes"
              options={minutes}
              selected={selectedMinute}
              onChange={setSelectedMinute}
              multiSelection={false}
              style={{ width: "22.5%" }}
            />
          </div>
          <div className="App-cell-left">
            <Buttons
              label="Get Transit Routes"
              onPress={() => {
                if (
                  !selectedOrigin ||
                  !selectedDestination ||
                  selectedCities.length === 0 ||
                  !selectedMonth ||
                  !selectedDate ||
                  !selectedHour ||
                  !selectedMinute
                ) {
                  alert("Please select all fields to get transit routes");
                  return null;
                }
                if (selectedOrigin === selectedDestination || (selectedOrigin === "International Airport Arrivals" && selectedDestination === "International Airport Departures") || (selectedOrigin === "Secondary Airport Arrivals" && selectedDestination === "Secondary Airport Departures")) {
                  alert("Please choose different origins and destinations");
                  return null;
                }
                if((selectedMonth === 'Sep' || selectedMonth === 'Nov') && selectedDate === '31'){
                  alert("Please select a valid date")
                  return null;
                }
                let dateTime = buildISODate(selectedMonth, selectedDate, selectedHour, selectedMinute);
                if (dateTime < new Date(new Date().getTime() - (5 * 24 * 60 * 60 * 1000))) {
                  alert("Please select a date and time that is not more than 5 days before the current time in your location to get transit routes");
                  return null;
                }
                if (dateTime > new Date(new Date().getTime() + (99 * 24 * 60 * 60 * 1000))) {
                  alert("Please select a date and time that is not more than 99 days after the current time in your location to view transit routes");
                  return null;
                }
                // Handle button press logic here
                setRoutesConfig({
                  selectedOrigin,
                  selectedDestination,
                  selectedCities,
                  selectedMonth,
                  selectedDate,
                  selectedHour,
                  selectedMinute,
                  transportMode: 'TRANSIT'
                });
              }}
            />
          </div>
          <div className="App-cell-right">
            <Buttons
              label="Get Driving Directions"
              onPress={() => {
                if (
                  !selectedOrigin ||
                  !selectedDestination ||
                  selectedCities.length === 0
                ) {
                  alert("Please select an origin, destination, and city to get driving directions");
                  return null;
                }
                if (selectedOrigin === selectedDestination || (selectedOrigin === "International Airport Arrivals" && selectedDestination === "International Airport Departures") || (selectedOrigin === "Secondary Airport Arrivals" && selectedDestination === "Secondary Airport Departures")) {
                  alert("Please choose different origins and destinations");
                  return null;
                }
                setRoutesConfig({
                  selectedOrigin,
                  selectedDestination,
                  selectedCities,
                  selectedMonth,
                  selectedDate,
                  selectedHour,
                  selectedMinute,
                  transportMode: 'DRIVING'
                });
              }}
            />
          </div>
        </div>
        <div className='maps-grid'>
          {routesConfig && (
            <ClickRoutes
              {...routesConfig}
              data={data}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
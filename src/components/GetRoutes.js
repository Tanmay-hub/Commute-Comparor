import {  Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import buildISODate from '../utils/buildISODate';
import { useState, useEffect, useRef } from 'react';
export default function GetRoutes({ selectedOrigin,
  selectedDestination,
  selectedCities,
  selectedMonth,
  selectedDate,
  selectedHour,
  selectedMinute,
  data,
  city,
  transportMode }) {
  console.log(`Getting routes for ${city} from ${selectedOrigin} to ${selectedDestination}`);
  const map = useMap(city);
  const directionsLibrary = useMapsLibrary('routes');
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [directionsResult, setDirectionsResult] = useState([]);
  const latitude = data.cities[city]["latitude"];
  const longitude = data.cities[city]["longitude"];
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    if (!directionsLibrary) return;
    if (directionsLibrary) {
      directionsServiceRef.current = new directionsLibrary.DirectionsService();
      directionsRendererRef.current = new directionsLibrary.DirectionsRenderer();
    }
    return () => {
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
      }
    };
  }, [directionsLibrary, map, city]);

  useEffect(() => {
    if (!directionsServiceRef.current || !directionsRendererRef.current) {
      return;
    }

    const renderer = directionsRendererRef.current;
    const service = directionsServiceRef.current;

    renderer.setMap(map);
    renderer.setDirections(null);

    console.log("Making API call");

    let startAddress;
    let endAddress;
    (data.cities[city][selectedOrigin] && data.cities[city][selectedOrigin].street_address) ? startAddress = data.cities[city][selectedOrigin].street_address : startAddress = null;
    (data.cities[city][selectedDestination] && data.cities[city][selectedDestination].street_address) ? endAddress = data.cities[city][selectedDestination].street_address : endAddress = null;


    const request =
      transportMode === "TRANSIT"
        ? {
          origin: startAddress,
          destination: endAddress,
          travelMode: transportMode,
          transitOptions: {
            departureTime: buildISODate(
              selectedMonth,
              selectedDate,
              selectedHour,
              selectedMinute,
              data.cities[city]["timezone"]
            ),
          },
        }
        : {
          origin: startAddress,
          destination: endAddress,
          travelMode: transportMode
        };

    service.route(request, (result, status) => {
      if (status === "OK") {
        renderer.setDirections(result);
        setDirectionsResult(result.routes);
        console.log("Directions request successful:", result);

        const leg = result.routes[0].legs[0];
        setRouteInfo({
          start: data.cities[city][selectedOrigin].name + ", " + leg.start_address,
          departure: transportMode === "TRANSIT" ? selectedMonth + " " + selectedDate + " " + leg.departure_time?.text : "N/A",
          end:
            data.cities[city][selectedDestination].name +
            ", " +
            leg.end_address,
          arrival: leg.arrival_time?.text || "N/A",
          duration: leg.duration.text,
          distance: (leg.distance.text.includes("km")) ? (leg.distance.value/1609.34).toFixed(2) + " mi" : leg.distance.text,
          speed:
            leg.distance.value && leg.duration.value
              ? (
                (leg.distance.value / leg.duration.value) *
                2.23694185194
              ).toFixed(2) + " mph"
              : "N/A",
        });
      } else {
        console.error("Directions request failed due to " + status);
      }
    });
  }, [
    directionsLibrary,
    map,
    selectedOrigin,
    selectedDestination,
    selectedMonth,
    selectedDate,
    selectedHour,
    selectedMinute,
    city,
    transportMode,
  ]);

  return (
    <div className="map-with-info">
      <Map
        id={city}
        style={{ width: "100%", height: "400px" }}
        defaultCenter={{ lat: latitude, lng: longitude }} // fallback center
        defaultZoom={9}
      />
      {(routeInfo) ? (
        <div className="infobox">
          <h3>{city}</h3>
          <table>
            <tbody>
              <tr>
                <td><strong>From:</strong></td>
                <td>{routeInfo.start}</td>
              </tr>
              <tr>
                <td><strong>Departure:</strong></td>
                <td>{routeInfo.departure}</td>
              </tr>
              <tr>
                <td><strong>To:</strong></td>
                <td>{routeInfo.end}</td>
              </tr>
              <tr>
                <td><strong>Arrival:</strong></td>
                <td>{routeInfo.arrival}</td>
              </tr>
              <tr>
                <td><strong>Travel Time:</strong></td>
                <td>{routeInfo.duration}</td>
              </tr>
              <tr>
                <td><strong>Distance:</strong></td>
                <td>{routeInfo.distance}</td>
              </tr>
              <tr>
                <td><strong>Speed:</strong></td>
                <td>{routeInfo.speed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (<div className="infobox">
        <h3>{city}</h3>
        <p>Either the origin or destination does not exist in {city}, or no transit route is available from the origin to the destination in {city} at this time .</p>
      </div>
      )}
    </div>
  );
}
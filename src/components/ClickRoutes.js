import GetRoutes from './GetRoutes';
import { APIProvider} from '@vis.gl/react-google-maps';

export default function ClickRoutes({
  selectedOrigin,
  selectedDestination,
  selectedCities,
  selectedMonth,
  selectedDate,
  selectedHour,
  selectedMinute,
  data,
  transportMode
}) {
  console.log("All selections made. Proceeding to get routes.");

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      {selectedCities.map((city, index) => {
       /* let routeParameters = findRouteParameters(data, city, selectedOrigin, selectedDestination, selectedOriginAddress, setSelectedOriginAddress, selectedDestinationAddress, setSelectedDestinationAddress, showModal, setShowModal)*/;
        console.log(`Preparing to get routes for city: ${city}`);
        return (
          <GetRoutes
            key={index}
            selectedOrigin={selectedOrigin}
            selectedDestination={selectedDestination}
            selectedMonth={selectedMonth}
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            city={city}
            data={data}
            transportMode={transportMode}
          />
        );
      })}
    </APIProvider>
  );
}
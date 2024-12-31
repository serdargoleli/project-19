import { GoogleMap, InfoWindow, Marker, MarkerClusterer, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

const ReactGoogleMaps = ({ locations = [], height }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 39.798288, lng: 32.805747 });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });


  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const defaultOptions = {
    zoomControl: true, // Zoom kontrolü etkinleştirildiğinde
    zoom: 1 // Başlangıç zoom değeri
  };

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleInfoWindowClose = () => {
    setInfoWindowOpen(false);
    setSelectedMarker(null);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setInfoWindowOpen(true);
  };

  const clusterMarker = "data:image/svg+xml,%3Csvg width='94' height='94' viewBox='0 0 94 94' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='47' cy='47' r='47' fill='%23FF671D' fill-opacity='0.4'/%3E%3Ccircle cx='47' cy='47' r='37.2759' fill='%23FF671D'/%3E%3C/svg%3E%0A";
  const clusterStyles = [
    {
      height: 50, textColor: "#ffffff", width: 50,
      url: clusterMarker
    },
    {
      height: 50, textColor: "#ffffff", width: 50,
      url: clusterMarker
    }
  ];
  return isLoaded ? (
    <GoogleMap
      onLoad={onLoad}
      onUnmount={onUnmount}
      zoom={6}
      center={center}
      mapContainerStyle={{ height: "100%", width: "100%" }}
      options={{ styles: mapStyle }}
      defaultOptions={defaultOptions}
    >
      {map && (
        <MarkerClusterer
          options={{
            maxZoom: 15, gridSize: 50,
            averageCenter: true,
            styles: clusterStyles
          }}
          className="custom-cluster">
          {(clusterer) =>
            locations?.map((location, index) => (
              <Marker
                icon={{
                  url: "/marker.png",
                  scaledSize: new window.google.maps.Size(40, 50)
                }}
                label={{
                  text: location?.count?.toString(), // Burada metni belirleyin
                  color: "white", // Yazı rengi
                  fontWeight: "bold" // Yazı kalınlığı
                }}
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                clusterer={clusterer}
                onClick={() => handleMarkerClick(location)}
              />
            ))
          }
        </MarkerClusterer>
      )}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={handleInfoWindowClose}
          options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
          visible={infoWindowOpen}
        >
          <div>
            <div className="border-b border-solid py-3 mb-3">
              <h3 className="font-semibold text-md mb-2">{selectedMarker?.group_name}</h3>
              <p>{selectedMarker?.stations_address}</p>
            </div>
            <h4 className="font-semibold">İstasyonlar{"(" + selectedMarker?.count + ")"} </h4>
            {selectedMarker.stations.map((station, index) => (
              <ul className="border-b border-solid bg-gray-200  mb-3 p-4">
                <li><span className="font-medium mr-1">{station?.name}</span></li>
                <li><span className="font-medium mr-1">Güç:</span>{station?.power_type}</li>
                <li><span className="font-medium mr-1">Soket Sayısı:</span>{station?.sockets?.length}</li>
                {
                  station?.sockets?.map((socket, index) => (
                    <li className="ml-4">
                      <span className="font-medium mr-1">Soket {index + 1}:</span> <br />
                      <span>QR:{socket?.socket_qr}</span><br />
                      <span>TYPE:{socket?.socket_type}</span><br />
                    </li>
                  ))
                }

              </ul>
            ))}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default ReactGoogleMaps;

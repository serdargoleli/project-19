import {useEffect, useState} from "react";
import GoogleMapReact from "google-map-react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const MyMarker = ({lat, lng}) => {
    return <div className="marker"
                style={{position: "absolute", transform: "translate(-50%, -50%) rotate(45deg)", left: "0", top: "0"}}/>;
};

//dark mod
const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#1a1a22", // Harita arka plan rengi (karanlık mod)
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#EAEAEA", // Metin rengi (karanlık mod)
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#15151b", // Metin kenarlık rengi (karanlık mod)
            },
        ],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#d59563",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#d59563",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#263c3f",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#6b9a76",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                color: "#38414e",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#212a37",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9ca5b3",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#746855",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#1f2835",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#f3d19c",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                color: "#2f3948",
            },
        ],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#d59563",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#17263c",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#515c6d",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#17263c",
            },
        ],
    },
];

/**
 *
 * @param {Object} coordinates - latitude ve longitude değerlerini alır
 * @param {function} addMarker - harita üzerinde işaretleme yapsın mı yapmasın mı
 * @param {function} setSelectedCoordi - harita üzerinde seçilen yerin konum bilgisi
 * @param {string} heightMap - harita yüksekliği
 * @returns
 */
const Map = ({coordinates, addMarker, setSelectedCoordi, heightMap = "h-[257px]"}) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const defaultCenter = coordinates ? {lat: Number(coordinates?.latitude), lng: Number(coordinates?.longitude)} : {
        lat: 39.78690791129604,
        lng: 32.8106933730833
    };
    const [options, setOptions] = useState({});
    const handleMapClick = ({lat, lng}) => {
        // addMarker true ise ve kullanıcı haritada bir yere tıklarsa, işaretleme yap
        if (addMarker) {
            setSelectedLocation({lat, lng});
            setSelectedCoordi({lat, lng});
        }
    };

    useEffect(() => {
        const isDarkm = document.documentElement.classList.contains("dark");
        setOptions(isDarkm ? {styles: mapStyle} : {});
    }, []);

    useEffect(() => {
        // coordinates prop'u güncellendiğinde, harita merkezini de güncelle
        if (coordinates && coordinates.latitude && coordinates.longitude) {
            setSelectedLocation({lat: coordinates.latitude, lng: coordinates.longitude});
        }
        const isDark = document.documentElement.classList.contains("dark");
        setOptions(isDark ? {styles: mapStyle} : {});
    }, [coordinates]);

    return (
        <div className={`w-full ${heightMap} rounded-lg overflow-hidden shadow-xl   dark:shadow-slate-200/5`}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={defaultCenter}
                defaultZoom={15}
                onClick={handleMapClick}
                options={options}
            >
                {selectedLocation &&
                    <MyMarker key={"index"} lat={selectedLocation.lat} lng={selectedLocation.lng}/>
                }

            </GoogleMapReact>
        </div>


    );
};
export default Map;

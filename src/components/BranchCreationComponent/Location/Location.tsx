// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiYWxlcGhyaSIsImEiOiJjamdwbHpycjIyZm45Mndud3AzamRibHpqIn0.ejAHwSGT6dcGxiDOrPCFLg";

// export default function Location() {
//   const mapContainer = useRef();
//   const map = useRef();
//   const [lng, setLng] = useState(90.5342);
//   const [lat, setLat] = useState(23.9921);
//   const [zoom, setZoom] = useState(5.7);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current  = new mapboxgl.Map({
//       container:  mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     map.current.on("move", () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });
//   const styles = {
//     mapContainer: {
//       height: "400px",
//     },

//     sidebar: {
//       backgroundColor: "rgb(35 55 75 / 90%)",
//       color: "#fff",
//       padding: "6px 12px",
//       fontFamily: "monospace",
//       zIndex: 1,
//       position: "absolute",
//       borderRadius: "4px",

//     },
//   };
//   return (
//     <div>
//       <div className="sidebar ml-5 mt-5" style={styles.sidebar}>
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className="map-container" style={styles.mapContainer}/>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import mapboxgl, { LngLat } from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { useBranchDetails } from "../Zustand/Zustand";

// const MapboxMap = () => {
//   const { latitude, longitude, updateLatitude, updateLongitude } =
//     useBranchDetails();
//   // const [lng, setLng] = useState(90.28973119576159);
//   // const [lat, setLat] = useState(23.86266530867465);
//   // const [zoom, setZoom] = useState(5);
//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoiYWxlcGhyaSIsImEiOiJjamdwbHpycjIyZm45Mndud3AzamRibHpqIn0.ejAHwSGT6dcGxiDOrPCFLg";

//     const map = new mapboxgl.Map({
//       container: "map",
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: [longitude, latitude],
//       zoom: 5,
//       attributionControl: false,
//     });

//     const marker = new mapboxgl.Marker({
//       draggable: true,
//     })
//       .setLngLat([longitude, latitude])
//       .addTo(map);

//     marker.on("dragend", () => {
//       const lngLat: LngLat = marker.getLngLat();
//       console.log("Marker dragged to:", lngLat);
//       updateLatitude(lngLat.lat);
//       updateLongitude(lngLat.lng);
//       // setLng(lngLat?.lng);
//       // setLat;
//     });

//     return () => {
//       marker?.remove();
//       map?.remove();
//     };
//   }, []);

//   return <div id="map" style={{ height: "400px" }}></div>;
// };

// export default MapboxMap;
// import React, { useState, useRef, useEffect, ChangeEvent } from "react";
// import mapboxgl, { LngLatLike } from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { useBranchDetails } from "../Zustand/Zustand";

// interface Feature {
//   center: LngLatLike;
// }

// interface GeoCodingResponse {
//   features: Feature[];
// }

// const MapWithSearchAndMarker: React.FC = () => {
//   const [map, setMap] = useState<mapboxgl.Map | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
//   const mapContainer = useRef<HTMLDivElement | null>(null);
//   const { latitude, longitude, updateLatitude, updateLongitude } =
//     useBranchDetails();

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoiYWxlcGhyaSIsImEiOiJjamdwbHpycjIyZm45Mndud3AzamRibHpqIn0.ejAHwSGT6dcGxiDOrPCFLg";

//     const initializeMap = () => {
//       if (mapContainer.current) {
//         const newMap = new mapboxgl.Map({
//           container: mapContainer.current,
//           style: "mapbox://styles/mapbox/streets-v11",
//           center: [longitude, latitude],
//           zoom: 5,
//           attributionControl: false,
//           // center: [0, 0],
//           // zoom: 5,
//         });
//         const newMarker = new mapboxgl.Marker({
//           draggable: true,
//         })
//           .setLngLat([longitude, latitude])
//           .addTo(newMap);

//         // Remove the previous marker if it exists
//         if (marker) {
//           marker?.remove();
//         }

//         // Set the new marker
//         setMarker(newMarker);

//         // Add dragend event listener
//         newMarker.on("dragend", () => {
//           const newCoordinates = newMarker.getLngLat();
//           console.log("Marker dragged to:", newCoordinates);
//         });

//         // Add navigation control
//         newMap.addControl(new mapboxgl.NavigationControl());

//         setMap(newMap);
//       }
//     };

//     if (!map) {
//       initializeMap();
//     }

//     return () => {
//       if (map) {
//         map.remove();
//       }
//     };
//   }, [map]);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${mapboxgl.accessToken}`
//       );

//       const data: GeoCodingResponse = await response.json();

//       if (data.features && data.features.length > 0) {
//         const coordinates = data.features[0].center;

//         // Update map center or add a marker at the searched location
//         if (map) {
//           map.flyTo({ center: coordinates, zoom: 14 });

//           // Add a draggable marker
//           const newMarker = new mapboxgl.Marker({
//             draggable: true,
//           })
//             .setLngLat(coordinates)
//             .addTo(map);

//           // Remove the previous marker if it exists
//           if (marker) {
//             marker?.remove();
//           }

//           // Set the new marker
//           setMarker(newMarker);

//           // Add dragend event listener
//           newMarker.on("dragend", () => {
//             const newCoordinates = newMarker.getLngLat();
//             console.log("Marker dragged to:", newCoordinates);
//           });
//         }
//       } else {
//         console.error("Location not found");
//       }
//     } catch (error) {
//       console.error("Error fetching geocoding data", error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           placeholder="Search for a location"
//           value={searchTerm}
//           onChange={(e: ChangeEvent<HTMLInputElement>) =>
//             setSearchTerm(e.target.value)
//           }
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <div
//         ref={(el) => (mapContainer.current = el)}
//         style={{ height: "400px" }}
//       />
//     </div>
//   );
// };

// export default MapWithSearchAndMarker;

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useBranchDetails } from "../Zustand/Zustand";
import { useForm } from "antd/es/form/Form";

interface Feature {
  center: LngLatLike;
}

interface GeoCodingResponse {
  features: Feature[];
}

const MapWithInitialAndSearchMarker: React.FC = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [form] = useForm();

  const { latitude, longitude, updateLatitude, updateLongitude } =
    useBranchDetails();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxlcGhyaSIsImEiOiJjamdwbHpycjIyZm45Mndud3AzamRibHpqIn0.ejAHwSGT6dcGxiDOrPCFLg";

    const initializeMap = () => {
      if (mapContainer?.current) {
        const newMap = new mapboxgl.Map({
          container: mapContainer?.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [longitude,latitude ],
          zoom: 5,
          attributionControl: false,
        });

        // Add navigation control
        newMap.addControl(new mapboxgl.NavigationControl());

        // Add an initial marker
        const initialMarker = new mapboxgl.Marker({
          draggable: true,
        })
          .setLngLat([longitude, latitude])
          .addTo(newMap);

        // Set the initial marker
        setMarker(initialMarker);

        // Add dragend event listener for the initial marker
        initialMarker.on("dragend", () => {
          const initialCoordinates = initialMarker.getLngLat();
          console.log("Initial marker dragged to:", initialCoordinates);
        
            form.setFieldsValue({
              longitude: 'New Dynamic Value',
              latitude:'New Dynamic Value',
            });
          
          updateLatitude(initialCoordinates.lat), updateLongitude(initialCoordinates.lng);
        });

        setMap(newMap);
      }
    };

    if (!map) {
      initializeMap();
    }

    return () => {
      if (map) {
        map?.remove();
      }
    };
  }, [map]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${mapboxgl.accessToken}`
      );

      const data: GeoCodingResponse = await response?.json();

      if (data?.features && data?.features?.length > 0) {
        const searchCoordinates = data?.features[0].center;

        if (marker) {
          marker?.setLngLat(searchCoordinates);
        } else {

          const newMarker = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat(searchCoordinates)
            .addTo(map as mapboxgl.Map);

          // Set the new marker
          setMarker(newMarker);

          // Add dragend event listener for the new marker
          newMarker.on("dragend", () => {
            const newCoordinates = newMarker?.getLngLat();
            console.log("Marker dragged to:", newCoordinates);
            form.setFieldsValue({
              longitude: 'New Dynamic Value',
              latitude:'New Dynamic Value',
            });
            updateLatitude(newCoordinates.lat), updateLongitude(newCoordinates.lng)
          });
        }

        // Fly to the searched location
        if (map) {
          map?.flyTo({ center: searchCoordinates, zoom: 14 });
        }
      } else {
        console.error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching geocoding data", error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search for a location"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div
        ref={(el) => (mapContainer.current = el)}
        style={{ height: "400px" }}
      />
    </div>
  );
};

export default MapWithInitialAndSearchMarker;

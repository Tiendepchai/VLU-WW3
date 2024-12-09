// import L from "leaflet";

class lcdp_map {
  constructor(containerId, options = {}) {
    this.map = null;
    this.markers = [];
    this.polylines = [];
    this.currentLocation = null;
    this.init(containerId, options);
  }

  init(containerId, options) {
    // Initialize the map
    this.map = L.map(containerId, options);

    // Add the default tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);
  }

  /*
   * Create a marker with a custom popup.
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {string} title - Popup title
   * @param {string} content - Popup content
   * @param {string} iconClass - Font Awesome class (default: 'fa-map-marker-alt')
   * @param {string} iconColor - Icon color (default: '#003C71')
   * @param {Object} options - Additional options for marker and popup
   * @returns {Object} marker - The created marker
   */
  createMarker(lat, lng, title = "", content = "", iconClass = "fa-map-marker-alt", iconColor = "#003C71", options = {}) {
    const customIcon = L.divIcon({
      html: `
        <span class="fa-stack fa-lg" style="font-size: 20px;">
          <i class="fa-regular fa-circle fa-stack-2x" style="color: ${iconColor}; opacity: 0.8;"></i>
          <i class="${iconClass} fa-stack-1x" style="color: ${iconColor};"></i>
        </span>
      `,
      className: "custom-marker-icon",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    });

    const markerOptions = {
      ...options.marker,
      icon: customIcon,
    };

    const popupOptions = {
      ...options.popup,
      className: "custom-popup",
    };

    const popupContent = `
      <div class="popup-content">
        <h3 class="popup-title">${title}</h3>
        <div class="popup-body">${content}</div>
      </div>
    `;

    const marker = L.marker([lat, lng], markerOptions)
      .addTo(this.map)
      .bindPopup(popupContent, popupOptions)
      .openPopup();

    // this.markers.push(marker);
    return marker;
  }

  /*
  * Add a marker to the map.
  * @param {number} lat - Latitude of the marker
  * @param {number} lng - Longitude of the marker
  * @param {string} title - Title of the marker's popup
  * @param {string} content - Content of the popup
  * @param {string} iconClass - Font Awesome icon class for the marker (default: 'fa-map-marker-alt')
  * @param {string} iconColor - Color for the marker icon (default: '#003C71')
  * @param {Object} options - Additional options for marker and popup
  * @returns {Object} marker - The created marker
  */
  addMarker(lat, lng, title = "", content = "", iconClass = "fa-solid fa-location-dot", iconColor = "#003C71", options = {}) {
    const marker = this.createMarker(lat, lng, title, content, iconClass, iconColor, options);
    this.markers.push(marker); // Store the marker for potential future removal or management
    return marker;
  }

  /*
   * Update the current location marker and zoom to its position.
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {string} title - Title for the marker (default: "Current location")
   * @param {string} content - Content for the popup
   * @returns {Object} marker - The current location marker
   */
  updateCurrentLocation(lat, lng, title = "Current location", content = "Current location") {
    if (this.currentLocation) {
      this.currentLocation.remove();
      this.markers = this.markers.filter((m) => m !== this.currentLocation);
    }

    this.currentLocation = this.createMarker(
      lat,
      lng,
      title,
      content,
      "fa-solid fa-location-dot", // A unique icon for current location
      "#FF0000" // Red color for the current location
    );
    this.markers.push(this.currentLocation);
    return this.currentLocation;
  }

  /*
   * Get the user's current GPS location and update the map with a marker.
   * @returns {Promise<void>}
   */
  async getCurrentLocation() {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;

      // Update current location on the map
      this.updateCurrentLocation(latitude, longitude);

      // Optionally, zoom the map to the user's location
      this.map.setView([latitude, longitude], 13);

    } catch (error) {
      console.error("Error getting current location:", error);
    }
  }

  /*
  * Calculate the distance between two geographical points (in kilometers).
  * Uses the Haversine formula to account for the curvature of the Earth.
  * @param {number} lat1 - Latitude of the first point
  * @param {number} lng1 - Longitude of the first point
  * @param {number} lat2 - Latitude of the second point
  * @param {number} lng2 - Longitude of the second point
  * @returns {number} distance - The distance in kilometers, rounded to two decimal places
  */
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the Earth in kilometers

    // Convert degrees to radians
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);

    // Convert input coordinates to radians
    const radLat1 = this.toRad(lat1);
    const radLat2 = this.toRad(lat2);

    // Apply the Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    const distance = R * c;

    // Return the distance rounded to two decimal places
    return Math.round(distance * 100) / 100;
  }

  /*
  * Convert degrees to radians.
  * @private
  * @param {number} degrees - Degrees to convert
  * @returns {number} radians - Converted value in radians
  */
  toRad(degrees) {
    return (degrees * Math.PI) / 180;
  }

  /*
   * Draw a polyline between two points (latitude, longitude).
   * @param {number} lat1 - Latitude of the first point
   * @param {number} lng1 - Longitude of the first point
   * @param {number} lat2 - Latitude of the second point
   * @param {number} lng2 - Longitude of the second point
   * @param {Object} options - Optional parameters for the polyline
   * @returns {Promise} polyline - The created polyline
   */
  async drawRoute(lat1, lng1, lat2, lng2, options = {}) {
    const defaultOptions = {
      color: "#003C71", // Default color
      weight: 3, // Line thickness
      opacity: 0.8, // Line opacity
      dashArray: null, // Dashes (null = solid line)
      ...options,
    };

    try {
      // Request route data from OSRM API
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.code !== "Ok" || !data.routes.length) {
        throw new Error("Could not find a route");
      }

      // Get route coordinates from response
      const coordinates = data.routes[0].geometry.coordinates;
          
      // Convert [lng, lat] to [lat, lng] for Leaflet
      const latlngs = coordinates.map(coord => [coord[1], coord[0]]);

      // Delete old lines, marker
      this.clearRoutes();

      // Draw
      const polyline = L.polyline(latlngs, defaultOptions).addTo(this.map);
      
      // Added management section
      this.polylines.push(polyline);

      // Automatically zooms to show the entire road
      this.map.fitBounds(polyline.getBounds(), {
          padding: [50, 50]
      });
      return polyline;
    } catch (error) {
      console.error("Error drawing route:", error);
      return null;
    }
  }

  /*
   * Draw a polyline between two points (latitude, longitude).
   * @param {number} lat_des - Latitude of the first point
   * @param {number} lng_des - Longitude of the first point
   * @param {Object} options - Optional parameters for the polyline
   * @returns {Promise} polyline - The created polyline
   */
  async current_to_marker(lat_des, lng_des,options = {}) {
    const defaultOptions = {
      color: "#003C71", // Default color
      weight: 3, // Line thickness
      opacity: 0.8, // Line opacity
      dashArray: null, // Dashes (null = solid line)
      ...options,
    };

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      // Request route data from OSRM API
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${longitude},${latitude};${lng_des},${lat_des}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.code !== "Ok" || !data.routes.length) {
        throw new Error("Could not find a route");
      }

      // Get route coordinates from response
      const coordinates = data.routes[0].geometry.coordinates;
            
      // Convert [lng, lat] to [lat, lng] for Leaflet
      const latlngs = coordinates.map(coord => [coord[1], coord[0]]);

      // Delete old lines, marker
      this.clearRoutes();

      // Draw
      const polyline = L.polyline(latlngs, defaultOptions).addTo(this.map);
      
      // Added management section
      this.polylines.push(polyline);

      // Automatically zooms to show the entire road
      this.map.fitBounds(polyline.getBounds(), {
          padding: [50, 50]
      });


      return polyline;
    } catch (error) {
      console.error("Error drawing route:", error);
      return null;
    }
  }

  /*
   * Remove all drawn routes (polylines) from the map.
   */
  clearRoutes() {
    this.polylines.forEach((polyline) => {
      polyline.remove();
    });
    this.polylines = [];
  }

  /*
  * Remove all markers from the map.
  */
  clearMarkers() {
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.markers = [];
  }

  /*
   * Find a location by address and return its coordinates.
   * @param {string} address - The address to search
   * @returns {Promise<{lat: number, lng: number} | null>} - Coordinates or null if not found
   */
  async searchAddress(address) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&addressdetails=1`
      );

      const data = await response.json();

      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }

      return null;
    } catch (error) {
      console.error("Error searching address:", error);
      return null;
    }
  }

  /*
   * Search for an address and mark it on the map.
   * @param {string} address - The address to search
   * @param {Object} options - Marker options
   * @returns {Promise<Object|null>} - The created marker or null if not found
   */
  async searchAndMarkAddress(address, options = {}) {
    const coords = await this.searchAddress(address);

    if (coords) {
      const marker = this.createMarker(
        coords.lat,
        coords.lng,
        address, // Use address as the marker title
        "", // No content for the popup
        options.iconClass || "fa-map-marker-alt",
        options.iconColor || "#003C71",
        options
      );

      // Move the map to the found location
      this.map.setView([coords.lat, coords.lng], 16);

      return marker;
    }

    return null;
  }
}

export default lcdp_map;

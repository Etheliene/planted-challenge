const geoDistance = (points, startingPoint) => {
  // Calculate distance between two points using the Haversine formula
  // found on 
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  // Convert degrees to radians
  function toRad(deg) {
    return deg * (Math.PI / 180);
  }

  // Calculate distances between all points and starting point
  const distances = points.map((point) => {
    const distance = calculateDistance(
      startingPoint.latitude,
      startingPoint.longitude,
      point.latitude,
      point.longitude
    );

    return {
      point: point,
      distance: distance,
      distanceToStartingPoint: distance.toFixed(2)
    };
  });

  // Sort distances in ascending order
  distances.sort((a, b) => a.distance - b.distance);

  // Return sorted and modified list of points which is going to include the distance in kilometers 
  return distances.map((item) => ({
    ...item.point,
    distanceToStartingPoint: item.distanceToStartingPoint
  }));
};
export default geoDistance;
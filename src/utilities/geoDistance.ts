/**
 * Sorts a list of latitude/longitude points by their distance to a starting point.
 *
 * @param {Array<{latitude: number, longitude number, [key: string]: any;}>} pwoints - The list of points to sort.
 * @param {{latitude: number, longitude number}} startingPoint - The starting point to calculate distances from.
 * @returns {Array<{latitude: number, longitude number, distanceToStartingPoint: string}>} - The sorted list of points, including the distance to the starting point in kilometers for each point.
 *
 */
const geoDistance = (
  points: { latitude: number; longitude: number }[] | { [key: string]: any }[],
  startingPoint: { latitude: number; longitude: number }
) => {
  // Calculate distance between two points using the Haversine formula
  function calculateDistance(lat1:number, lon1:number, lat2:number, lon2:number) {
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
  function toRad(deg:number) {
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
      distanceToStartingPoint: distance.toFixed(2),
    };
  });

  // Sort distances in ascending order, so the closest distance comes first
  distances.sort((a, b) => a.distance - b.distance);

  // Return sorted and modified list of points which is going to include the distance to the starting point
  return distances.map((item) => ({
    ...item.point,
    distanceToStartingPoint: item.distanceToStartingPoint,
  }));
};
export default geoDistance;

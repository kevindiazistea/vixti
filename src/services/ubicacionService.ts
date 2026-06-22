import * as Location from "expo-location";

export const obtenerUbicacionActual = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return null;

  const loc = await Location.getCurrentPositionAsync({});

  const geo = await Location.reverseGeocodeAsync({
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude,
  });

  const address = [
    geo[0]?.street,
    geo[0]?.streetNumber,
    geo[0]?.city,
    geo[0]?.region,
    geo[0]?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude,
    address,
  };
};

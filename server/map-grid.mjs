const EARTH_RADIUS = 6378137;
const GRID_METERS = 1000;
const MERCATOR_LAT_LIMIT = 85.05112878;
const radians = degrees => degrees * Math.PI / 180;
const degrees = radians => radians * 180 / Math.PI;

export function mapGrid(location) {
  if (location?.coordType !== 'gcj02' || !Number.isFinite(location.lat) || !Number.isFinite(location.lng) || Math.abs(location.lat) > MERCATOR_LAT_LIMIT || Math.abs(location.lng) > 180) return null;
  // A fixed Web Mercator grid keeps grouping independent of user-entered place names.
  const x = EARTH_RADIUS * radians(location.lng);
  const y = EARTH_RADIUS * Math.log(Math.tan(Math.PI / 4 + radians(location.lat) / 2));
  const column = Math.floor(x / GRID_METERS), row = Math.floor(y / GRID_METERS);
  const centerX = (column + 0.5) * GRID_METERS, centerY = (row + 0.5) * GRID_METERS;
  return {
    key: `gcj02-mercator-1000-v1:${column}:${row}`,
    lat: Number(degrees(2 * Math.atan(Math.exp(centerY / EARTH_RADIUS)) - Math.PI / 2).toFixed(6)),
    lng: Number(degrees(centerX / EARTH_RADIUS).toFixed(6)),
    coordType: 'gcj02',
    gridSizeMeters: GRID_METERS
  };
}

export function mapRegion(location) {
  const city = typeof location?.city === 'string' && /^[\p{Script=Han}·]{2,16}$/u.test(location.city) && !/[路街巷号楼栋室]/u.test(location.city) ? location.city : '';
  const district = typeof location?.district === 'string' && /^[\p{Script=Han}·]{2,20}(?:区|县|旗|市)$/u.test(location.district) && !/[路街巷号楼栋室]/u.test(location.district) ? location.district : '';
  return { city, district, place: `${district || city}附近水域` };
}

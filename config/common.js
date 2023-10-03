/**
 * Insert application wide common items here, they're all exported by frontend and backend common.js respectively
 */

const inProduction = process.env.NODE_ENV === 'production';
const revision = '5'; // change this string to ensure a new version deployed

module.exports = {
  inProduction,
  revision,
};

export const regexList = {
  forAuth: /^([^\s@]+@[^\s@]+\.[^\s@]+|[VEve]\d{8,10})$/,
  onlyString: /^\D+$/,
  forDir: /^[A-Za-z0-9\s\\.\\-]+$/,
  forDNI: /^[VEve]\d{8,10}$/,
  forRelation: /^[A-Za-z]+$/,
  forToken: /^[A-Za-z0-9]+$/,
  forPersonalPhoneNumber: /^(\+58)(412|424|414|416|426)\d{7}$/g,
  forHomePhoneNumber: /^(0271|0274|0275)\d{7}$/g,
};

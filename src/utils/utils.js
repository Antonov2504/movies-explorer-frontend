export const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.text();
}

export const setMainApiBaseResponsHeaders = (token) => {
  const baseResponseHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  return baseResponseHeaders;
}

export function throttle(func, limit = 3000) {
  let isThrottling;
  return (...rest) => {
    if (!isThrottling) {
      func(rest);
      isThrottling = setTimeout(() => isThrottling = false, limit);
    }
  }
}

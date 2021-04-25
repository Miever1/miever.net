import React from 'react';

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */

export const useLocalStorageState = (
  key,
  defaultValue = '',
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  const [state, setState] = React.useState(() => {
    let valueInLocalStorage;
    const isSSR = typeof window === 'undefined';

    if (!isSSR) {
      valueInLocalStorage = window.localStorage.getItem(key);
    }
    if (valueInLocalStorage) {
      // avoids deserializing a not safe JSON value eg "dark" is valid but the string dark without ampersand should
      // not get deserialized which was used in the first version
      try {
        return deserialize(valueInLocalStorage);
      } catch (e) {
        return valueInLocalStorage;
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
};

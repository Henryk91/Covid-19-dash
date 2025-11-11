import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { useConfigureLeaflet, useMapServices } from 'hooks';
import { isDomAvailable } from 'lib/util';
// import ExpandSvg from './Expand-svg';

const Map = ( props ) => {
  const { children, className, defaultBaseMap, mapEffect, ...rest } = props;

  const mapRef = useRef();

  useConfigureLeaflet();

  const handleMapCreate = useCallback(
    ( mapInstance ) => {
      mapRef.current = mapInstance;
      if ( typeof mapEffect === 'function' ) {
        mapEffect({ leafletElement: mapInstance, map: mapInstance });
      }
    },
    [mapEffect]
  );

  useEffect(() => {
    if ( typeof mapEffect !== 'function' ) return;
    if ( !mapRef.current ) return;

    mapEffect({ leafletElement: mapRef.current, map: mapRef.current });
  }, [mapEffect]);

  const services = useMapServices({
    names: [defaultBaseMap]
  });
  const basemap = services.find(( service ) => service.name === defaultBaseMap );

  let mapClassName = `map grey-border`;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  if ( !isDomAvailable()) {
    return (
      <div className={mapClassName}>
        <p className="map-loading">Loading map...</p>
      </div>
    );
  }

  const mapSettings = {
    className: 'map-base',
    zoomControl: false,
    whenCreated: handleMapCreate,
    ...rest
  };

  return (
    <div className={mapClassName}>
      <MapContainer ref={mapRef} {...mapSettings}>
        { children }
        { basemap && <TileLayer {...basemap} /> }
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

Map.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultBaseMap: PropTypes.string,
  mapEffect: PropTypes.func
};

export default Map;

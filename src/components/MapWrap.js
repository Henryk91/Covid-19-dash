import React from 'react';
import L from 'leaflet';
import Map from 'components/Map';
import { layerCreator } from '../data/leaflet-providers';

const LOCATION = {
  lat: 0,
  lng: 0,
};
const ALL_MAPS = [
  'Stadia.AlidadeSmoothDark',
  'OpenStreetMap.Mapnik',
  'OpenStreetMap.DE',
  'OpenStreetMap.CH',
  'OpenStreetMap.France',
  'OpenStreetMap.HOT',
  'OpenStreetMap.BZH',
  'OpenTopoMap',
  'Stadia.AlidadeSmooth',
  'Stadia.AlidadeSmoothDark',
  'Stadia.OSMBright',
  'Stadia.Outdoors',
  'Thunderforest.OpenCycleMap',
  'Thunderforest.Transport',
  'Thunderforest.TransportDark',
  'Thunderforest.SpinalMap',
  'Thunderforest.Landscape',
  'Thunderforest.Outdoors',
  'Thunderforest.Pioneer',
  'Thunderforest.MobileAtlas',
  'Thunderforest.Neighbourhood',
  'CyclOSM',
  'OpenMapSurfer.Roads',
  'Hydda.Full',
  'Hydda.Base',
  'Stamen.Toner',
  'Stamen.TonerBackground',
  'Stamen.TonerLite',
  'Stamen.Watercolor',
  'Stamen.Terrain',
  'Stamen.TerrainBackground',
  'Stamen.TerrainLabels',
  'Stamen.TopOSMRelief',
  'TomTom.Basic',
  'TomTom.Hybrid',
  'TomTom.Labels',
  'Esri.WorldStreetMap',
  'Esri.DeLorme',
  'Esri.WorldTopoMap',
  'Esri.WorldImagery',
  'Esri.WorldTerrain',
  'Esri.WorldShadedRelief',
  'Esri.WorldPhysical',
  'Esri.OceanBasemap',
  'Esri.NatGeoWorldMap',
  'Esri.WorldGrayCanvas',
  'FreeMapSK',
  'MtbMap',
  'CartoDB.Positron',
  'CartoDB.PositronNoLabels',
  'CartoDB.PositronOnlyLabels',
  'CartoDB.DarkMatter',
  'CartoDB.DarkMatterNoLabels',
  'CartoDB.DarkMatterOnlyLabels',
  'CartoDB.Voyager',
  'CartoDB.VoyagerNoLabels',
  'CartoDB.VoyagerOnlyLabels',
  'CartoDB.VoyagerLabelsUnder',
  'HikeBike.HikeBike',
  'HikeBike.HillShading',
  'BasemapAT.basemap',
  'BasemapAT.grau',
  'BasemapAT.overlay',
  'BasemapAT.terrain',
  'BasemapAT.surface',
  'BasemapAT.highdpi',
  'BasemapAT.orthofoto',
  'nlmaps.standaard',
  'nlmaps.pastel',
  'nlmaps.grijs',
  'nlmaps.luchtfoto',
  'NASAGIBS.ModisTerraTrueColorCR',
  'NASAGIBS.ModisTerraBands367CR',
  'NASAGIBS.ViirsEarthAtNight2012',
  'NLS',
  'Wikimedia',
  'GeoportailFrance.parcels',
  'GeoportailFrance.ignMaps',
  'GeoportailFrance.maps',
  'GeoportailFrance.orthos',
  'OneMapSG.Default',
  'OneMapSG.Night',
  'OneMapSG.Original',
  'OneMapSG.Grey',
  'OneMapSG.LandLot',
];
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const MapWrap = (props) => {
  L = layerCreator(L);

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
    let reuseMap = false;
    map.eachLayer(function(layer) {
      if (layer._url) {
      } else {
        reuseMap = true;
        layer.remove();
      }
    });

    let response = props.countries;
    const data = response;
    const hasData = Array.isArray(data) && data.length > 0;

    if (!hasData) return;

    const geoJson = {
      type: 'FeatureCollection',
      features: data.map((country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;
        return {
          type: 'Feature',
          properties: {
            ...country,
          },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        };
      }),
    };
    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const { country, updated, todayCases, active, cases, deaths, recovered } = properties;
        const flag = properties.countryInfo.flag;
        if (props.filter === 'active') {
          casesString = `${active}`;
        } else {
          casesString = `${cases}`;
        }
        if (cases > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`;
        }

        if (updated) {
          updatedFormatted = new Date(updated).toLocaleString();
        }

        const html = `
          <span class="icon-marker">
            <span class="icon-marker-tooltip">
              <img style="width: 100%;" src=${flag} />
              <h2>${country}</h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Active:</strong> ${active}</li>
                <li><strong>Cases Today:</strong> ${todayCases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
            </span>
            ${casesString}
          </span>
        `;

        return L.marker(latlng, {
          icon: L.divIcon({
            className: 'icon',
            html,
          }),
          riseOnHover: true,
        });
      },
    });

    geoJsonLayers.addTo(map);

    let arrObj = {};
    if (!reuseMap) {
      ALL_MAPS.forEach((key) => {
        arrObj[key] = L.tileLayer.provider(key);
      });
    }

    if (!reuseMap) L.control.layers(arrObj).addTo(map);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'Stadia.AlidadeSmoothDark',
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <div className="main-containera">
      <Map {...mapSettings} />
    </div>
  );
};

export default MapWrap;

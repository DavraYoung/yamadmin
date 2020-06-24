/* eslint-disable */
import React, {useEffect, useState} from "react";
import {YMaps, Map, Polygon} from 'react-yandex-maps';

const HeatMap = (props) => {
    const INITIAL_VIEW_STATE = {
        center: [41.2995, 69.2401],
        zoom: 10,
        controls: ['zoomControl', 'fullscreenControl'],
    };
    const [polygon, setPolygon] = useState([]);

    useEffect(() => {

    }, [])
    return (
      <div style={{
          position: 'relative',
          height: 500
      }}>
          <YMaps>
              <Map defaultState={INITIAL_VIEW_STATE}
                   modules={['control.ZoomControl', 'control.FullscreenControl']}/>
              <Polygon
                polygon
              />
          </YMaps>
      </div>
    )
};

export default HeatMap;
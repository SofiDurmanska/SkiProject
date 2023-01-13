import React, { Component } from "react";
import {  //importuju
  MapContainer, 
  TileLayer, 
  CircleMarker, //kolečka na mapě
  Popup 
} from "react-leaflet"; //knihovna pro mapu
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {
  attribution,
  tileUrl, //importuju irl, která je nahoře
  getMarkerColor,
  defaultMapState,
} from './utils/SkiMapUtils';
import SkiMapTooltip from './SkiMapTooltip'; //importuje věci, co dělá Lukáš
import "leaflet/dist/leaflet.css";//importuje věci, co dělá Lukáš
import "react-leaflet-markercluster/dist/styles.min.css";//importuje věci, co dělá Lukáš

export default class SkiMap extends Component {
    state = defaultMapState; //kde jsem na mapě právě teď, tzn. když otevřeš stránku
    render() {
        return this.props.resorts ? (
        <MapContainer //kde se to centruje a zoomuje, šířka apod.
            center={[this.state.lat, this.state.lng]}
            zoom={this.state.zoom}
            style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}
            minZoom={this.state.minZoom}
        >
            <TileLayer
                attribution={attribution}
                url={tileUrl}
            />
            <MarkerClusterGroup>
            {this.props.resorts.map((resort, idx) => 
                <CircleMarker //kolečka se dělají podle apiček, označení celého střediska na stránce apod.
                    key={`resort-${resort.id}`}
                    color={getMarkerColor(resort)}
                    opacity={1}
                    radius={5}
                    weight={1}
                    eventHandlers={{
                        click: () => {
                            this.setState({ activeResort: resort });
                        },
                    }}
                    center={resort.point}>
                </CircleMarker>
            )}
            </MarkerClusterGroup> //získává id z resortů, jména apod. 
            {this.state.activeResort && <Popup
                position={this.state.activeResort.point}
                onClose={() => {
                    this.setState({ activeResort: null })
                }}
            >
                <SkiMapTooltip
                    resort={this.state.activeResort}
                    verticalUnits={this.props.verticalUnits}
                />
            </Popup>}
        </MapContainer>
        ) : (
            "Data is loading..." //používání při debugingu
        );
    }
}
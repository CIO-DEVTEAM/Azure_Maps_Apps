import * as React from 'react';
import * as atlas from 'azure-maps-control';
import { IListItems } from './GlobalView';
import styles from './TestDemo.module.scss';

export class GlobeMap extends React.Component<IListItems> {
    map: atlas.Map;
    datasource: atlas.source.DataSource;
    point: atlas.data.Point;
    popup: atlas.Popup;
    selectionDetails: string;
    constructor(props: IListItems) {
        super(props);
        
        this.map = null;
        this.datasource = null;
        this.point = null;
        this.popup = null;
      }
      componentDidMount():void {
        this.setupItemsMap();
      }
      componentWillUnmount(): void {
        if (this.map) {
          this.map.dispose();
        }
      }

  setupItemsMap = ():void => {
    if (this.map !== null) {
      this.map.dispose();
    }
    const subscriptionKey = "YourSubscriptionKeyHere"
    this.map = new atlas.Map('itemsMap', {
      pitch: 90,
      style: "road_shaded_relief",
      language: 'en-US',
      renderWorldCopies: true,
      interactive: false,
      view: 'Auto',
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: subscriptionKey
      },
      center: [0, 0],
      zoom: 1.0,
    });

    this.map.events.add('ready', () => {
      this.datasource = new atlas.source.DataSource(null, {
        cluster: true
      });
      const mapitems = this.props.items;
      this.map.sources.add(this.datasource);
      for (let i = 0; i < mapitems.length; i++) {
        const latitude = mapitems[i].Latitude;
        const longitude = mapitems[i].Longitude;

        const point = new atlas.data.Feature(new atlas.data.Point([latitude, longitude]), {
          name: mapitems[i].Title,
          description: mapitems[i].DutyDescription,
        });

        this.datasource.add([point]);
      
      }

      const symbolLayer = new atlas.layer.SymbolLayer(this.datasource, null, {
        iconOptions: {
          image: 'pin-red',
        },
      });
      
      this.map.layers.add(symbolLayer);

      this.popup = new atlas.Popup();
      this.popup.open(this.map);

      this.map.layers.add(symbolLayer);

      this.map.events.add('click', symbolLayer, this.pointClicked);
    });
  };

  pointClicked = (e:atlas.PopupOptions):void => {
    const popupTemplate = `<div style="max-width:500px;font-size:12px;"><div class="name" style="font-size:14px;font-weight:bold;margin:15px;"><p>Open Positions:<br/>{name}</p><p>{description}</p></div>`;
  
    //  Create a popup but leave it closed so we can update it and display it later.
      const popup = new atlas.Popup({
        pixelOffset: [0, -18],
      });
    //Make sure the event occurred on a point feature.
    if (e.shapes && e.shapes.length > 0) {
        let content: string;
        let coordinate: any;
        // Check to see if the first value in the shapes array is a Point Shape.
        if (
          e.shapes[0] instanceof atlas.Shape &&
          e.shapes[0].getType() === 'Point'
        ) {
          const properties = e.shapes[0].getProperties();
          content = popupTemplate
            .replace(/{name}/g, properties.name)
            .replace(/{description}/g, properties.description);
          coordinate = e.shapes[0].getCoordinates();
        } else if (
          e.shapes[0].type === 'Feature' &&
          e.shapes[0].geometry.type === 'Point'
        ) {
          // Check to see if the feature is a cluster.
          if (e.shapes[0].properties.cluster) {
            content = `<div style="max-width:500px;font-size:14px;font-weight:bold;padding:20px;">Cluster of ${e.shapes[0].properties.point_count} locations with open positions</div>`;
          } else {
            // Feature is likely from a VectorTileSource.
            const properties = e.shapes[0].properties;
            content = popupTemplate
              .replace(/{name}/g, properties.name)
              .replace(/{description}/g, properties.description);
          }

          coordinate = e.shapes[0].geometry.coordinates;
        }

        if (content && coordinate) {
          // Populate the popupTemplate with data from the clicked point feature.
          popup.setOptions({
            // Update the content of the popup.
            content: content,    
            // Update the position of the popup with the symbols coordinate.
            position: coordinate,
          });    
          // Open the popup.
          popup.open(this.map);
      }
    }
  };

  public render(): React.ReactElement<IListItems> {
    return (<div id="itemsMap" className={styles.one} />)
  }
}

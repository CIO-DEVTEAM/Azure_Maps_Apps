
import * as React from 'react';
import * as atlas from 'azure-maps-control';
import { IListItems } from './GlobalView';
import { ITestDemoProps } from './ITestDemoProps';
import 'azure-maps-control/dist/atlas.min.css';
import styles from './TestDemo.module.scss';


export interface IMapDemoState {
  map: atlas.Map;
  
}

export default class ZoomView extends React.Component<IListItems, IMapDemoState, ITestDemoProps> {

  public locations: Location[];
  public popup: atlas.Popup;
  public symbolLayer: atlas.layer.SymbolLayer;
  public map: atlas.Map;
  public layer: atlas.layer.Layer;
  public dataSource: atlas.source.DataSource;
  public selectionDetails: string;
  public ZoomIn: boolean;
  public mapRef: any;
  constructor(props: IListItems) {
    super(props)
    this.dataSource = new atlas.source.DataSource();
    this.mapRef = React.createRef();
    this.map = null;
    this.state = {
      map: this.map,

    }



  }

  public componentDidMount(): void {

    console.log("componentDidMount");
    const subscriptionKey = 'YourSubscriptionKeyHere';
    const twoValues = this.props.selectionDetails;
    const arrValues = twoValues.split("//");
    const coor = arrValues[0];
    const title = arrValues[1];
    const arrCoor = coor.split(",");
    const long = Number(arrCoor[0]);
    const lat = Number(arrCoor[1]);
    const mapContainer = this.mapRef.current;
    this.map = new atlas.Map(mapContainer, {
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: subscriptionKey
      },
      center: [lat, long],
      zoom: 9,
      renderWorldCopies: false,
      interactive: false,
      language: 'en-US',
      style: "road_shaded_relief",
      pitch: 90,
      enableAccessibility: false,
      showLogo: false,
      showFeedbackLink: false,
      shortcutKey: false,
      showBuildingModels: true,
      view: "Auto",
    });
    const popup = new atlas.Popup({
      pixelOffset: [0, -18],
      content: `<div style="max-width:500px;padding:10px;font-size:16px;margin:15px;">Positions: ` + title + `<br></div>`,
      position: [lat, long]
    });
    popup.open(this.map)
  }

  public componentDidUpdate(prevProps: { selectionDetails: string | string[]; }, prevState: never):void {
    if (prevProps.selectionDetails !== this.props.selectionDetails) {
      // Update the map's center
      const twoValues = this.props.selectionDetails;
      const arrValues = twoValues.split("//");
      const coor = arrValues[0];
      const title = arrValues[1];
      const arrCoor = coor.split(",");
      const long = Number(arrCoor[0]);
      const lat = Number(arrCoor[1]);
      this.map.setCamera({
        center: [lat, long],
        zoom: 9
      });
      const popup = new atlas.Popup({
        pixelOffset: [0, -18],
        content: `<div style="max-width:500px;padding:10px;font-size:16px;margin:15px;">Positions: ` + title + `<br></div>`,
        position: [lat, long]
      });
      popup.open(this.map)
    }
  }


  public componentWillUnmount(): void {
    console.log("componentWillUnmount")
    
  }

  public render(): React.ReactElement<IListItems> {
    return (
      <div ref={this.mapRef} className={styles.one}/>)
  }
}




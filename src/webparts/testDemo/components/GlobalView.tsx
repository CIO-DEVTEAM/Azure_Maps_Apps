import * as React from 'react';
import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsList, IColumn, Selection, DetailsListLayoutMode, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import {
  SPHttpClient, SPHttpClientResponse
} from '@microsoft/sp-http';
//import { MapsSearchClient, AzureKeyCredential } from '@azure/maps-search';
import { ITestDemoProps } from './ITestDemoProps';
import styles from './TestDemo.module.scss';
import * as atlas from 'azure-maps-control';
//import { Text } from '@fluentui/react/lib/Text'
import { mergeStyles } from '@fluentui/react/lib/Styling';
import 'azure-maps-control/dist/atlas.min.css';
import { getSP } from "../../../pnpjs-config";
import { SPFI, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import ZoomView from './ZoomView';
import { GlobeMap } from './GlobeMap';


const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});
const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

export interface IListItemState {
  Id: string;
  Title: string;
  Region: string;
  Country: string;
  DutyDescription: string;
  Longitude: number;
  Latitude: number;
  GeoLoc: string;
}
export interface IListItems {
  items: IListItemState[];
  selectionDetails: string;
  ZoomIn: boolean;
}

export default class GlobalView extends React.Component<ITestDemoProps, IListItems> {

  
  public _sp: SPFI;
  //private mapRef: React.RefObject<HTMLDivElement>;
  public locations: Location[];
  public popup: atlas.Popup;
  public symbolLayer: atlas.layer.SymbolLayer;
  public map: atlas.Map;
  public layer: atlas.layer.Layer;
  public dataSource: atlas.source.DataSource;
  private listColumns: IColumn[];
  private listItems: IListItemState[];
  private _selection: Selection;
  static selectionDetails: number;
  public mapRef: any;
  constructor(props: ITestDemoProps) {
    super(props);
    this.listItems = [];
    this.mapRef = React.createRef();
    // this.mapRef = React.createRef();
    this.dataSource = new atlas.source.DataSource();
    this.popup = new atlas.Popup();
    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails()}),
    });


    this.listColumns = [
      { key: 'Id', name: '', fieldName: 'Id', minWidth: 125, maxWidth: 250, isResizable: true },
      { key: 'Title', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 150, isResizable: true },
      { key: 'Region', name: 'Region', fieldName: 'Region', minWidth: 50, maxWidth: 50, isResizable: true },
      { key: 'Country', name: 'Country', fieldName: 'Country', minWidth: 75, maxWidth: 80, isResizable: true },
      { key: 'DutyDescription', name: 'Duty Description', fieldName: 'DutyDescription', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'Longitude', name: 'Longitude', fieldName: 'Longitude', minWidth: 75, maxWidth: 100, isResizable: true },
      { key: 'Latitude', name: 'Latitude', fieldName: 'Latitude', minWidth: 75, maxWidth: 100, isResizable: true }
    ];

    this.state = {
      items: this.listItems,
      ZoomIn: false,
      selectionDetails: this._getSelectionDetails(),
    };
    this._sp = getSP();
  }


   
  public async componentDidMount():Promise<void> {
    console.log("componentDidMount")
    //this.getMap()
    await this._renderList();




  }
  public componentDidUpdate(): void {
    console.log("componentDidUpdate")
    //if(this.state.ZoomIn === false && this._selection.getSelectedCount() === 0){
    // this.getMap()
    //}
 
  
    
  }
 

  public async _getListData(): Promise<IListItemState[]> {
    return this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/GetByTitle('MapPositionFields')/items`,
      SPHttpClient.configurations.v1).then(async (response: SPHttpClientResponse) => {
        const data = await response.json();
        console.log(data.value);
        return data.value;
      });
  }

  public async _renderList():Promise <void> {

 await this._getListData().then(response => {

      response.forEach(item => {
        this.state.items.push({
          Title: item.Title,
          Region: item.Region,
          Country: item.Country,
          DutyDescription: item.DutyDescription,
          Id: item.Id,
          Longitude: item.Longitude,
          Latitude: item.Latitude,
          GeoLoc: item.GeoLoc
        });
      });
      this.setState({
        items: this.state.items

      });
  
    });
  }


  public render(): React.ReactElement<IListItems> {
   
    const { items, selectionDetails, ZoomIn } = this.state;
    

    return (
      <div className={styles.wrapper}>
       
        {!this.state.ZoomIn  &&   <GlobeMap ZoomIn={ZoomIn} items={items} selectionDetails={selectionDetails}/>} {this.state.ZoomIn &&  <div className={styles.one}> <ZoomView selectionDetails={selectionDetails} ZoomIn={ZoomIn} items={items}/>

        </div>}
        <div className={styles.two}>
        <div>
        {/* <div className={exampleChildClass}>{selectionDetails}</div> */}
        {/* <Text>
          Note: While focusing a row, pressing enter or double clicking will execute onItemInvoked, which in this
          example will show an alert.
        </Text> */}
        {/* <Announced message={selectionDetails} /> */}
        <TextField
          className={exampleChildClass}
          label="Filter by name:"
          onChange={this._onFilter}
          styles={textFieldStyles}
        />
        <Announced message={`Number of items after filter applied: ${items.length}.`} />
         <MarqueeSelection selection={this._selection}>
          <DetailsList
            selectionMode={SelectionMode.single}
            isSelectedOnFocus={false}
            items={this.state.items}
            columns={this.listColumns}
            setKey="set" 
            onItemInvoked={this._onItemInvoked}
            onRenderItemColumn={this._onRenderItemColumn}
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={false}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
            />
        </MarqueeSelection> 
      </div>
        </div>
      </div>
  );
  }
  private _getSelectionDetails(): string{
    
    const selectionCount = this._selection.getSelectedCount();
    if(selectionCount === 1 ){this.setState({ZoomIn:true})
      //this.setState({ZoomIn:true})
     
    }
      
      else if(selectionCount === 0){
         this.setState({ZoomIn:false})
        
       
      }
    switch (selectionCount) {
      
      case 0:     
        return 'No items selected';
      case 1:
        return (this._selection.getSelection()[0] as IListItemState).GeoLoc + '//' + (this._selection.getSelection()[0] as IListItemState).Title
      default:
        return `${selectionCount} items selected`;
        
    }
  }
private _onRenderItemColumn = (item: IListItemState, index: number, column: IColumn): JSX.Element | string => {
  const fieldContent = item.Title as string;
 // console.log(fieldContent);
  const key = column.key as keyof IListItemState;
  if (column.fieldName === 'Id' ) {
     return <PrimaryButton text={"Contact POC"} onClick={() => this._onItemInvoked(fieldContent)} />
  }
   return String(item[key]);
 };

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this.listItems.filter(i => i.Title.toLowerCase().indexOf(text) > -1) : this.listItems,
    });
  };

  private _onItemInvoked = async (fieldContent: string): Promise<void> => {
    //alert(`Item invoked: ${item.Title}`);
    const sp = spfi(this._sp) 
    //const Details =  (this._selection.getSelection()[0] as IListItemState).Title
    const user = await sp.web.currentUser();
    // .then((response: any)=>{
      alert(user.UserPrincipalName);
      await sp.web.lists.getByTitle("POCRequest").items.add({
        Title: user.UserPrincipalName,
        Position: fieldContent
      });
  };  
  

}






# SPFx_Azure_Map

## Summary

Displaying Azure Map using SharePoint Online list with lat and long fields.

![Global view of open job positions](https://github.com/nikomas78/SPFx_Azure_Map/blob/master/imgs/globeview.png)
Here is what it looks like when you first load the webpart. It's a global view of the sharepoint online list items geolocations.

![Zoomed in view of open job position](https://github.com/nikomas78/SPFx_Azure_Map/blob/master/imgs/selecteditem.png)
This is a zoomed-in view of the position after clicking on the FluentUI React Detailslist. Each time an item is selected on the list, the map component is updated with the data. If no selection is made, the map updates to the global default view.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.17.2-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites
- [Create an Azure Maps Account](https://learn.microsoft.com/en-us/azure/azure-maps/quick-demo-map-app#create-an-azure-maps-account)
- [Get your Azure Maps Subscription Key](https://learn.microsoft.com/en-us/azure/azure-maps/quick-demo-map-app#get-the-subscription-key-for-your-account)

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| SPFx_Azure_Map | Author details (Emmanuel Jackson, MSFT) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**
  
  Make sure to create a SharePoint Online list called MapPoistionFields with these fields:
  
  Id: string;
  Title: string;
  Region: string;
  Country: string;
  DutyDescription: string;
  Longitude: number;
  Latitude: number;
  GeoLoc: string;
  
  ![Screenshot of the serve.json file remidning you to point to your SPO site collection](https://github.com/nikomas78/SPFx_Azure_Map/blob/master/imgs/serve.png)
  
  ![Screenshot of the GlobeMap.tsx file remidning you to use your Azure Maps Subscription Key](https://github.com/nikomas78/SPFx_Azure_Map/blob/master/imgs/azuremapsubkey.png)
  
  ![Screenshot of the ZoomView.tsx file remidning you to use your Azure Maps Subscription Key](https://github.com/nikomas78/SPFx_Azure_Map/blob/master/imgs/azuremapsubkey2.png)

  

## Features

The SPFx webpart features React.js class components and PnPJS for making calls to the SPO rest API to get the list items. There are three components, a Parent class component (GlobalView.tsx) and two child components (GlobeMap.tsx, ZoomView.tsx).

In the parent component, I am displaying a top and bottom div. In the top div, the global map is displayed, and the bottom div is a FluentUI detailslist with SPO list data (MapPoistionFields). I pass properties from the Parent in this.props.selectiondetails to ZoomView.tsx to display the selected list item data into the Zoomed-in view. It then updates the top div in the parent to the Zoomed-in map view. I also pass the list item properties from the Parent into the GlobeMap.tsx and render the global view all the list items in that component. The global view is displayed when the page loads and when there is no selected list item.

Of note, I use a boolean value set to false when the GlobeMap.tsx is default, and when a list item is selected the ZoomIn prop is true and displays ZoomView.tsx.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

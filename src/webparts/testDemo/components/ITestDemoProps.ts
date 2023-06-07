import { SPHttpClient } from '@microsoft/sp-http';
//import { MapDataEvent } from 'azure-maps-control';

export interface ITestDemoProps {
  spHttpClient: SPHttpClient;
  siteUrl:string;
}
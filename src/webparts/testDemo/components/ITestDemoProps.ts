import { SPHttpClient } from '@microsoft/sp-http';
export interface ITestDemoProps {
  spHttpClient: SPHttpClient;
  siteUrl:string;
}
declare interface ITestDemoWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  CredentialsFieldLabel: string;
  ZoomFieldLabel: string;
  MapTypeFieldLabel: string;
  SPGroupName: string;
  ListNameFieldLabel: string;
  AerialMapType: string;
  RoadMapType: string;
}

declare module 'TestDemoWebPartStrings' {
  const strings: ITestDemoWebPartStrings;
  export = strings;
}

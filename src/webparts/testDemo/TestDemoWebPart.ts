import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'TestDemoWebPartStrings';
import GlobalView from './components/GlobalView';
import { ITestDemoProps } from './components/ITestDemoProps';
import { getSP } from '../../pnpjs-config';

export interface ITestDemoWebPartProps {
  description: string;
}

export default class TestDemoWebPart extends BaseClientSideWebPart<ITestDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITestDemoProps> = React.createElement(
      GlobalView,
      {
        spHttpClient: this.context.spHttpClient,
        siteUrl:this.context.pageContext.web.absoluteUrl,
        //mapdata:this.context.mapdata
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected async onInit(): Promise<void> {
    //this._environmentMessage = this._getEnvironmentMessage();

    await super.onInit();

    //Initialize our _sp object that we can then use in other packages without having to pass around the context.
    //  Check out pnpjsConfig.ts for an example of a project setup file.
    getSP(this.context);
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  //label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

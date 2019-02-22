import * as React from 'react';
import moment from 'moment';
import Checkmark from './components/Checkmark';
import Report from './components/Report';

interface IReport {
    pipeline: string,
    release: string,
    releaseId: string,
    environment: string,
    createdDate: string,
    hasApprovalOptions: boolean,
    usesProductionEndpoints: boolean
}

export default class extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }
    
    render() {
      const columns= [{
          key: 'column1',
          fieldName: 'pipeline',
          name: 'Pipeline',
          minWidth: 250,
          maxWidth: 400,
          isResizable: true,
      },
      {
          key: 'column2',
          fieldName: 'release',
          name: 'Release',
          minWidth: 50,
          maxWidth: 250,
          isResizable: true,
      },
      {
          key: 'column3',
          fieldName: 'environment',
          name: 'Environment',
          minWidth: 50,
          maxWidth: 250,
          isResizable: true,
      },
      {
          key: 'column4',
          fieldName: 'createdDate',
          name: 'Created',
          minWidth: 50,
          maxWidth: 100,
          isResizable: true,
          onRender: (item: IReport) => <div>{moment(item.createdDate).fromNow()}</div>
      },
      {
          key: 'column5',
          fieldName: 'hasApprovalOptions',
          name: 'Approval',
          minWidth: 50,
          maxWidth: 50,
          isResizable: true,
          data: Boolean,
          onRender: (item: IReport) => <Checkmark checked={item.hasApprovalOptions} />
      },
      {
          key: 'column6',
          fieldName: 'usesProductionEndpoints',
          name: 'Production Endpoints',
          minWidth: 50,
          maxWidth: 50,
          isResizable: true,
          data: Boolean,
          onRender: (item: IReport) => <Checkmark checked={item.usesProductionEndpoints} />
      }];
    
      const dummy =[{
        "release": "Release-200",
        "environment": "raboweb-test",
        "releaseId": "2375",
        "createdDate": "2019-02-12T11:39:12.9157118Z",
        "usesProductionEndpoints": true,
        "hasApprovalOptions": false,
        "pipeline": "TAS Azure DevOps Extensions"
      },
      {
        "release": "Release-199",
        "environment": "raboweb-test",
        "releaseId": "2374",
        "createdDate": "2019-02-12T11:34:18.8188815Z",
        "usesProductionEndpoints": true,
        "hasApprovalOptions": false,
        "pipeline": "TAS Azure DevOps Extensions"
      }];

      return (<div>
            <div>
                <h1>Release compliancy</h1>
                <p>For feedback and questions, please contact the TAS/Proton team. We would ❤ getting in touch on how to improve distinguishing production endpoints!</p>
                <p>More information on the <a href="https://confluence.dev.rabobank.nl/pages/viewpage.action?pageId=119243814#ApplyDevOpsSecurityBlueprintCI/CDprinciples-Release" target="_blank">how &amp; why</a> of manual approvals and securing service endpoints with Azure Pipelines or <a href="https://confluence.dev.rabobank.nl/display/MTTAS/Secure+Pipelines" target="_blank">secure pipelines</a> in general.</p>
            </div>
            <Report columns={columns} document="Releases" dummy={dummy} />
        </div>);
    }  
}


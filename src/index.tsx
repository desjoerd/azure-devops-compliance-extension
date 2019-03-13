import React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';
import Repositories from './Repositories';
import Releases from './Releases';
import Overview from './Overview';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { loadTheme } from '@uifabric/styling';

import './index.css';
import Builds from './Builds';
loadTheme({}); // <- This is a very important line
initializeIcons();

// Not using react router because the paths are incompatible
// with static hosting on Azure Devops extensions therefore
// using index.html#report as identifier.
let element: JSX.Element;
const report = window.location.hash.substr(1);
switch (report) {
    case 'builds':
        element = (<Builds />);
        break;
    case 'repositories':
        element = (<Repositories />);
        break;
    case 'releases':
        element = (<Releases />);
        break;
        case 'overview':
        element = (<Overview />);
        break;
    default:
        element = (<span className="error">No report specified.</span>)
}

ReactDOM.render(<Fabric>{element}</Fabric>, document.getElementById('root'));
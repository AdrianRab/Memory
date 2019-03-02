import React from 'react';
import packageJson from '../../package.json';
import { Icon } from 'semantic-ui-react';

class Footer extends React.Component {

    render() {
        return (
            <div>
                Version: {packageJson.version}
                <a href='https://github.com/AdrianRab/Memory/wiki'><Icon color='black' name='github' size='big' link/></a>
            </div>
        )
    }

}

export default Footer;
import React from 'react';
import packageJson from '../../package.json';
import { Icon } from 'semantic-ui-react';
import { Trans } from 'react-i18next';

class Footer extends React.Component {

    render() {
        return (
            <div className="footer-style">
                <Trans i18nKey="Version">Version</Trans>: {packageJson.version}
                <a href='https://github.com/AdrianRab/Memory/wiki'><Icon color='black' name='github' size='big' link /></a>
            </div>
        )
    }

}

export default Footer;
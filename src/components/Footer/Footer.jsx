import React from 'react';
import PropTypes from 'prop-types';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './style.scss'

Footer.propTypes = {
    
};

function Footer(props) {
    return (
        <div className="footer">
            <div className="footer__social">
                <FacebookIcon />
                <InstagramIcon />
                <TwitterIcon />
                <LinkedInIcon />
            </div>
            <p>Clone by <span>Minh Nguyen</span></p>
        </div>
    );
}

export default Footer;
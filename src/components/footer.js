import React from 'react';

const Footer = ({ name, year }) => {
    return <footer>Built by {name} {year}</footer>;
};

Footer.defaultProps = {
    name: "Lucian Wang",
    year: new Date().getFullYear()
}

export default Footer;


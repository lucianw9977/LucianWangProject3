import React from 'react';

// Define a Footer component with name and year as props
const Footer = ({ name, year }) => {
    // The component returns a footer element with the text "Built by {name} {year}"
    return <footer>Built by {name} {year}</footer>;
};

// The defaultProps property sets default values for your props
Footer.defaultProps = {
    name: "Lucian Wang",  // Default value for 'name' prop
    year: new Date().getFullYear()  // Default value for 'year' prop, which gets the current year
}

// Export the Footer component for use in other files
export default Footer;

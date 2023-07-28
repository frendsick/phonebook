const Header = ({ text, headingLevel }) => {
    const supportedHeadings = ["h1", "h2", "h3", "h4", "h5", "h6"];
    if (!supportedHeadings.includes(headingLevel)) {
        console.error(`Heading level '${headingLevel}' is not supported`);
        console.info("Supported heading levels", supportedHeadings);
        return;
    }
    const Heading = headingLevel;
    return <Heading>{text}</Heading>;
};

export default Header;

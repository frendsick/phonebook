// Do not show null message
// Note: Empty string will show
const Notification = ({ message, type }) => {
    const knownTypes = ["success", "error"];
    if (message === null) return;
    if (!knownTypes.includes(type)) {
        console.error(`Unknown notification type ${type}`);
        console.info("Known types:", knownTypes);
        return;
    }
    return <div className={type}>{message}</div>;
};

export default Notification;

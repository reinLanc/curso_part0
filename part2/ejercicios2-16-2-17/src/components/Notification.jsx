const Notification = ({ message, type }) => {
    if (!message) {
      return null;
    }
  
    const notificationClass = type === "error" ? "notification error" : "notification";
  
    return <div className={notificationClass}>{message}</div>;
  };
  
  export default Notification;
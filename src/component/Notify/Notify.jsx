// import StyledDiv from "../styles/notifyStyle.js";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux";

const Notify = (props) => {
    const msg = useSelector((state) => state.ui.notif.msg);
    const type = useSelector((state) => state.ui.notif.type);
    return (
        <Snackbar
            open={true}
            autoHideDuration={6000}
            message="Note archived"
        />
    );
};

export default Notify;
// import StyledDiv from "../styles/notifyStyle.js";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';

const Notify = (props) => {
    const [isOpen, setIsOpen] = useState(true)
    const msg = useSelector((state) => state.ui.notif.msg);
    const type = useSelector((state) => state.ui.notif.type);

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setIsOpen(false)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isOpen}
            autoHideDuration={10000}
            onClose={() => setIsOpen(false)}
        >
            <Alert color={type} action={action}>
                {msg}
            </Alert>
        </Snackbar>
    );
};

export default Notify;  
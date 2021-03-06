/**
 *
 * @author sriram
 *
 */

import React from "react";
import { injectIntl } from "react-intl";
import intlData from "../../messages";
import ids from "../../ids";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    FormControlLabel,
    FormGroup,
    makeStyles,
    Switch,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
    build,
    DEDialogHeader,
    getMessage,
    LoadingMask,
    palette,
    withI18N,
} from "@cyverse-de/ui-lib";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        backgroundColor: palette.lightGray,
        borderBottom: "solid 2px",
        borderColor: palette.gray,
        height: 55,
    },
    toolbarButton: {
        margin: 10,
    },
    content: {
        height: 800,
    },
}));

function ViceLogsViewer(props) {
    const classes = useStyles();
    const {
        logs,
        followLogs,
        baseDebugId,
        loading,
        dialogOpen,
        analysisName,
        presenter,
    } = props;

    const baseId = baseDebugId + ids.VICE_LOGS_VIEWER.VIEWER;

    const handleAutoRefreshChange = (event) => {
        presenter.onFollowViceLogs(event.target.checked);
    };

    const handleViceLogViewerClose = () => {
        presenter.closeViceLogsViewer();
    };

    const onRefreshClicked = () => {
        presenter.refreshViceLogs();
    };
    return (
        <Dialog
            open={dialogOpen}
            maxWidth="md"
            disableBackdropClick
            disableEscapeKeyDown
            scroll="paper"
            id={baseId}
        >
            <DEDialogHeader
                heading={analysisName}
                onClose={handleViceLogViewerClose}
            />
            <LoadingMask loading={loading}>
                <div className={classes.toolbar}>
                    <FormGroup row>
                        <FormControlLabel
                            labelPlacement="start"
                            control={
                                <Switch
                                    checked={followLogs}
                                    onChange={handleAutoRefreshChange}
                                    value="autoRefresh"
                                    color="primary"
                                    id={build(
                                        baseId,
                                        ids.VICE_LOGS_VIEWER.FOLLOW_LOGS
                                    )}
                                />
                            }
                            label={getMessage("followLogs")}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            className={classes.toolbarButton}
                            onClick={onRefreshClicked}
                            id={build(baseId, ids.VICE_LOGS_VIEWER.REFRESH)}
                        >
                            <RefreshIcon style={{ color: palette.darkBlue }} />
                            {getMessage("refresh")}
                        </Button>
                    </FormGroup>
                </div>
                <DialogContent dividers={true}>
                    <DialogContentText className={classes.content}>
                        <pre>{logs}</pre>
                    </DialogContentText>
                </DialogContent>
            </LoadingMask>
        </Dialog>
    );
}

export default withI18N(injectIntl(ViceLogsViewer), intlData);

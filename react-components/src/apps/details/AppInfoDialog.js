/**
 *  @author sriram
 *
 **/

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { injectIntl } from "react-intl";

import intlData from "../messages";
import ids from "../ids";
import getAppsSearchRegex from "../appSearchRegex";
import AppDetails from "./AppDetails";
import AppDoc from "./AppDoc";

import {
    build,
    DEDialogHeader,
    DEConfirmationDialog,
    formatMessage,
    withI18N,
} from "@cyverse-de/ui-lib";

import QuickLaunchListing from "../quickLaunch/QuickLaunchListing";
import ToolDetails from "./ToolDetails";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export const EDIT_MODE = "edit";
export const VIEW_MODE = "view";

const TAB_INDEX = {
    APP_DETAIL_TAB: 0,
    QUICK_LAUNCH_TAB: 1,
    TOOL_DETAILS_TAB: 2,
    APP_DOC: 3,
};

function AppInfoDialog(props) {
    const {
        dialogOpen,
        app,
        appDetails,
        presenter,
        docEditable,
        searchText,
        userName,
        baseDebugId,
        intl,
        showQuickLaunchFirst,
    } = props;
    const appInfoLabel = formatMessage(intl, "appInformationLbl");
    const quickLaunchLabel = formatMessage(intl, "quickLaunchLabel");
    const toolInfoLabel = formatMessage(intl, "toolInformationLbl");
    const appDocLabel = formatMessage(intl, "appDocLabel");
    const searchRegex = getAppsSearchRegex(searchText);

    const [tabIndex, setTabIndex] = useState(
        showQuickLaunchFirst
            ? TAB_INDEX.QUICK_LAUNCH_TAB
            : TAB_INDEX.APP_DETAIL_TAB
    );
    const [dirty, setDirty] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [mode, setMode] = useState(VIEW_MODE);
    const [documentation, setDocumentation] = useState(null);
    const [references, setReferences] = useState(null);
    const [quickLaunches, setQuickLaunches] = useState([]);
    const [selectedQuickLaunch, setSelectedQuickLaunch] = useState(null);

    useEffect(() => {
        setLoading(true);
        let promises = [];
        let p;

        if (!app.wiki_url) {
            p = new Promise((resolve, reject) => {
                presenter.getAppDoc(
                    app,
                    (doc) => {
                        setDocumentation(doc.documentation);
                        setReferences(doc.references);
                        resolve("");
                    },
                    (statusCode, message) => {
                        reject(message);
                        setError(true);
                    }
                );
            });
            promises.push(p);
        }
        p = new Promise((resolve, reject) => {
            presenter.getQuickLaunches(
                app.id,
                (qLaunches) => {
                    setQuickLaunches(qLaunches);
                    resolve("");
                },
                (statusCode, message) => {
                    reject(message);
                }
            );
        });
        promises.push(p);
        Promise.all(promises)
            .then((value) => {
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    const handleTabChange = (event, value) => {
        setTabIndex(value);
    };

    const onClose = () => {
        if (dirty) {
            setConfirmDialogOpen(true);
        } else {
            presenter.onClose();
        }
    };

    const saveDoc = () => {
        setLoading(true);
        presenter.onSaveMarkdownSelected(
            app.id,
            app.system_id,
            documentation,
            () => {
                setLoading(false);
                setMode(VIEW_MODE);
                setDirty(false);
                setConfirmDialogOpen(false);
            },
            (statusCode, errorMessage) => {
                setLoading(false);
                setError(true);
                setConfirmDialogOpen(false);
            }
        );
    };

    const onModeChange = (mode) => {
        setMode(mode);
    };

    const onDocChange = (updatedDoc) => {
        setDirty(true);
        setDocumentation(updatedDoc);
    };

    const onDiscardChanges = () => {
        setDirty(false);
        setConfirmDialogOpen(false);
        presenter.onClose();
    };

    const onCreateQuickLaunch = () => {
        presenter.onRequestToCreateQuickLaunch(app.id);
        onClose();
    };

    const useQuickLaunch = (qLaunch) => {
        presenter.useQuickLaunch(qLaunch.id, qLaunch.app_id);
        onClose();
    };

    const doDeleteQuickLaunch = (qLaunch) => {
        setLoading(true);
        presenter.deleteQuickLaunch(
            qLaunch.id,
            () => {
                const newQLaunches = quickLaunches.filter((q) => q !== qLaunch);
                setQuickLaunches(newQLaunches);
                setSelectedQuickLaunch(null);
                setLoading(false);
            },
            (statusCode, errorMessage) => {
                setLoading(false);
            }
        );
    };

    return (
        <React.Fragment>
            <Dialog open={dialogOpen} id={baseDebugId}>
                <DEDialogHeader
                    heading={app.name}
                    onClose={onClose}
                    id={baseDebugId}
                />
                <DialogContent style={{ minHeight: 600 }}>
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"
                        value={tabIndex}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab
                            label={appInfoLabel}
                            id={build(baseDebugId, ids.DETAILS.APP_INFO_TAB)}
                        />
                        <Tab
                            label={quickLaunchLabel}
                            id={build(
                                baseDebugId,
                                ids.DETAILS.QUICK_LAUNCH_TAB
                            )}
                        />
                        <Tab
                            label={toolInfoLabel}
                            id={build(baseDebugId, ids.DETAILS.APP_TOOLS_TAB)}
                        />
                        <Tab
                            label={appDocLabel}
                            id={build(
                                baseDebugId,
                                ids.DETAILS.APP_DOCUMENTATION_TAB
                            )}
                        />
                    </Tabs>
                    {tabIndex === TAB_INDEX.APP_DETAIL_TAB && (
                        <AppDetails
                            baseDebugId={build(
                                baseDebugId,
                                ids.DETAILS.APP_INFO
                            )}
                            searchText={searchRegex}
                            app={app}
                            details={appDetails}
                            presenter={presenter}
                        />
                    )}
                    {tabIndex === TAB_INDEX.QUICK_LAUNCH_TAB && (
                        <QuickLaunchListing
                            baseDebugId={build(
                                baseDebugId,
                                ids.DETAILS.QUICK_LAUNCH
                            )}
                            quickLaunches={quickLaunches}
                            presenter={presenter}
                            userName={userName}
                            appId={app.id}
                            systemId={app.system_id}
                            closeParentDialog={onClose}
                            onDelete={doDeleteQuickLaunch}
                            useQuickLaunch={useQuickLaunch}
                            onCreate={onCreateQuickLaunch}
                            onSelection={setSelectedQuickLaunch}
                            loading={loading}
                            selected={selectedQuickLaunch}
                        />
                    )}
                    {tabIndex === TAB_INDEX.TOOL_DETAILS_TAB && (
                        <ToolDetails
                            baseDebugId={build(
                                baseDebugId,
                                ids.DETAILS.APP_TOOLS
                            )}
                            searchText={searchRegex}
                            details={appDetails.tools}
                        />
                    )}
                    {tabIndex === TAB_INDEX.APP_DOC && (
                        <AppDoc
                            baseDebugId={build(
                                baseDebugId,
                                ids.DETAILS.APP_DOCUMENTATION
                            )}
                            documentation={documentation}
                            references={references}
                            wiki_url={app.wiki_url}
                            appName={app.name}
                            onDocChange={(doc) => onDocChange(doc)}
                            editable={docEditable}
                            saveDoc={saveDoc}
                            loading={loading}
                            error={error}
                            mode={mode}
                            onModeChange={onModeChange}
                        />
                    )}
                </DialogContent>
            </Dialog>
            <DEConfirmationDialog
                dialogOpen={confirmDialogOpen}
                messages={intlData}
                debugId={baseDebugId}
                onOkBtnClick={saveDoc}
                onCancelBtnClick={onDiscardChanges}
                heading={formatMessage(intl, "save")}
                message={formatMessage(intl, "docSavePrompt")}
                okLabel={formatMessage(intl, "save")}
                cancelLabel={formatMessage(intl, "discardChanges")}
            />
        </React.Fragment>
    );
}

AppInfoDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    app: PropTypes.object.isRequired,
    presenter: PropTypes.object.isRequired,
    docEditable: PropTypes.bool.isRequired,
    searchText: PropTypes.string.isRequired,
    baseDebugId: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
};

export default withI18N(injectIntl(AppInfoDialog), intlData);

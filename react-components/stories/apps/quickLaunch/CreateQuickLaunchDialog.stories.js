import React, { Component } from "react";
import CreateQuickLaunchDialog from "../../../src/apps/quickLaunch/CreateQuickLaunchDialog";

class CreateQuickLaunchDialogTest extends Component {
    render() {
        return (
            <CreateQuickLaunchDialog
                appName="All new word count"
                dialogOpen={true}
                isOwner={true}
            />
        );
    }
}

export default CreateQuickLaunchDialogTest;
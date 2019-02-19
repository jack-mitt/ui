import AppGridListing from "../../apps/listing/AppGridListing";
import build from "../../util/DebugIDUtil";
import CollaboratorListing from "../../collaborators/CollaboratorListing";
import { getMessage } from "../../util/I18NWrapper";
import ids from "../ids";
import messages from "../messages";
import styles from "../styles";
import SubjectSearchField from "../../collaborators/SubjectSearchField";
import withI18N from "../../util/I18NWrapper";

import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Fab from "@material-ui/core/Fab/Fab";
import PropTypes from "prop-types";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import { withStyles } from "@material-ui/core";

/**
 * @author aramsey
 *
 * A component that allows users to create or edit a community
 */
class EditCommunity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {
                invalidName: false,
                emptyName: false,
                text: "",
            },
            name: "",
            description: "",
            admins: [],
            apps: [],
            loading: false,
        };

        [
            'handleDescChange',
            'handleNameChange',
            'onAddAdmin',
            'addAdmin',
            'handleRemoveApp',
            'removeApp',
            'handleRemoveAdmin',
            'removeAdmin',
            'onAddCommunityAppsClicked',
            'addApp',
            'validate',
            'isInvalid',
            'isDuplicateApp',
            'isDuplicateAdmin',
            'saveCommunity',
        ].forEach((fn) => this[fn] = this[fn].bind(this));
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.saveCommunity && this.props.saveCommunity) {
            if (this.isInvalid()) {
                this.props.cancelSave();
            } else {
                this.saveCommunity();
            }
        }
    }

    componentDidMount() {
        const {
            community,
            currentUser,
            collaboratorsUtil,
        } = this.props;

        if (community) {
            this.setState({loading: true});
            let promises = [];

            let fetchAdminsPromise = new Promise((resolve, reject) => {
                    this.props.presenter.fetchCommunityAdmins(community.name, resolve, reject);
                }
            );

            let fetchAppsPromise = new Promise((resolve, reject) => {
                    this.props.presenter.fetchCommunityApps(community.display_name, resolve, reject);
                }
            );

            promises.push(fetchAdminsPromise, fetchAppsPromise);
            Promise.all(promises)
                .then(value => {
                    let communityName = collaboratorsUtil.getSubjectDisplayName(community);
                    this.setState({
                        errors: this.validate(communityName),
                        name: communityName,
                        description: community.description,
                        admins: value[0].members,
                        apps: value[1].apps,
                        loading: false,
                    })
                })
                .catch(error => {
                    console.log(error);
                    this.setState({loading: false});
                });
        } else {
            this.setState({
                errors: this.validate(null),
                admins: [currentUser]
            });
        }
    }

    validate(name) {
        if (!name || name.length === 0) {
            return ({
                emptyName: true,
                text: getMessage('emptyField'),
            })
        } else if (name.includes(":")) {
            return ({
                invalidName: true,
                text: getMessage('invalidColonChar'),

            })
        } else {
            return ({
                invalidName: false,
                emptyName: false,
                text: "",
            })
        }
    }

    isInvalid() {
        const {errors} = this.state;
        return errors.emptyName || errors.invalidName;
    }

    saveCommunity() {
        const {
            name, description, admins, apps
        } = this.state;
        const {
            community,
            onCommunitySaved
        } = this.props;
        this.setState({loading: true});
        new Promise((resolve, reject) => {
            this.props.presenter.saveCommunity(community ? community.name : null, name, description, false, resolve, reject);
        }).then(savedCommunity => {
            // if a new community was created
            if (!community) {
                onCommunitySaved(savedCommunity);
                let promises = [];

                let saveAdminsPromise = new Promise((resolve, reject) => {
                        this.props.presenter.addCommunityAdmins(savedCommunity.name, {list: admins.map(subject => subject.id)}, resolve, reject);
                    }
                );
                promises.push(saveAdminsPromise);

                apps.forEach((app) => {
                    let saveAppPromise = new Promise((resolve, reject) => {
                        this.props.presenter.addAppToCommunity(app.id, savedCommunity.display_name, resolve, reject);
                    });
                    promises.push(saveAppPromise);
                });

                Promise.all(promises)
                    .then(() => {
                        this.setState({loading: false});
                        this.props.onSaveComplete();
                    })
                    .catch(error => {
                        console.log(error);
                        this.props.cancelSave();
                        this.setState({loading: false});
                    });
            } else {
                this.setState({loading: false});
                this.props.onSaveComplete();
            }
        }).catch(error => {
            console.log(error);
            this.props.cancelSave();
            this.setState({loading: false});
        })
    };

    onAddCommunityAppsClicked() {
        const {community} = this.props;
        new Promise((resolve, reject) => {
            this.props.presenter.onAddCommunityAppsClicked(resolve, reject);
        }).then(app => {
            if (app && !this.isDuplicateApp(app)) {
                if (community) {
                    this.setState({loading: true});
                    this.props.presenter.addAppToCommunity(app.id, community.display_name, () => {
                        this.addApp(app);
                        this.setState({loading: false});
                    })
                } else {
                    this.addApp(app)
                }
            }
        }).catch(() => this.setState({loading: false}));
    }

    isDuplicateApp(app) {
        const {apps} = this.state;
        return apps.some((value) => value.id === app.id)
    }

    handleRemoveAdmin(subject) {
        const {community} = this.props;

        if (community) {
            this.setState({loading: true});
            new Promise((resolve, reject) => {
                this.props.presenter.removeCommunityAdmins(community.name, {list: [subject.id]}, resolve, reject);
            }).then(() => {
                this.removeAdmin(subject);
                this.setState({loading: false});
            }).catch(() => this.setState({loading: false}));
        } else {
            this.removeAdmin(subject)
        }
    }

    removeAdmin(subject) {
        const {admins} = this.state;
        this.setState({
            admins: admins.filter((value) => value.id !== subject.id)
        })
    }

    handleRemoveApp(app) {
        const {community} = this.props;
        if (community) {
            this.setState({loading: true});
            new Promise((resolve, reject) => {
                this.props.presenter.removeCommunityApps(community.display_name, app.id, resolve, reject);
            }).then(() => {
                this.removeApp(app);
                this.setState({loading: false});
            }).catch(() => this.setState({loading: false}));
        } else {
            this.removeApp(app)
        }
    }

    removeApp(app) {
        const {apps} = this.state;
        this.setState({
            apps: apps.filter((value) => value.id !== app.id)
        })
    }

    handleDescChange(event) {
        let value = event.target.value;
        this.setState({
            description: value
        });
    }

    handleNameChange(event) {
        let value = event.target.value;
        this.setState({
            errors: this.validate(value),
            name: value
        });
    }

    onAddAdmin(subject) {
        const {community} = this.props;

        if (!this.isDuplicateAdmin(subject)) {
            if (community) {
                this.setState({loading: true});
                new Promise((resolve, reject) => {
                    this.props.presenter.addCommunityAdmins(community.name, {list: [subject.id]}, resolve, reject);
                }).then(() => {
                    this.addAdmin(subject);
                    this.setState({loading: false});
                }).catch(() => this.setState({loading: false}));
            } else {
                this.addAdmin(subject);
            }
        }
    }

    isDuplicateAdmin(subject) {
        const {admins} = this.state;
        return admins.some((value) => value.id === subject.id)
    }

    addAdmin(subject) {
        this.setState({admins: [...this.state.admins, subject]})
    }

    addApp(app) {
        this.setState({apps: [...this.state.apps, app]})
    }

    render() {
        const {
            admins,
            apps,
            name,
            errors,
            loading,
        } = this.state;

        const {
            isCommunityAdmin,
            parentId,
            collaboratorsUtil,
            presenter,
            classes,
        } = this.props;

        const toolbarId = build(parentId, ids.EDIT.TOOLBAR);

        return (
            <div className={classes.wrapper}>
                <form className={classes.column}>
                    {loading &&
                    <CircularProgress size={30} classes={{root: classes.loading}} thickness={7}/>
                    }
                    <TextField id={build(parentId, ids.EDIT.NAME)}
                               error={this.isInvalid()}
                               required
                               label={getMessage('nameField')}
                               value={name}
                               className={classes.formItem}
                               InputProps={{
                                   readOnly: !isCommunityAdmin,
                               }}
                               helperText={errors.text}
                               onChange={this.handleNameChange}/>
                    <TextField id={build(parentId, ids.EDIT.DESCRIPTION)}
                               multiline
                               label={getMessage('descriptionField')}
                               value={this.state.description}
                               className={classes.formItem}
                               InputProps={{
                                   readOnly: !isCommunityAdmin,
                               }}
                               onChange={this.handleDescChange}/>
                    <fieldset className={classes.formItem}>
                        <legend>{getMessage('communityAdmins')}</legend>
                        <Typography component='p' className={classes.textBlurb}>
                            {getMessage('explainCommunityAdmin')}
                        </Typography>
                        {isCommunityAdmin &&
                        <Toolbar>
                            <div className={classes.subjectSearch}>
                                <SubjectSearchField collaboratorsUtil={collaboratorsUtil}
                                                    presenter={presenter}
                                                    parentId={parentId}
                                                    onSelect={this.onAddAdmin}/>
                            </div>
                        </Toolbar>
                        }
                        <CollaboratorListing parentId={parentId}
                                             collaboratorsUtil={collaboratorsUtil}
                                             data={admins}
                                             deletable={isCommunityAdmin}
                                             onDeleteCollaborator={this.handleRemoveAdmin}
                                             messages={messages.messages}
                                             emptyTableMsg={getMessage("noAdmins")}/>
                    </fieldset>
                    <fieldset className={classes.formItem}>
                        <legend>{getMessage('apps')}</legend>
                        {isCommunityAdmin &&
                        <Toolbar id={toolbarId}>
                            <Fab size='small'
                                 variant='extended'
                                 onClick={this.onAddCommunityAppsClicked}>
                                <AddIcon/>
                                {getMessage('apps')}
                            </Fab>
                        </Toolbar>
                        }
                        <AppGridListing parentId={parentId}
                                        data={apps}
                                        selectable={false}
                                        deletable={isCommunityAdmin}
                                        onRemoveApp={this.handleRemoveApp}/>
                    </fieldset>
                </form>
            </div>
        )
    }
}

EditCommunity.propTypes = {
    parentId: PropTypes.string.isRequired,
    collaboratorsUtil: PropTypes.object.isRequired,
    community: PropTypes.object,
    isCommunityAdmin: PropTypes.bool.isRequired,
    saveCommunity: PropTypes.bool.isRequired, // to save any new/modified Group values
    cancelSave: PropTypes.func.isRequired,
    onCommunitySaved: PropTypes.func.isRequired, // Group values have successfully been updated
    onSaveComplete: PropTypes.func.isRequired, // Group, admins, and apps have been saved
    currentUser: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }),
    presenter: PropTypes.shape({
        fetchCommunityAdmins: PropTypes.func.isRequired,
        fetchCommunityApps: PropTypes.func.isRequired,
        searchCollaborators: PropTypes.func.isRequired,
        removeCommunityApps: PropTypes.func.isRequired,
        removeCommunityAdmins: PropTypes.func.isRequired,
        onAddCommunityAppsClicked: PropTypes.func.isRequired,
        addCommunityAdmins: PropTypes.func.isRequired,
        addAppToCommunity: PropTypes.func.isRequired,
    })
};

export default withStyles(styles)(withI18N(EditCommunity, messages));
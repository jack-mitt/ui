/**
 *  @author sriram
 *
 **/

import React, { Component } from "react";

import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import ids from "../ids";
import constants from "../../constants";
import formatDate from "../../util/DateFormatter";
import intlData from "../../apps/messages";
import style from "../../apps/style";
import withI18N, { formatMessage, getMessage } from "../../util/I18NWrapper";

import CategoryTree from "./CategoryTree";
import CopyTextArea from "../../util/CopyTextArea";
import DEHyperLink from "../../util/hyperlink/DEHyperLink";
import DEDialogHeader from "../../util/dialog/DEDialogHeader";
import { LoadingMask } from "@cyverse-de/de-components";
import { Rate } from "@cyverse-de/de-components";

import Book from "../../resources/images/bookIcon.png";
import build from "../../util/DebugIDUtil";
import Highlighter from "../../util/Highlighter";

import Grid from "@material-ui/core/Grid";
import { Dialog, DialogContent, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

function Favorite(props) {
    const { is_favorite, id } = props.details;
    const { classes, isExternal, onFavoriteClick } = props;
    let className = classes.disableFavorite;
    const debugId = build(props.baseDebugId, id);
    if (!isExternal) {
        className = is_favorite ? classes.favorite : classes.notFavorite;
    }

    return (
        <div
            id={build(debugId, ids.DETAILS.APP_FAVORITE_CELL)}
            className={className}
            onClick={() => onFavoriteClick(isExternal)}
        />
    );
}

class AppDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            appURL: "",
        };
        this.onAppUrlClick = this.onAppUrlClick.bind(this);
        this.onFavoriteClick = this.onFavoriteClick.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);
        this.onDeleteRatingClick = this.onDeleteRatingClick.bind(this);
    }

    onAppUrlClick() {
        const { id, system_id } = this.props.details;
        if (this.state.appURL) {
            this.setState({ dialogOpen: true });
        } else {
            let host =
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname;
            const url =
                host +
                "?" +
                constants.TYPE +
                "=" +
                constants.APPS +
                "&" +
                constants.APP_ID +
                "=" +
                id +
                "&" +
                constants.SYSTEM_ID +
                "=" +
                system_id;
            this.setState({ dialogOpen: true, appURL: url });
        }
    }

    onDeleteRatingClick() {
        const { presenter, details } = this.props;
        this.setState({ loading: true });
        presenter.onAppRatingDeSelected(
            details,
            () => {
                this.setState({ loading: false });
            },
            (httpCode, message) => {
                this.setState({ loading: false });
            }
        );
    }

    onRatingChange(value) {
        const { presenter, details } = this.props;
        this.setState({ loading: true });
        //service accepts only long
        presenter.onAppRatingSelected(
            details,
            Math.ceil(value),
            () => {
                this.setState({ loading: false });
            },
            (httpCode, message) => {
                this.setState({ loading: false });
            }
        );
    }

    onFavoriteClick(isExternal) {
        const { presenter, details } = this.props;
        this.setState({ loading: true });
        if (!isExternal) {
            presenter.onAppFavoriteSelected(
                details,
                () => {
                    this.setState({ loading: false });
                },
                (httpCode, message) => {
                    this.setState({ loading: false });
                }
            );
        }
    }

    render() {
        const {
            details,
            searchRegexPattern,
            baseDebugId,
            intl,
            classes,
        } = this.props;
        const { loading, dialogOpen } = this.state;
        const isExternal =
            details.app_type.toUpperCase() ===
            constants.EXTERNAL_APP.toUpperCase();
        const showAppURL = details.is_public || isExternal;
        const {
            average: averageRating,
            user: userRating,
            total: totalRating,
        } = details.rating;
        const labelClass = classes.detailsLabel,
            valueClass = classes.detailsValue;

        if (details) {
            return (
                <React.Fragment>
                    <Paper
                        id={baseDebugId}
                        style={{ padding: 5, fontSize: 11 }}
                    >
                        <LoadingMask loading={loading}>
                            <Grid
                                container
                                spacing={24}
                                style={{ paddingLeft: 5 }}
                            >
                                <Grid item xs={12}>
                                    <Favorite
                                        baseDebugId={baseDebugId}
                                        details={details}
                                        isExternal={isExternal}
                                        classes={classes}
                                        onFavoriteClick={this.onFavoriteClick}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <span className={labelClass}>
                                        {getMessage("descriptionLabel")}:
                                    </span>
                                    <span className={valueClass}>
                                        <Highlighter
                                            search={searchRegexPattern}
                                        >
                                            {details.description}
                                        </Highlighter>
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        {getMessage("detailsLabel")}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <span className={labelClass}>
                                        {getMessage("publishedOn")}
                                    </span>
                                    <span className={valueClass}>
                                        {formatDate(details.integration_date)}
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <span className={labelClass}>
                                        {getMessage("integratorName")}
                                    </span>
                                    <span className={valueClass}>
                                        <Highlighter
                                            search={searchRegexPattern}
                                        >
                                            {details.integrator_name}
                                        </Highlighter>
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <span className={labelClass}>
                                        {getMessage("integratorEmail")}
                                    </span>
                                    <span className={valueClass}>
                                        <Highlighter
                                            search={searchRegexPattern}
                                        >
                                            {details.integrator_email}
                                        </Highlighter>
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <span className={labelClass}>
                                        {getMessage("detailsRatingLbl")}
                                    </span>
                                    <Rate
                                        value={
                                            userRating
                                                ? userRating
                                                : averageRating
                                        }
                                        readOnly={isExternal}
                                        total={totalRating}
                                        onChange={this.onRatingChange}
                                        onDelete={
                                            userRating
                                                ? this.onDeleteRatingClick
                                                : undefined
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <span className={labelClass}>
                                        {getMessage("analysesCompleted")}
                                    </span>
                                    <span className={valueClass}>
                                        {details.job_stats.job_count_completed
                                            ? details.job_stats
                                                  .job_count_completed
                                            : 0}
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <span className={labelClass}>
                                        {getMessage("detailsLastCompleted")}
                                    </span>
                                    <span className={valueClass}>
                                        {formatDate(
                                            details.job_stats.job_last_completed
                                        )}
                                    </span>
                                </Grid>
                                {showAppURL && (
                                    <Grid item xs={12}>
                                        <span className={labelClass}>
                                            {getMessage("url")}:
                                        </span>
                                        <DEHyperLink
                                            onClick={this.onAppUrlClick}
                                            text={formatMessage(intl, "url")}
                                        />
                                    </Grid>
                                )}
                                {details.hierarchies && (
                                    <React.Fragment>
                                        <Grid
                                            id={build(
                                                baseDebugId,
                                                ids.DETAILS.CATEGORIES_TREE
                                            )}
                                            item
                                            xs={12}
                                        >
                                            <span className={labelClass}>
                                                {getMessage("category")}
                                            </span>
                                            <CategoryTree
                                                searchRegexPattern={
                                                    searchRegexPattern
                                                }
                                                hierarchies={
                                                    details.hierarchies
                                                }
                                            />
                                        </Grid>
                                    </React.Fragment>
                                )}
                                {details.system_id === constants.AGAVE && (
                                    <React.Fragment>
                                        <Grid
                                            id={build(
                                                baseDebugId,
                                                ids.DETAILS.CATEGORIES_TREE
                                            )}
                                            item
                                            xs={12}
                                        >
                                            <span className={labelClass}>
                                                {getMessage("category")}
                                            </span>
                                            <br />
                                            <img
                                                src={Book}
                                                alt={constants.AGAVE}
                                            />{" "}
                                            {getMessage("hpc")}
                                        </Grid>
                                    </React.Fragment>
                                )}
                            </Grid>
                        </LoadingMask>
                    </Paper>
                    <Dialog open={dialogOpen} fullWidth>
                        <DEDialogHeader
                            heading={formatMessage(intl, "copyAppUrl")}
                            onClose={() => this.setState({ dialogOpen: false })}
                        />
                        <DialogContent>
                            <CopyTextArea
                                id={build(
                                    baseDebugId,
                                    ids.DETAILS.APP_URL_TEXT
                                )}
                                text={this.state.appURL}
                            />
                        </DialogContent>
                    </Dialog>
                </React.Fragment>
            );
        } else {
            return null;
        }
    }
}

AppDetails.propTypes = {
    details: PropTypes.object.isRequired,
    searchRegexPattern: PropTypes.string.isRequired,
    baseDebugId: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(withI18N(injectIntl(AppDetails), intlData));

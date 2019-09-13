package org.iplantc.de.apps.client.views.list;

import org.iplantc.de.apps.client.AppsListView;
import org.iplantc.de.client.models.AppTypeFilter;
import org.iplantc.de.commons.client.util.CyVerseReactComponents;

import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.Widget;
import com.google.inject.Inject;
import com.google.web.bindery.autobean.shared.Splittable;

public class AppListViewImpl implements AppsListView {

    HTMLPanel panel;

    private ReactAppListing.AppListingProps props;

    @Inject
    public AppListViewImpl() {
        panel = new HTMLPanel("<div></div>");
    }

    @Override
    public Widget asWidget() {
        return panel;
    }

    @Override
    public void load(AppsListView.Presenter presenter,
                     String activeView) {

        props = new ReactAppListing.AppListingProps();
        props.apps = null;
        props.heading = "";
        props.appTypeFilter = AppTypeFilter.ALL.getFilterString();
        props.sortField = "name";
        props.searchRegexPattern = "searchRegexPattern";
        props.enableTypeFilter = true;
        props.selectedAppId = null;
        props.viewType = activeView;
        props.loading = true;
        render();
    }

    @Override
    public void setEnableTypeFilter(boolean enable) {
        props.enableTypeFilter = enable;
        render();
    }

    @Override
    public void setSearchRegexPattern(String pattern) {
        props.searchRegexPattern = pattern;
        render();
    }

    @Override
    public void setViewType(String viewType) {
        props.viewType = viewType;
        render();
    }

    @Override
    public void loadSearchResults(Splittable apps,
                                  String heading,
                                  boolean loading) {
        props.apps = apps;
        props.heading = heading;
        props.loading = false;
        render();
    }

    @Override
    public void setHeading(String heading) {
        props.heading = heading;
        render();
    }


    @Override
    public void setLoadingMask(boolean loading) {
        props.loading = loading;
        render();
    }

    @Override
    public void setApps(Splittable apps, boolean loading) {
        props.apps = apps;
        props.loading = loading;
        render();
    }

    @Override
    public void render() {
        CyVerseReactComponents.render(ReactAppListing.AppListingView, props, panel.getElement());
    }
}

package org.iplantc.de.theme.base.client.apps.tools;

import org.iplantc.de.apps.client.views.ManageToolsToolbarView;
import org.iplantc.de.apps.client.views.ManageToolsView;
import org.iplantc.de.resources.client.IplantResources;
import org.iplantc.de.resources.client.messages.IplantDisplayStrings;
import org.iplantc.de.theme.base.client.apps.ToolMessages;

import com.google.gwt.core.client.GWT;
import com.google.gwt.resources.client.ImageResource;

/**
 * Created by sriram on 4/21/17.
 */
public class ManageToolsViewDefaultAppearance implements ManageToolsToolbarView.ManageToolsToolbarApperance,
                                                         ManageToolsView.ManageToolsViewAppearance {

    private final ToolMessages toolMessages;
    private final IplantDisplayStrings iplantDisplayStrings;
    private final IplantResources iplantResources;

    public ManageToolsViewDefaultAppearance() {
        this(GWT.<ToolMessages> create(ToolMessages.class),
             GWT.<IplantDisplayStrings> create(IplantDisplayStrings.class),
             GWT.<IplantResources> create(IplantResources.class));
    }

    ManageToolsViewDefaultAppearance(final ToolMessages toolMessages,
                                     final IplantDisplayStrings iplantDisplayStrings,
                                     final IplantResources iplantResources) {
        this.toolMessages = toolMessages;
        this.iplantDisplayStrings = iplantDisplayStrings;
        this.iplantResources = iplantResources;
    }

    @Override
    public String tools() {
        return toolMessages.tools();
    }

    @Override
    public String requestTool() {
        return toolMessages.requestTool();
    }

    @Override
    public String edit() {
        return toolMessages.edit();
    }

    @Override
    public String delete() {
        return toolMessages.delete();
    }

    @Override
    public String useInApp() {
        return toolMessages.useInApp();
    }

    @Override
    public String share() {
        return toolMessages.share();
    }

    @Override
    public String shareCollab() {
        return toolMessages.shareCollab();
    }

    @Override
    public String sharePublic() {
        return toolMessages.submitForUse();
    }

    @Override
    public String name() {
        return toolMessages.name();
    }

    @Override
    public String version() {
        return toolMessages.version();
    }

    @Override
    public String imaName() {
        return toolMessages.imaName();
    }

    @Override
    public String status() {
        return toolMessages.status();
    }

    @Override
    public String mask() {
        return iplantDisplayStrings.loadingMask();
    }

    @Override
    public String submitForPublicUse() {
        return toolMessages.submitForUse();
    }

    @Override
    public String refresh() {
        return toolMessages.refresh();
    }

    @Override
    public ImageResource refreshIcon() {
        return iplantResources.refresh();
    }

    @Override
    public ImageResource shareToolIcon() {
        return iplantResources.share();
    }

    @Override
    public ImageResource submitForPublicIcon() {
        return iplantResources.submitForPublic();
    }

    @Override
    public String searchTools() {
        return toolMessages.searchTools();
    }

    @Override
    public String addTool() {
        return toolMessages.addTool();
    }
}

package org.iplantc.de.diskResource.client.views.metadata.cells;

import static com.google.gwt.dom.client.BrowserEvents.CLICK;

import org.iplantc.de.client.events.EventBus;
import org.iplantc.de.client.models.diskResources.MetadataTemplateInfo;
import org.iplantc.de.diskResource.client.events.TemplateDownloadEvent;
import org.iplantc.de.diskResource.share.DiskResourceModule;

import com.google.gwt.cell.client.AbstractCell;
import com.google.gwt.cell.client.Cell;
import com.google.gwt.cell.client.ValueUpdater;
import com.google.gwt.dom.client.Element;
import com.google.gwt.dom.client.NativeEvent;
import com.google.gwt.dom.client.Node;
import com.google.gwt.safehtml.shared.SafeHtmlBuilder;
import com.google.gwt.user.client.Event;
import com.google.inject.Inject;

/**
 * Created by sriram on 6/27/16.
 */
public class DownloadTemplateCell extends AbstractCell<MetadataTemplateInfo> {

    public interface DownloadTemplateCellAppearance {
        void render(SafeHtmlBuilder sb,
                    String debugId);
        String download();
    }

    private final DownloadTemplateCellAppearance appearance;
    private EventBus eventBus;
    private String debugId;

    @Inject
    public DownloadTemplateCell(DownloadTemplateCellAppearance appearance,
                                EventBus eventBus) {
        super(CLICK);
        this.appearance = appearance;
        this.eventBus = eventBus;
    }


    @Override
    public void onBrowserEvent(Cell.Context context,
                               Element parent,
                               MetadataTemplateInfo value,
                               NativeEvent event,
                               ValueUpdater<MetadataTemplateInfo> valueUpdater) {
        if (value == null) {
            return;
        }

        Element eventTarget = Element.as(event.getEventTarget());
        Element child = findAppNameElement(parent);
        if (child != null && child.isOrHasChild(eventTarget)) {
            switch (Event.as(event).getTypeInt()) {
                case Event.ONCLICK:
                    doOnClick(value);
                    break;
                default:
                    break;
            }

        }
    }


    private Element findAppNameElement(Element parent) {
        for (int i = 0; i < parent.getChildCount(); i++) {
            Node childNode = parent.getChild(i);

            if (Element.is(childNode)) {
                Element child = Element.as(childNode);
                if (child.getAttribute("name").equalsIgnoreCase(appearance.download())) { //$NON-NLS-1$
                    return child;
                }
            }
        }
        return null;
    }

    private void doOnClick(MetadataTemplateInfo value) {
        eventBus.fireEvent(new TemplateDownloadEvent(value.getId()));
    }

    @Override
    public void render(Cell.Context context, MetadataTemplateInfo value, SafeHtmlBuilder sb) {
        String id = debugId + "." + value.getId() + DiskResourceModule.MetadataIds.DOWNLOAD_TEMPLATE_CELL;
        appearance.render(sb, id);
    }

    public void setBaseDebugId(String debugId) {
        this.debugId = debugId;
    }
}

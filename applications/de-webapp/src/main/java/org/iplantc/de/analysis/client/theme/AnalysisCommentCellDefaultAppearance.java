package org.iplantc.de.analysis.client.theme;

import org.iplantc.de.analysis.client.views.cells.AnalysisCommentCell;
import org.iplantc.de.client.models.analysis.Analysis;
import org.iplantc.de.resources.client.IplantResources;
import org.iplantc.de.resources.client.messages.I18N;
import org.iplantc.de.resources.client.messages.IplantDisplayStrings;

import com.google.gwt.cell.client.Cell;
import com.google.gwt.core.client.GWT;
import com.google.gwt.resources.client.ClientBundle;
import com.google.gwt.resources.client.CssResource;
import com.google.gwt.safehtml.client.SafeHtmlTemplates;
import com.google.gwt.safehtml.shared.SafeHtml;
import com.google.gwt.safehtml.shared.SafeHtmlBuilder;
import com.google.gwt.safehtml.shared.SafeUri;

public class AnalysisCommentCellDefaultAppearance implements AnalysisCommentCell.AnalysisCommentCellAppearance{

    public interface AnalysisCommentCellStyles extends CssResource {
        @ClassName("comment_icon")
        String commentIcon();
    }

    public interface AnalysisCommentCellResources extends ClientBundle {
        @Source("AnalysisCommentCell.css")
        AnalysisCommentCellStyles css();
    }

    /**
     * The HTML templates used to render the cell.
     */
    interface Templates extends SafeHtmlTemplates {
        @SafeHtmlTemplates.Template("<img name=\"{0}\" title=\"{1}\" class=\"{2}\" src=\"{3}\"></img>")
        SafeHtml imgCell(String name, String toolTip, String className, SafeUri imgSrc);
    }

    private final IplantDisplayStrings displayStrings = I18N.DISPLAY;
    private final IplantResources iplantResources = IplantResources.RESOURCES;

    private final AnalysisCommentCellResources resources;
    private final Templates template;

    public AnalysisCommentCellDefaultAppearance() {
        this(GWT.<AnalysisCommentCellResources> create(AnalysisCommentCellResources.class));
    }

    public AnalysisCommentCellDefaultAppearance (AnalysisCommentCellResources resources){
        this.resources = resources;
        this.template = GWT.create(Templates.class);
    }

    @Override
    public void render(Cell.Context context, Analysis value, SafeHtmlBuilder sb) {
        sb.append(template.imgCell(displayStrings.comments(),
                                          displayStrings.comments(),
                                          resources.css().commentIcon(),
                                          iplantResources.userComment().getSafeUri()));

    }
}

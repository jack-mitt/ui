package org.iplantc.de.fileViewers.client.views;

import org.iplantc.de.client.events.FileSavedEvent;
import org.iplantc.de.client.gin.ServicesInjector;
import org.iplantc.de.client.models.diskResources.File;
import org.iplantc.de.client.services.FileEditorServiceFacade;
import org.iplantc.de.fileViewers.client.callbacks.FileSaveCallback;

import com.google.gwt.core.client.GWT;
import com.google.gwt.dom.client.Style.Overflow;
import com.google.gwt.event.shared.HandlerRegistration;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiFactory;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.uibinder.client.UiHandler;
import com.google.gwt.uibinder.client.UiTemplate;
import com.google.gwt.user.client.ui.Widget;

import com.sencha.gxt.widget.core.client.button.TextButton;
import com.sencha.gxt.widget.core.client.container.HtmlLayoutContainer;
import com.sencha.gxt.widget.core.client.event.SelectEvent;
import com.sencha.gxt.widget.core.client.toolbar.ToolBar;

public class MarkDownRendererViewImpl extends AbstractFileViewer {

    @UiTemplate("MarkDownRendererView.ui.xml")
    interface MarkDownRendererViewUiBinder extends UiBinder<Widget, MarkDownRendererViewImpl> { }

    @UiField
    HtmlLayoutContainer panel;

    @UiField
    ToolBar toolbar;

    @UiField
    TextButton saveBtn;

    private static MarkDownRendererViewUiBinder uiBinder = GWT.create(MarkDownRendererViewUiBinder.class);
    private final FileEditorServiceFacade fileEditorService;
    private final String previewData;
    private final Widget widget;
    private String renderHtml;

    public MarkDownRendererViewImpl(File file, String infoType, String previewData) {
        super(file, infoType);
        this.previewData = previewData;
        widget = uiBinder.createAndBindUi(this);
        panel.getElement().getStyle().setBackgroundColor("#ffffff");
        panel.getElement().getStyle().setOverflow(Overflow.SCROLL);
        fileEditorService = ServicesInjector.INSTANCE.getFileEditorServiceFacade();
        if (file == null) {
            saveBtn.disable();
        } else {
            saveBtn.enable();
        }
    }

    @UiHandler("saveBtn")
    void onSaveBtnSelect(SelectEvent event){
        panel.mask();
        String destination = file.getPath() + ".html";
        fileEditorService.uploadTextAsFile(destination,
                                           renderHtml,
                                           true,
                                           new FileSaveCallback(destination,
                                                                true,
                                                                panel));

    }

    public static native String render(String val) /*-{
        var markdown = $wnd.Markdown.getSanitizingConverter();
        return markdown.makeHtml(val);
    }-*/;

    @Override
    public HandlerRegistration addFileSavedEventHandler(final FileSavedEvent.FileSavedEventHandler handler) {
        return asWidget().addHandler(handler, FileSavedEvent.TYPE);
    }

    @Override
    public Widget asWidget() {
        return widget;
    }

    @Override
    public void loadData() {/* Do nothing intentionally */}

    @Override
    public void refresh() {/* Do nothing intentionally */}

    @Override
    public void setData(Object data) {/* Do nothing intentionally */}

    @UiFactory
    HtmlLayoutContainer buildHtmlContainer() {
        renderHtml = render(previewData);
        return new HtmlLayoutContainer("<link href=\"./markdown.css\" rel=\"stylesheet\"></link><div class=\"markdown\">"
                                           + renderHtml + "</div>");
    }

}
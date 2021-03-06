package org.iplantc.de.admin.desktop.client.metadata.view;

import com.google.web.bindery.autobean.shared.Splittable;

import gwt.react.client.components.ComponentConstructorFn;
import gwt.react.client.proptypes.BaseProps;
import jsinterop.annotations.JsPackage;
import jsinterop.annotations.JsProperty;
import jsinterop.annotations.JsType;

@JsType(isNative = true, namespace = "CyVerseReactComponents.metadata", name = "admin")
public class ReactMetadataAdminViews {

    @JsProperty
    public static ComponentConstructorFn<EditMetadataTemplateProps> EditMetadataTemplate;

    @JsType(isNative = true, namespace = JsPackage.GLOBAL, name = "Object")
    public static class EditMetadataTemplateProps extends BaseProps {
        public EditMetadataTemplateView.Presenter presenter;
        public Splittable template;
        public Boolean open;
    }
}

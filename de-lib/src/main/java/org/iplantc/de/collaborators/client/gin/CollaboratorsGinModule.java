package org.iplantc.de.collaborators.client.gin;

import org.iplantc.de.client.services.GroupServiceFacade;
import org.iplantc.de.client.services.impl.GroupServiceFacadeImpl;
import org.iplantc.de.collaborators.client.GroupDetailsView;
import org.iplantc.de.collaborators.client.GroupView;
import org.iplantc.de.collaborators.client.ManageCollaboratorsView;
import org.iplantc.de.collaborators.client.presenter.GroupDetailsPresenterImpl;
import org.iplantc.de.collaborators.client.presenter.ManageCollaboratorsPresenter;
import org.iplantc.de.collaborators.client.views.GroupDetailsViewImpl;
import org.iplantc.de.collaborators.client.util.UserSearchField;
import org.iplantc.de.collaborators.client.views.GroupViewImpl;
import org.iplantc.de.collaborators.client.views.dialogs.ManageCollaboratorsDialog;
import org.iplantc.de.collaborators.client.views.ManageCollaboratorsViewImpl;

import com.google.gwt.inject.client.AbstractGinModule;
import com.google.gwt.inject.client.assistedinject.GinFactoryModuleBuilder;

/**
 * @author aramsey
 */
public class CollaboratorsGinModule extends AbstractGinModule {
    @Override
    protected void configure() {
        install(new GinFactoryModuleBuilder().implement(ManageCollaboratorsView.class,
                                                        ManageCollaboratorsViewImpl.class)
                                             .build(ManageCollaboratorsViewFactory.class));
        bind(ManageCollaboratorsView.Presenter.class).to(ManageCollaboratorsPresenter.class);
        bind(ManageCollaboratorsDialog.class);
        bind(GroupView.class).to(GroupViewImpl.class);
        bind(GroupServiceFacade.class).to(GroupServiceFacadeImpl.class);
        bind(GroupDetailsView.class).to(GroupDetailsViewImpl.class);
        bind(GroupDetailsView.Presenter.class).to(GroupDetailsPresenterImpl.class);
        bind(UserSearchField.class);
    }
}
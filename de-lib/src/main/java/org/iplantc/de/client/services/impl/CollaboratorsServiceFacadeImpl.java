package org.iplantc.de.client.services.impl;

import static org.iplantc.de.shared.services.BaseServiceCallWrapper.Type.GET;

import org.iplantc.de.client.models.collaborators.CollaboratorAutoBeanFactory;
import org.iplantc.de.client.models.collaborators.Subject;
import org.iplantc.de.client.services.CollaboratorsServiceFacade;
import org.iplantc.de.client.services.converters.FastMapCollaboratorCallbackConverter;
import org.iplantc.de.client.services.converters.SubjectListCallbackConverter;
import org.iplantc.de.shared.DEProperties;
import org.iplantc.de.shared.services.DiscEnvApiService;
import org.iplantc.de.shared.services.ServiceCallWrapper;

import com.google.common.base.Joiner;
import com.google.gwt.http.client.URL;
import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONString;
import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.inject.Inject;

import com.sencha.gxt.core.shared.FastMap;

import java.util.List;

/**
 * @author sriram
 * 
 */
public class CollaboratorsServiceFacadeImpl implements CollaboratorsServiceFacade {

    private final String SUBJECTS = "org.iplantc.services.subjects";

    private final DEProperties deProperties;
    private CollaboratorAutoBeanFactory factory;
    private final DiscEnvApiService deServiceFacade;

    @Inject
    public CollaboratorsServiceFacadeImpl(final DiscEnvApiService deServiceFacade,
                                          final DEProperties deProperties,
                                          CollaboratorAutoBeanFactory factory) {
        this.deServiceFacade = deServiceFacade;
        this.deProperties = deProperties;
        this.factory = factory;
    }

    @Override
    public void searchCollaborators(String term, AsyncCallback<List<Subject>> callback) {
        String address = SUBJECTS + "?search=" + URL.encodeQueryString(term.trim()); //$NON-NLS-1$

        ServiceCallWrapper wrapper = new ServiceCallWrapper(GET, address);

        deServiceFacade.getServiceData(wrapper, new SubjectListCallbackConverter(callback, factory));
    }

    @Override
    public void getUserInfo(List<String> usernames, AsyncCallback<FastMap<Subject>> callback) {
        if (usernames == null || usernames.isEmpty()) {
            callback.onSuccess(new FastMap<>());
            return;
        }

        StringBuilder address = new StringBuilder(deProperties.getMuleServiceBaseUrl());
        address.append("user-info"); //$NON-NLS-1$

        address.append("?username="); //$NON-NLS-1$
        String userList = Joiner.on("&username=").join(usernames);
        address.append(URL.encode(userList));

        ServiceCallWrapper wrapper = new ServiceCallWrapper(address.toString());
        deServiceFacade.getServiceData(wrapper, new FastMapCollaboratorCallbackConverter(callback, factory));
    }

    JSONObject buildJSONModel(final List<Subject> models) {
        JSONArray arr = new JSONArray();
        int count = 0;
        for (Subject model : models) {
            JSONObject user = new JSONObject();
            user.put("username", new JSONString(model.getId()));
            arr.set(count++, user);
        }

        JSONObject obj = new JSONObject();
        obj.put("users", arr);
        return obj;
    }
}

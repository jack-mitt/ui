package org.iplantc.de.client.services;

import org.iplantc.de.client.models.apps.App;
import org.iplantc.de.client.models.avu.Avu;
import org.iplantc.de.client.models.ontologies.OntologyHierarchy;
import org.iplantc.de.shared.DECallback;

import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.web.bindery.autobean.shared.Splittable;

import java.util.List;

/**
 * @author aramsey
 */
public interface OntologyServiceFacade {

    void getRootHierarchies(DECallback<List<OntologyHierarchy>> callback);

    void getFilteredHierarchies(String rootIri, Avu avu, DECallback<OntologyHierarchy> callback);

    void getAppsInCategory(String iri,
                           Avu avu,
                           String filter,
                           String sortField,
                           String sortDir,
                           DECallback<Splittable> callback);

    void getUnclassifiedAppsInCategory(String iri,
                                       Avu avu,
                                       String filter,
                                       String sortField,
                                       String sortDir,
                                       DECallback<Splittable> callback);

    void getAppAVUs(App app, AsyncCallback<List<Avu>> callback);
}

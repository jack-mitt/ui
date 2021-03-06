package org.iplantc.de.client.models.apps.sharing;

import org.iplantc.de.client.models.sharing.SharingSubject;

import com.google.web.bindery.autobean.shared.AutoBean;
import com.google.web.bindery.autobean.shared.AutoBeanFactory;

/**
 * Created by sriram on 2/3/16.
 */
public interface AppSharingAutoBeanFactory extends AutoBeanFactory {

    AutoBean<AppUserPermissionsList> resourceUserPermissionsList();

    AutoBean<AppUserPermissions> resourceUserPermissions();

    AutoBean<AppPermissionsRequest> AppPermissionsRequest();

    AutoBean<AppPermission> AppPermission();

    AutoBean<SharingSubject> getSharingSubject();
}

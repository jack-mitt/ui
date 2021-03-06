package org.iplantc.de.client.models.notifications;


import org.iplantc.de.client.models.HasUUIDs;
import org.iplantc.de.client.models.notifications.payload.PayloadAnalysis;
import org.iplantc.de.client.models.notifications.payload.PayloadAppsList;
import org.iplantc.de.client.models.notifications.payload.PayloadData;
import org.iplantc.de.client.models.notifications.payload.PayloadRequest;
import org.iplantc.de.client.models.notifications.payload.PayloadTeam;

import com.google.web.bindery.autobean.shared.AutoBean;
import com.google.web.bindery.autobean.shared.AutoBeanFactory;

/**
 * the factory for creating the auto bean wrappers of the notification messages
 */
public interface NotificationAutoBeanFactory extends AutoBeanFactory {

    AutoBean<NotificationMessage> getNotificationMessage();

    AutoBean<NotificationList> getNotificationList();

    AutoBean<Notification> getNotification();

    AutoBean<PayloadAnalysis> getNotificationPayloadAnalysis();

    AutoBean<PayloadData> getNotificationPayloadData();

    AutoBean<PayloadRequest> getNotificationToolRequestContext();

    AutoBean<PayloadAppsList> getNotificationPayloadAppsList();

    AutoBean<PayloadTeam> getNotificationPayloadTeam();

    AutoBean<HasUUIDs> getHasUUIDs();
 }

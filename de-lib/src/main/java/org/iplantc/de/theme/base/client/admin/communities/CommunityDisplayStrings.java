package org.iplantc.de.theme.base.client.admin.communities;

import com.google.gwt.i18n.client.Messages;

import java.util.List;

/**
 * @author aramsey
 */
public interface CommunityDisplayStrings extends Messages{

    String addCommunity();

    String deleteCommunity();

    String editCommunity();

    String categorize();

    String communityPanelHeader();

    String hierarchyPreviewHeader();

    String communityTreePanel();

    String hierarchyTreePanel();

    String externalAppDND(String appLabels);

    String appAddedToCommunity(String appName, String communityName);

    String clearCommunitySelection();

    String selectCommunitiesFor(String appName);

    String appRemovedFromCommunities(String name);

    String appTaggedWithCommunities(String name, @PluralCount List<String> communityNames);

    String confirmDeleteCommunityTitle();

    String confirmDeleteCommunityMessage(String communityName);

    String communityDeleted(String name);

    String failedToAddCommunityAdmin(String adminName, String communityName);

    String searchEmptyText();

    String retagAppsConfirmationTitle();

    String retagAppsCommunityMessage(String name);
}

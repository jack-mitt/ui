package org.iplantc.de.client.services;

import org.iplantc.de.analysis.client.models.FilterBeanList;
import org.iplantc.de.client.models.analysis.Analysis;
import org.iplantc.de.client.models.analysis.AnalysisParameter;
import org.iplantc.de.client.models.analysis.sharing.AnalysisSharingRequestList;
import org.iplantc.de.client.models.analysis.sharing.AnalysisUnsharingRequestList;
import org.iplantc.de.shared.DECallback;

import com.google.web.bindery.autobean.shared.Splittable;

import java.util.List;

public interface AnalysisServiceFacade {

    void getAnalyses(int limit,
                     int offSet,
                     FilterBeanList filters,
                     String sortField,
                     String sortDir,
                     DECallback<String> callback);

    /**
     * Delete an analysis execution
     * 
     * @param analysesToDelete the analyses to be deleted.
     * @param callback executed when RPC call completes.
     */
    void deleteAnalyses(String[] analysesToDelete, DECallback<String> callback);

    /**
     * Auto Relaunch analyses
     *
     * @param analysesToRelaunch the analysis IDs to be relaunch.
     * @param callback executed when RPC call completes.
     */
    void analysesRelaunch(String[] analysesToRelaunch, DECallback<String> callback);

    /**
     * Renames an analysis.
     *
     * @param id the analysis id which will be renamed
     * @param newName the new analysis name
     * @param callback executed when RPC call completes.
     */
    void renameAnalysis(String id, String newName, DECallback<Void> callback);

    /**
     * Stop a currently running analysis
     * 
     * @param analysisId the analysis to be stopped.
     * @param callback executed when RPC call completes.
     */
    void stopAnalysis(String analysisId, DECallback<String> callback, String status);

    void getAnalysisParams(String analysis_id, DECallback<List<AnalysisParameter>> callback);

    void updateAnalysisComments(String id, String newComment, DECallback<Void> callback);

    /**
     *
     * @param id analysis id
     * @param callback
     */
    void getAnalysisHistory(String id,
                            DECallback<Splittable> callback);

    void shareAnalyses(AnalysisSharingRequestList request, DECallback<String> callback);

    void unshareAnalyses(AnalysisUnsharingRequestList request, DECallback<String> callback);

    void getPermissions(List<Analysis> analyses, DECallback<String> callback);

    void getVICELogs(String id,
                     String sinceTime,
                     DECallback<String> callback);

    void getViceTimeLimit(String id, DECallback<String> callback);

    void setViceTimeLimit(String id, DECallback<String> callback);

}

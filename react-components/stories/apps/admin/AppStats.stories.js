/**
 *
 * @author sriram, psarando
 *
 */
import React, { Component } from "react";
import { AppStats } from "../../../src/apps/admin";


class AppStatsTest extends Component {
    render() {
        const appStats = {
            apps: [
                {
                    "integration_date": "2013-02-10T14:16:44Z",
                    "description": "",
                    "deleted": true,
                    "pipeline_eligibility": {
                        "is_valid": false,
                        "reason": "Job type, fAPI, can't currently be included in a pipeline."
                    },
                    "is_favorite": false,
                    "integrator_name": "Matthew Vaughn",
                    "beta": true,
                    "permission": "read",
                    "can_favor": true,
                    "disabled": false,
                    "can_rate": true,
                    "name": "1000 Bulls GATK Genotyping",
                    "system_id": "de",
                    "is_public": true,
                    "id": "bec33f58-bfbc-4702-bbc7-71a68657faa6",
                    "edited_date": "2013-02-10T14:14:28Z",
                    "step_count": 1,
                    "can_run": true,
                    "job_stats": {
                        "job_count_completed": 25,
                        "job_count": 35,
                        "job_count_failed": 10,
                        "job_last_completed": 1521650432000,
                        "last_used": 1521650292000,
                    },
                    "rating": {
                        "average": 5.0,
                        "total": 1
                    }
                },
                {
                    "integration_date": "2014-04-10T20:02:05Z",
                    "description": "Takes any fasta file for a reference, builds the index and then maps reads to the index. The index is saved in tar.gz form. Colorspace mapping is not available in this version, but this version maps much longer read sequences. ",
                    "deleted": false,
                    "pipeline_eligibility": {
                        "is_valid": true,
                        "reason": ""
                    },
                    "is_favorite": false,
                    "integrator_name": "Roger Barthelson",
                    "beta": false,
                    "permission": "read",
                    "can_favor": true,
                    "disabled": false,
                    "can_rate": true,
                    "name": "Bowtie-2.2.1--Build-and-Map",
                    "system_id": "de",
                    "is_public": true,
                    "id": "0cf384f4-7368-4b25-b2f2-99984656c3e3",
                    "edited_date": "2014-04-10T20:02:05Z",
                    "step_count": 1,
                    "can_run": true,
                    "job_stats": {
                        "job_count_completed": 6324,
                        "job_last_completed": 1527734101000,
                        "job_count": 6672,
                        "job_count_failed": 223,
                        "last_used": 1527733890000
                    },
                    "rating": {
                        "average": 4.571428571428571,
                        "total": 7
                    }
                },
                {
                    "integration_date": "2014-01-07T16:13:43Z",
                    "description": "This App runn Cufflinks (version 2+) to assemble transcripts using Sequence alignments (BAM) generated by TopHat/Bowtie.",
                    "deleted": false,
                    "pipeline_eligibility": {
                        "is_valid": true,
                        "reason": ""
                    },
                    "is_favorite": false,
                    "integrator_name": "Sheldon Mckay",
                    "beta": false,
                    "permission": "read",
                    "can_favor": true,
                    "disabled": false,
                    "can_rate": true,
                    "name": "Cufflinks2",
                    "system_id": "de",
                    "is_public": true,
                    "id": "dd92b8b6-d3bc-452f-b737-17b8872efa1c",
                    "edited_date": "2014-01-07T16:13:43Z",
                    "step_count": 1,
                    "can_run": true,
                    "job_stats": {
                        "job_count_completed": 4986,
                        "job_last_completed": 1527555538000,
                        "job_count": 5727,
                        "job_count_failed": 592,
                        "last_used": 1527733447000
                    },
                    "rating": {
                        "average": 3.75,
                        "total": 8
                    }
                },
                {
                    "integration_date": "2013-10-03T09:04:52Z",
                    "description": "TopHat 2.0.9 (for single-end reads) is a fast splice junction mapper for RNA-Seq reads. It aligns RNA-Seq reads to mammalian-sized genomes using the short read aligner Bowtie and analyzes the mapping results to identify splice junctions between exons. ",
                    "deleted": false,
                    "pipeline_eligibility": {
                        "is_valid": true,
                        "reason": ""
                    },
                    "is_favorite": false,
                    "integrator_name": "Sheldon Mckay",
                    "beta": false,
                    "permission": "read",
                    "can_favor": true,
                    "disabled": false,
                    "can_rate": true,
                    "name": "TopHat2-SE",
                    "system_id": "de",
                    "is_public": true,
                    "id": "92c41f90-10c8-4e64-aac3-19deae1cb55f",
                    "edited_date": "2013-10-03T09:04:52Z",
                    "step_count": 1,
                    "can_run": true,
                    "job_stats": {
                        "job_count_completed": 5449,
                        "job_last_completed": 1525414436000,
                        "job_count": 7820,
                        "job_count_failed": 2092,
                        "last_used": 1526595050000
                    },
                    "rating": {
                        "average": 3.5,
                        "total": 12
                    }
                },
            ]
        };

        const presenter = {
            searchApps: (searchText, startDate, endDate, resultCallback) => {
                resultCallback(appStats)
            },
        };

        return (
            <AppStats presenter={presenter}/>
        );

    }
}

export default AppStatsTest;
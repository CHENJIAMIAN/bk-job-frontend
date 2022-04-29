

/* eslint-disable no-param-reassign */
import HomeSource from '../source/home';
import TaskModel from '@model/task/task';

export default {
    fetchAnalysisGreeting () {
        return HomeSource.getAnalysisGreeting()
            .then(({ data }) => data);
    },
    
    fetchMyFavorList () {
        return HomeSource.getMyFavorList()
            .then(({ data }) => data.map(_ => new TaskModel(_)));
    },
    fetchStatisticsAgent () {
        return HomeSource.getStatisticsAgent()
            .then(({ data }) => data);
    },
    fetchStatisticsJobAndScript () {
        return HomeSource.getStatisticsJobAndScript()
            .then(({ data }) => data);
    },
    fetchAgentStatus (params) {
        return HomeSource.getAgentStatusList(params)
            .then(({ data }) => data);
    },
    fetchAllAgentStatus (params) {
        return HomeSource.getAllAgentStatusList(params)
            .then(({ data }) => data);
    },
};

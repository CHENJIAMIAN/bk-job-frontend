

/* eslint-disable no-param-reassign */
import { formatNumber } from '@utils/assist';
import StatisticsSource from '../source/statistics';

export default {
    fetchDistributionMetrics (params) {
        return StatisticsSource.getDistributionMetrics(params)
            .then(({ data }) => data);
    },
    fetchListByPerAppMetrics (params = {}) {
        return StatisticsSource.getListByPerAppMetrics(params)
            .then(({ data }) => data);
    },
    fetchReourcesDimensions (params) {
        return StatisticsSource.getReourcesDimensions(params)
            .then(({ data }) => data);
    },
    fetchTotalMetrics (params) {
        return StatisticsSource.getTotalMetrics(params)
            .then(({ data }) => ({
                ...data,
                count: formatNumber(data.count),
                momValue: formatNumber(data.momValue),
                yoyValue: formatNumber(data.yoyValue),
            }));
    },
    fetchTrendsMetrics (params) {
        return StatisticsSource.getTrendsMetrics(params)
            .then(({ data }) => data);
    },
    fetchScriptCiteInfo (params) {
        return StatisticsSource.getScriptCiteInfo(params)
            .then(({ data }) => data);
    },
    fetchDateInfo (params, payload) {
        return StatisticsSource.getDateInfo(params, payload)
            .then(({ data }) => data);
    },
};

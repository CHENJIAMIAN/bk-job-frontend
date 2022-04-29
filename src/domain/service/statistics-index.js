

/* eslint-disable no-param-reassign */
import StatisticsIndexSource from '../source/statistics-index';

export default {
    fetchAnalysisResult () {
        return StatisticsIndexSource.getAnalysisResult()
            .then(({ data }) => data);
    },
};

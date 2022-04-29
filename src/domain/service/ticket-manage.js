

/* eslint-disable no-param-reassign */
import TicketSource from '../source/ticket-manage';
import FileManageService from '@service/file-source-manage';
import TicketModel from '@model/ticket';

export default {
    fetchList (params) {
        return TicketSource.getAll(params)
            .then(({ data }) => {
                data.data = data.data.map(ticket => new TicketModel(ticket));
                return data;
            });
    },
    fetchListWithRelate (params) {
        return TicketSource.getAll(params)
            .then(({ data }) => {
                data.data = data.data.map(ticket => new TicketModel(ticket));
                const ticketList = data.data;
                ticketList.forEach((ticket) => {
                    FileManageService.fetchFileSourceList({
                        credentialId: ticket.id,
                        pageSize: 1,
                    }).then((data) => {
                        ticket.relatedNums = data.total;
                        ticket.isRelatedLoading = false;
                    });
                });
                return data;
            });
    },
    update (params) {
        return TicketSource.update(params);
    },
    remove (params) {
        return TicketSource.delete(params);
    },
};

package me.anis.ticketmanagement.dtos.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardSummaryDto {
    private long total;
    private long open;
    private long inProgress;
    private long closed;
    private long blocked;
    private long overdue;
}

package me.anis.ticketmanagement.controllers;

import lombok.AllArgsConstructor;
import me.anis.ticketmanagement.dtos.dashboard.ActivityDto;
import me.anis.ticketmanagement.dtos.dashboard.DashboardSummaryDto;
import me.anis.ticketmanagement.services.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
    private final DashboardService dashboardService;

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello Admin!";
    }

    @GetMapping("/dashboard/summary")
    public DashboardSummaryDto getSummary() {
        return dashboardService.getSummary();
    }

    @GetMapping("/dashboard/activity")
    public List<ActivityDto> getActivity(
            @RequestParam(name = "limit", defaultValue = "10") int limit) {
        return dashboardService.getRecentActivity(limit);
    }
}


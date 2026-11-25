package me.anis.ticketmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> content;
    private int page;            // starts at 1
    private int size;
    private long totalElements;
    private int totalPages;
    private String sort;         // for example "title,asc"

    public static <T> PageResponse<T> from(Page<T> page, String sort) {
        return new PageResponse<>(
                page.getContent(),
                page.getNumber() + 1,     // Spring counts from 0
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                sort);
    }
}

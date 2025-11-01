package com.app.pyme_go.repository;

import com.app.pyme_go.model.entity.CreditApplication;
import com.app.pyme_go.model.entity.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class CreditApplicationSpecification implements Specification<CreditApplication> {

    private final String status;
    private final User assignedTo;

    public CreditApplicationSpecification(String status, User assignedTo) {
        this.status = status;
        this.assignedTo = assignedTo;
    }

    @Override
    public Predicate toPredicate(Root<CreditApplication> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        // Filtro por estado (ignora si es "all" o nulo)
        if (status != null && !status.equalsIgnoreCase("all") && !status.isEmpty()) {
            predicates.add(criteriaBuilder.equal(root.get("status"), status));
        }

        // Filtro por usuario asignado
        if (assignedTo != null) {
            predicates.add(criteriaBuilder.equal(root.get("assignedTo"), assignedTo));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
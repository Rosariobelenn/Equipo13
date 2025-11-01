package com.app.pyme_go.service.impl;

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

        if (status != null && !status.equalsIgnoreCase("all")) {
            predicates.add(criteriaBuilder.equal(root.get("status"), status));
        }

        if (assignedTo != null) {
            // Asume que la entidad CreditApplication tiene un campo 'assignedTo' de tipo User
            predicates.add(criteriaBuilder.equal(root.get("assignedTo"), assignedTo));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
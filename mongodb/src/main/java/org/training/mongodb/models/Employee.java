package org.training.mongodb.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Employee {
    @Id
    private String employeeId;

    private String name;
    private String surname;
    private Integer height;
    private Integer weight;

    private EmployeeDetails employeeDetails;

    @DBRef
    private List<Comment> comments;

    @Transient
    private List<Phone> phones;
}

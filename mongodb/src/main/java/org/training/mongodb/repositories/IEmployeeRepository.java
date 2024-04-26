package org.training.mongodb.repositories;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.training.mongodb.models.Employee;

import java.util.List;

public interface IEmployeeRepository extends MongoRepository<Employee,String> {

    @Aggregation(pipeline = {
            "{$match :  {height :  {$gt :  ?0}}}"
            ,"{$sort : {name :  1}}"
    })
    List<Employee> aggHeight(Integer height);
}

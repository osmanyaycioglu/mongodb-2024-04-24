package org.training.mongodb.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.training.mongodb.models.Comment;
import org.training.mongodb.models.Phone;

import java.util.List;

public interface IPhoneRepository extends MongoRepository<Phone,String> {
    List<Phone> findByEmployee(String employee);
}

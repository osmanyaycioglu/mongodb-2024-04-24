package org.training.mongodb.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.training.mongodb.models.Comment;

public interface ICommentRepository extends MongoRepository<Comment,String> {
}

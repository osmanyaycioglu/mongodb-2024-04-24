package org.training.mongodb.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.training.mongodb.models.Employee;
import org.training.mongodb.models.Phone;
import org.training.mongodb.repositories.ICommentRepository;
import org.training.mongodb.repositories.IEmployeeRepository;
import org.training.mongodb.repositories.IPhoneRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employee/provision")
@RequiredArgsConstructor
public class EmployeeProvisionController {
    private final IEmployeeRepository employeeRepository;
    private final ICommentRepository commentRepository;
    private final IPhoneRepository phoneRepository;

    @PostMapping
    public String add(@RequestBody Employee employeeParam){
        commentRepository.saveAll(employeeParam.getComments());
        Employee saveLoc = employeeRepository.save(employeeParam);
        List<Phone> phonesLoc = employeeParam.getPhones();
        for (Phone phoneLoc : phonesLoc) {
            phoneLoc.setEmployee(saveLoc);
        }
        phoneRepository.saveAll(phonesLoc);
        return "OK";
    }

    @GetMapping("/get/all")
    public List<Employee> getAll(){
        List<Employee> allLoc = employeeRepository.findAll();
        for (Employee employeeLoc : allLoc) {
            String employeeIdLoc = employeeLoc.getEmployeeId();
            List<Phone> byEmployeeLoc = phoneRepository.findByEmployee(employeeIdLoc);
            employeeLoc.setPhones(byEmployeeLoc);
        }
        return allLoc;
    }
}

class Employee {
    constructor(name, id, email, role) {
        // ???
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
        // ???
    };
    getRole() {
        return "Employee";
    };
    getName() {
        return this.name;
    };
    getId() {
        return this.id
    };
    getEmail() {
        return this.email;
}
};

module.exports = Employee;
const Contact = require("./Contact")
const InvalidName = require("./InvalidName")
const NotFound=require("./NotFound");
const ValidationError = require("./ValidationError");

class User {
    static Id = 0;
    static allUsers = []
    constructor(fullName, gender, country, isAdmin) {
        this.Id = User.Id++
        this.fullName = fullName
        this.gender = gender
        this.country = country
        this.isAdmin = isAdmin
        this.contacts = []
    }

    newUser(fullName, gender, country) {

      try {
        if (!this.isAdmin) {
            throw new Unauthorized("only admin can make changes")
        }

        if (typeof fullName != "string") {
            throw new InvalidName("full name should be string")
        }

        if (typeof gender!="string") {
            throw new InvalidName("gender should be string")
        }
        let userObj = new User(fullName, gender, country, false)
        User.allUsers.push(userObj)
        return userObj
        
      } catch (error) {
        console.log(error.message);
      }  
        
       
    }

    static newAdmin(fullName, gender, country) {
        try {
            if (typeof fullName != "string") {
                throw new InvalidName("full name should be string")
            }
            return new User(fullName, gender, country, true)
            
        } catch (error) {
            console.log(error.message);
        }

        
    }

    getAllUsers() {

        try {
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can make changes")
            }
            return User.allUsers
        } catch (error) {
            return error
        }

        
    }

    findUser(userID) {
        try {
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can make changes")
            }
            if (typeof userID!=="number") {
                throw new ValidationError("userid is not number")
            }
            for (let index = 0; index < User.allUsers.length; index++) {
                if (userID == User.allUsers[index].Id) {
                    return index
                }
            }
            throw new NotFound("user id not present")
        } catch (error) {
            throw error
        }

        
    }

    updateUser(userId, parameter, newValue) {

        try {
            if (typeof userId != "number") {
                throw new ValidationError("userid is not number")
            }
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can make changes")
            }
            let indexOfUser = this.findUser(userId)
           
            switch (parameter) {
                case "fullName": if (typeof newValue != "string") { return "invalid name" }
                    User.allUsers[indexOfUser].fullName = newValue
                    return User.allUsers[indexOfUser]
                case "gender": if (typeof newValue != "string") { return "invalid gender" }
                    User.allUsers[indexOfUser].gender = newValue
                    return User.allUsers[indexOfUser]
                case "country": if (typeof newValue != "string") { return "invalid country" }
                    User.allUsers[indexOfUser].country = newValue
                    return User.allUsers[indexOfUser]
                default: throw new NotFound("parameter not found")
            }
            
        } catch (error) {
            return error
        }

        
    }

    deleteUser(userId) {

        try {
            if (typeof userId != "number") {
                throw new ValidationError("userid is not number")
            }
            if (!this.isAdmin) {
                throw new Unauthorized("only admin can make changes")
            }
            let indexOfUser = this.findUser(userId)
            
            User.allUsers.splice(indexOfUser, 1)
            return User.allUsers  
        } catch (error) {
            return error
        }

        
    }

    createContact(fullName) {

        try {
            if (this.isAdmin) {
                throw new Unauthorized("admin cannot create users contact")
            }
            if (typeof fullName != "string") {
                throw new InvalidName("full name should be string")
            }
            let createdContact = new Contact(fullName)
            this.contacts.push(createdContact)
            
        } catch (error) {
            return error
        }

        
    }

    getAllContact() {
        
        return this.contacts
    }

    findContact(contactId) {
        try {
            for (let i = 0; i < this.contacts.length; i++) {
                if (contactId == this.contacts[i].Id) {
                    return i
                }
            }
            throw new NotFound("contact id not found")
        } catch (error) {
            throw error
        }

       
        //return [-1, false]
    }

    updateContact(contactId, newValue) {
        try {
            if (typeof contactId != "number") {
                throw new ValidationError("contact id is not number")
            }
            let indexOfContact  = this.findContact(contactId)
            
            if (typeof newValue != "string") {
                throw new ValidationError("new value is not number")
            }
            this.contacts[indexOfContact].fullName = newValue
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }

        
    }

    deleteContact(contactId) {
        try {
            if (typeof contactId != "number") {
                throw new ValidationError("contact id is not number")
            }
            let indexOfContact = this.findContact(contactId)
            
            this.contacts.splice(indexOfContact, 1)
        } catch (error) {
            return error
        }
        
    }

    createContactInfo(contactId, typeOfContact, valueOfContact) {
        try {
            if (typeof contactId != "number") {
                throw new ValidationError("contact id is not number")
            }
            let indexOfContact = this.findContact(contactId)
            
            this.contacts[indexOfContact].createContactInfo(typeOfContact, valueOfContact)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }

        
    }

    getAllContactInfo(contactId) {

        try {
            if (typeof contactId != "number") {
                throw new ValidationError("contact id is not number")
            }
            let indexOfContact = this.findContact(contactId)
           
            this.contacts[indexOfContact].getAllContactInfo()
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
        
    }

    updateContactInfo(contactId, contactInfoId, newValue) {

        try {
            if (typeof contactId != "number") {
                throw new ValidationError("contact id is not number")
            }
            let indexOfContact = this.findContact(contactId)
           
            this.contacts[indexOfContact].updateContactInfo(contactInfoId, newValue)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
        
    }

    deleteContactInfo(contactId, contactInfoId){
        try {
            if (this.isAdmin) {
                throw new Unauthorized("only user can make changes")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact id is not number")
            }
            let indexOfContact = this.findContact(contactId)
           
            this.contacts[indexOfContact].deleteContactInfo(contactInfoId)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
        
    }

    getUserById(userId){
        try {
            if(typeof userId != "number"){
                throw new ValidationError("userid is not number")
            }
            let indexOfUser = this.findUser(userId)
            
            return User.allUsers[indexOfUser]
        } catch (error) {
            return error
        }

        
    }

    getContactById(contactId){
        try {
            if(typeof contactId != "number"){
                throw new ValidationError(" contact id is not number")
            }
            let indexOfContact = this.findContact(contactId)
            
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }

       
    }

    getContactInfoById(contactId, contactInfoId){
        try {
            if(typeof contactId != "number"||typeof contactInfoId!=="number"){
                throw new ValidationError("userid is not number")
            }
            let indexOfContact = this.findContact(contactId)
            
            return this.contacts[indexOfContact].getContactInfoById(contactInfoId)
        } catch (error) {
            return error
        }
        
    }
}

let a = User.newAdmin("rayyan", "Male", "India")
let markObj = a.newUser("mark", 123, "India")


markObj.createContact("sam1")
markObj.createContact("sam2")
console.log(markObj.getAllContact());

markObj.createContactInfo(0, "phone_no", 34523452)
markObj.createContactInfo(1, "email", "mark@gmail.com")
console.log(a.getUserById(1));
console.log(markObj.getContactById(0));
console.log(markObj.getContactInfoById(0,0));
console.log(markObj.getAllContactInfo(0));

console.log(markObj.updateContactInfo(0, 0, "jack"));
console.log(markObj.getAllContactInfo(1));
markObj.updateContact(0, "sam")


console.log(a.getAllUsers());
console.log(markObj.getAllContact());

a.updateUser(1, "fullName", "mark samuel")
console.log(a.getAllUsers());

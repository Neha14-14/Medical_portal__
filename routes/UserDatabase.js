class UserDatabase {
    constructor() {
      this.users = new Map();
    }
  
    registerUser(username, password, confirmPassword) {
      if (this.users.has(username)) {
        return { success: false, message: 'User already exists' };
      }
  
      if (password !== confirmPassword) {
        return { success: false, message: 'Password and confirmation password do not match' };
      }
  
      this.users.set(username, password);
      return { success: true, message: 'User registered successfully' };
    }
  
    authenticateUser(username, password) {
      const userPassword = this.users.get(username);
      if (userPassword !== password) {
        return false;
      }
      return true;
    }
  
    getUser(username) {
      return this.users.get(username);
    }
  }
  
  module.exports = UserDatabase;
  
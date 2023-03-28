import axios from 'axios';

class UserAccount {
    private email: string;
    private password: string;
    private displayName: string;
    private username: string;
    private addressLine1: string;

    constructor(email: string, password: string, displayName: string, username: string, addressLine1: string) {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.username = username;
        this.addressLine1 = addressLine1;
    }
    
    public async register(email: string, password: string, displayName: string, username: string, addressLine1: string): Promise<any> {
        try {
          const response = await axios.post('https://atracking.azurewebsites.net/api/Account/register', {
            email: email,
            password: password,
            displayName: displayName,
            username: username,
            addressLine1: addressLine1
          });
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

    public getUsername(): string {
      return this.username;
    }
    
    public setUsername(username: string): void {
      this.username = username;
    }
    
    public getPassword(): string {
      return this.password;
    }
    
    public setPassword(password: string): void {
      this.password = password;
    }
    
    public getEmail(): string {
      return this.email;
    }
    
    public setEmail(email: string): void {
      this.email = email;
    }
    
    public login(username: string, password: string): boolean {
      // check if username and password match the stored values
      return this.username === username && this.password === password;
    }
    
    public resetPassword(newPassword: string): void {
      this.password = newPassword;
    }
    
    public sendPasswordResetEmail(): void {
      // send an email to the user's email address with a password reset link
    }
    
    public deactivateAccount(): void {
      // deactivate the user's account
    }
  }
  
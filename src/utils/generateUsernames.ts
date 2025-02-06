export function generateUsername(email: string): string {
    // Extract the part of the email before the "@" symbol
    const emailPrefix = email.split('@')[0];
    
    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    
    // Combine the email prefix and the random number to create a unique username
    const username = `${emailPrefix}${randomNumber}`;
    
    return username;
}
export function emailWithOTP(email: string, otp: number, name: string) {
  return (
    `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Verify Your Email</title>
        <style>
            /* Base styles */
            body {
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
                background-color: #fff; /* White mode background */
            }
    
            /* Dark mode styles */
            @media (prefers-color-scheme: dark) {
                body {
                    background-color: #111; /* Dark mode background */
                    color: #fff;
                }
                a {
                    color: #007bff;
                }
            }
    
            /* Email container */
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f0f0f0; /* Light mode container background */
            }
    
            /* Dark mode container background */
            @media (prefers-color-scheme: dark) {
                .email-container {
                    background-color: #222;
                }
            }
    
            /* Header */
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            /* Content */
            .content {
                padding: 20px;
                background-color: #fff; /* Light mode content background */
            }
    
            /* Dark mode content background */
            @media (prefers-color-scheme: dark) {
                .content {
                    background-color: #333;
                }
            }
    
            /* Button */
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
    
            /* Dark 1  mode button */
            @media (prefers-color-scheme: dark) {
                .button {
                    background-color: #007bff;
                    border: 1px solid #007bff;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Verify Your Email</h1>
            </div>
            <div class="content">
                <p>Hello, ${name}</p>
                <p>Please enter the following OTP to verify your email ${email} address:</p>
                <h2 style="text-align: center;">${otp}</h2>
                <p style="text-align: center;">This OTP is valid for 10 minutes.</p>
            </div>
        </div>
    </body>
    </html>
    `
  )
}

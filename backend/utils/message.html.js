const resetPasswordHTML =(resetLink) =>{
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #6e7fcb, #4a5ca9);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            max-width: 600px;
            width: 100%;
            background: #fff;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            text-align: center;
        }
        .email-header {
            background: linear-gradient(90deg, #007bff, #00d4d4);
            color: #fff;
            padding: 30px;
            border-bottom: 5px solid #00d4d4;
        }
        .email-body {
            padding: 30px;
            font-size: 1.1rem;
            color: #333;
        }
        .email-body p {
            line-height: 1.6;
        }
        .reset-button {
            display: inline-block;
            margin: 20px 0;
            padding: 15px 30px;
            background: linear-gradient(90deg, #00bcd4, #007bff);
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 50px;
            font-size: 1.2rem;
            transition: background-color 0.3s ease;
        }
        .reset-button:hover {
            background: linear-gradient(90deg, #007bff, #00d4d4);
        }
        .email-footer {
            background-color: #f1f1f1;
            color: #666;
            padding: 20px;
            font-size: 0.9rem;
            border-top: 2px solid #ddd;
        }
        /* Responsive Design */
        @media (max-width: 600px) {
            .email-container {
                padding: 20px;
            }
            .reset-button {
                padding: 12px 25px;
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="email-body">
            <p>Hi,</p>
            <p>You recently requested to reset your password. Click the button below to reset it:</p>
            <a href="${resetLink}" class="reset-button"><span style="color: white;">Reset Your Passoword</span></a>
            <p>If you didn’t request a password reset, you can safely ignore this email. Your password will not change unless you click the link above and create a new one.</p>
        </div>
        <div class="email-footer">
            <p>Thank you,</p>
            <p>Animefanmerch Team</p>
        </div>
    </div>
</body>
</html>`
}

const verifyAccountHTML= (verifyLink) =>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #6e7fcb, #4a5ca9);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            max-width: 600px;
            width: 100%;
            background: #fff;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            text-align: center;
        }
        .email-header {
            background: linear-gradient(90deg, #007bff, #00d4d4);
            color: #fff;
            padding: 30px;
            border-bottom: 5px solid #00d4d4;
        }
        .email-body {
            padding: 30px;
            font-size: 1.1rem;
            color: #333;
        }
        .email-body p {
            line-height: 1.6;
        }
        .verify-button {
            display: inline-block;
            margin: 20px 0;
            padding: 15px 30px;
            background: linear-gradient(90deg, #00bcd4, #007bff);
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 50px;
            font-size: 1.2rem;
            transition: background-color 0.3s ease;
        }
        .verify-button:hover {
            background: linear-gradient(90deg, #007bff, #00d4d4);
        }
        .email-footer {
            background-color: #f1f1f1;
            color: #666;
            padding: 20px;
            font-size: 0.9rem;
            border-top: 2px solid #ddd;
        }
        /* Responsive Design */
        @media (max-width: 600px) {
            .email-container {
                padding: 20px;
            }
            .verify-button {
                padding: 12px 25px;
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Verify Your Account</h1>
        </div>
        <div class="email-body">
            <p>Hi,</p>
            <p>Thank you for creating an account with us. To complete the registration process, please click the button below to verify your email address:</p>
            <a href="${verifyLink}" class="verify-button"><span style="color: white;">Verify Your Account</span></a>
            <p>If you didn’t create an account with us, you can safely ignore this email.</p>
        </div>
        <div class="email-footer">
            <p>Thank you,</p>
            <p>Animefanmerch Team</p>
        </div>
    </div>
</body>
</html>`
}

export {resetPasswordHTML,verifyAccountHTML};
# PasswordGen

A simple and secure password generator tool with a clean, modern interface.

## Features

- **Customizable Password Length**: Generate passwords from 4 to 64 characters
- **Character Type Selection**: Choose from uppercase, lowercase, numbers, and symbols
- **Real-time Strength Assessment**: Visual password strength meter with color coding
- **Batch Generation**: Generate up to 10 passwords at once
- **One-Click Copy**: Copy individual passwords or all generated passwords
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Clean UI**: Modern gradient design with smooth animations

## Usage

1. **Set Password Length**: Use the slider to select desired password length (4-64 characters)
2. **Choose Character Types**: Select which character types to include:
   - Uppercase letters (A-Z)
   - Lowercase letters (a-z) 
   - Numbers (0-9)
   - Special symbols (!@#$%^&*)
3. **Set Batch Size**: Choose to generate 1-10 passwords simultaneously
4. **Generate**: Click "Generate Password" to create secure passwords
5. **Copy**: Use copy buttons to copy passwords to clipboard

## Password Strength

The built-in strength meter evaluates passwords based on:
- Length (bonus for 8+, 12+, 16+, 20+ characters)
- Character variety (uppercase, lowercase, numbers, symbols)
- Overall security score

Strength levels:
- **Weak**: Basic passwords, consider adding more character types
- **Fair**: Decent passwords, could be improved
- **Good**: Strong passwords suitable for most uses  
- **Strong**: Very secure passwords recommended for sensitive accounts

## Browser Compatibility

Works in all modern browsers including:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Local Usage

Simply open `index.html` in your web browser. No installation or server required.

## Files

- `index.html` - Main application interface
- `style.css` - Styles and responsive design
- `script.js` - Password generation logic and UI interactions
- `.gitignore` - Git exclusions

## Security Note

All password generation happens locally in your browser. No passwords are sent to any server or stored anywhere.

---

*Generate secure passwords for all your accounts!*
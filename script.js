document.addEventListener('DOMContentLoaded', function() {
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');
    const generateBtn = document.getElementById('generate');
    const passwordField = document.getElementById('password');
    const copyBtn = document.getElementById('copy');
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    
    const characterSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });
    
    generateBtn.addEventListener('click', generatePassword);
    
    copyBtn.addEventListener('click', copyToClipboard);
    
    passwordField.addEventListener('click', function() {
        this.select();
    });
    
    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        
        let availableChars = '';
        
        if (uppercaseCheck.checked) {
            availableChars += characterSets.uppercase;
        }
        if (lowercaseCheck.checked) {
            availableChars += characterSets.lowercase;
        }
        if (numbersCheck.checked) {
            availableChars += characterSets.numbers;
        }
        if (symbolsCheck.checked) {
            availableChars += characterSets.symbols;
        }
        
        if (availableChars === '') {
            alert('Please select at least one character type!');
            return;
        }
        
        let password = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }
        
        passwordField.value = password;
        updateStrengthMeter(password);
        
        // Add some visual feedback
        generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            generateBtn.style.transform = '';
        }, 100);
    }
    
    function copyToClipboard() {
        if (passwordField.value === '') {
            alert('Generate a password first!');
            return;
        }
        
        passwordField.select();
        passwordField.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            
            // Visual feedback for successful copy
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.background = '#17a2b8';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '#28a745';
            }, 1000);
            
        } catch (err) {
            console.error('Failed to copy password: ', err);
            alert('Failed to copy password. Please copy manually.');
        }
    }
    
    function updateStrengthMeter(password) {
        if (!password) {
            strengthFill.style.width = '0%';
            strengthFill.className = 'strength-fill';
            strengthText.textContent = 'Generate a password to see strength';
            strengthText.className = 'strength-text';
            return;
        }
        
        let score = 0;
        let feedback = [];
        
        // Length scoring
        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 15;
        if (password.length >= 16) score += 10;
        
        // Character variety scoring
        if (/[a-z]/.test(password)) score += 12;
        if (/[A-Z]/.test(password)) score += 12;
        if (/[0-9]/.test(password)) score += 12;
        if (/[^a-zA-Z0-9]/.test(password)) score += 14;
        
        // Bonus for very long passwords
        if (password.length >= 20) score += 10;
        
        // Determine strength level
        let strengthClass = '';
        let strengthLabel = '';
        let width = '0%';
        
        if (score < 30) {
            strengthClass = 'strength-weak';
            strengthLabel = 'Weak';
            width = '25%';
        } else if (score < 50) {
            strengthClass = 'strength-fair';
            strengthLabel = 'Fair';
            width = '50%';
        } else if (score < 75) {
            strengthClass = 'strength-good';
            strengthLabel = 'Good';
            width = '75%';
        } else {
            strengthClass = 'strength-strong';
            strengthLabel = 'Strong';
            width = '100%';
        }
        
        // Update UI
        strengthFill.style.width = width;
        strengthFill.className = `strength-fill ${strengthClass}`;
        strengthText.textContent = strengthLabel;
        strengthText.className = `strength-text ${strengthClass}`;
    }
    
    // Generate an initial password
    generatePassword();
});
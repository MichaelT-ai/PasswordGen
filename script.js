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
    
    // Generate an initial password
    generatePassword();
});
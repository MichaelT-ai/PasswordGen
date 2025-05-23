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
    const batchSlider = document.getElementById('batch-size');
    const batchValue = document.getElementById('batch-value');
    const batchResults = document.getElementById('batch-results');
    const batchList = document.getElementById('batch-list');
    const copyAllBtn = document.getElementById('copy-all');
    
    const characterSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });
    
    batchSlider.addEventListener('input', function() {
        batchValue.textContent = this.value;
    });
    
    generateBtn.addEventListener('click', generatePassword);
    
    copyBtn.addEventListener('click', copyToClipboard);
    
    copyAllBtn.addEventListener('click', copyAllPasswords);
    
    passwordField.addEventListener('click', function() {
        this.select();
    });
    
    function generateSinglePassword() {
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
            return null;
        }
        
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            password += availableChars[randomIndex];
        }
        
        return password;
    }
    
    function generatePassword() {
        const batchSize = parseInt(batchSlider.value);
        
        if (batchSize === 1) {
            // Single password generation
            const password = generateSinglePassword();
            if (!password) {
                alert('Please select at least one character type!');
                return;
            }
            
            passwordField.value = password;
            updateStrengthMeter(password);
            batchResults.style.display = 'none';
        } else {
            // Batch generation
            const passwords = [];
            for (let i = 0; i < batchSize; i++) {
                const password = generateSinglePassword();
                if (!password) {
                    alert('Please select at least one character type!');
                    return;
                }
                passwords.push(password);
            }
            
            // Display first password in main field
            passwordField.value = passwords[0];
            updateStrengthMeter(passwords[0]);
            
            // Show batch results
            displayBatchResults(passwords);
        }
        
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
    
    function displayBatchResults(passwords) {
        batchList.innerHTML = '';
        
        passwords.forEach((password, index) => {
            const item = document.createElement('div');
            item.className = 'batch-item';
            
            item.innerHTML = `
                <span class="batch-password">${password}</span>
                <button class="batch-copy" onclick="copyIndividualPassword('${password}')">Copy</button>
            `;
            
            batchList.appendChild(item);
        });
        
        batchResults.style.display = 'block';
    }
    
    function copyAllPasswords() {
        const passwordElements = document.querySelectorAll('.batch-password');
        const passwords = Array.from(passwordElements).map(el => el.textContent);
        
        if (passwords.length === 0) {
            alert('No passwords to copy!');
            return;
        }
        
        const allPasswords = passwords.join('\n');
        
        try {
            navigator.clipboard.writeText(allPasswords).then(() => {
                // Visual feedback
                const originalText = copyAllBtn.textContent;
                copyAllBtn.textContent = 'Copied All!';
                copyAllBtn.style.background = '#138496';
                
                setTimeout(() => {
                    copyAllBtn.textContent = originalText;
                    copyAllBtn.style.background = '#17a2b8';
                }, 1500);
            });
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = allPasswords;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            const originalText = copyAllBtn.textContent;
            copyAllBtn.textContent = 'Copied All!';
            copyAllBtn.style.background = '#138496';
            
            setTimeout(() => {
                copyAllBtn.textContent = originalText;
                copyAllBtn.style.background = '#17a2b8';
            }, 1500);
        }
    }
    
    // Global function for individual password copying
    window.copyIndividualPassword = function(password) {
        try {
            navigator.clipboard.writeText(password).then(() => {
                // Find the button that was clicked and give feedback
                event.target.textContent = 'Copied!';
                event.target.style.background = '#218838';
                
                setTimeout(() => {
                    event.target.textContent = 'Copy';
                    event.target.style.background = '#28a745';
                }, 1000);
            });
        } catch (err) {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = password;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            event.target.textContent = 'Copied!';
            event.target.style.background = '#218838';
            
            setTimeout(() => {
                event.target.textContent = 'Copy';
                event.target.style.background = '#28a745';
            }, 1000);
        }
    };
    
    // Generate an initial password
    generatePassword();
});
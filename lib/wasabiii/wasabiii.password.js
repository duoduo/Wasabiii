wasabiii.password = function(config) {
    
    this.init = function(config) {
        var defaultConfig = {
        numOfChars: 8,
        includeLetters: true,
        includeNumbers: true,
        caseSensitivity: 'mixedCase',
        includeSymbols: true,
        symbols: '@#$!_|'
        }
    
        if (!config) {
            this.config = defaultConfig;
        } else {
            this.config = config;
            //merge config
            for (propertyName in defaultConfig) {
                if (typeof(this.config[propertyName]) === 'undefined') {
                    this.config[propertyName] = defaultConfig[propertyName];
                }
            }
        }
    }
    
    this.generate = function() {
        var lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        var upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var numbers = '0123456789';
        var symbols = this.config.symbols;
        var chars = '';
        
        if (this.config.includeLetters) {
            switch(this.config.caseSensitivity) {
                case 'lowerCase':
                    chars += lowerCaseLetters;
                    break;

                case 'upperCase':
                    chars += upperCaseLetters;
                    break;

                case 'mixedCase':
                default:
                    chars += lowerCaseLetters;
                    chars += upperCaseLetters;
                    break;
            }
        }

        if (this.config.includeNumbers) {
            chars += numbers;
        }

        if (this.config.includeSymbols) {
            chars += symbols;
        }

        var password = '';
        for (var i = 0; i < this.config.numOfChars; i++) {
            var charKey = Math.floor(Math.random() * chars.length);
            password += chars.charAt(charKey);
        }


        return password;
    }
    
    this.init(config);
}

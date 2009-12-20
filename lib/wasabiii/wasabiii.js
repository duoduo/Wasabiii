var wasabiii = {
    outerHeight: 320,
    outerWidth: 390,
    innerHeight: 298,
    innerWidth: 390,
    
    init: function() {
        this.initWindow();
        this.initConfig();
        this.initPassword();
        this.initButtons();
        this.initLinks();
    },
    
    initWindow: function () {
        /**
         * width / height do not honor the same content "inner" width / height
         * does not seem to be documented much so this is the dumb work around
         */
        if (window.innerHeight < this.innerHeight) {
            window.nativeWindow.height = this.outerHeight + (this.innerHeight - window.innerHeight);
        }
        
        if (window.innerWidth < this.innerWidth) {
            window.nativeWindow.width = this.outerWidth + (this.innerWidth - window.innerWidth);
        }
        //air.Introspector.Console.log(window);  
    },
    
    initConfig: function() {
        var defaultConfigFilePath = 'config/wasabiii.js';
        var userConfigFilePath = 'Preferences/wasabiii.js';
        this.config = new wasabiii.config(defaultConfigFilePath, userConfigFilePath);
        this.userConfig = this.config.read();
    },
    
    initPassword: function() {
        this.password = new wasabiii.password(this.userConfig);
    },
    
    initButtons: function() {        
        jQuery.easing.def = 'easeInOutSine';
        /**
         * Add click event to generate button
         */
        var addClickEventToGenerateButton = function(config) {
            $('#generate-button').click(function() {
                $('#password').val(wasabiii.password.generate());
            });
        }
        
        addClickEventToGenerateButton(this.userConfig);
        
        //select all text on click
        $('#password').click(function() {
            this.select();
        });
        
        $('#options-button').click(function() {
                    
            /**
             * Set options form from config
             */
            $('#options-form input, #options-form select').each(function() {
                var value = wasabiii.userConfig[this.name];
                switch(this.name) {
                    case 'numOfChars':
                    case 'symbols':
                    case 'caseSensitivity':
                        this.value = value;
                        break;
                        
                    case 'includeLetters':
                    case 'includeNumbers':
                    case 'includeSymbols':
                        if (value == true) {
                            this.checked = 'checked';
                        } else {
                            this.checked = '';
                        }
                        break;
                }
                 
                                      
            });
            
            $('#window-vertical-scroller').animate({
                top: '-' + wasabiii.innerHeight + 'px',
                duration: 300
            });
            
            return false;
        });
        
        $('#close-button').click(function() {
            $('#window-vertical-scroller').animate({
                top: '-' + 0 + 'px',
                duration: 300
            });
            
            /**
             * Set config from options form
             */
            $('#options-form input, #options-form select').each(function() {
                switch(this.name) {
                    case 'numOfChars':
                        wasabiii.userConfig.numOfChars = this.value;
                        break;
                        
                    case 'includeLetters':
                        //air.Introspector.Console.log(this.value);
                        wasabiii.userConfig.includeLetters = this.value == 'on' ? true : false;
                        break;
                        
                    case 'includeNumbers':
                        wasabiii.userConfig.includeNumbers = this.value == 'on' ? true : false;
                        break;
                        
                    case 'includeSymbols':
                        wasabiii.userConfig.includeSymbols = this.value == 'on' ? true : false;
                        break;
                        
                    case 'caseSensitivity':
                        wasabiii.userConfig.caseSensitivity = this.value;
                        break;
                        
                    case 'symbols':
                        wasabiii.userConfig.symbols = this.value;
                        break;
                }
               
            });
            
            //re-add click even with new config
            addClickEventToGenerateButton(wasabiii.userConfig);
            //write new config to file
            wasabiii.config.write(wasabiii.userConfig);
            
            return false;
        });
        
    },
    
    initLinks: function() {
        //add wasabiii logo click
        $('#logo').click(function() {
            var urlReq = new air.URLRequest('http://api.io/wasabiii'); 
            air.navigateToURL(urlReq); 
            return false;
        });    
    }
}
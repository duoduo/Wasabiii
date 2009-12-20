wasabiii.config = function(defaultConfigFilePath, userConfigFilePath) {
    this.init = function(defaultConfigFilePath, userConfigFilePath) {
       this.defaultConfigFilePath = defaultConfigFilePath;
       this.userConfigFilePath = userConfigFilePath;
    }
    
    this.read = function() {
        var configFile = air.File.applicationStorageDirectory;
        configFile = configFile.resolvePath(this.userConfigFilePath);
        
        //first time load initialization
        if (!configFile.exists) {
            var defaultConfigFile = air.File.applicationDirectory;
            defaultConfigFile = defaultConfigFile.resolvePath(this.defaultConfigFilePath); 
            //read default config file
            var stream = new air.FileStream();
            stream.open(defaultConfigFile, air.FileMode.READ);
            var defaultConfig = stream.readUTFBytes(stream.bytesAvailable);
            stream.close();
            
            //write user config file
            var stream = new air.FileStream();
            stream.open(configFile, air.FileMode.WRITE);
            stream.writeUTFBytes(defaultConfig);
            stream.close();   
       }
       
       var stream = new air.FileStream();
       stream.open(configFile, air.FileMode.READ);
       var config = stream.readUTFBytes(stream.bytesAvailable);
       stream.close();
       return JSON.parse(config);
       
    }
    
    this.write =  function(config) {
        var configFile = air.File.applicationStorageDirectory;
        configFile = configFile.resolvePath(this.userConfigFilePath);
        var stream = new air.FileStream();
        stream.open(configFile, air.FileMode.WRITE);
        stream.writeUTFBytes(JSON.stringify(config));
        return stream.close();
    }
    
    this.init(defaultConfigFilePath, userConfigFilePath);
}

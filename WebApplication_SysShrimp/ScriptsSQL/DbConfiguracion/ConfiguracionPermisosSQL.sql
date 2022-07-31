-- Creates the login UserSysShrimp with password '1234'.  
USE SysShrimp

CREATE LOGIN UserSysShrimp   
    WITH PASSWORD = '1234';  
GO  

-- Creates a database user for the login created above.  
CREATE USER UserSysShrimp FOR LOGIN UserSysShrimp;  
GO  

USE SysShrimp
GRANT CONTROL ON DATABASE::SysShrimp TO UserSysShrimp;
GO

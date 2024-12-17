# Project Architecture

```
/src
  ├── Tradof.Domain  
  │   ├── Tradof.Data  
  │   │   ├── Entities
  |   |   ├──IGeneralRepository&IUOW
  │   │   |    ├── IGeneralRepository.cs  
  │   │   |    └── IUnitOfWork.cs  
  ├── Tradof.Infrastructure  
  │   ├── Tradof.EntityFramework 
  |   |   └── TradofDbContext.cs
  │   |   Tradof.Repository  
  |   |   ├── GeneralRepository.cs  
  │   |   └── UnitOfWork.cs  
  ├── Tradof.Services  
  │   └── Tradof.Module.Admin  
  │       ├── Tradof.Admin.API  
  │       └── Tradof.Admin.Services  
  ├── Tradof.Setting  
  │   ├── Tradof.Common  
  │   └── Tradof.ResponseHandler  
  └── Tradof.Web  
      └── Tradof.Api
```
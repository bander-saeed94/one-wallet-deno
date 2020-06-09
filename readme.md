# One Wallet
This a deno app. It helps groups who are contributing to be able to track their contributions and loans.

## Run locally
First migrate the db:  
```deno run --allow-net --allow-read https://deno.land/x/nessie/cli.ts migrate```  
Run the server:  
```deno run --allow-read --allow-net --unstable src/server.ts ```  

Set Deno version 1.0.0:  
```deno upgrade --version 1.0.0```  

## Features
Any user can create a wallet and be the admin.  
Admin will be able to invite users.  
A User will accept the invitation and being able to contribute as well to ask for a loan.  
A User will instantiate the deposit or loan transaction.  
Admin can approve or reject that a transaction have took a place and it will be part of the history.  

All users in a wallet will be able to track the history of a wallet.  
A User will also be able to track his contribution across wallets.  


Rollback db:  
```deno run --allow-net --allow-read https://deno.land/x/nessie/cli.ts rollback all```  

Migrate db:  
```deno run --allow-net --allow-read https://deno.land/x/nessie/cli.ts migrate```  

Seed db: 
```deno run --allow-net --allow-read --unstable https://deno.land/x/nessie/cli.ts seed```  
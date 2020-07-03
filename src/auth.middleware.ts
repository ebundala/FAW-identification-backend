import { Injectable, NestMiddleware, Request,Response,Headers } from '@nestjs/common';
import { AppLogger } from './modules/app-logger/app-logger.module';
import { FirebaseService } from './modules/firebase-admin/firebase.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly logger:AppLogger,
    private readonly app:FirebaseService,
    ){

  }
   async use(req:any, res:any, next: () => void) {
    
    const {headers} = req;
    if(headers&&headers.authorization){
      const [realm,token] = headers.authorization.split(' ');
     await this.app.admin.auth().verifySessionCookie(token,false)//TODO set true to verify revoked tokens
      .then((claims)=>{
        req.auth = claims;
        req.token = token
        this.logger.log(claims.uid,'AUTH')
      })
      .catch((e)=>{
        req.auth=null;
      }).finally(()=>{
        next();
      })
    }else{
      next();
    }
 
  }
}

import { Resolver, Mutation } from '@nestjs/graphql';
import { ResponseService } from './response-service';

@Resolver('Response')
export class ResponseResolver {
    constructor(private readonly responseService: ResponseService){}
  //  @Mutation((returns)=>ResponseResult)
    async createResponse(){}
}

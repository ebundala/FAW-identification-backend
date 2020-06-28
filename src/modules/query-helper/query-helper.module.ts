import { Module } from '@nestjs/common';
import { QueryHelper } from './query-helper';

@Module({
    providers:[QueryHelper],
    exports:[QueryHelper]
})
export class QueryHelperModule {}

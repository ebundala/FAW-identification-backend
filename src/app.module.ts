import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { FirebaseModule } from './firebase-admin/firebase.module';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { AuthMiddleware } from './auth.middleware';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/models/graphql.ts'),
        outputAs: 'class',
      },
      context: ({ req }) => {
        return { auth: req.auth, token: req.token }
      },
      debug: true,
      playground: true,
    }),
    FirebaseModule,
    AppLoggerModule,
    UserModule,
    FormModule,
    QuestionModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/graphql')
  }
}

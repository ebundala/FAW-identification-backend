import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { join } from 'path';
import { AuthMiddleware } from './auth.middleware';
import { AnswerModule } from './modules/answer/answer.module';
import { AppLoggerModule } from './modules/app-logger/app-logger.module';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { CommentModule } from './modules/comment/comment.module';
import { FirebaseModule } from './modules/firebase-admin/firebase.module';
import { FormCategoryModule } from './modules/form-category/form-category.module';
import { FormModule } from './modules/form/form.module';
import { ForumAnswerModule } from './modules/forum-answer/forum-answer.module';
import { ForumModule } from './modules/forum/forum.module';
import { GradeModule } from './modules/grade/grade.module';
import { HelpStepModule } from './modules/help-step/help-step.module';
import { HelpModule } from './modules/help/help.module';
import { QuestionModule } from './modules/question/question.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { ResponseModule } from './modules/response/response.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./src/schemas/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/models/graphql.ts'),
        outputAs: 'class',
      },
      context: ({ req }) => {
        return { auth: req.auth, token: req.token }
      },
      transformSchema: (schema) => {
        const txt = printSchema(schema);

        writeFileSync(join(process.cwd(), 'src/models/schema.g.graphql'), txt)
        return schema;
      },
      uploads:{
        maxFieldSize:5048000,
        maxFileSize:5048000
      },
      debug: false,
      playground: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
      exclude: ['/graphql']
    }),
    FirebaseModule,
    AppLoggerModule,
    UserModule,
    FormModule,
    QuestionModule,
    GradeModule,
    ResponseModule,
    AnswerModule,
    AttachmentModule,
    RecommendationModule,
    ForumModule,
    ForumAnswerModule,
    CommentModule,
    FormCategoryModule,
    HelpModule,
    HelpStepModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/graphql')
  }
}

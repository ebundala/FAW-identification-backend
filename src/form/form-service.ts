import { Injectable } from '@nestjs/common';
import { PrismaClient,  } from '@prisma/client';
import { Form,State, FormUpdateInput,FormCreateInput, FormResult } from 'src/models/graphql';

@Injectable()
export class FormService {
    constructor(private readonly prisma: PrismaClient){}
    async createForm(data: FormCreateInput,uid: string): Promise<any|FormResult>{
        
        const form =  await this.prisma.form.create({
           data:{
               title:data.title,
               description:data.description,
               state: data.state || State.PENDING,
               author:{
                   connect:{id:uid}
               }
           },
           select:{
               id: true,
               title:true,
               description:true,
               author:true,
               state: true,
             //  responses: true,
             //  attachments: true,
              // questions: true

           }
       });

        return {
            status: true,
            message: 'Form created successfully',
            form
        
        }
    }
    async updateForm(data:FormUpdateInput):Promise<FormResult>{
        return
    }

    async deleteForm():Promise<FormResult>{
        return
    }
    async getForms(): Promise<Form[]>{
        return
    }
}

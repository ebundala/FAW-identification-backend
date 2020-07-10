import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AttachmentUpdateInput, AttachmentWhereUniqueInput, AttachmentResult } from 'src/models/graphql';
import { createWriteStream, ReadStream } from 'fs';
import {join} from 'path';
import { v4 as uuidv4} from 'uuid';
import { FileUpload } from 'graphql-upload';
import { AppLogger } from '../app-logger/app-logger.module';
import fs from 'fs';
@Injectable()
export class AttachmentService {
    constructor(private readonly prisma: PrismaClient,
        private readonly logger: AppLogger){}
   async deleteAttachment(where: AttachmentWhereUniqueInput, uid: String): Promise<AttachmentResult> {
        return this.prisma.attachment.delete({
            where: where,
        }).then((attachment) => {
            return {
                status: true,
                message: 'Attachment deleted successfully',
                attachment
            }
        }).catch(({ message }) => {
            return {
                status: false,
                message: message || 'Failed to delete the attachment'
            }
        })
    }
  async  updateAttachment(data: AttachmentUpdateInput, uid: String): Promise<AttachmentResult> {
        return this.prisma.attachment.update({
            where: data.where,
            data: data.update,
        })
            .then((attachment) => {
                return {
                    status: true,
                    message: 'Attachment updated successfully',
                    attachment
                }
            })
            .catch(({ message }) => {
                return {
                    status: false,
                    message: message || 'Failed to update attachment'
                }
            });
    }
    writeStreamToFile = (rs, pth) => new Promise((resolve, reject) => {
        const ws = fs.createWriteStream(pth);
        rs.on('error', reject);
        ws.on('error', reject);
        ws.on('finish', ()=>resolve(pth));
        rs.pipe(ws);
      });
   async createAttachment(file: FileUpload, uid: String): Promise<any> {
    const {
        createReadStream,
        filename, mimetype, encoding,
    } = await file;
    debugger
        const stream = createReadStream()
         const uuid = uuidv4();
         const [img,ext] = mimetype.split("/"); 
         const fname= `${uuid}${filename}.${ext!=="octet-stream"?ext:"png"}`;
        const p = join(__dirname,'../../../uploads',fname)
        this.logger.debug(p,AttachmentService.name);
        const options={
            encoding: encoding as BufferEncoding,
        }
    return this.writeStreamToFile(stream,p)
    .then((p: string) => {
         return this.prisma.attachment.create({
            data: {
                path: `/uploads/${fname}`,
                filename: fname,
                mimetype: mimetype,
                encoding: encoding
            }
        }).then(
            (file)=>{
                return {
                    status: true,
                    message: 'Attachment created successfully',
                    file
                } 
            }
        );
    }).catch(
        ({message})=>{
            return{
                status:false,
                message: message||"Unknown error failed to upload file"
            }
        }
    );
    }
    
}

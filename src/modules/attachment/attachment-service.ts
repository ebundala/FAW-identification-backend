import { Injectable } from '@nestjs/common';
import { PrismaClient, AttachmentType } from '@prisma/client';
import { AttachmentUpdateInput, AttachmentWhereUniqueInput, AttachmentResult } from 'src/models/graphql';
import { createWriteStream, ReadStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from 'graphql-upload';
import { AppLogger } from '../app-logger/app-logger.module';
import fs from 'fs';
import * as mime from 'mime-types';
import {getAudioDurationInSeconds} from 'get-audio-duration';
@Injectable()
export class AttachmentService {
    constructor(private readonly prisma: PrismaClient,
        private readonly logger: AppLogger) { }
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
    async updateAttachment(data: AttachmentUpdateInput, uid: String): Promise<AttachmentResult> {
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
        ws.on('finish', () => resolve(pth));
        rs.pipe(ws);
    });
    async createAttachment(file: FileUpload, uid: String): Promise<any> {
        const {
            createReadStream,
            filename, mimetype, encoding,
        } = await file;

        const stream = createReadStream()
        let duration = 0
        const size = stream.readableLength
        const uuid = uuidv4();
        let [type, subtype] = mimetype.split("/");
        let ext = mime.extension(mimetype);
        
        if (ext === "bin" || ext === false || ext === 'mpga') {
            switch (type) {
                case "image":
                    ext = "png"
                    break;
                case "video":
                    ext = "mp4"
                    break;
                case "audio":
                    ext = "mp3"
                    break;
                case "text":
                    ext = "txt"
                    break;
                default:
                    ext = "bin";
                    break;
            }
        }
       let t: AttachmentType;
        switch (type) {

            case "text":
                t = AttachmentType.DOCUMENT
                break;
            case "audio":
                t = AttachmentType.AUDIO
                break;
            case "video":
                t = AttachmentType.VIDEO
                break;
            case "image":
            default:
                t = AttachmentType.IMAGE
                break;
        }
        const fname = `${uuid}${filename}.${ext}`;
        const p = join(__dirname, '../../../public/uploads', fname)
        this.logger.debug(p, AttachmentService.name);
        const options = {
            encoding: encoding as BufferEncoding,
        }
        return this.writeStreamToFile(stream, p)
            .then(async (p: string) => {
                if(type === 'audio'){                    
                    duration  = await getAudioDurationInSeconds(p);
                  }

                return this.prisma.attachment.create({
                    data: {
                        path: `/uploads/${fname}`,
                        filename: fname,
                        mimetype: mimetype,
                        encoding: encoding,
                        type:t,
                        duration: Math.ceil(duration*1000),
                        size: size
                    }
                }).then(
                    (file) => {
                        return {
                            status: true,
                            message: 'Attachment created successfully',
                            file
                        }
                    }
                );
            }).catch(
                ({ message }) => {
                    return {
                        status: false,
                        message: message || "Unknown error failed to upload file"
                    }
                }
            );
    }

}

import { Injectable } from '@nestjs/common';
import { PrismaClient, AttachmentType } from '@prisma/client';
import { AttachmentUpdateInput, AttachmentWhereUniqueInput, AttachmentResult, AttachmentMetadata } from 'src/models/graphql';
import { createWriteStream, ReadStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from 'graphql-upload';
import { AppLogger } from '../app-logger/app-logger.module';
import fs from 'fs';
import * as mime from 'mime-types';
import { getAudioDurationInSeconds } from 'get-audio-duration';
import sharp from 'sharp';
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
    resizer(){
        return sharp()
        .resize({
            width: 480,
            height: 480,
            fit: sharp.fit.cover,
            position: sharp.strategy.entropy
        }).webp();
    }
    writeStreamToFile = (rs, path, type: AttachmentType) => new Promise((resolve, reject) => {
        const ws = fs.createWriteStream(path);
        rs.on('error', reject);
        ws.on('error', reject);
        ws.on('finish', () => {
           const size= ws.bytesWritten;
           ws.close();
            resolve({path,size});});
        if (type == AttachmentType.IMAGE) {
            rs.pipe(this.resizer()).pipe(ws);
        } else {
            rs.pipe(ws);
        }
    });
    async createAttachment(file: FileUpload, metadata: AttachmentMetadata, uid: String): Promise<any> {
        const {
            createReadStream,
            filename, mimetype, encoding,
        } = await file;

        const stream = createReadStream()

        const uuid = uuidv4();
        let [type, subtype] = mimetype.split("/");
        let ext = mime.extension(mimetype);

        if (ext === "bin" || ext === false || ext === 'mpga' || type == 'image') {
            switch (type) {
                case "image":
                    ext = "webp"
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
        const fname = `${uuid}.${ext}`;
        const p = join(__dirname, '../../../public/uploads', fname)
        this.logger.debug(p, AttachmentService.name);
        const options = {
            encoding: encoding as BufferEncoding,
        }
        return this.writeStreamToFile(stream, p, t)
            .then(async (r:{path: string,size: number}) => {
                let duration = 0
                let size=r.size||0;
                    if (metadata) {
                        size = size || metadata.size;
                    }
                if (t === AttachmentType.AUDIO) {
                    
                    if (metadata && !metadata.duration) {
                        duration = await getAudioDurationInSeconds(p);
                    } else if (metadata && metadata.duration) {
                        duration = metadata.duration;
                    } else {
                        duration = 0;
                    }
                }

                return this.prisma.attachment.create({
                    data: {
                        path: `/uploads/${fname}`,
                        filename: fname,
                        mimetype: mimetype,
                        encoding: encoding,
                        attachmentType: t,
                        duration: Math.ceil(duration * 1000),
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

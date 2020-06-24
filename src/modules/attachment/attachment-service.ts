import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AttachmentUpdateInput, AttachmentWhereUniqueInput, AttachmentResult } from 'src/models/graphql';
import { createWriteStream, ReadStream } from 'fs';

@Injectable()
export class AttachmentService {
    constructor(private readonly prisma: PrismaClient){}
    deleteAttachment(where: AttachmentWhereUniqueInput, uid: String): Promise<AttachmentResult> {
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
    updateAttachment(data: AttachmentUpdateInput, uid: String): Promise<AttachmentResult> {
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
   async createAttachment(createReadStream: () => ReadStream, filename: string, uid: String): Promise<AttachmentResult> {
        throw new Error("Method not implemented.");
        /* const attachment = await this.prisma.attachment.create({
            data: {
                path: data.p,
                description:data.description,
                max: data.max,
                min: data.min,
                maxInclusive:data.maxInclusive,
                minInclusive: data.minInclusive,
                form:{
                    connect:{
                        id:data.form.id
                    }
                }
            },
            include: {
                attachments: true,
                recommendations:true,
                form:true
            }
        });

        return {
            status: true,
            message: 'Attachment created successfully',
            attachment

        } */
    }
    
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Prisma.AuthorCreateInput) {
    const authors = await this.prisma.author.findMany();
    if (authors.length > 0) {
      const lastAuthor = authors.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
      })[authors.length - 1];
      const id = parseInt(lastAuthor.id) + 1;

      const newAuthor = await this.prisma.author.create({
        data: {
          id: id.toString(),
          ...data,
        },
      });
      return newAuthor;
    } else {
      const newAuthor = await this.prisma.author.create({
        data: {
          id: '1',
          ...data,
        },
      });
      return newAuthor;
    }
  }

  findAll() {
    return this.prisma.author.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}

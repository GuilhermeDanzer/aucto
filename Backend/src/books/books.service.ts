import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.BookCreateInput) {
    const books = await this.prisma.book.findMany();

    if (books.length > 0) {
      const lastBook = books.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
      })[books.length - 1];
      const id = parseInt(lastBook.id) + 1;
      const newBook = await this.prisma.book.create({
        data: {
          id: id.toString(),
          ...data,
        },
      });
      return newBook;
    } else {
      const newBook = await this.prisma.book.create({
        data: {
          id: '1',
          ...data,
        },
      });
      return newBook;
    }
  }

  findAll() {
    return this.prisma.book.findMany({ include: { author: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}

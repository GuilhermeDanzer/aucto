import { authors } from './seeds/authors';
import { books } from './seeds/books';

import { PrismaClient } from '@prisma/client';
import e from 'express';

const prisma = new PrismaClient();

async function main() {
  for (let author of authors) {
    //@ts-ignore
    await prisma.author.create({ data: author });
  }
  for (let book of books) {
    //@ts-ignore
    await prisma.book.create({ data: book });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

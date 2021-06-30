import {Book} from '../interfaces/book';

export const booksMock: Book[] = [
  {
    id: '100',
    title: 'Head First Design Patterns',
    authors: 'Eric Freeman & Bert Bates & Kathy Sierra',
    publisher: 'O\'REILY',
    publishDate: '2004-10-20',
    description: 'This edition of Head First Design Patterns—now updated for Java 8—shows you the tried-and-true, road-tested patterns used by developers to create functional, elegant, reusable, and flexible software',
    averageRating: '4.5',
    totalPages: 679,
    price: 1150.00
  },
  {
    id: '101',
    title: 'Secrets of the JavaScript Ninja',
    authors: 'John Resig & Bear Bibeault',
    publisher: 'Manning Publications',
    publishDate: '2016-08-15',
    description: 'More than ever, the web is a universal platform for all types of applications, and JavaScript is the language of the web',
    averageRating: '4.2',
    totalPages: 550,
    price: 950.00
  }
];

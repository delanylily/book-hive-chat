export class Book {
  id: string;
  title;
  author?;
  subtitle?;
  description?;
  image;
  availability?;
  userId?;

  constructor(book: any) {
    this.title = book.title;
    this.author = book?.authors[0];
    this.subtitle = book?.subtitle;
    this.description = book?.description;
    this.image = book.imageLinks.thumbnail;
    this.userId = book.userId;
    this.availability = book?.availability;
  }
}

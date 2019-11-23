package lab09a;
 /**
  * Simulates a library by defining limited space of books and methods
  * to interact with those.
  * 
  * @author Acarturk
  * @version 14.12.2017
  */

import java.util.ArrayList;

public class Library {

  private ArrayList<LibraryBook> books;
  
  /**
   * Empty constructor initiating the ArrayList books.
   */
  public Library() {

    books = new ArrayList<>();

  }
  
  /**
   * Checks if the library is empty or not
   * 
   * @return Is library empty?
   */
  public boolean isEmpty() {
//    return books.isEmpty();
    return books.size() == 0;
  }
  
  /**
   * Overwrites the Object.toString() method
   */
  public String toString() {

    if( isEmpty() ) 
      return "Library is empty!";
    
    String ans;
    ans = "";
    
    for( LibraryBook book : books )
      ans += "Author: " + book.getAuthor() +
             ", title: " + book.getTitle() + "\n";
    
    return ans;

  }
  
  /**
   * Adds a new book (to the smallest index) to the library.
   * Returns false if the book cannot be added, i.e. library is full.
   * (Return value deprecated.)
   * 
   * @param title
   * @param author
   * @return Is there space in the library?
   */
  public boolean add( String title, String author ) {

    books.add( new LibraryBook( title, author ) );
    return true;
    
  }

  /**
   * Removes a certain LibraryBook element, if there is, from the library.
   * If not, returns false.
   * 
   * @param book
   * @return There is a such book in the library.
   */
  public boolean remove( LibraryBook book ) {

    int i = books.indexOf( book );
    if( i == -1 )
      return false;
    return true;

  }
  
  /**
   * Finds and returns a LibraryBook object specified by its
   * title. If there is no such object, returns null.
   * 
   * @param title
   * @return Sought-by-its-title LibraryBook
   */
  public LibraryBook findByTitle( String title ) {

    for( LibraryBook book : books )
      if( book.hasSameTitle(book) )
        return book;
    
    return null;

  }
}

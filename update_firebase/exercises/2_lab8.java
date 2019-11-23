package lab08;

import java.util.Scanner;

/**
 * Tests the planned library, the Library class with a non-graphical UI.
 * 
 * @author Acarturk
 * @version 07.12.2017
 */
public class LibraryTest {

  /**
   * Prints out the main interactions dialog.
   */
  private static void ui() {
    
    System.out.println("\n * * * * * * * * * * * * * * * * * * * * * *"
                     + "\n                MAIN MENU"
                     + "\n"
                     + "\n   To operate, please enter following"
                     + "\n  commands:"
                     + "\n"
                     + "\n  Find and select a book : find TITLE"
                     + "\n  Show the current book  : show"
                     + "\n  Add a book             : add TITLE AUTHOR"
                     + "\n  Exit                   : exit"
                     + "\n"
                     + "\n * * * * * * * * * * * * * * * * * * * * * *");
    
  }

  /**
   * Prints out the book-specific interactions dialog.
   */
  private static void bookUI() {
    
    System.out.println("\n * * * * * * * * * * * * * * * * * * * * * *"
                     + "\n             BOOK OPERATIONS"
                     + "\n"
                     + "\n   To operate, please enter following"
                     + "\n  commands:"
                     + "\n"
                     + "\n  Loan the book          : loan DUE_DATE"
                     + "\n  Return the book        : return"
                     + "\n  Remove this book       : remove"
                     + "\n  Return to the menu     : menu"
                     + "\n"
                     + "\n * * * * * * * * * * * * * * * * * * * * * *");
    
  }
  
  public static void main(String[] args) {

    // Variables
    Scanner in = new Scanner( System.in );
    Library library;
    LibraryBook book;
    String next;
    boolean moveOn;
    
    // Initializations
    library = new Library();
    moveOn = true;
    book = null; // Told to be initially null.
    
    // The program code, denoted by a while loop:
    while( moveOn ) {
      // Prompting
      ui();
      // Input
      next = in.next();
      // Case 1: Finding a book from the library
      if( next.equals( "find" ) ) {
        // Returns null if DNE, otherwise the book w/ given title
        book = library.findByTitle( in.next() );
        if( book == null ) {
          System.out.println( "There is no such book!\n" );
        } else {
          // Book-specific interface / while-loop
          boolean bookGoOn = true;
          while( bookGoOn ) {
            // Prompting again for book interface
            bookUI();
            // New input
            String operation = in.next();
            // Case 1.a: Loaning the book
            if( operation.equals( "loan" ) ) {
              book.loanBook( in.next() );
            }
            // Case 1.b: Returning the book
            else if( operation.equals( "return" ) ) {
              book.returnBook();
            }
            // Case 1.c: Removing the book from the library
            else if( operation.equals( "remove" ) ) {
              library.remove(book); // Removing from the library
              book = null; // Deleting from this thread as well
              bookGoOn = false; // Exit the book's loop as well (the book no longer exists.)
            }
            // Case 1.d: Returning back to the main menu (exits the book's loop)
            else if( operation.equals( "menu" ) ) {
              bookGoOn = false;
            }
          }
        }
      }
      // Case 2: Showing data
      else if( next.equals( "show" ) ) {
        if( book == null )
          System.out.println( "There is no book selected!" );
        else
          System.out.println( book.toString() );
      }
      // Case 3: Adding a new book
      else if( next.equals( "add" ) ) {
        library.add(in.next(), in.next());
      }
      // Case 4: Exit statement
      else if( next.equals( "exit" ) ) {
        moveOn = false;
      }
      // Default: re-prompt (until valid input is given)
    }
    in.close();
  }
}


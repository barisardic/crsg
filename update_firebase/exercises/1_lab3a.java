package lab03a;

import java.util.*;

/**
 * Lab assg. 3b. Getting to know about decision making and loops.
 * @author Emre Acarturk 
 * @version 16.10.2017
 */ 

public class Lab03a {

    public static void main(String[] args) {

        // Declaration of variables.
        Scanner in = new Scanner( System.in );
        int n;
        int evens;
        int odds;
        int sum;
        int sumWithFormula;

        // Instantiations.
        evens = 0;
        odds = 0;
        sum = 0;
        sumWithFormula = 0;

        // Getting user input.
        System.out.print( "Enter 'n'  s.t. 'sum' is the sum of values x between 1 and n inclusive: " );
        try {
            n = in.nextInt();
            in.close();
            System.out.println();

            // Loop to go through values form 0 to 50 inclusive.
            for( int x = 0 ; x <= 50 ; x++ ) {

                // If a number isn't in an inclusive interval, it's exclusively outside.
                if( x < 12 || x > 25 ) {
                    System.out.print( x + " is out of range 12-25. " );
                } else;

                // A way to count how many odd and even numbers there are.
                if( x % 2 == 0 ) evens++;
                else odds++;

                // The expected series of decisions, with given order.
                if( x%5 == 0 ) {
                    System.out.println( "Hi Five" );
                } else if( x % 2 == 0 ) {
                    System.out.println( "Hi Two" );
                } else if( x % 3 == 0 || x % 7 == 0 ) {
                    System.out.println( "Hi ThreeOrSeven" );
                } else {
                    System.out.println( "Hi Others!" );
                }
                System.out.println();

                // The way we are expected to make sum without formula; used += for simplicity.
                if( x >= 1 && x <= n ) {
                    sum += x;
                }

            }

            // The way we are expected to make sum with the formula.
            // Because of the fact that upper multiplication is always divisible by 2, I didn't made 'sumWithFormula' double.
            sumWithFormula = n*(n+1)/2;

            // Giving output. Ternary is to simplify, and eliminate, an if statement by which would've lengthen the code.
            System.out.println( "There were " + odds + " odd and " + evens + " even numbers." );
            System.out.println( "The sum to n, " + sum + ", and sum from the formula, " +
                                sumWithFormula + ", are " + ( sum == sumWithFormula ? "" : "not " ) +
                                "consistent." );
        }

        catch( Exception e ) { System.out.println("Y U do dis?"); };

    }

}
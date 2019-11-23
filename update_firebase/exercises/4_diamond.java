/* 
author: Doren
functionality: prints diamond of a number
date: 12.11.2019
*/

public class HelloWorld{
    
    /**
     * This method prints the diamond of a number. 
     * For example, the diamond of 5 would be:
          3  
         2 2 
        1   1
         2 2 
          3  
     * @param number of the diamond 0 < number < 10
     * @return null - we are printing
    */
    public static double createDiamond( int number)
    {
        // what is the length and width of diamond
        int size; 
        int first_space; 
        int second_space;
        int k;  // which number is to be printed next
         
        size = number * 2 - 1;
        first_space = "";
        second_space = "";
        
        // for each of the lines to be printed
        for( int i=0; i < size; i++){
            
            // create space before printing the number
            first_space = (number-i-1)% number;
            if (first_space < 0){
                first_space = - first_space;
            }
            for (int sp = 0; sp < first_space ; sp++) System.out.print(" ");
                
            /*
            Decides on which number to print. For example, for number =4
            print: 4 3 2 1 2 3 4
            index: 0 1 2 3 4 5 6
            */
            k = 0;
            if ( i == 0){ 
                // if first one, print 4
                k = number;
            }
            else if( i < number){  
                // if i in decreasing from top of diamond
                k = number-i;
            } 
            else{  
                // after the biggest horizontal width has passed
                // index -> print , 4-4+2-> 2, 5-4+2->3
                k = i - number + 2; // add error here
            }
    
            // print the number
            System.out.print(k);
            
            // if you are not in vertical edges, print twice, 
            // including space in the middle
            if ( k != number){
                second_space = size-(first_space*2)-2;
                for (int sp = 0; sp < second_space ; sp++) System.out.print(" ");
                System.out.print(k);
            }
            
                // go to next line
                System.out.println();
        }
        return 0;
       
    }

    public static void main(String []args){
        createDiamond(5);
    }
}
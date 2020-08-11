var level1Code = `// Class Declaration
public class Factorial {
    
    public static int factorial(int number) {
        
        int result = 1;
        
        while(number >= 0) {
            result *= number;
            number--;
        }
        
        return result;
    }

    public static void main(String[] args) {
        int five = 4;


        //Tests
        System.out.println(factorial(5) == 120);
        System.out.println(factorial(0) == 1);
        System.out.println(0);
        System.out.println(five == 5);
        System.out.println(1);
    }
}`;
var level1Solution = `// Class Declaration
public class Factorial {
    
    public static int factorial(int number) {
        
        int result = 1;
        
        while(number > 0) {
            result *= number;
            number--;
        }
        
        return result;
    }

    public static void main(String[] args) {
        
        //Tests
        System.out.println(0);
        System.out.println(factorial(5) == 120);
        System.out.println(factorial(0) == 1);
    }
}`;
import {CodeError} from '/codeError.js';

var levelDatas = [];



// Level 1 Data
let level1Data = {};

let level1ErrorDatas = [];
level1ErrorDatas.push(new CodeError([11,42], "Classes cannot have classes inside them.", false, "Inner classes don't exist!",
"This error wasn't real."));

level1ErrorDatas.push(new CodeError([60,69], "Adding multiple persons with the same ID shouldn't be possible", true,
"Check whether or not ID already exists.",
"We should return false when a new person's ID is equal to a previously added one."));

level1ErrorDatas.push(new CodeError([94, 107], "Returns null most of the time instead of name.", true,"Check returns carefully",
"We should put return in front of the recursive method calls to be able to use the results."));

level1Data.errorDatas = level1ErrorDatas;

level1Data.code = `/**
* Add and retrieve people to the system.
* People are saved in a binary tree.
*/
public class Main {
    Node root;
    
    /**
    * Each node represents a person.
    */
    private class Node {
        int id;
        String name;
        Node leftChild;
        Node rightChild;
        
        /**
        * Node constructor
        * @param id used to retrieve people.
        * @param name people's name
        */
        Node(int id, String name) {
            this.id = id;
            this.name = name;
        }
        
        /**
        * Used to get ID
        * @return Id of a node.
        */
        int getId() {
            return id;
        }
        
        /**
        * Used to get name.
        * @return name of the person
        */
        String getName() {
            return name;
        }
    }
    
    /**
    * Adds a person to the system (binary tree)
    * @param id Used to add and retrieve people.
    *           Ids cannot be identical.
    * @param name Name of the added person.
    * @return is the operation successful.
    */
    public boolean addPerson(int id, String name) {
        if (root == null) {
            root = new Node(id, name);
            return true;
        }
        
        Node currentNode = root;
        Node previousNode = root;
        
        while (currentNode != null) {
            previousNode = currentNode;
            
            if (id < currentNode.getId()) {
                currentNode = currentNode.leftChild;
            }
            else {
                currentNode = currentNode.rightChild;
            }
        }
        if (id < previousNode.getId()) {
            previousNode.leftChild = new Node(id, name);
        }
        else {
            previousNode.rightChild = new Node(id, name);
        }
        return true;
    }
    
    /**
    * Finds names by ID.
    * @param id Id of the queried person.
    * @return person's name.
    */
    public String findNameById(int id) {
        return findNameAuxiliary(id, root);
    }
    
    /**
    * Returns the name of queried ID recursively.
    * @param id Id of the queried person.
    * @param node Searched node.
    * @return Person's name.
    */
    public String findNameAuxiliary(int id, Node node) {
        if (node == null) {
            return null;
        }
        if (id == node.getId()) {
            return node.getName();
        }
        else if (id < node.getId()) {
            findNameAuxiliary(id, node.leftChild);
        }
        else {
            findNameAuxiliary(id, node.rightChild);
        }
        return null;
    }
}`;

level1Data.test = `public static void main(String[] args) {
    Main sr = new Main();
    System.out.println(sr.addPerson(20, "A"));
    System.out.println(sr.addPerson(40, "B"));
    System.out.println(!sr.addPerson(40, "C"));
    System.out.println(sr.addPerson(49, "D"));
    System.out.println(sr.addPerson(15, "R"));
    System.out.println(!sr.addPerson(20, "R"));
    System.out.println("1");
    System.out.println(sr.findNameTest(20, "A", sr));
    System.out.println(sr.findNameTest(40, "B", sr));
    System.out.println(sr.findNameTest(15, "R", sr));
    System.out.println(sr.findNameTest(49, "D", sr));
    System.out.println("2");

}
public static boolean findNameTest(int id, String expected, Main sr) {
    if(sr.findNameById(id) == null) {
        return false;
    }
    else {
        return  sr.findNameById(id).equals( expected);
    }
}`

level1Data.solutionHighlights = [[63,65],[104,109]];

level1Data.solution = `/**
* Add and retrieve people to the system.
* People are saved in a binary tree.
*/
public class Main {
    Node root;
    
    /**
    * Each node represents a person.
    */
    private class Node {
        int id;
        String name;
        Node leftChild;
        Node rightChild;
        
        /**
        * Node constructor
        * @param id used to retrieve people.
        * @param name people's name
        */
        Node(int id, String name) {
            this.id = id;
            this.name = name;
        }
        
        /**
        * Used to get ID
        * @return Id of a node.
        */
        int getId() {
            return id;
        }
        
        /**
        * Used to get name.
        * @return name of the person
        */
        String getName() {
            return name;
        }
    }
    
    /**
    * Adds a person to the system (binary tree)
    * @param id Used to add and retrieve people.
    *           Ids cannot be identical.
    * @param name Name of the added person.
    * @return is the operation successful.
    */
    public boolean addPerson(int id, String name) {
        if (root == null) {
            root = new Node(id, name);
            return true;
        }
        
        Node currentNode = root;
        Node previousNode = root;
        
        while (currentNode != null) {
            previousNode = currentNode;
            
            if (id == currentNode.getId()) {
                return false;
            }
            else if (id < currentNode.getId()) {
                currentNode = currentNode.leftChild;
            }
            else {
                currentNode = currentNode.rightChild;
            }
        }
        if (id < previousNode.getId()) {
            previousNode.leftChild = new Node(id, name);
        }
        else {
            previousNode.rightChild = new Node(id, name);
        }
        return true;
    }
    
    /**
    * Finds names by ID.
    * @param id Id of the queried person.
    * @return person's name.
    */
    public String findNameById(int id) {
        return findNameAuxiliary(id, root);
    }
    
    /**
    * Returns the name of queried ID recursively.
    * @param id Id of the queried person.
    * @param node Searched node.
    * @return Person's name.
    */
    public String findNameAuxiliary(int id, Node node) {
        if (node == null) {
            return null;
        }
        if (id == node.getId()) {
            return node.getName();
        }
        else if (id < node.getId()) {
            return findNameAuxiliary(id, node.leftChild);
        }
        else {
            return findNameAuxiliary(id, node.rightChild);
        }
    }
}`;

levelDatas.push( level1Data);

// **
// Level 2 Data
// **
let level2Data = {};

let level2ErrorDatas = [];
level2ErrorDatas.push(new CodeError([61,61], "You are only changing the top index. You aren't actually removing the number from the stack.",
 false, "Is removing the number from the memory really required?", "This error wasn't real."));

level2ErrorDatas.push(new CodeError([81,87], "Data is lost when resizing.",
true, "Are numbers automatically copied to a new arrary?",
"You have to copy the values from the old stack to the new one. Otherwise, the resized array will be empty."));

level2ErrorDatas.push(new CodeError([111,113], "The stack doesn't become completely empty.",
true, "Check how pop and push works.",
"Pop uses the current top index to return a result and then decrements the top by one. Therefore, when top is set to 0, it is not completely empty, it has one element."));

level2Data.errorDatas = level2ErrorDatas;

level2Data.code = `public class Main {

    /**
     * An auto resizing Stack implemented with an Array
     */
    static public class StackArray {

        /**
         * The max size of the Stack
         */
        private int maxSize;

        /**
         * The array representation of the Stack
         */
        private int[] stackArray;

        /**
         * The top of the stack
         */
        private int top;

        /**
         * Constructor
         *
         * @param size Size of the Stack
         */
        public StackArray(int size) {
            maxSize = size;
            stackArray = new int[maxSize];
            top = -1;
        }

        /**
         * Adds an element to the top of the stack
         *
         * @param value The element added
         */
        public void push(int value) {
            if (!isFull()) { // Checks for a full stack
                top++;
                stackArray[top] = value;
            } else {
                resize(maxSize * 2);
                push(value); // don't forget push after resizing
            }
        }

        /**
         * Removes the top element of the stack and returns the value you've removed
         *
         * @return value popped off the Stack
         */
        
        public int pop() {
            if (!isEmpty()) { // Checks for an empty stack
                if (top < maxSize / 4) {
                    resize(maxSize / 2);
                    return pop();// don't forget pop after resizing
                }
                return stackArray[top--];
            }
             else {
                return -1;
            }
        }

        /**
         * Returns the element at the top of the stack
         *
         * @return element at the top of the stack
         */
        public int peek() {
            if (!isEmpty()) { // Checks for an empty stack
                return stackArray[top];
            } else {
                return -1;
            }
        }

        private void resize(int newSize) {
            int[] transferArray = new int[newSize];

            // This reference change might be nice in here
            stackArray = transferArray;
            maxSize = newSize;
        }

        /**
         * Returns true if the stack is empty
         *
         * @return true if the stack is empty
         */
        public boolean isEmpty() {
            return (top == -1);
        }

        /**
         * Returns true if the stack is full
         *
         * @return true if the stack is full
         */
        public boolean isFull() {
            return (top + 1 == maxSize);
        }

        /**
         * Deletes everything in the Stack
         */

        public void makeEmpty() {
            top = 0;
        }
    }
}`;

level2Data.test = `public static void main(String[] args) {
    // Declare a stack of maximum size 4
    StackArray myStackArray = new StackArray(10);

    // Populate the stack
    myStackArray.push(1);
    myStackArray.push(2);
    myStackArray.push(3);
    myStackArray.push(4);
    myStackArray.push(5);
    myStackArray.push(6);
    myStackArray.push(7);
    myStackArray.push(8);
    myStackArray.push(9);
    myStackArray.push(10);

    System.out.println(myStackArray.pop() == 10);
    System.out.println(myStackArray.pop() == 9);
    System.out.println(myStackArray.pop() == 8);
    System.out.println(myStackArray.pop() == 7);
    System.out.println(myStackArray.pop() == 6);
    System.out.println(myStackArray.pop() == 5);
    System.out.println(myStackArray.pop() == 4);
    System.out.println(myStackArray.pop() == 3);
    System.out.println(myStackArray.pop() == 2);
    System.out.println(myStackArray.pop() == 1);
    System.out.println("1");
    myStackArray.push(4);
    myStackArray.push(9);
    System.out.println(myStackArray.peek() == 9);
    myStackArray.makeEmpty();
    System.out.println(myStackArray.peek() == -1);
    System.out.println("2");

}`

level2Data.solutionHighlights = [[86,88],[117,117]];

level2Data.solution = `package base;

public class Main {

    /**
     * An auto resizing Stack implemented with an Array
     */
    static public class StackArray {

        /**
         * The max size of the Stack
         */
        private int maxSize;

        /**
         * The array representation of the Stack
         */
        private int[] stackArray;

        /**
         * The top of the stack
         */
        private int top;

        /**
         * Constructor
         *
         * @param size Size of the Stack
         */
        public StackArray(int size) {
            maxSize = size;
            stackArray = new int[maxSize];
            top = -1;
        }

        /**
         * Adds an element to the top of the stack
         *
         * @param value The element added
         */
        public void push(int value) {
            if (!isFull()) { // Checks for a full stack
                top++;
                stackArray[top] = value;
            } else {
                resize(maxSize * 2);
                push(value); // don't forget push after resizing
            }
        }

        /**
         * Removes the top element of the stack and returns the value you've removed
         *
         * @return value popped off the Stack
         */

        public int pop() {
            if (!isEmpty()) { // Checks for an empty stack
                if (top < maxSize / 4) {
                    resize(maxSize / 2);
                    return pop();// don't forget pop after resizing
                }
                return stackArray[top--];
            }
             else {
                return -1;
            }
        }

        /**
         * Returns the element at the top of the stack
         *
         * @return element at the top of the stack
         */
        public int peek() {
            if (!isEmpty()) { // Checks for an empty stack
                return stackArray[top];
            } else {
                return -1;
            }
        }

        private void resize(int newSize) {
            int[] transferArray = new int[newSize];

            for (int i = 0; i < transferArray.length; i++) {
                transferArray[i] = stackArray[i];
            }
            // This reference change might be nice in here
            stackArray = transferArray;
            maxSize = newSize;
        }

        /**
         * Returns true if the stack is empty
         *
         * @return true if the stack is empty
         */
        public boolean isEmpty() {
            return (top == -1);
        }

        /**
         * Returns true if the stack is full
         *
         * @return true if the stack is full
         */
        public boolean isFull() {
            return (top + 1 == maxSize);
        }

        /**
         * Deletes everything in the Stack
         */

        public void makeEmpty() {
            top = -1;
        }
    }
}`;

levelDatas.push( level2Data);

// export { levelDatas };

export default levelDatas;
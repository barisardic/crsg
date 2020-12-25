import {CodeError} from '/codeError.js';

/**
 * Stores all the levels' datas. (Codes, solutions, review comments etc.) as a list of leveldata object.
 */
var levelDatas = [];

/**
 * Level 1's Data (Contains error datas and level codes.)
 */
let level1Data = {};

/**
 * Level 1's Error Datas (CodeErrors)
 */
let level1ErrorDatas = [];
level1ErrorDatas.push(new CodeError([11,42], "Classes cannot have classes inside them.", false, "Do inner classes exist in Java?",
"This review comment was a false positive."));

level1ErrorDatas.push(new CodeError([60,69], "Adding multiple persons with the same ID shouldn't be possible", true,
"Check whether or not ID already exists in the node.",
"We should return false when a new person's ID is equal to a previously added one."));

level1ErrorDatas.push(new CodeError([94, 107], "Returns null most of the time instead of name.", true,"Check returns carefully",
"We should put return in front of the recursive method calls to be able to use the results."));

level1Data.errorDatas = level1ErrorDatas;

level1Data.code = `/**
* Add and retrieve people to the system.
* People are saved in a binary tree.
*/
class IDPersonTree {
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

level1Data.test = `public class Main {

    public static void main(String[] args) {
        IDPersonTree sr = new IDPersonTree();
        System.out.println(sr.addPerson(20, "A"));
        System.out.println(sr.addPerson(40, "B"));
        System.out.println(!sr.addPerson(40, "C"));
        System.out.println(sr.addPerson(49, "D"));
        System.out.println(sr.addPerson(15, "R"));
        System.out.println(!sr.addPerson(20, "R"));
        System.out.println("1");
        System.out.println(findNameTest(20, "A", sr));
        System.out.println(findNameTest(40, "B", sr));
        System.out.println(findNameTest(15, "R", sr));
        System.out.println(findNameTest(49, "D", sr));
        System.out.println("2");

    }
    public static boolean findNameTest(int id, String expected, IDPersonTree sr) {
        if(sr.findNameById(id) == null) {
            return false;
        }
        else {
            return  sr.findNameById(id).equals( expected);
        }
    }
}`

level1Data.solutionHighlights = [[63,65],[104,109]];

level1Data.solution = `/**
* Add and retrieve people to the system.
* People are saved in a binary tree.
*/
class IDPersonTree {
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
let level2Data = {
    errorDatas: [
        new CodeError([56,62], "This crashes when the stack is empty.",
            true, "Check if empty.", "Check if the stack is empty and if it is not empty, you should return -1."),
        new CodeError([81,87], "Data is lost when resizing.",
            true, "Are numbers automatically copied to a new arrary?",
            "You have to copy the values from the old stack to the new one. Otherwise, the resized array will be empty."),
        new CodeError([108,110], "You are only changing the top index. You aren't actually removing aything from the stack. This won't work.",
            false, "How does removing work in computers?", "This review comment was a false positive. When you change the top index to -1. Push will overwrite the old values."),
        new CodeError([115,121], "This function doesn't work properly when the stack is not full.",
            true, "What does stackArray's length really represent?",
            "We should use top to iterate instead of array's length represents the maximum length of the stack."),
    ],

    solutionHighlights: [[57,66],[89,92],[127,129]],

    code: `/**
* An auto resizing Stack implemented with an Array
* The stack is used to store nonnegative integers.
* It's size doubles when we try to push when it is full and
* shrikns to half when less than 1/4 th. of the array is used.
*/
class StackArray {
    
    /**
    * The max size of the Stack
    */
    private int maxSize;
    
    /**
    * The array representation of the Stack
    */
    private int[] stackArray;
    
    /**
    * The top index of the stack
    */
    private int top;
    
    /**
    * Stack constructor.
    * @param size Initial maximum size of the Stack
    */
    public StackArray(int size) {
        maxSize = size;
        stackArray = new int[maxSize];
        top = -1;
    }
    
    /**
    * Inserts the value to the stack.
    * Should only accept non-negative integers.
    * @param value The element added
    */
    public void push(int value) {
        if( value >= 0 ) {
            if (!isFull()) { // Checks for a full stack
                top++;
                stackArray[top] = value;
            } else {
                resize(maxSize * 2);
                push(value); // don't forget push after resizing
            }
        }
    }
    
    /**
    * Removes the top element of the stack and returns the value you've removed.
    * If the stack is empty, returns -1.
    * @return value popped off the Stack
    */
    public int pop() {
        if (top < maxSize / 4) {
            resize(maxSize / 2);
            return pop(); // don't forget pop after resizing
        }
        return stackArray[top--];
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
    
    /**
    * Resizes the stack and keeps the same values.
    * @param newSize New size of the array.
    */
    private void resize(int newSize) {
        int[] resizedArray = new int[newSize];
        
        stackArray = resizedArray;
        maxSize = newSize;
    }
    
    /**
    * Checks whether the stack is empty.
    * @return true if the stack is empty
    */
    public boolean isEmpty() {
        return (top == -1);
    }
    
    /**
    * Checks whether the stack is full.
    * @return true if the stack is full
    */
    public boolean isFull() {
        return (top + 1 == maxSize);
    }
    
    /**
    * Clears everything in the Stack
    */
    public void makeEmpty() {
        top = -1;
    }
    
    /**
    * Reverses the stack.
    */
    public void reverse() {
        int[] tempArray = this.stackArray.clone();
        
        for (int i = tempArray.length - 1; i >= 0; i--) {
            stackArray[tempArray.length - 1 - i] = tempArray[i];
        }
    }
}`,
    test: `public class Main {
        public static void main(String[] args) {
            
            // Control Review Comment 1
            StackArray emptyCheckStack = new StackArray(2);
            emptyCheckStack.push(142);
            
            System.out.println(emptyCheckStack.pop() == 142);
            try {
                emptyCheckStack.pop();
                System.out.println(emptyCheckStack.pop() == -1);
            }
            catch (Error e) {
                System.out.println("false");
            }
            System.out.println("0");
            // Control Review Comment 2
            StackArray myStackArray = new StackArray(5);
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
            // Control Review Comment 4
            StackArray reverseStack = new StackArray(4);
            reverseStack.push(6);
            reverseStack.push(11);
            reverseStack.push(13);
            reverseStack.reverse();
            System.out.println(reverseStack.pop() == 6);
            System.out.println(reverseStack.pop() == 11);
            System.out.println(3);
        }
    }`,

    solution: `/**
* An auto resizing Stack implemented with an Array
* The stack is used to store nonnegative integers.
* It's size doubles when we try to push when it is full and
* shrikns to half when less than 1/4 th. of the array is used.
*/
class StackArray {
    
    /**
    * The max size of the Stack
    */
    private int maxSize;
    
    /**
    * The array representation of the Stack
    */
    private int[] stackArray;
    
    /**
    * The top index of the stack
    */
    private int top;
    
    /**
    * Stack constructor.
    * @param size Initial maximum size of the Stack
    */
    public StackArray(int size) {
        maxSize = size;
        stackArray = new int[maxSize];
        top = -1;
    }
    
    /**
    * Inserts the value to the stack.
    * Should only accept non-negative integers.
    * @param value The element added
    */
    public void push(int value) {
        if( value >= 0 ) {
            if (!isFull()) { // Checks for a full stack
                top++;
                stackArray[top] = value;
            } else {
                resize(maxSize * 2);
                push(value); // don't forget push after resizing
            }
        }
    }
    
    /**
    * Removes the top element of the stack and returns the value you've removed.
    * If the stack is empty, returns -1.
    * @return value popped off the Stack
    */
    public int pop() {
        if (!isEmpty()) {
            if (top < maxSize / 4) {
                resize(maxSize / 2);
                return pop(); // don't forget pop after resizing
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
    
    /**
    * Resizes the stack and keeps the same values.
    * @param newSize New size of the array.
    */
    private void resize(int newSize) {
        int[] resizedArray = new int[newSize];
        
        int smallerSize = Math.min(newSize, stackArray.length);
        for (int i = 0; i < smallerSize; i++) {
            resizedArray[i] = stackArray[i];
        }
        
        stackArray = resizedArray;
        maxSize = newSize;
    }
    
    /**
    * Checks whether the stack is empty.
    * @return true if the stack is empty
    */
    public boolean isEmpty() {
        return (top == -1);
    }
    
    /**
    * Checks whether the stack is full.
    * @return true if the stack is full
    */
    public boolean isFull() {
        return (top + 1 == maxSize);
    }
    
    /**
    * Clears everything in the Stack
    */
    public void makeEmpty() {
        top = -1;
    }
    
    /**
    * Reverses the stack.
    */
    public void reverse() {
        int[] tempArray = this.stackArray.clone();
        
        for (int i = top; i >= 0; i--) {
            stackArray[top - i] = tempArray[i];
        }
    }
}`

};

//let level2ErrorDatas = [];

// level2ErrorDatas.push(new CodeError([55,61], "Program crashed when a an empty stack is pooped.",
//  true, "Check if empty.", "Check if empty."));

// level2ErrorDatas.push(new CodeError([60,60], "You are only changing the top index. You aren't actually removing the number from the stack.",
//  false, "Is removing the number from the memory really required?", "This error wasn't real."));

// level2ErrorDatas.push(new CodeError([76,82], "Data is lost when resizing.",
// true, "Are numbers automatically copied to a new arrary?",
// "You have to copy the values from the old stack to the new one. Otherwise, the resized array will be empty."));

// level2ErrorDatas.push(new CodeError([106,108], "The stack doesn't become completely empty.",
// true, "Check how pop and push works.",
// "Pop uses the current top index to return a result and then decrements the top by one. Therefore, when top is set to 0, it is not completely empty, it has one element."));

// level2Data.errorDatas = level2ErrorDatas;

// level2Data.code = `INSERT CODE HERE`;

// level2Data.test = `INSERT MAIN TEST CODE HERE`

// level2Data.solutionHighlights = [[86,88],[117,117]];

// level2Data.solution = `INSERT SOLUTION CODE HERE`;

levelDatas.push( level2Data);

export default levelDatas;
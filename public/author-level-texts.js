var level1Code = `public class Main {
    Node root;

    private class Node {
        int id;
        String name;

        Node leftChild;
        Node rightChild;

        Node(int id, String name) {
            this.id = id;
            this.name = name;
        }

        int getId() {
            return id;
        }

        String getName() {
            return name;
        }
    }

    // Every person should have an unique id.
    // Return if add is successful.
    public boolean addPerson( int id, String name) {
        if(root == null) {
            root = new Node( id, name);
            return true;
        }

        Node currentNode = root;
        Node previousNode = root;

        while( currentNode != null) {
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

    public String findNameById( int id) {
        return findNameAuxiliary(id, root);
    }

    public String findNameAuxiliary( int id, Node node) {
        if(node == null) {
            return null;
        }
        if( id == node.getId()) {
            return node.getName();
        }
        else if( id < node.getId()) {
            findNameAuxiliary(id, node.leftChild);
        }
        else {
            findNameAuxiliary(id, node.rightChild);
        }
        return null;
    }

}`;

var level1TestCode = `public static void main(String[] args) {
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

var level1Solution = `public class Main {
    Node root;

    private class Node {
        int id;
        String name;

        Node leftChild;
        Node rightChild;

        Node(int id, String name) {
            this.id = id;
            this.name = name;
        }

        int getId() {
            return id;
        }

        String getName() {
            return name;
        }
    }

    // Every person should have an unique id.
    // Return if add is successful.
    public boolean addPerson( int id, String name) {
        if(root == null) {
            root = new Node( id, name);
            return true;
        }

        Node currentNode = root;
        Node previousNode = root;

        while( currentNode != null) {
            previousNode = currentNode;

            if (id == currentNode.getId()) {
                return false;
            }
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

    public String findNameById( int id) {
        return findNameAuxiliary(id, root);
    }

    public String findNameAuxiliary( int id, Node node) {
        if(node == null) {
            return null;
        }
        if( id == node.getId()) {
            return node.getName();
        }
        else if( id < node.getId()) {
            return findNameAuxiliary(id, node.leftChild);
        }
        else {
            return findNameAuxiliary(id, node.rightChild);
             
        }
    }

}`;
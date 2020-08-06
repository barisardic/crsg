var level1Code = `// Class Declaration
public class Dog {
    // Instance Variables
    String name;
    String breed;
    int age;
    String color;

    // Constructor Declaration of Class
    public Dog(String name, String breed,
    int age, String color) {
        this.name = name;
        this.breed = breed;
        this.age = age;
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public String getBreed() {
        return breed;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

        public String getColor() {
            return color;
        }

    @Override
    public boolean equals(Dog dogo) {
        return this.toString() == dogo.toString();
    }

    @Override
    public String toString() {
        return("Hi my name is "+ getName()+ ". My breed,age and color are " + this.getBreed()+"," +this.getAge()+","+ this.getColor());
    }

    public static void main(String[] args) {
        Dog tuffy = new Dog("tuffy","papillon", 5, "white");
        System.out.println(tuffy.toString());
    }
}

      `;
var level1Solution = `// Class Declaration
public class Dog {
    // Instance Variables
    String name;
    String breed;
    int age;
    String color;

    // Constructor Declaration of Class
    public Dog(String name, String breed,
    int age, String color) {
        this.name = name;
        this.breed = breed;
        this.age = age;
        this.color = color;
    }

    public String getName() {
        return name;
    }

    public String getBreed() {
        return breed;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

        public String getColor() {
            return color;
        }

    @Override
    public boolean equals(Dog dogo) {
        return this.toString().equals(dogo.toString());
    }

    @Override
    public String toString() {
        return("Hi my name is "+ getName()+ ". My breed,age and color are " + this.getBreed()+"," +this.getAge()+","+ this.getColor());
    }

    public static void main(String[] args) {
        Dog tuffy = new Dog("tuffy","papillon", 5, "white");
        System.out.println(tuffy.toString());
    }
}

      `;
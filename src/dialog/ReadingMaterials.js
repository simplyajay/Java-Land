import Content from "./Content";
import { signs } from "../scenes/World";

export default class ReadingMaterials {

    constructor() {

        this.contents = [];

    }

    getContents(){

        let readingMaterials = this.#getReadingMaterials();
        let questions = this.#getQuestions();
        let answers = this.#getAnswers();
        let difficulties = this.#getDifficulty();
        let types = this.#getTypes();

        for(var i = 0; i < signs.length; i++){

            let content = new Content(signs[i].name, readingMaterials[i], questions[i], answers[i], difficulties[i], types[i]);

            this.contents.push(content);

        }

        return this.contents;

    }

    #getReadingMaterials() {

        var readingMaterial1 = ["JAVA was developed by Sun Microsystems Inc in 1991, later acquired by Oracle Corporation",
            "It was developed by James Gosling and Patrick Naughton. It is a simple programming language.",
            "Writing, compiling and debugging a program is easy in java. It helps to create modular programs"];

        var readingMaterial2 = ["A data type in java is a term that specifies memory size and type of values that can be stored into the memory location.",
            "In other words, data types define different values that a variable can take."];

        var readingMaterial3 = ["An object in Java is any real-world thing that has properties and actions.",
            "In other words, an entity that has state and behavior is known as an object.",
            "Here, state represents properties and behavior represents actions or functionality.",
            "",
            "Example:", 
            "",
            "\xa0 public class Car{",
            "",
            "\xa0\xa0 private int speed;",
            "",
            "\xa0\xa0 public void setSpeed(int sp){",
            "",
            "\xa0\xa0\xa0 speed = sp;",
            "",
            "\xa0\xa0 }", 
            "\xa0\xa0 public int getSpeed(){",
            "",
            "\xa0\xa0\xa0 return speed;",
            "",
            "\xa0\xa0}",
            "",
            "}"];

        var readingMaterial4 = ["public class ArithmeticOperatorDemo{", 
            "",
            "\xa0public static void main (String args[]){", 
            "",
            "\xa0\xa0 int num1 = 100;",
            "\xa0\xa0 int num2 = 20;",
            "",
            '\xa0\xa0 System.out.println("num1 + num2: " + (num1 + num2) );',
            '\xa0\xa0 System.out.println("num1 - num2: " + (num1 - num2) );',
            '\xa0\xa0 System.out.println("num1 * num2: " + (num1 * num2) );',
            '\xa0\xa0 System.out.println("num1 / num2: " + (num1 / num2) );',
            '\xa0\xa0 System.out.println("num1 % num2: " + (num1 % num2) );',
            "",
            "\xa0}",
            "",
            "}",
            "",
            "Output : ",
            "",
            "num1 + num2: 120",
            "num1 - num2: 80",
            "num1 * num2: 2000",
            "num1 / num2: 5",
            "num1 % num2: 0",];

        var readingMaterial5 = ["As the name suggests this is complete java development kit that includes JRE (Java Runtime Environment),",
            "compilers and various tools like JavaDoc, Java debugger etc.",
            "In order to create, compile and run Java program you would need JDK installed on your computer."];

        var readingMaterial6 = ["JRE is a part of JDK which means that JDK includes JRE.",
            "When you have JRE installed on your system, you can run a java program however you won't be able to compile it.",
            ".JRE includes JVM, browser plugins and applets support.",
            "When you only need to run a java program on your computer, you would only need JRE."];

        var readingMaterial7 = ["In Java programming, a class is basically user-defined data types that act as a template for creating objects of the identical type.",
            "It represents the common properties and actions (functions) of an object.",
            "In other words, a class can also be defined as “a class is a group of objects which are common to all objects of one type”.",
            "",
            "Example",
            "",
            "public class Main{",
            "",
            "\xa0 int x = 5;",
            "",
            "}"];

        var readingMaterial8 = ["A method defines action or behavior of the class that a class’s object can perform. It has a body within braces.",
            "In the body, we write code that performs actions. It may be an instance method or a static method.",
            "",
            "Example",
            "",
            "public class Main{",
            "",
            "\xa0 static void myMethod(){",
            "",
            "\xa0\xa0 // to do",
            "",
            "\xa0}",
            "}"];

        var readingMaterial9 = ["Strings, which are widely used in Java programming, are a sequence of characters. ",
            "In the Java programming language, strings are objects.",
            "",
            "Example",
            "",
            "String myString = “Hello World”;"];

        var readingMaterial10 = ["These data types represent integer numbers without any fractional parts or decimal points.",
            "For example, 225, -56524, 0, 1045, etc. come under this category.",
            "Integer data types are again subdivided into four types: byte, short, int, and long.",
            "",
            "Example",
            "",
            "int myInteger = 1;"];

        var readingMaterial11 = ["The operator (++) and the operator (--) are Java's increment and decrement operators.",
            "The increment (++) and decrement operator (--) are simply used to increase and decrease the value by one.",
            "",
            "Example",
            "",
            "public class AutoOperatorDemo {",
            "",
            "\xa0 public static void main(String args[]){",
            "",
            "\xa0\xa0 int num1 = 100;",
            "\xa0\xa0 int num2 = 200;",
            "\xa0\xa0 num1++;",
            "\xa0\xa0 num2++;",
            "",
            '\xa0\xa0 System.out.println("num1++ is: " + num1);',
            '\xa0\xa0 System.out.println("num2++ is: " + num2);',
            "",
            "\xa0}",
            "",
            "}"];

        var readingMaterial12 = ["Logical Operators are used with binary variables. They are mainly used in conditional statements and loops for evaluating a condition.",
            "",
            "Example",
            "",
            "public class LogicalOperatorDemo {",
            "",
            "\xa0public static void main(String args[]) {",
            "",
            "\xa0\xa0boolean b1 = true;",
            "\xa0\xa0boolean b2 = false;",
            "",
            '\xa0\xa0System.out.println("b1 && b2: " + (b1&&b2));',
            '\xa0\xa0System.out.println("b1 || b2: " + (b1||b2));',
            '\xa0\xa0System.out.println("!(b1 && b2): " + !(b1&&b2));',
            "",
            "\xa0}",
            "",
            "}",
            "",
            "Output",
            "b1 && b2: false",
            "b1 || b2: true",];

        var readingMaterial13 = ['Unlike class members, local variables of methods must be assigned a value to before they are accessed, or it is a compile error.'];

        var readingMaterial14 = ['In Java, fields of classes and objects that do not have an explicit initializer and elements of arrays are automatically initialized with the default value for their type (false for boolean, 0 for all numerical types, null for all reference types).',
            'Local variables in Java must be definitely assigned to before they are accessed, or it is a compile error.',];

        var readingMaterial15 = ['Arithmetic conversions are implicitly performed to cast the values to a common type. The compiler first performs integer promotion.',
            'If the operands still have different types, then they are converted to the type that appears highest in the hierarchy.'];
            
        var readingMaterial16 = ['In Java, the finally is always executed after the try-catch block. This block can be used to do the common cleanup work.'];

        var readingMaterial17 = ['ArithmeticException is an unchecked exception, i.e., not checked by the compiler.'];

        var readingMaterial18 = ['The finally block is always executed whether an exception occurs or not.'];

        var readingMaterial19 = ['The values assigned inside constructor overwrite the values initialized with declaration.'];

        var readingMaterial20 = ['In Java, it is not allowed to put the size of the array in the declaration because an array declaration specifies only the element type and the variable name.',
            'The size is specified when you allocate space for the array.'];

        let readingMaterials = []

        readingMaterials.push(readingMaterial1, readingMaterial2, readingMaterial3, readingMaterial4, readingMaterial5, readingMaterial6, readingMaterial7, readingMaterial8,
            readingMaterial9, readingMaterial10, readingMaterial11, readingMaterial12, readingMaterial13, readingMaterial14, readingMaterial15, readingMaterial16,
            readingMaterial17, readingMaterial18, readingMaterial19, readingMaterial20);

        return readingMaterials;

    }

    #getQuestions() {

        var question1 = ["JAVA was developed by Sun Microsystems Inc in 1991, later acquired by Oracle Corporation."];

        var question2 = ["A data type in java is a term that specifies memory size and type of values that can be stored into the memory location."];

        var question3 = ["An object in Java is any real-world thing that has properties and actions."];

        var question4 = ["The Java programming language supports various arithmetic operators for all floating-point and integer numbers."];

        var question5 = ["In order to create, compile and run Java program you would need ___ installed on your computer.", "",
            "",
            "A. Java Runtime Environment",
            "B. Java Development Kit",
            "C. Java Virtual Machine"];

        var question6 = ["Which is true about Java Runtime Environment (JRE)?",
            "",
            "A. Each operating system has different JRE, however the output they produce after execution of bytecode is same across all operating systems",
            "",
            "B. In order to create, compile and run Java program you would need JRE installed on your computer",
            "",
            "C. When you have JRE installed on your system, you can run a java program however you won’t be able to compile it. It includes JVM, browser plugins and applets support."];

        var question7 = ["In Java programming, a/an ___ is basically user-defined data types that act as a template for creating objects of the identical type.",
            "",
            "A. Object",
            "",
            "B. Class",
            "",
            "C. Method"];

        var question8 = ["Which is true about Methods in Java?",
            "",
            "A. A method defines object of the class that a class’s object can perform. It has a body within braces.",
            "",
            "B. A method defines action or behavior of the class that a class’s object can perform. It has a body within braces.",
            "",
            "C. A method defines subject and object of the class that a class’s object can perform. It has a body within braces."];

        var question9 = ["___, which are widely used in Java programming, are a sequence of characters. In the Java programming language, strings are objects.",
            "",
            "A. Characters",
            "",
            "B. Strings",
            "",
            "C. Integers"];

        var question10 = ["Which is true about Integers?",
            "",
            "A. An Integer is data type is also used to represent decimal numbers up to 15 decimal digits accurately",
            "",
            "B. Integer data types are again subdivided into four types: byte, short, int, and long.",
            "",
            "C. Integer is data type takes zero bytes of memory."];

        var question11 = ["The operator ___ and the operator ___ are Java's increment and decrement operators.",
            "",
            "A. (++),(--)",
            "",
            "B. (**),(//), ",
            "",
            "C. (++),(**) "];

        var question12 = ["Which is true about Logical Operators?",
            "",
            "A. An operator that performs arithmetic operations on groups and numbers.",
            "",
            "B. Are used to comparing two variables for equality, non-equality, greater than, less than, etc",
            "",
            "C. Logical Operators are used with binary variables",];

        var question13 = ['class Main { ',
            '',
            '\xa0public static void main(String args[]) {',
            '',
            '\xa0\xa0int t;',
            '',
            '\xa0\xa0System.out.println(t);',
            '',
            '\xa0}',
            '',
            '}',
            '',
            'What is the output of the code shown above?',
            '',
            'A. 0',
            '',
            'B. Garbage Value',
            '',
            'C. Compile Error'];

        var question14 = ['class Test {',
            '',
            '\xa0int i;',
            '',
            '}',
            '',
            'class Main{',
            '',
            '\xa0public static void main(String args[]){',
            '',
            '\xa0\xa0Test t = new Test();',
            '\xa0\xa0System.out.println(t.i);',
            '',
            '\xa0}',
            '',
            '}',
            '',
            'What is the output of the code shown above?',
            '',
            'A. Garbage error',
            '',
            'B. 0',
            '',
            'C. Compiler error'];

        var question15 = ['class Test{',
            '',
            '\xa0public static void(String[] args){',
            '',
            '\xa0\xa0Double object = new Double("2.4");',
            '\xa0\xa0int a = object.intValue();',
            '\xa0\xa0byte b = object.byteValue();',
            '\xa0\xa0float d = object.floatValue();',
            '\xa0\xa0double c = object.doubleValue();',
            '',
            '\xa0\xa0System.out.println(a + b + c + d);',
            '',
            '\xa0}',
            '',
            ')'];

        var question16 = ['class Test extends Exception { }',
            '',
            'class Main {',
            '',
            '\xa0public static void main(String args[]) {',
            '',
            '\xa0\xa0try{',
            '',
            '\xa0\xa0\xa0throw new Test();',
            '',
            '\xa0\xa0}catch(Test t){',
            '',
            '\xa0\xa0\xa0System.out.println("Got the Test Exception");',
            '',
            '\xa0\xa0}finally{',
            '',
            '\xa0\xa0\xa0System.out.println("Inside finally block");',
            '',
            '\xa0\xa0}',
            '',
            '}',
            '',
            '}',
            '',
            'What is the output of the code shown above?',
            '',
            'A. Got the Test exception',
            '\xa0Inside the finally block',
            '',
            'B. Got the test Exception',
            '',
            'C. Inside finally block'];

        var question17 = ['class Main {',
            '',
            '\xa0public static void main(String args[]) {',
            '',
            '\xa0\xa0int x = 0;',
            '\xa0\xa0int y = 10;',
            '\xa0\xa0int z = y/x',
            '',
            '\xa0}',
            '',
            '}',
            '',
            'What is the output of the code shown above?',
            '',
            'A. Compiler Error',
            '',
            'B. Compiles and runs fine',
            '',
            'C. Compiles fine but throws ArithmeticException exception'];
    
        var question18 = ['class Test{',
            '',
            '\xa0public static void main(String[] args){',
            '',
            '\xa0\xa0try{',
            '',
            '\xa0\xa0\xa0int a = 0;',
            '\xa0\xa0\xa0System.out.println("a = " + a");',
            '\xa0\xa0\xa0int b = 20 / a;',
            '\xa0\xa0\xa0System.out.println("b = " + b");',
            '',
            '\xa0\xa0}catch(ArithmeticException e){',
            '',
            '\xa0\xa0\xa0System.out.println("Divide by zero Error");',
            '',
            '\xa0\xa0}finally{',
            '',
            '\xa0\xa0\xa0System.out.println("Inside the finally block");',
            '',
            '\xa0\xa0}',
            '',
            '\xa0}',
            '',
            '}',
            '',
            'What is the output of the code shown above?',
            '',
            'A. Compiler Error',
            '',
            'B. Divide by zero Error',
            '',
            'C. a = 0',
            '\xa0Divide by zero Error',
            '\xa0Inside the finally block'];

        var question19 = ['class T{',
            '',
            '\xa0int t = 20;',
            '',
            '\xa0t(){',
            '',
            '\xa0\xa0t = 40',
            '',
            '\xa0}',
            '',
            '}',
            '',
            'class Main{',
            '',
            '\xa0public static void main(String[] args){',
            '',
            '\xa0\xa0T t1 = new T();',
            '',
            '\xa0}',
            '',
            '}',
            '',
            'What is the output of the code shown above?',
            '',
            'A. 20',
            '',
            'B. 40',
            '',
            'C. Compile Error'];

        var question20 = ['class Test{',
            '',
            '\xa0public static void main(String args[]){',
            '',
            '\xa0\xa0int arr[2];',
            '\xa0\xa0System.out.println(arr[0]);',
            '\xa0\xa0System.out.println(arr[1]);',
            '',
            '\xa0}',
            '',
            '}',
            '',
            'What is the output of the code shown above?',
            '',
            'A. 0',
            '\xa00',
            '',
            'B. Garbage value',
            '',
            'C. Compiler Error'];

        let questions = [];

        questions.push(question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13,
            question14, question15, question16, question17, question18, question19, question20);

        return questions;

    }

    #getAnswers() {

        var ansTrue = 0;

        var ansFalse = 1;

        var ansA = 0;

        var ansB = 1;

        var ansC = 2;

        var answers = [];

        answers.push(ansTrue, ansTrue, ansTrue, ansTrue, ansB, ansC, ansB, ansB, ansB, ansB, ansA, ansC, ansB, ansB, ansC, ansA, ansC, ansC, ansB, ansC);

        return answers;

    }

    #getTypes() {

        var trueFalse = 0;

        var multipleChoice = 1;

        let types = [];

        types.push(trueFalse, trueFalse, trueFalse, trueFalse, multipleChoice, multipleChoice, multipleChoice, multipleChoice, multipleChoice, multipleChoice, multipleChoice, 
            multipleChoice, multipleChoice, multipleChoice, multipleChoice, multipleChoice, multipleChoice, multipleChoice, multipleChoice, multipleChoice);

        return types;

    }

    #getDifficulty() { 

        var easy = 0;

        var average = 1;

        var hard = 2;

        let difficulties = [];

        difficulties.push(easy, easy, easy, easy, average, average, average, average, easy, easy, average, average, hard, hard, hard, hard, hard, hard, hard, hard);

        return difficulties;

    }


}
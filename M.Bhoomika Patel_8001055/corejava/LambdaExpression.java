import java.util.ArrayList;
import java.util.Collections;

class LambdaExample {
    public static void main(String[] args) {

        ArrayList<String> names = new ArrayList<>();

        names.add("Zara");
        names.add("Ravi");
        names.add("Anil");

        Collections.sort(names, (a, b) -> a.compareTo(b));

        System.out.println(names);
    }
}
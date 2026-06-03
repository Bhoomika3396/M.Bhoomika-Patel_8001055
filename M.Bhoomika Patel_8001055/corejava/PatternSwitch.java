class PatternSwitch {

    static void checkType(Object obj) {

        switch(obj) {

            case Integer i ->
                System.out.println("Integer value: " + i);

            case String s ->
                System.out.println("String value: " + s);

            case Double d ->
                System.out.println("Double value: " + d);

            default ->
                System.out.println("Unknown Type");
        }
    }

    public static void main(String[] args) {

        checkType(10);
        checkType("Java");
        checkType(5.5);
        checkType(true);
    }
}
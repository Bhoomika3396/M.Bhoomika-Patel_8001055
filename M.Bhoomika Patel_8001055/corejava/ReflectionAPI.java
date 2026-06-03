import java.lang.reflect.*;

class Sample {

    public void hello() {

        System.out.println("Hello Reflection");

    }
}

class ReflectionDemo {

    public static void main(String[] args)
        throws Exception {

        Class<?> cls =
            Class.forName("Sample");

        Object obj =
            cls.getDeclaredConstructor()
               .newInstance();

        Method[] methods =
            cls.getDeclaredMethods();

        for(Method m : methods) {

            System.out.println(
                "Method: " + m.getName()
            );

            m.invoke(obj);
        }
    }
}
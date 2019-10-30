import java.lang.reflect.Field;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

public class ClassPropertiesMain
{
	public static void main (String ... args)
		throws Exception
	{
		Class klass = Class.forName("ClassProperties");

		System.out.println("Class: ");
		System.out.println(klass);

		System.out.println("Declared Fields: ");
		for (Field field : klass.getDeclaredFields()) {
			System.out.println(field);
		}

		System.out.println("Public Fields: ");
		for (Field field : klass.getFields()) {
			System.out.println(field);
		}

		System.out.println("Constructor: ");
		for (Constructor constructor : klass.getConstructors()) {
			System.out.println(constructor);
		}

		System.out.println("Declared Method: ");
		for (Method method : klass.getDeclaredMethods()) {
			System.out.println(method);
		}

		System.out.println("Public Method: ");
		for (Method method : klass.getMethods()) {
			System.out.println(method);
		}

	}
}
